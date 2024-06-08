import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResData } from 'src/lib/resData';
import { CategoryEntity } from './entities/category.entity';
import { ICategoryEntityCount, ICategoryRepository } from './interface/repository-interface';
import { CategoryNotFound } from './exceptions/category.exception';
import { ICategoryService } from './interface/service-interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@Inject("ICategoryRepository") private readonly categoryRepository: ICategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto):Promise<ResData<CategoryEntity>> {
    const newCategory = new CategoryEntity();
    newCategory.name = createCategoryDto.name;
    const created = await this.categoryRepository.createCategory(newCategory);
    return new ResData<CategoryEntity>("Category created successfully", 201, created);
  }

  async findAll(word: string, limit: number, page: number):Promise<ResData<ICategoryEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundCategories = await this.categoryRepository.getCategories(word, limit, page);
    return new ResData<ICategoryEntityCount>("All available categories", 200, {categories: foundCategories.categories, count: foundCategories.count});
  }
  
  async findByName(name: string): Promise<ResData<CategoryEntity | null>> {
    const foundCategory = await this.categoryRepository.getByName(name);
    const resData = new ResData<CategoryEntity | null>("Category found by name", 200, foundCategory)
    if (!foundCategory) {
      resData.message = "Category not found by name";
      resData.statusCode = 404;
    }
    return resData;
  }

  async findOne(id: number):Promise<ResData<CategoryEntity>> {
    const foundCategory = await this.categoryRepository.getCategory(id);
    if (!foundCategory) {
      throw new CategoryNotFound();
    }
    return new ResData<CategoryEntity>("Category found", 200, foundCategory);
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
