import { Injectable } from '@nestjs/common';
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

  async findAll({ page, limit }: { page: number; limit: number }) {
    const total = await this.prismaService.device.count({
      where: { deletedAt: null },
    });

    const data = await this.prismaService.device.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { deletedAt: null },
    });

    return metaDataConvert({
      data,
      total,
      limit,
      page,
    });
  }

  findOne(id: number) {
    return this.prismaService.device.findUnique({ where: { id } });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prismaService.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  remove(id: number) {
    return this.prismaService.device.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
