import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmergencyDto } from './dtos/create-emergency.dto';

@Injectable()
export class EmergencyService {
  constructor(private prismaService: PrismaService) {}

  async createEmergency(data: CreateEmergencyDto) {
    try {
      const emergencyData = this.prismaService.emergency.create({
        data: {
          name: data.name,
          phoneNumber: data.phoneNumber,
          active: data.active ?? true,
        },
      });
      return emergencyData;
    } catch {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  async editEmergencyData(id: number, data: CreateEmergencyDto) {
    const dataUpdate = this.prismaService.emergency.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        active: data.active,
        phoneNumber: data.phoneNumber,
      },
    });
    return dataUpdate;
  }

  async getData(search?: string, isCustomer?: boolean) {
    const whereCondition: any = {
      deletedAt: null,
    };
    if (search) {
      whereCondition.OR = [
        { name: { contains: search } },
        { phoneNumber: { contains: search } },
      ];
    }

    if (isCustomer) {
      whereCondition.active = true;
    }

    return this.prismaService.emergency.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: whereCondition,
    });
  }

  async findOne(id: number) {
    const emergency = await this.prismaService.emergency.findUnique({
      where: { id },
    });

    if (!emergency) {
      throw new NotFoundException('Emergency not found');
    }

    return emergency;
  }

  async deleteEmergencyData(id: number) {
    await this.findOne(id);

    const emergencyData = await this.prismaService.emergency.delete({
      where: {
        id: id,
      },
    });
    return emergencyData;
  }
}
