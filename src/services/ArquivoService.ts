import S3Sorage from "../utils/S3Sorage";
import { IArquivoRepository } from "../repositories/IArquivoRepository";
import ArquivoPrismaRepository from "../repositories/ArquivoPrismaRepository";

class ArquivoService {
  constructor(private readonly arquivoRepository: IArquivoRepository){}
  async save(files: any): Promise<any> {
    return await S3Sorage.saveFile(files);
  }
  async delete(file: string): Promise<any> {
    return await S3Sorage.deleteFile(file);
  }
  async listing(): Promise<any> {
    return await S3Sorage.findAllFiles();
  }
  async findOne(file: string): Promise<any> {
    //console.log(await S3Sorage.findOneFile(file));
    return await S3Sorage.findOneFile(file);
  }
}

export default new ArquivoService(ArquivoPrismaRepository);
