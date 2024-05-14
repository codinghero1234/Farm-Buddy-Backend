import express from "express";
import mongoose from "mongoose";
import otpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";

const generateOTP = async() => {
     const min = 100000;
     const max = 999999;
     const otp = Math.floor(Math.random() * (max - min + 1)) + min;
     return otp;
} 

const isOTPexpired = async(otpData) => {
    console.log(otpData);
    // Add 2 minutes to the createdAt time
    const twoMinutesLater = new Date(otpData.createdAt.getTime() + (2 * 60 * 1000));
    
    // Get the current time
    const currentTime = new Date();
    console.log(currentTime - twoMinutesLater);
    // Check if two minutes have passed
    if (currentTime.getTime() >= twoMinutesLater.getTime()) {
        console.log("OTP EXpired");
      return "OTP_EXPIRED";
    } else {
        console.log("OTP not EXpired");
      return "success";
      }
    }

export default {
    generateOTP,
    isOTPexpired
}