import { Request, Response } from "express";
import ArquivoService from "../services/ArquivoService";

class ArquivoController {
  async create(request: Request, response: Response): Promise<Response> {
    const files: any = request.files;
    const data = JSON.parse(request.body.data);
    const arquivos = data.map((item: any, index: any) => {
      return [
        {
          data: item,
          file: files[index]
        }
      ];
    });
    for (let data of arquivos) {
      await ArquivoService.save(data);
    }
    return response.status(201).json({
      message: "Upload de arquivo realizado com sucesso "
    });
  }
  async findAll(request: Request, response: Response): Promise<Response> {
    const files = await ArquivoService.listing();
    return response.status(200).json({ files });
  }
  async findOne(request: Request, response: Response): Promise<Response> {
    const { file } = request.params;
    const getFile = await ArquivoService.findOne(file);
    return response.status(200).json({ getFile });
  }
  async download(request: Request, response: Response): Promise<any> {
    const file: any = request.params.file;
    await ArquivoService.downloadFile(file);
    return response.end();
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { file } = request.params;
    await ArquivoService.delete(file);
    return response.status(200).json({ message: "Deletado com sucesso" });
  }
}
export default new ArquivoController();
