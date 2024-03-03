import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';
import { equal } from 'assert';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCarDto: CreateCarDto) {
    return this.prismaService.car.create({ data: createCarDto });
  }

  async getMyCars(staffId: number) {
    return this.prismaService.car.findMany({
      where: {
        staffId,
      },
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
    orderBy?: 'createdAt';
    orderDirection?: 'asc' | 'desc';
  }) {
    const whereCondition: any = {
      deletedAt: null,
    };

    if (search) {
      whereCondition.OR = [
        { brand: { contains: search } },
        { color: { contains: search } },
        { model: { contains: search } },
        { year: { equals: parseInt(search) || undefined } },
        { licensePlate: { contains: search } },
        {
          staff: {
            firstname: { contains: search },
          },
        },
        {
          staff: {
            lastname: { contains: search },
          },
        },
      ];
      whereCondition.deletedAt = null;
    }

    const orderCondition: Record<string, 'asc' | 'desc'> = {};

    if (orderBy && orderDirection) {
      orderCondition[orderBy] = orderDirection;
    }

    const total = await this.prismaService.car.count({
      where: whereCondition,
    });

    const data = await this.prismaService.car.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereCondition,
      orderBy: orderCondition,
      select: {
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
    const car = await this.prismaService.car.findUnique({ where: { id } });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.prismaService.car.update({ where: { id }, data: updateCarDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.car.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
