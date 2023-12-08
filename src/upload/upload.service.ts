import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  async uploadFile(file: Express.Multer.File, bucketName: string, key: string): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Set the ACL as needed
    };

    try {
      const result = await this.s3.upload(params).promise();
      return result.Location; // The URL of the uploaded file
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}
