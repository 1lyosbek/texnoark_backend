import { BrandCategoryEntity } from "../entities/brand-category.entity";

export interface IBrandCategoryRepository {
    getBrandCategories(word: string, limit: number, page: number): Promise<IBrandCategoryEntityCount>;
    getBrandCategory(id: number): Promise<BrandCategoryEntity>;
    createBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
    updateBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
    deleteBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
}

export interface IBrandCategoryEntityCount {
    brandCategories: BrandCategoryEntity[];
    count: number;
}