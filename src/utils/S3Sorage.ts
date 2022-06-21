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

  async saveFile(files: string[]): Promise<any> {
    const params = files.map((file: string) => {
      return {
        Bucket: process.env.AWS_BUCKET,
        Key: file,
      };
    });
 

  return await Promise.all(
      params.map((param: any) => this.client.send(new PutObjectCommand(param)))
    );
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
