import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import ImageService from "./services/ImageService";
const routes = Router();
const upload = multer(uploadConfig).single("file");

routes.post("/upload", upload, async (request: Request, response: Response) => {
  const file = request.body.file;

  await ImageService.save(file);

  return response.json({ success: true });
});

routes.delete(
  "/upload/:file",
  async (request: Request, response: Response) => {
    const { file } = request.params;

    await ImageService.delete(file);

    return response.send();
  }
);

export { routes };
