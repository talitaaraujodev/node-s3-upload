/* eslint-disable no-unreachable-loop */
import AWS from "aws-sdk";
import fs from "fs";

class S3Storage {
  private client;

  constructor() {
    this.client = new AWS.S3();
  }

  async saveFile(files: any): Promise<any> {
    for (const file of files) {
      // ler o arquivo
      const fileContent = fs.readFileSync(file.path);

      if (!fileContent) {
        throw new Error("File not found");
      }
      const uploadParams: any = {
        Bucket: process.env.AWS_BUCKET,
        Key: file.filename,
        Body: fileContent
      };
      const uploadPromise = this.client.upload(uploadParams).promise();
      uploadPromise
        .then((data: any) => {
          console.log("Successfully uploaded data to " + data);
        })
        .catch((error: any) => {
          console.error(error, error.stack);
        });
    }
  }

  async deleteFile(file: string): Promise<any> {
    const params: any = {
      Bucket: process.env.AWS_BUCKET,
      Key: file
    };
    const data = await this.client.deleteObject(params).promise();
    if (data) {
      return data;
    } else {
      return undefined;
    }
  }
  async downloadFile(file: string): Promise<any> {
    const params: any = {
      Bucket: process.env.AWS_BUCKET || "",
      Key: file
    };
    console.log(params);
    const data = await this.client.getObject(params).promise();
    if (data.Body) {
      return data;
    } else {
      return undefined;
    }
  }
}

export default new S3Storage();
