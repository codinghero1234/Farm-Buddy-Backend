import { sendOTP } from "../services/mail_service.js";
import otpService from "../services/otp_service.js";
import { tempUserModel, userModel } from "../models/user.model.js";
import otpModel from "../models/otp.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const verifyEmailController = async (req, res) => {
    try {
        // data = email, password(visible), name, address
        const data = req.body;
        console.log(data.email, data.password, data.name, data.address);
        console.log(data.password.length);
        // server side validation
        if (!data.email || data.email == "") {
            return res.status(400).json("Please Enter Email Address");
        }
        else if (RE.test(data.email) === false) {
            return res.status(400).json("Email address is badly formated");
        }
        else if (!data.password || data.password == "") {
            return res.status(400).json("Please Enter Password");
        }
        else if (data.password.length < 8) {
            return res.status(400).json("Password is too short! Password must be atleast 8 to 16 characters long");
        }
        else if (data.password.length > 16) {
            return res.status(400).json("Password is too long! Password must be atleast 8 to 16 characters long");
        }
        else if (!data.name || data.name == "") {
            return res.status(400).json("Please enter your full name");
        }
        else if (!data.address || data.address == "") {
            return res.status(400).json("Please enter your address");
        }

        // hash password
        console.log("password ", data.password);
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log("hashedPassword ", hashedPassword);

        // generate OTP
        const OTP = await otpService.generateOTP();
        console.log("OTP ", OTP);

        // hash otp
        const hashedOTP = await bcrypt.hash(OTP.toString(), 10);
        console.log("hashed OTP ", hashedOTP);

        const tempUser = await tempUserModel.create({
            email: data.email,
            password: hashedPassword,
            name: data.name,
            address: data.address
        });
        if (!tempUser) {
            return res.status(400).json("Error Creating user data");
        }
        // delete all prev otp's

        const deleteOperation = await otpModel.deleteMany({ email: data.email });
        if (!deleteOperation) {
            return res.status(400).json("Something went wrong !");
        }

        const newOTP = await otpModel.create({
            email: data.email,
            otp: hashedOTP
        });

        if (!newOTP) {
            return res.status(400).json("Error storing the OTP");
        }

        // send email to user's email
        const mailStatus = await sendOTP(data.email, OTP, "Email Verification for Creating New Account on Farm Bddy");
        if (mailStatus === "fail") {
            return res.status(400).json(`Error sending email to ${data.email}`);
        }


        return res.status(200).json(`OTP sent to ${data.email}`);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const verifyOTPAndCreateAccountController = async (req, res) => {
    const { clientEmail, clientOTP } = req.body;
    console.log(clientEmail, clientOTP);
    try {
        // verify otp
        const otpdata = await otpModel.findOne({ email: clientEmail });
        if (!otpdata) {
            return res.status(400).json("Email address not found!");
        }
        // check if otp is expired
        const status = await otpService.isOTPexpired(otpdata);
        if (status != "success") {
            return res.status(400).json("OTP Expired! Please try again !");
        }

        // check if otp is correct
        const isOTPMatch = await bcrypt.compare(clientOTP, otpdata.otp);
        if (!isOTPMatch) {
            return res.status(400).json("Wrong OTP!");
        }

        // create permnant account
        const tempUserData = await tempUserModel.findOne({ email: clientEmail });
        if (!tempUserData) {
            return res.status(400).json("Temp User not Found !");
        }
        const newUser = await userModel.create({
            email: tempUserData.email,
            password: tempUserData.password,
            name: tempUserData.name,
            address: tempUserData.address
        });
        if (!newUser) {
            return res.status(400).json("Error creating your new Account ! Please try again !");
        }
        await tempUserModel.deleteMany({ email: clientEmail });
        await otpModel.deleteMany({ email: clientEmail });
        return res.status(200).json("Account created Succesfully");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json("User with this this email doesn't exists");
        }

        // check if password match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json("Wrong Password !");
        }

        // create jwt
        const token = await jwt.sign(
            {
                email: user.email,
                name: user.name,
                _id: user._id,
                address: user.address
            },
            process.env.JWT_KEY,
            { expiresIn: '30d' }
        );
        if (!token) {
            return res.status(400).json("Error creating JWT token");
        }

        // send jwt
        return res.status(200).json({
            token: token
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const deleteAccountController = async (req, res) => {
    try {
        const _id = req._id;
        const user = await userModel.findOneAndDelete({ _id: _id });
        if (!user) {
            return res.status(400).json("Error deleting the user");
        }
        return res.status(200).json("Account Deleted Successfully!");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const resetPasswordSendOTPController = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json("This Account doesn't exists");
        }

        // delete prev otp data
        await otpModel.deleteMany({ email: email });

        // generate otp
        const OTP = await otpService.generateOTP();

        // save otp to data
        const hashedOTP = await bcrypt.hash(OTP.toString(), 10);
        const otpData = await otpModel.create({
            email: email,
            otp: hashedOTP,
        });
        if (!otpData) {
            return res.status(400).json("Error generating OTP");
        }

        // send email to user's email
        const mailStatus = await sendOTP(email, OTP, "Email Verification for Password Reset on Farm Bddy");
        if (mailStatus === "fail") {
            return res.status(400).json(`Error sending email to ${email}`);
        }
        return res.status(200).json(`OTP sent to ${email}`);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const resetPasswordVerifyOTPController = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpdata = await otpModel.findOne({ email: email });
        if (!otpdata) {
            return res.status(400).json("Email address not found!");
        }

        // check if otp is expired
        const status = await otpService.isOTPexpired(otpdata);
        if (status != "success") {
            return res.status(400).json("OTP Expired! Please try again !");
        }

        // check if otp is correct
        const isOTPMatch = await bcrypt.compare(otp, otpdata.otp);
        if (!isOTPMatch) {
            return res.status(400).json("Wrong OTP!");
        }
        await otpModel.deleteMany({ email: email });
        return res.status(200).json("OTP Verified Successfully");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

export const resetPasswordController = async (req, res) => {
    const { email, new_password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        if(!hashedPassword){
            return res.status("Error hashing the password !");
        }
        
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json("Account not found !");
        }
        const updateOperation = await userModel.findOneAndUpdate({ email: email }, {
            $set: {
                password: hashedPassword
            },
        }, { new: true });
        if(!updateOperation){
            return res.status(400).json("Error resetting the password, please try again!");
        }
        return res.status(200).json("Password changed succesfully");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}