import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStaffDto: CreateStaffDto) {
    createStaffDto.status = false;
    return this.prismaService.staff.create({
      data: createStaffDto,
    });
  }

  async findAll({
    page = 1,
    limit = 10,
    search,
    status,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'all' | 'active' | 'inactive';
  } = {}) {
    const whereCondition: any = {
      OR: [
        { firstname: { contains: search } },
        { lastname: { contains: search } },
        { email: { contains: search } },
        { phoneNumber: { contains: search } },
      ],
      AND: [{ deletedAt: null }],
    };

    if (search) {
      whereCondition.deletedAt = null;
    }

    const total = await this.getCountWithStatus(whereCondition, status);

    const data = await this.prismaService.staff.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: whereCondition,
    });

    return metaDataConvert({ data, total, page, limit });
  }

  private async getCountWithStatus(
    whereCondition: any,
    status?: 'all' | 'active' | 'inactive',
  ) {
    if (status === 'active') {
      whereCondition.status = true;
    } else if (status === 'inactive') {
      whereCondition.status = false;
    }

    return this.prismaService.staff.count({
      where: whereCondition,
    });
  }

  async findOne(id: number) {
    const staff = await this.prismaService.staff.findUnique({
      where: { id, deletedAt: null },
    });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }
  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prismaService.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.staff.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getActive() {
    return await {
      data: await this.prismaService.staff.count({
        where: {
          status: true,
        },
      }),
    };
  }

  async getHistory(staffId: number){
    console.log('นี่คือ staff id', staffId)
    return await {
      data: await this.prismaService.log.findMany({
        where: {
          staffId: staffId
        }
      })
    }
  }

  async getCarDetail(staffId: number){
    return await {
      data: await this.prismaService.car.findMany({
        where: {
          staffId: staffId
        }
      })
    }
  }
}
