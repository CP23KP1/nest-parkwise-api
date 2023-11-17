import { Injectable } from '@nestjs/common';
import { CreateCarbonDto } from './dto/create-carbon.dto';
import { UpdateCarbonDto } from './dto/update-carbon.dto';

@Injectable()
export class CarbonService {
  create(createCarbonDto: CreateCarbonDto) {
    return 'This action adds a new carbon';
  }

  findAll() {
    return `This action returns all carbon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carbon`;
  }

  update(id: number, updateCarbonDto: UpdateCarbonDto) {
    return `This action updates a #${id} carbon`;
  }

  remove(id: number) {
    return `This action removes a #${id} carbon`;
  }
}
