import fs from "fs";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";

class S3Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: "us-east-1",
      credentials: fromIni({ profile: "default" })
    });
  }

  async saveFile(file: any): Promise<any> {
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
    return await this.client.send(new PutObjectCommand(params));
  }

  async deleteFile(file: string): Promise<any> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: file
    };
    return await this.client.send(new DeleteObjectCommand(params));
  }
  async findAllFiles(): Promise<any> {
    const files = await this.client.send(
      new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET })
    );
    return files.Contents?.map((item: any) => {
      return {
        name: item.Key
      };
    });
  }
  async findOneFile(file: string): Promise<any> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: file
    };

    const getFile = await this.client.send(new GetObjectCommand(params));
    return await this.stream2buffer(getFile.Body);
  }
  async stream2buffer(stream: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const _buf: any = [];
      stream.on("data", (chunk: any) => _buf.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(_buf)));
      stream.on("error", (err: any) => reject(err));
    });
  }
}

export default new S3Storage();
