import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/router.js";

dotenv.config();

const app = express();
const PORT = 8000;

// default middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// middlewares

// routes
app.use("/api/v1", router);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error.message);
})