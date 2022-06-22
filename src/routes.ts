import { Router, Request, Response, request } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import ImageService from "./services/ImageService";
const routes = Router();
const upload = multer(uploadConfig);

routes.post(
  "/upload",
  upload.array("files"),
  async (request: Request, response: Response) => {
    const files: any = request.files;
    for (let file of files) {
      await ImageService.save(file);
    }

    return response.json({
      message: "Upload de arquivo realizado com sucesso "
    });
  }
);

routes.delete("/upload/:file", async (request: Request, response: Response) => {
  const { file } = request.params;

  await ImageService.delete(file);

  return response.send({ message: "Deletado com sucesso" });
});

routes.get("/upload", async (request: Request, response: Response) => {
  const files = await ImageService.listing();
  return response.json({ files });
});
routes.get("/upload/:file", async (request: Request, response: Response) => {
  const { file } = request.params;
  const getFile = await ImageService.findOne(file);
  return response.json({ getFile });
});

export { routes };
