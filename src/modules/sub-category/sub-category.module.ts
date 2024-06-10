import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryRepository } from './sub-category.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entities/sub-category.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity, CategoryEntity]), SharedModule],
  controllers: [SubCategoryController],
  providers: [
   {provide: "ISubCategoryService", useClass: SubCategoryService},
   {provide: "ISubCategoryRepository", useClass: SubCategoryRepository},
   {provide: "ICategoryService", useClass: CategoryService },
   {provide: "ICategoryRepository", useClass: CategoryRepository }
  ],
})
export class SubCategoryModule {}
