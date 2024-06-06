import { Inject, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ISubCategoryService } from './interfaces/server-interface';
import { ISubCategoryEntityCount, ISubCategoryRepository } from './interfaces/repository-interface';
import { ResData } from 'src/lib/resData';
import { SubCategoryEntity } from './entities/sub-category.entity';
import { CategoryService } from '../category/category.service';
import { ParentCategoryIdLengthNotFound, SubCategoryNotFound } from './exceptions/sub-category.exceptions';

@Injectable()
export class SubCategoryService implements ISubCategoryService {
  constructor(
    @Inject("ISubCategoryRepository") private readonly subCategoryRepository: ISubCategoryRepository,
    @Inject("ICategoryService") private readonly categoryService: CategoryService,
  ) {}
  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto): Promise<ResData<SubCategoryEntity>> {
    const {data: foundCategory } = await this.categoryService.findOne(createSubCategoryDto.parent_category_id);
    const newSubCategory = new SubCategoryEntity();
    newSubCategory.name = createSubCategoryDto.name;
    newSubCategory.parent_category_id = foundCategory.id;
    const created = await this.subCategoryRepository.createSubCategory(newSubCategory);
    return new ResData<SubCategoryEntity>("Sub category created successfully", 201, created);
  }

  async findAllSubCategories(id: number, word: string, limit: number, page: number): Promise<ResData<ISubCategoryEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const { data: foundCategory } = await this.categoryService.findOne(id);
    const foundCategories = await this.subCategoryRepository.getSubCategories(id, word, limit, page);
    if (foundCategories.subcategories.length === 0) {
      throw new ParentCategoryIdLengthNotFound();
    }
    return new ResData<ISubCategoryEntityCount>("Sub categories", 200, {subcategories: foundCategories.subcategories, count: foundCategories.count});
  }

  async findOneSubCategory(id: number): Promise<ResData<SubCategoryEntity>> {
    const foundSubCategory = await this.subCategoryRepository.getSubCategory(id);
    if (!foundSubCategory) {
      throw new SubCategoryNotFound();
    }
    return new ResData<SubCategoryEntity>("Sub category found", 200, foundSubCategory);
  }

  async updateSubCategory(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<ResData<SubCategoryEntity>> {
    const { data: foundCategory } = await this.categoryService.findOne(updateSubCategoryDto.parent_category_id);
    const { data: foundSubCategory } = await this.findOneSubCategory(id);
    foundSubCategory.name = updateSubCategoryDto.name;
    foundSubCategory.parent_category_id = foundCategory.id;
    const updated = await this.subCategoryRepository.updateSubCategory(foundSubCategory);
    return new ResData<SubCategoryEntity>("Sub category updated successfully", 200, updated);
  }

  async removeSubCategory(entity: SubCategoryEntity): Promise<ResData<SubCategoryEntity>> {
    const deleted = await this.subCategoryRepository.deleteSubCategory(entity);
    return new ResData<SubCategoryEntity>("Sub category deleted successfully", 200, deleted);
  }
}
