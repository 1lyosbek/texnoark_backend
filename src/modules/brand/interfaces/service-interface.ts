import { ResData } from "src/lib/resData";
import { ICreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandDto } from "../dto/update-brand.dto";
import { BrandEntity } from "../entities/brand.entity";

export interface IBrandService {
    findAll(limit: number, page: number): Promise<ResData<Array<BrandEntity>>>;
    findOne(id: number): Promise<ResData<BrandEntity>>;
    searchBrand(word: string):Promise<ResData<Array<BrandEntity>>>;
    create(file: Express.Multer.File, brand: ICreateBrandDto): Promise<ResData<BrandEntity>>;
    update(id: number, brand: UpdateBrandDto): Promise<ResData<BrandEntity>>;
    remove(entity: BrandEntity): Promise<ResData<BrandEntity>>;
}