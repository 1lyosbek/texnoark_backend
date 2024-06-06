import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './common/config/database.config';
import { BrandCategoryModule } from './modules/brand-category/brand-category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/upload',
    }),
    TypeOrmModule.forRoot(connectionSource), AuthModule, BrandModule, CategoryModule, AdminModule, UserModule, BrandCategoryModule, SubCategoryModule, ProductsModule, ProductDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
