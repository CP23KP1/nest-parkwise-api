// your.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload file to AWS S3')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Store file into S3' })
  @ApiBody({
    description: 'Upload file to S3',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
        },
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    description: 'Upload file to S3',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'url',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // 'file' should match the field name in your form
  async uploadFileToS3(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const bucketName = 'parkwise-kmutt';
    const key = 'x5r4';

    const url = await this.uploadService.uploadFile(file, bucketName, key);

    return { url };
  }
}
