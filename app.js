import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/router.js";
import apiCall from "./apicall.js";

dotenv.config();

const app = express();
const PORT = 8000;

// default middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// middlewares
app.use((req, res, next) => {
    console.log(req.path);
    console.log(req.body);
    next();
});

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

apiCall();