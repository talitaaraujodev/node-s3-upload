import fs from "fs";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import mime from "mime";

class S3Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: "us-east-1",
      credentials: fromIni({ profile: "default" })
    });
  }

  async saveFile(file: any): Promise<any> {
    console.log(file);
    // ler o arquivo
    const fileContent = fs.readFileSync(file.path, { encoding: "utf8" });

    if (!fileContent) {
      throw new Error("File not found");
    }
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: file.filename,
      Body: fileContent
    };
    return this.client.send(new PutObjectCommand(params));
  }

  async deleteFile(file: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: file
    };
    await this.client.send(new DeleteObjectCommand(params));
  }
}

export default new S3Storage();
