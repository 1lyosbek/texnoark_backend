import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResData } from 'src/lib/resData';
import { CategoryEntity } from './entities/category.entity';
import { ICategoryRepository } from './interface/repository-interface';
import { CategoryNotFound } from './exceptions/category.exception';
import { ICategoryService } from './interface/service-interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@Inject("ICategoryRepository") private readonly categoryRepository: ICategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto):Promise<ResData<CategoryEntity>> {
    const newCategory = new CategoryEntity();
    if (createCategoryDto.parent_category_id) {      
      const {data: fonundCategory } = await this.findOne(createCategoryDto.parent_category_id);
      newCategory.parent_category_id = fonundCategory;
    }
    newCategory.name = createCategoryDto.name;
    const created = await this.categoryRepository.createCategory(newCategory);
    return new ResData<CategoryEntity>("Category created successfully", 201, created);
  }

  async findAll(limit: number, page: number):Promise<ResData<Array<CategoryEntity>>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundCategories = await this.categoryRepository.getCategories(limit, page);
    return new ResData<Array<CategoryEntity>>("All available categories", 200, foundCategories);
  }

  async findOne(id: number):Promise<ResData<CategoryEntity>> {
    const foundCategory = await this.categoryRepository.getCategory(id);
    if (!foundCategory) {
      throw new CategoryNotFound();
    }
    return new ResData<CategoryEntity>("Category found", 200, foundCategory);
  }

  async searchCategory(word: string):Promise<ResData<Array<CategoryEntity>>> {
    const foundCategories = await this.categoryRepository.getCategoryByWord(word);
    return new ResData<Array<CategoryEntity>>("Categories", 200, foundCategories);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<ResData<CategoryEntity>> {
    const {data: foundCategory } = await this.findOne(id);
    foundCategory.name = updateCategoryDto.name;
    const updated = await this.categoryRepository.updateCategory(foundCategory);
    return new ResData<CategoryEntity>("Category updated successfully", 200,  updated);
  }

  async remove(entity: CategoryEntity):Promise<ResData<CategoryEntity>> {
    const deleted = await this.categoryRepository.deleteCategory(entity);
    return new ResData<CategoryEntity>("Category deleted successfully", 200, deleted);
  }
}
