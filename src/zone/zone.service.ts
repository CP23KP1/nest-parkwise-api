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

  async findAll({ page, limit }: { page: number; limit: number }) {
    const total = await this.prismaService.zone.count();
    const data = await this.prismaService.zone.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return metaDataConvert({ data, total, page, limit });
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
