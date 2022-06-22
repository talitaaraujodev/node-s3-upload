import multer from "multer";
import path from "path";
import crypto from "crypto";
import moment from "moment";

export default {
  limits: {
    fieldNameSize: 300,
    fileSize: 1048576 // 10 Mb
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(12, (err: any, hash) => {
        if (err) callback(null, err);
        const filename = `${hash.toString("hex")}-${moment().format(
          "YYYY-MM-DD-HH:mm:ss"
        )}-${file.originalname}`;
        callback(null, filename);
      });
    }
  })
};
