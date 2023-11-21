import { Injectable } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class ParkingService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createParkingDto: CreateParkingDto) {
    return this.prismaService.parking.create({ data: createParkingDto });
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    const total = await this.prismaService.parking.count({
      where: { deletedAt: null },
    });

    const data = await this.prismaService.parking.findMany({
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
    return this.prismaService.parking.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: number, updateParkingDto: UpdateParkingDto) {
    return this.prismaService.parking.update({
      where: { id },
      data: updateParkingDto,
    });
  }

  remove(id: number) {
    return this.prismaService.parking.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
