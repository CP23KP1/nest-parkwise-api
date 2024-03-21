import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService) {}

  async findByTopTimeRange(timeStart: string, timeEnd: string) {
    //* Morning 6:00 - 12:00
    //* Afternoon 12:00 - 18:00
    //* Evening 18:00 - 6:00
    const logs = await this.prismaService.log.findMany({
      where: {
        timestamp: {
          gte: new Date(timeStart),
          lte: new Date(timeEnd),
        },
      },
    });

    return {
      morning: logs.filter(
        (log) =>
          new Date(log.timestamp).getHours() >= 6 &&
          new Date(log.timestamp).getHours() < 12,
      ).length,
      afternoon: logs.filter(
        (log) =>
          new Date(log.timestamp).getHours() >= 12 &&
          new Date(log.timestamp).getHours() < 18,
      ).length,
      evening: logs.filter(
        (log) =>
          new Date(log.timestamp).getHours() >= 18 ||
          new Date(log.timestamp).getHours() < 6,
      ).length,
    };
  }

  async findByTopTenParkingZone() {
    const logs = await this.prismaService.log.findMany({
      include: {
        zone: true,
      },
    });

    const zoneCount = new Map();
    logs.forEach((log) => {
      if (zoneCount.has(log.zoneId)) {
        zoneCount.set(log.zoneId, zoneCount.get(log.zoneId) + 1);
      } else {
        zoneCount.set(log.zoneId, 1);
      }
    });

    const sortedZoneCount = new Map(
      [...zoneCount.entries()].sort((a, b) => b[1] - a[1]),
    );

    const topTen = Array.from(sortedZoneCount.keys()).slice(0, 10);

    return topTen.map((zoneId) => ({
      zoneId,
      count: zoneCount.get(zoneId),
    }));
  }
}
