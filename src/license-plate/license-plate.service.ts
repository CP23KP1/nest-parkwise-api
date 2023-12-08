import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InputLicensePlateDto } from './dtos/license-plate.dto';
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'REGION' });

@Injectable()
export class LicensePlateService {
  constructor(private prismaService: PrismaService) {}

  async test(licensePlateDto: InputLicensePlateDto) {
    console.log('เข้ามาจ้าาา', licensePlateDto);
    let carId = 0;
    let staffId = 0;
    let zoneId = licensePlateDto.zoneId;

    try {
      const result = await this.prismaService.car.findFirst({
        where: {
          licensePlate: licensePlateDto.licensePlate,
        },
        include: {
          staff: true,
        },
      });

      console.log('result', result);
      carId = result.id;
      staffId = result.staff.id;
      console.log('this is car jaa ', result);
    } catch (error) {
      console.log('error', error);
    }

    try {
      const logs = await this.prismaService.log.create({
        data: {
          carId: carId,
          staffId: staffId,
          zoneId: Number(zoneId),
        },
      });

      console.log('this is created logs jaa ', logs);
    } catch (error) {
      console.log('error creating logs', error);
    }
  }

  async get() {
    try {
      const result = await this.prismaService.log.findMany({
        include: {
          staff: true,
          car: true,
          zone: true,
        },
      });

      console.log('result', result);
      return result;
    } catch (error) {
      console.log('error', error);
    }
  }
}
