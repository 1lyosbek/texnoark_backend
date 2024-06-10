import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockRepository } from './stock.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { BrandService } from '../brand/brand.service';
import { BrandRepository } from '../brand/brand.repository';
import { BrandEntity } from '../brand/entities/brand.entity';
import { ProductsService } from '../products/products.service';
import { ProductRepository } from '../products/products.repository';
import { ProductEntity } from '../products/entities/product.entity';
import { BrandCategoryEntity } from '../brand-category/entities/brand-category.entity';
import { BrandCategoryService } from '../brand-category/brand-category.service';
import { ProductDetailRepository } from '../product-detail/product-detail.repository';
import { ProductDetailService } from '../product-detail/product-detail.service';
import { BrandCategoryRepository } from '../brand-category/brand-category.repository';
import { ProductDetailEntity } from '../product-detail/entities/product-detail.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity, CategoryEntity, BrandEntity, ProductEntity, BrandCategoryEntity, ProductDetailEntity]), SharedModule],
  controllers: [StockController],
  providers: [
     {provide: "IStockService", useClass: StockService},
     {provide: "IStockRepository", useClass: StockRepository},
     {provide: "ICategoryService", useClass: CategoryService },
     {provide: "ICategoryRepository", useClass: CategoryRepository},
     {provide: "IBrandService", useClass: BrandService },
     {provide: "IBrandRepository", useClass: BrandRepository},
     {provide: "IProductService", useClass: ProductsService },
     {provide: "IProductRepository", useClass: ProductRepository },
     {provide: "IProductDetailService", useClass: ProductDetailService },
     {provide: "IProductDetailRepository", useClass: ProductDetailRepository },
     {provide: "IBrandCategoryService", useClass: BrandCategoryService },
     {provide: "IBrandCategoryRepository", useClass: BrandCategoryRepository },
    ],
})
export class StockModule {}
