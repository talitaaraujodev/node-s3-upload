import path from "path";
import fs from "fs";
import mime from "mime";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import uploadConfig from "../config/upload";
import { fromIni } from "@aws-sdk/credential-provider-ini";

class S3Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: "us-east-1",
      credentials: fromIni({ profile: "default" })
    });
  }

  async saveFile(file: string): Promise<void> {
    console.log(file);
    const originalPath = path.resolve(uploadConfig.directory, file);
    console.log(originalPath);
    const ContentType = mime.getType(originalPath);
   
    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = fs.readFileSync(originalPath);

    const params = {
      Bucket: "teste-system-ged",
      Key: file,
      Body: fileContent
    };
    console.log(params);
    await this.client.send(new PutObjectCommand(params));
  }

  async deleteFile(file: string): Promise<void> {
    const params = {
      Bucket: "teste-system-ged",
      Key: file
    };
    await this.client.send(new DeleteObjectCommand(params));
  }
}

export default new S3Storage();
