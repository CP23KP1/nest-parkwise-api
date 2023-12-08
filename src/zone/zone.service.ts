import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class ZoneService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createZoneDto: CreateZoneDto) {
    return this.prismaService.zone.create({ data: createZoneDto });
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
    orderBy?: 'maximumCapacity' | 'occupancy' | 'createdAt';
    orderDirection?: 'asc' | 'desc';
  }) {
    const orderCondition: Record<string, 'asc' | 'desc'> = {};
    const whereCondition: any = {
      deletedAt: null,
    };
  
    if (search) {
      whereCondition.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { maximumCapacity: { equals: !isNaN(parseInt(search)) ? parseInt(search) : undefined } },
        { occupancy: { equals: !isNaN(parseInt(search)) ? parseInt(search) : undefined } },
        { address: { contains: search } },
      ];
    }
  
    if (orderBy && orderDirection) {
      switch (orderBy) {
        case 'maximumCapacity':
        case 'occupancy':
        case 'createdAt':
          orderCondition[orderBy] = orderDirection;
          break;
        default:
          break;
      }
    }
  
    const total = await this.prismaService.zone.count({
      where: whereCondition,
    });
  
    const data = await this.prismaService.zone.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereCondition,
      orderBy: orderCondition,
    });
  
    return metaDataConvert({
      data,
      total,
      limit,
      page,
    });
  }
  
  findOne(id: number) {
    return this.prismaService.zone.findUnique({ where: { id } });
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return this.prismaService.zone.update({
      where: { id },
      data: updateZoneDto,
    });
  }

  remove(id: number) {
    return this.prismaService.zone.delete({ where: { id } });
  }
}
