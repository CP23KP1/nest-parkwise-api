import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCarDto: CreateCarDto) {
    return this.prismaService.car.create({ data: createCarDto });
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    const total = await this.prismaService.car.count({
      where: { deletedAt: null },
    });

    const data = await this.prismaService.car.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { deletedAt: null },
      select:{
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        brand: true,
        color: true,
        model: true,
        staffId: true,
        year: true,
        licensePlate: true,
        staff: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      }
    });

    return metaDataConvert({
      data,
      total,
      limit,
      page,
    });
  }

  findOne(id: number) {
    return this.prismaService.car.findUnique({ where: { id } });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.prismaService.car.update({ where: { id }, data: updateCarDto });
  }

  remove(id: number) {
    return this.prismaService.car.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
