import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).json("Token absent");
        }
        // verify token
        const payload = await jwt.verify(token, process.env.JWT_KEY);

        if(!payload){
            return res.status(400).json("Token is not valid");
        }

        req._id = payload._id;
        req.email = payload.email;
        req.name = payload.name;

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}