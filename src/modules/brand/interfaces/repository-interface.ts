import { BrandEntity } from "../entities/brand.entity";

export interface IBrandRepository {
    getBrands(word: string, limit: number, page: number): Promise<IBrandEntityCount>;
    getBrand(id: number): Promise<BrandEntity>;
    createBrand(entity: BrandEntity): Promise<BrandEntity>;
    updateBrand(entity: BrandEntity): Promise<BrandEntity>;
    deleteBrand(entity: BrandEntity): Promise<BrandEntity>;
}

export interface IBrandEntityCount {
    brands: BrandEntity[];
    count: number;
}