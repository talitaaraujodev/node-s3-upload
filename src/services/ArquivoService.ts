import ArquivoPrismaRepository from "../repositories/ArquivoPrismaRepository";
import { IArquivoRepository } from "../repositories/IArquivoRepository";
import S3Sorage from "../utils/S3Sorage";
// interface ArquivoDto {
//   files: {
//     originalname: string;
//     filename: string;
//     size: number;
//     path?: string;
//   };
//   descricao?: string;
//   validade?: Date;
// }
class ArquivoService {
  constructor(private readonly arquivoRepository: IArquivoRepository) {}
  async save(data: any): Promise<any> {
    const arquivo = data.map((item: any) => {
      return {
        name: item.file.originalname,
        key: item.file.filename,
        size: item.file.size,
        url: "",
        validade: new Date(),
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

    const saveArquivoS3 = await S3Sorage.saveFile(files);
    if (saveArquivoS3) {
      await this.arquivoRepository.create(arquivo);
    }
  }
  async delete(file: string): Promise<any> {
    const name = file;
    const deleteFileS3 = await S3Sorage.deleteFile(file);
    const fileExist = await this.arquivoRepository.findName(name);
    if (deleteFileS3) {
      if (fileExist) {
        await this.arquivoRepository.delete(name);
      }
    }
  }
  async listing(): Promise<any> {
    return await S3Sorage.findAllFiles();
  }
  async findOne(file: string): Promise<any> {
    return await S3Sorage.findOneFile(file);
  }
}

export default new ArquivoService(ArquivoPrismaRepository);
