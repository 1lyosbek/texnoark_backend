import { BrandCategoryEntity } from "../entities/brand-category.entity";

export interface IBrandCategoryRepository {
    getBrandCategories(): Promise<BrandCategoryEntity[]>;
    getBrandCategory(id: number): Promise<BrandCategoryEntity>;
    createBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
    updateBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
    deleteBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity>;
}