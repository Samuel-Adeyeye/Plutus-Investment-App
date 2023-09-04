import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME!, // Removed backticks and curly braces
  api_key: process.env.API_KEY_4_CLOUDINARY!, // Removed backticks and curly braces
  api_secret: process.env.API_SECRET_4_CLOUDINARY!, // Removed backticks and curly braces
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log(req, file)
    return {
      folder: "useruploads",
    };
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});