import { ResData } from "src/lib/resData";
import { AdsEntity } from "../entities/ads.entity";
import { ICreateAdsDto } from "../dto/create-ads.dto";
import { IUpdateAdsDto } from "../dto/update-ads.dto";

export interface IAdsService {
    findAll(): Promise<ResData<AdsEntity[]>>;
    findOne(id: number): Promise<ResData<AdsEntity>>;
    create(file: Express.Multer.File, ads: ICreateAdsDto): Promise<ResData<AdsEntity>>;
    update(id: number, file: Express.Multer.File, dto: IUpdateAdsDto): Promise<ResData<AdsEntity>>;
    remove(entity: AdsEntity): Promise<ResData<AdsEntity>>;
}