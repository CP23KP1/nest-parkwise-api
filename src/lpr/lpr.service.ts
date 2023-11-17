import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { metaDataConvert } from 'src/utils/converter.util';

@Injectable()
export class LprService {
  constructor(private prismaService: PrismaService) {}

  async create() {}
}
