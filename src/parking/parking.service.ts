import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class ParkingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createParkingDto: CreateParkingDto) {
    const zone = await this.prismaService.zone.findFirst({
      where: {
        id: createParkingDto.zoneId,
      },
    });
    zone.maximumCapacity = zone.maximumCapacity - createParkingDto.amount;
    await this.prismaService.zone.update({
      where: { id: zone.id },
      data: zone,
    });
    return this.prismaService.parking.create({ data: createParkingDto });
  }

  async findAll({
    page,
    limit,
    search,
    orderField,
    orderDirection,
  }: {
    page: number;
    limit: number;
    search?: string;
    orderField?: 'createdAt' | 'amount';
    orderDirection?: 'asc' | 'desc';
  }) {
    const orderCondition: Record<string, 'asc' | 'desc'> = {};

    if (orderField) {
      orderCondition[orderField] = orderDirection || 'desc';
    }

    const total = await this.prismaService.parking.count({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { amount: { equals: parseInt(search) || undefined } },
          { zone: { name: { contains: search } } },
        ],
      },
    });

    const data = await this.prismaService.parking.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { amount: { equals: parseInt(search) || undefined } },
          { zone: { name: { contains: search } } },
        ],
      },
      orderBy: orderCondition,
      select: {
        id: true,
        zoneId: true,
        createdAt: true,
        deletedAt: true,
        updatedAt: true,
        description: true,
        name: true,
        amount: true,
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
    const parking = await this.prismaService.parking.findUnique({
      where: { id, deletedAt: null },
    });
    if (!parking) {
      throw new NotFoundException('Parking not found');
    }
    return parking;
  }

  async update(id: number, updateParkingDto: UpdateParkingDto) {
    const parking = await this.prismaService.parking.findUnique({
      where: { id },
    });

    const zone = await this.prismaService.zone.findFirst({
      where: { id: parking.zoneId },
    });

    zone.maximumCapacity =
      zone.maximumCapacity + parking.amount - updateParkingDto.amount;

    await this.prismaService.zone.update({
      where: { id: zone.id },
      data: zone,
    });

    return this.prismaService.parking.update({
      where: { id },
      data: updateParkingDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const parkingFind = await this.prismaService.parking.findFirst({
      where: { id: id },
    });
    const zone = await this.prismaService.zone.findFirst({
      where: {
        id: parkingFind.zoneId,
      },
    });
    zone.maximumCapacity = zone.maximumCapacity + parkingFind.amount;
    await this.prismaService.zone.update({
      where: { id: zone.id },
      data: zone,
    });
    return this.prismaService.parking.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
