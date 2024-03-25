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

  async findByDays(month: number, year: number) {
    const logs = await this.prismaService.log.findMany({
      where: {
        timestamp: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 0),
        },
      },
    });

    const dayCount = new Map();
    logs.forEach((log) => {
      const date = new Date(log.timestamp).getDate();
      if (dayCount.has(date)) {
        dayCount.set(date, dayCount.get(date) + 1);
      } else {
        dayCount.set(date, 1);
      }
    });

    return Array.from(dayCount.keys()).map((date) => ({
      date,
      count: dayCount.get(date),
    }));
  }

  async findByTopTenParkingZone(
    timeStart: string = new Date().toISOString(),
    timeEnd: string = new Date().toISOString(),
  ) {
    const logs = await this.prismaService.log.findMany({
      where: {
        timestamp: {
          gte: new Date(timeStart),
          lte: new Date(timeEnd),
        },
      },
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
