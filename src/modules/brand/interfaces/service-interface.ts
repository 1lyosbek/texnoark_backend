import { ResData } from "src/lib/resData";
import { ICreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandDto } from "../dto/update-brand.dto";
import { BrandEntity } from "../entities/brand.entity";
import { IBrandEntityCount } from "./repository-interface";

export interface IBrandService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IBrandEntityCount>>;
    findOne(id: number): Promise<ResData<BrandEntity>>;
    findOneByName(name: string): Promise<ResData<BrandEntity | null>>;
    create(file: Express.Multer.File, brand: ICreateBrandDto): Promise<ResData<BrandEntity>>;
    update(id: number, brand: UpdateBrandDto): Promise<ResData<BrandEntity>>;
    remove(entity: BrandEntity): Promise<ResData<BrandEntity>>;
}