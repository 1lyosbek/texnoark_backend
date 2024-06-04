import { BrandEntity } from "../entities/brand.entity";

export interface IBrandRepository {
    getBrands(limit: number, page: number): Promise<BrandEntity[]>;
    getBrand(id: number): Promise<BrandEntity>;
    getByWord(word: string):Promise<BrandEntity[]>;
    createBrand(entity: BrandEntity): Promise<BrandEntity>;
    updateBrand(entity: BrandEntity): Promise<BrandEntity>;
    deleteBrand(entity: BrandEntity): Promise<BrandEntity>;
}