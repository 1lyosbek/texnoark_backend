import { Module } from '@nestjs/common';
import { BrandCategoryService } from './brand-category.service';
import { BrandCategoryController } from './brand-category.controller';
import { BrandCategoryRepository } from './brand-category.repository';
import { BrandService } from '../brand/brand.service';
import { BrandRepository } from '../brand/brand.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandCategoryEntity } from './entities/brand-category.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([BrandCategoryEntity, BrandEntity, CategoryEntity]), SharedModule],
  controllers: [BrandCategoryController],
  providers: [
   {provide: "IBrandCategoryService", useClass: BrandCategoryService},
   {provide: "IBrandCategoryRepository", useClass: BrandCategoryRepository},
   {provide: "IBrandService", useClass: BrandService },
   {provide: "IBrandRepository", useClass: BrandRepository},
   {provide: "ICategoryService", useClass: CategoryService },
   {provide: "ICategoryRepository", useClass: CategoryRepository }
  ],
})
export class BrandCategoryModule {}
