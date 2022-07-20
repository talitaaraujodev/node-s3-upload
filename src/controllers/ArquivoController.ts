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
    const arquivos = await ArquivoService.listing();
    return response.status(200).json({ arquivos });
  }
  async findOne(request: Request, response: Response): Promise<Response> {
    const id: any = parseInt(request.params.id);
    const arquivo = await ArquivoService.findOne(id);
    return response.status(200).json({ arquivo });
  }
  async download(request: Request, response: Response): Promise<any> {
    const file: any = request.params.file;
    await ArquivoService.downloadFile(file);
    return response.end();
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const file: any = request.params.file;
    await ArquivoService.delete(file);
    return response.status(200).json({ message: "Deletado com sucesso" });
  }
}
export default new ArquivoController();
