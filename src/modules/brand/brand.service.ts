import { Inject, Injectable } from '@nestjs/common';
import { ICreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ResData } from 'src/lib/resData';
import { BrandEntity } from './entities/brand.entity';
import { IBrandService } from './interfaces/service-interface';
import { IBrandEntityCount, IBrandRepository } from './interfaces/repository-interface';
import { BrandNotFound } from './exceptions/brand.exceptions';
import { CategoryService } from '../category/category.service';

@Injectable()
export class BrandService implements IBrandService {
  constructor(
    @Inject("IBrandRepository") private readonly brandRepository: IBrandRepository,
    @Inject("ICategoryService") private readonly categoryService: CategoryService,
  ) {}
  async create(file: Express.Multer.File, createBrandDto: ICreateBrandDto):Promise<ResData<BrandEntity>> {
    const {data: foundCategory } = await this.categoryService.findOne(createBrandDto.category_id);
    const newBrand = new BrandEntity();
    newBrand.name = createBrandDto.name;
    newBrand.description = createBrandDto.description;
    newBrand.image = `https://ecomapi.ilyosbekdev.uz/${file.path}`;
    newBrand.category_id = foundCategory.id;
    const created = await this.brandRepository.createBrand(newBrand);
    return new ResData<BrandEntity>("Brand created successfully", 201, created);
  } 

  async findAll(word: string, limit: number, page: number): Promise<ResData<IBrandEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundBrands = await this.brandRepository.getBrands(word, limit, page);
    return new ResData<IBrandEntityCount>("All available brands", 200, {brands: foundBrands.brands, count: foundBrands.count});
  }
  
  async findOne(id: number):Promise<ResData<BrandEntity>> {
    const foundBrand = await this.brandRepository.getBrand(id);
    if (!foundBrand) {
      throw new BrandNotFound();
    }
    return new ResData<BrandEntity>("Brand found", 200, foundBrand);
  }

  async findByCategoryId(categoryId: number, limit: number, page: number): Promise<ResData<IBrandEntityCount>> {
    const foundBrands = await this.brandRepository.getByCategotyId(categoryId, limit, page);
    return new ResData<IBrandEntityCount>("Found brands by category id", 200, {brands: foundBrands.brands, count: foundBrands.count});
  }

  async findOneByName(name: string): Promise<ResData<BrandEntity | null>> {
    const foundBrandByName = await this.brandRepository.getBrandByName(name);
    const resData = new ResData<BrandEntity>("Brand found by name", 200, foundBrandByName)
    if (!foundBrandByName) {
      resData.message = "Brand not found by name";
      resData.statusCode = 404;
    }
    return resData;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto):Promise<ResData<BrandEntity>> {
    const {data: foundBrand } = await this.findOne(id);
    foundBrand.name = updateBrandDto.name;
    foundBrand.description = updateBrandDto.description;
    const updated = await this.brandRepository.updateBrand(foundBrand);
    return new ResData<BrandEntity>("Brand updated successfully", 200, updated);
  }

  async remove(entity: BrandEntity):Promise<ResData<BrandEntity>> {
    const deleted = await this.brandRepository.deleteBrand(entity);
    return new ResData<BrandEntity>("Brand deleted sucessfully", 200, deleted);
  }
}
