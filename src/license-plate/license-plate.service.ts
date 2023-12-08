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

      carId = result.id;
      staffId = result.staff.id;
    } catch (error) {
      console.log('error', error);
    }

    try {
      const logs = await this.prismaService.log.create({
        data: {
          carId: carId,
          staffId: staffId,
          zoneId: Number(zoneId),
          licenseUrl: licensePlateDto.licensePlateUrl,
        },
      });

      console.log('this is created logs jaa ', logs);
    } catch (error) {
      console.log('error creating logs', error);
    }
  }

  async get({
    page = 1,
    limit = 10,
    search,
    zoneId,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    zoneId?: number;
  } = {}) {
    try {
      const whereCondition: any = {};

      if (search) {
        console.log('search', search);
        const searchLower = search.toLowerCase();
        whereCondition.OR = [
          { car: { licensePlate: { contains: searchLower } } },
          { staff: { firstname: { contains: searchLower } } },
          { staff: { lastname: { contains: searchLower } } },
        ];
      }

      if (zoneId) {
        whereCondition.zoneId = zoneId;
      }

      const [data, total] = await Promise.all([
        this.prismaService.log.findMany({
          take: limit,
          skip: (page - 1) * limit,
          where: whereCondition,
          include: {
            staff: true,
            car: true,
            zone: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
        }),
        this.prismaService.log.count({
          where: whereCondition,
        }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      console.log('error', error);
      return {
        data: [],
        meta: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      };
    }
  }
}
