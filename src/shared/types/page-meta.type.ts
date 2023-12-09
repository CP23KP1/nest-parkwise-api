import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { Staff } from 'src/staff/entities/staff.entity';

export type PageMeta<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

class MetaPagination {
  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  take: number;

  @ApiProperty({ type: Number })
  itemCount: number;

  @ApiProperty({ type: Number })
  pageCount: number;
}

export class ResponsePageMeta<T> {
  @ApiProperty()
  @IsArray()
  data: T[];

  @ApiProperty({ type: MetaPagination })
  meta: MetaPagination;

  constructor(data: T[], meta: MetaPagination) {
    this.data = data;
    this.meta = meta;
  }
}
