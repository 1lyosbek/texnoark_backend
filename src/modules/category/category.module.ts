import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), SharedModule],
  controllers: [CategoryController],
  providers: [
   {provide: "ICategoryService", useClass: CategoryService},
   {provide: "ICategoryRepository", useClass: CategoryRepository}
  ],
})
export class CategoryModule {}
