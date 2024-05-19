import express from "express";
import mongoose from "mongoose";
import multer from "multer";

// disk storage

const storageDisk = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "files/");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadDisk = multer({storageDisk});

// memory storage

const storageMemory = multer.memoryStorage();

export const uploadMemory = multer({storageMemory});

