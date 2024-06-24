import { Module } from '@nestjs/common';
import { LikeService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeRepository } from './likes.repository';
import { LikeEntity } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { ProductRepository } from '../products/products.repository';
import { ProductEntity } from '../products/entities/product.entity';
import { BrandService } from '../brand/brand.service';
import { BrandRepository } from '../brand/brand.repository';
import { BrandCategoryService } from '../brand-category/brand-category.service';
import { BrandCategoryRepository } from '../brand-category/brand-category.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { ProductDetailService } from '../product-detail/product-detail.service';
import { ProductDetailRepository } from '../product-detail/product-detail.repository';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandCategoryEntity } from '../brand-category/entities/brand-category.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { ProductDetailEntity } from '../product-detail/entities/product-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, UserEntity, ProductEntity, BrandEntity, BrandCategoryEntity, CategoryEntity, ProductDetailEntity])],
  controllers: [LikesController],
  providers: [
    {provide: "ILikeService", useClass: LikeService},
    {provide: "ILikeRepository", useClass: LikeRepository},
    {provide: "IUserService", useClass: UserService},
    {provide: "IUserRepository", useClass: UserRepository},
    {provide: "IProductService", useClass: ProductsService},
    {provide: "IProductRepository", useClass: ProductRepository},
    {provide: "IBrandService", useClass: BrandService },
    {provide: "IBrandRepository", useClass: BrandRepository },
    {provide: "IBrandCategoryService", useClass: BrandCategoryService },
    {provide: "IBrandCategoryRepository", useClass: BrandCategoryRepository },
    {provide: "ICategoryService", useClass: CategoryService },
    {provide: "ICategoryRepository", useClass: CategoryRepository },
    {provide: "IProductDetailService", useClass: ProductDetailService },
    {provide: "IProductDetailRepository", useClass: ProductDetailRepository },
  ],
})
export class LikesModule {}
