import path from "path";
import fs from "fs";
import mime from "mime";
import aws, { S3 } from "aws-sdk";
import uploadConfig from "../config/upload";


class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1"
    });
  }

  async saveFile(file: string): Promise<void> {
    const originalPath = path.resolve(uploadConfig.directory, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: "teste-system-ged",
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: "aula-youtube",
        Key: file
      })
      .promise();
  }
}

export default new S3Storage();
