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

  async findAll({ page, limit }: { page: number; limit: number }) {
    let limitInt = parseInt(limit.toString());
    const total = await this.prismaService.admin.count({
      where: { deletedAt: null },
    });

    const data = await this.prismaService.admin.findMany({
      skip: (page - 1) * limit,
      take: limitInt,
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
