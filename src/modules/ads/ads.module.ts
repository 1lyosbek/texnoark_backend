import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { AdsRepository } from './ads.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsEntity } from './entities/ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdsEntity])],
  controllers: [AdsController],
  providers: [
    {provide: "IAdsService", useClass: AdsService},
    {provide: "IAdsRepository", useClass: AdsRepository}
  ],
})
export class AdsModule {}
