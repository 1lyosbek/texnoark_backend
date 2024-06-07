import { forwardRef, Module } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetailRepository } from './product-detail.repository';
import { ProductsService } from '../products/products.service';
import { ProductRepository } from '../products/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetailEntity } from './entities/product-detail.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { BrandService } from '../brand/brand.service';
import { BrandRepository } from '../brand/brand.repository';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandCategoryService } from '../brand-category/brand-category.service';
import { BrandCategoryRepository } from '../brand-category/brand-category.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { BrandCategoryEntity } from '../brand-category/entities/brand-category.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports:[forwardRef(() => ProductsModule), TypeOrmModule.forFeature([ProductDetailEntity, ProductEntity, BrandEntity, BrandCategoryEntity, CategoryEntity])],
  controllers: [ProductDetailController],
  providers: [
    {provide: "IProductDetailService", useClass: ProductDetailService},
    {provide: "IProductDetailRepository", useClass: ProductDetailRepository},
    {provide: "IProductService", useClass: ProductsService },
    {provide: "IProductRepository", useClass: ProductRepository },
    {provide: "IBrandService", useClass: BrandService },
    {provide: "IBrandRepository", useClass: BrandRepository },
    {provide: "IBrandCategoryService", useClass: BrandCategoryService },
    {provide: "IBrandCategoryRepository", useClass: BrandCategoryRepository },
    {provide: "ICategoryService", useClass: CategoryService },
    {provide: "ICategoryRepository", useClass: CategoryRepository }
  ],
})
export class ProductDetailModule {}
