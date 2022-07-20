import ArquivoPrismaRepository from "../repositories/ArquivoPrismaRepository";
import { IArquivoRepository } from "../repositories/IArquivoRepository";
import S3Sorage from "../utils/S3Storage";
import { ResponseError } from "./../helpers/ResponseError";
class ArquivoService {
  constructor(private readonly arquivoRepository: IArquivoRepository) {}
  async save(data: any): Promise<any> {
    const names = data.map((item: any) => {
      return item.file.originalname;
    });
    const arquivosExist = await this.arquivoRepository.findByNames(names);
    const arquivo = data.map((item: any) => {
      return {
        name: item.file.originalname,
        key: item.file.filename,
        size: item.file.size,
        url: "",
        descricao: item.data.descricao
      };
    });
    const files = data.map((item: any) => {
      return {
        originalname: item.file.originalname,
        filename: item.file.filename,
        size: item.file.size,
        path: item.file.path
      };
    });

    console.log(arquivosExist);
    if (arquivosExist) {
      throw new ResponseError("Arquivo já existe", 400);
    }

    await this.arquivoRepository.create(arquivo);
    await S3Sorage.saveFile(files);
  }
  async delete(file: string): Promise<any> {
    const name = file;
    const arquivoExist = await this.arquivoRepository.findByName(name);

    if (arquivoExist) {
      await S3Sorage.deleteFile(file);
      await this.arquivoRepository.delete(name);
    }
  }

  async listing(): Promise<any> {
    return await this.arquivoRepository.findAll();
  }
  async findOne(file: string): Promise<any> {
    const arquivoExist = await this.arquivoRepository.findByName(file);
    if (arquivoExist) {
      await this.arquivoRepository.findByName(file);
    }
  }
  async downloadFile(file: string): Promise<any> {
    return await S3Sorage.downloadFile(file);
  }
}

export default new ArquivoService(ArquivoPrismaRepository);
