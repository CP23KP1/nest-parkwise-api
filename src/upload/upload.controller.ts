// your.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' should match the field name in your form
  async uploadFileToS3(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    const bucketName = 'parkwise-kmutt';
    const key = 'x5r4';

    const url = await this.uploadService.uploadFile(file, bucketName, key);

    return { url };
  }
}
