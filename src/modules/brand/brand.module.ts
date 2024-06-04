import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity, CategoryEntity])],
  controllers: [BrandController],
  providers: [
    {provide: "IBrandService", useClass: BrandService},
    {provide: "IBrandRepository", useClass: BrandRepository},
    {provide: "ICategoryService", useClass: CategoryService },
    {provide: "ICategoryRepository", useClass: CategoryRepository }
  ],
})
export class BrandModule {}
