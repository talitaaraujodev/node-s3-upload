import crypto from "crypto";
import multer from "multer";
import path from "path";

export default {
  limits: {
    fileSize: 1048576, // 10 Mb
    files: 10 
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err: any, hash) => {
        if (err) callback(null, err);
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, fileName);
      });
    }
  })
};
