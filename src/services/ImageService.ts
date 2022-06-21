import S3Sorage from "../utils/S3Sorage";

class ImageService {
  constructor() {}
  async save(file: any): Promise<void> {
    console.log(file);
    await S3Sorage.saveFile(file.filename);
  }
  async delete(file: string): Promise<void> {
    await S3Sorage.deleteFile(file);
  }
}

export default new ImageService();
