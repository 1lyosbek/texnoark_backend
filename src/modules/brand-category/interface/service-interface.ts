import { ResData } from "src/lib/resData";
import { BrandCategoryEntity } from "../entities/brand-category.entity";
import { CreateBrandCategoryDto } from "../dto/create-brand-category.dto";
import { UpdateBrandCategoryDto } from "../dto/update-brand-category.dto";
import { IBrandCategoryEntityCount } from "./repository-interface";

export interface IBrandCategoryService {
    findAllBrandCategories(word: string, limit: number, page: number): Promise<ResData<IBrandCategoryEntityCount>>;
    findOneBrandCategory(id: number): Promise<ResData<BrandCategoryEntity>>;
    createBrandCategory(createDto: CreateBrandCategoryDto): Promise<ResData<BrandCategoryEntity>>;
    updateBrandCategory(id: number, updateDto: UpdateBrandCategoryDto): Promise<ResData<BrandCategoryEntity>>;
    removeBrandCategory(entity: BrandCategoryEntity): Promise<ResData<BrandCategoryEntity>>;
}