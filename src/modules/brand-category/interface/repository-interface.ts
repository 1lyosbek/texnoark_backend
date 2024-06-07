import { ResData } from "src/lib/resData";
import { BrandCategoryEntity } from "../entities/brand-category.entity";

export interface IBrandCategoryRepository {
    getBrandCategories(word: string, limit: number, page: number): Promise<IBrandCategoryEntityCount>;
    getBrandCategory(id: number): Promise<BrandCategoryEntity>;
    getByBrandId(brandId: number, limit: number, offset: number): Promise<IBrandCategoryEntityCount>;
    createBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
    updateBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
    deleteBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
}

export interface IBrandCategoryEntityCount {
    brandCategories: BrandCategoryEntity[];
    count: number;
}