import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandCategoryDto } from './dto/create-brand-category.dto';
import { UpdateBrandCategoryDto } from './dto/update-brand-category.dto';
import { ResData } from 'src/lib/resData';
import { BrandCategoryEntity } from './entities/brand-category.entity';
import { IBrandCategoryRepository } from './interface/repository-interface';
import { BrandService } from '../brand/brand.service';
import { BrandCategoryNotFound } from './exceptions/brand-category.exceptions';
import { IBrandCategoryService } from './interface/service-interface';

@Injectable()
export class BrandCategoryService implements IBrandCategoryService{
  constructor(
    @Inject("IBrandCategoryRepository") private readonly brandCategoryRepository: IBrandCategoryRepository,
    @Inject("IBrandService") private readonly brandService: BrandService
  ) {}
  async createBrandCategory(createBrandCategoryDto: CreateBrandCategoryDto): Promise<ResData<BrandCategoryEntity>> {
    const {data: foundBrand} = await this.brandService.findOne(createBrandCategoryDto.brand_id);
    const newBrandCategory = new BrandCategoryEntity();
    newBrandCategory.name = createBrandCategoryDto.name;
    newBrandCategory.brand_id = foundBrand;
    const created = await this.brandCategoryRepository.createBrandCategory(newBrandCategory);
    return new ResData<BrandCategoryEntity>("Brand Category created successfully", 201, created);
  }

  async findAllBrandCategories(): Promise<ResData<Array<BrandCategoryEntity>>> {
    const foundBrandCategories = await this.brandCategoryRepository.getBrandCategories();
    return new ResData<BrandCategoryEntity[]>("All brand categories", 200, foundBrandCategories);
  }

  async findOneBrandCategory(id: number): Promise<ResData<BrandCategoryEntity>> {
    const foundBrandCategory = await this.brandCategoryRepository.getBrandCategory(id);
    if (!foundBrandCategory) {
      throw new BrandCategoryNotFound();
    }
    return new ResData<BrandCategoryEntity>("Brand category found", 200, foundBrandCategory);
  }

  async updateBrandCategory(id: number, updateBrandCategoryDto: UpdateBrandCategoryDto): Promise<ResData<BrandCategoryEntity>> {
    const {data: foundBrandCategory} = await this.findOneBrandCategory(id);
    const { data: foundBrand } = await this.brandService.findOne(updateBrandCategoryDto.brand_id);
    foundBrandCategory.name = updateBrandCategoryDto.name;
    foundBrandCategory.brand_id = foundBrand;
    const updated = await this.brandCategoryRepository.updateBrandCategory(foundBrandCategory);
    return new ResData<BrandCategoryEntity>("Brand category updated successfully",200, updated);
  }

  async removeBrandCategory(entity: BrandCategoryEntity):Promise<ResData<BrandCategoryEntity>> {
    const deleted = await this.brandCategoryRepository.deleteBrandCategory(entity);
    return new ResData<BrandCategoryEntity>("Brand category deleted successfully", 200, deleted);
  }
}
