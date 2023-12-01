import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { InputLicensePlateDto } from "./dtos/license-plate.dto";

@Injectable()
export class LicensePlateService {
  constructor(private prismaService: PrismaService) {}

  test(licensePlateDto: InputLicensePlateDto) {
    console.log('เข้ามาจ้าาา', licensePlateDto)
  }
}