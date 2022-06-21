import multer from "multer";
import path from "path";
import crypto from "crypto";
import moment from "moment";

const tmpFolder = path.resolve(__dirname, "..", "uploads");

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err: any, hash) => {
        if (err) callback(null, err);
        const filename = `${moment().format("YYYY-MM-DD-HH:mm:ss")}-${
          file.originalname
        }`;
        callback(null, filename);
      });
    }
  })
};
