import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { BrandService } from '../brand/brand.service';
import { BrandRepository } from '../brand/brand.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandCategoryService } from '../brand-category/brand-category.service';
import { BrandCategoryRepository } from '../brand-category/brand-category.repository';
import { BrandCategoryEntity } from '../brand-category/entities/brand-category.entity';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, BrandEntity, BrandCategoryEntity, CategoryEntity])],
  controllers: [ProductsController],
  providers: [
   {provide: "IProductService", useClass: ProductsService},
   {provide: "IProductRepository", useClass: ProductRepository },
   {provide: "IBrandService", useClass: BrandService },
   {provide: "IBrandRepository", useClass: BrandRepository },
   {provide: "IBrandCategoryService", useClass: BrandCategoryService },
   {provide: "IBrandCategoryRepository", useClass: BrandCategoryRepository },
   {provide: "ICategoryService", useClass: CategoryService },
   {provide: "ICategoryRepository", useClass: CategoryRepository }
  ],
})
export class ProductsModule {}
