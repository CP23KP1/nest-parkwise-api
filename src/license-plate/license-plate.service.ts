import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InputLicensePlateDto } from './dtos/license-plate.dto';
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { error } from 'console';

const client = new S3Client({ region: 'REGION' });

@Injectable()
export class LicensePlateService {
  constructor(private prismaService: PrismaService) {}

  async saveRecord(licensePlateDto: InputLicensePlateDto) {
    let carId = 0;
    let staffId = 0;
    let deviceId = licensePlateDto.deviceId;
    let zoneId = 0;

    try {
      await this.prismaService.device
        .findFirst({
          where: {
            id: parseInt(deviceId),
          },
        })
        .then((device) => {
          if (!device?.zoneId) {
            return new HttpException(
              'Can not find with Device ID',
              HttpStatus.NOT_FOUND,
            );
          }
          zoneId = device?.zoneId;
        })
        .catch((error) => console.log('error', error));

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
      throw new HttpException('Check payload again', HttpStatus.BAD_REQUEST);
    }

    const direction = await this.checkDirection(carId);
    await this.handleParking(parseInt(deviceId), direction);
    try {
      const logs = await this.prismaService.log
        .create({
          data: {
            carId: carId,
            staffId: staffId,
            zoneId: Number(zoneId),
            licenseUrl: licensePlateDto.licensePlateUrl,
            arrowDirection: String(direction),
          },
        })
        .catch((error) => {
          throw new HttpException(error, HttpStatus.NOT_FOUND);
        });
      await this.updateStaffStatus(staffId);
      return logs;
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
            createdAt: 'desc',
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

  checkDirection = async (id: number) => {
    const log = await this.prismaService.log.findFirst({
      where: {
        carId: id,
      },
      include: {
        zone: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    try {
      if (log.arrowDirection === 'in') {
        return 'out';
      }
    } catch {
      return 'in';
    }
  };

  updateStaffStatus = async (id: number) => {
    let statusUpdate = false;
    let staffCheck = { status: false };
    await this.checkStaffStatus(id).then((staff) => {
      staffCheck = staff;
    });

    if (staffCheck.status === false) {
      statusUpdate = true;
    }

    const staff = await this.prismaService.staff.update({
      where: {
        id: id,
      },
      data: {
        status: statusUpdate,
      },
    });
    return staff;
  };

  checkStaffStatus = async (id: number) => {
    const staff = await this.prismaService.staff.findFirst({
      where: {
        id: id,
      },
      select: {
        status: true,
      },
    });
    return staff;
  };

  handleParking = async (deviceId: number, direction: string) => {
    let zoneId = 0;
    let numberHandle = 1;
    let currentParkingZone = 0;

    await this.prismaService.device
      .findFirst({
        where: {
          id: deviceId,
        },
      })
      .then((data) => {
        if (!data.zoneId) {
          throw new HttpException(
            'Not found zone with device id',
            HttpStatus.NOT_FOUND,
          );
        }
        zoneId = data.zoneId;
      })
      .catch((error) => {
        throw new HttpException(
          'Not found zone with device id',
          HttpStatus.NOT_FOUND,
        );
      });

    if (direction === 'out') {
      numberHandle = -1;
    }

    await this.prismaService.zone
      .findFirst({
        where: {
          id: zoneId,
        },
      })
      .then((zone) => {
        currentParkingZone = zone.occupancy;
      });

    await this.prismaService.zone.update({
      where: {
        id: zoneId,
      },
      data: {
        occupancy: currentParkingZone + numberHandle,
      },
    });
  };
}
