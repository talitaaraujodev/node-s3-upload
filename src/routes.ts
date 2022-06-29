import { Request, Response, Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import ArquivoService from "./services/ArquivoService";
const routes = Router();
const upload = multer(uploadConfig);

routes.post(
  "/upload",
  upload.array("files"),
  async (request: Request, response: Response) => {
    const files: any = request;
    for (let file of files) {
      await ArquivoService.save(file);
    }
    return response.json({
      message: "Upload de arquivo realizado com sucesso "
    });
  }
);

routes.delete("/upload/:file", async (request: Request, response: Response) => {
  const { file } = request.params;

  await ArquivoService.delete(file);

  return response.send({ message: "Deletado com sucesso" });
});

routes.get("/upload", async (request: Request, response: Response) => {
  const files = await ArquivoService.listing();
  return response.json({ files });
});
routes.get("/upload/:file", async (request: Request, response: Response) => {
  const { file } = request.params;
  const getFile = await ArquivoService.findOne(file);
  return response.json({ getFile });
});

export { routes };
