import { Module } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CarbonController } from './carbon.controller';

@Module({
  controllers: [CarbonController],
  providers: [CarbonService],
})
export class CarbonModule {}
