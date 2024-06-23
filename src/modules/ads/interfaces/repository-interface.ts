import { AdsEntity } from "../entities/ads.entity";

export interface IAdsRepository {
    getAll(): Promise<AdsEntity[]>;
    getOne(id: number): Promise<AdsEntity | null>;
    create(entity: AdsEntity): Promise<AdsEntity>;
    update(entity: AdsEntity): Promise<AdsEntity>;
    delete(entity: AdsEntity): Promise<AdsEntity>;
}