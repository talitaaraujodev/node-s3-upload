import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import ArquivoController from "./controllers/ArquivoController";
const routes = Router();
const upload = multer(uploadConfig);

routes.post(
  "/arquivos/upload",
  upload.array("files"),
  ArquivoController.create
);
routes.delete("/arquivos/:file", ArquivoController.delete);
routes.get("/arquivos", ArquivoController.findAll);
routes.get("/arquivos/download/:file", ArquivoController.download);
routes.get("/arquivos/:file", ArquivoController.findOne);

export { routes };
