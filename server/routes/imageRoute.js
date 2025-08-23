import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/imageUpload", upload.single("file"), async(req, res) => {
  try{
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "arqila uploads"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result)
        }
      );
      bufferStream.pipe(stream);
    });

    res.status(200).json({ url: result.secure_url});
  } catch(err) {
    console.error(err);
    res.status(500).json({error: "file upload error"});
  }
})

export default router;