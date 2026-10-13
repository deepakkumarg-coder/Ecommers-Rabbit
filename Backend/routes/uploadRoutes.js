const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();


// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRETE,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(404).json({ message: "No File Uploaded" });

    // Function to handle stream upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        });

        // Use streamifier to convert buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log("Error Message", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
