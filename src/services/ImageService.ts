import S3Sorage from "../utils/S3Sorage";

class ImageService {
  constructor() {}
  async save(file: any): Promise<any> {
    return await S3Sorage.saveFile(file);
  }
  async delete(file: string): Promise<any> {
    return await S3Sorage.deleteFile(file);
  }
  async listing(): Promise<any> {
    return await S3Sorage.findAllFiles();
  }
  async findOne(file: string): Promise<any> {
    console.log(await S3Sorage.findOneFile(file));
    return await S3Sorage.findOneFile(file);
  }
}

export default new ImageService();
