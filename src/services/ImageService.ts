import S3Sorage from "../utils/S3Sorage";

class ImageService {
  constructor() {}
  async save(files: string[]): Promise<void> {

    await S3Sorage.saveFile(files);
  }
  async delete(file: string): Promise<void> {
    await S3Sorage.deleteFile(file);
  }
}

export default new ImageService();
