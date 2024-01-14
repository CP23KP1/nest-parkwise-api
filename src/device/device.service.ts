import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class DeviceService {
  constructor(private prismaService: PrismaService) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.prismaService.device.create({
      data: createDeviceDto,
    });
  }

  async findAll({
    page,
    limit,
    search,
    orderBy,
    orderDirection,
  }: {
    page: number;
    limit: number;
    search?: string;
    orderBy?: 'price' | 'createdAt';
    orderDirection?: 'asc' | 'desc';
  }) {
    const whereCondition: any = {
      deletedAt: null,
    };

    if (search) {
      whereCondition.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const orderCondition: Record<string, 'asc' | 'desc'> = {};

    if (orderBy && orderDirection) {
      const field = orderBy === 'createdAt' ? 'createdAt' : 'price';
      orderCondition[field] = orderDirection;
    }

    const total = await this.prismaService.device.count({
      where: whereCondition,
    });

    const data = await this.prismaService.device.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereCondition,
      orderBy: orderCondition,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        zoneId: true,
        name: true,
        price: true,
        brand: true,
        description: true,
        zone: {
          select: {
            name: true,
          },
        },
      },
    });

    return metaDataConvert({
      data,
      total,
      limit,
      page,
    });
  }

  async findOne(id: number) {
    const device = await this.prismaService.device.findUnique({
      where: { id },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prismaService.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.device.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
