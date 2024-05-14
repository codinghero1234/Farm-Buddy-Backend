import nodemailer, {createTransport}from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendOTP = async(email, otp, subject) => {
    try {
        const info = await transport.sendMail({
            from: "FARM BUDDY <nandanmagdum14@gmail.com>",
            to: email,
            subject: subject,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP for FARM BUDDY</title>
            </head>
            <body>
                <h2>OTP Verification for SMART BUDDY</h2>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>Please use this OTP to complete the registration process.</p>
                <p>If you did not register for the Smart Campus App, please ignore this email.</p>
                <p>Best regards,<br>Smart Campus Team</p>
            </body>
            </html>
`
        }
        );
        return info.accepted.length === 1 ? "success" : "fail";
    } catch (error) {
        console.error(error.message);
        return "fail";
    }
}

export  {
    sendOTP
}