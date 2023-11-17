import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStaffDto: CreateStaffDto) {
    return this.prismaService.staff.create({
      data: createStaffDto,
    });
  }

  async findAll({ page, limit }: { page?: number; limit?: number }) {
    const total = await this.prismaService.staff.count();
    const data = await this.prismaService.staff.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    return metaDataConvert({ data, total, page, limit });
  }

  findOne(id: number) {
    return this.prismaService.staff.findUnique({
      where: { id },
    });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prismaService.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  remove(id: number) {
    return this.prismaService.staff.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
