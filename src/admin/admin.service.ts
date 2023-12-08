import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAdminDto: CreateAdminDto) {
    return this.prismaService.admin.create({ data: createAdminDto });
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
        { firstname: { contains: search } }, 
        { lastname: { contains: search } }, 
        { email: { contains: search } }, 
      ];
    }

    const orderCondition: Record<string, 'asc' | 'desc'> = {};

    if (orderBy && orderDirection) {
      const field = orderBy === 'createdAt' ? 'createdAt' : '';
      orderCondition[field] = orderDirection;
    }

    const total = await this.prismaService.admin.count({
      where: whereCondition,
    });

    const data = await this.prismaService.admin.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit.toString()),
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
    return this.prismaService.admin.findUnique({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  remove(id: number) {
    return this.prismaService.admin.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
