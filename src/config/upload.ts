import crypto from "crypto";
import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err: any, hash) => {
        if (err) callback(null, err);
        const fileName = `${file.originalname}`;
        callback(null, fileName);
      });
    }
  })
};
