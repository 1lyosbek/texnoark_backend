import { InjectRepository } from "@nestjs/typeorm";
import { IAdsRepository } from "./interfaces/repository-interface";
import { AdsEntity } from "./entities/ads.entity";
import { Repository } from "typeorm";

export class AdsRepository implements IAdsRepository {
    constructor(@InjectRepository(AdsEntity) private repository: Repository<AdsEntity>) {}
    async create(ads: AdsEntity): Promise<AdsEntity> {
        return await this.repository.save(ads);
    }
    async getAll(): Promise<AdsEntity[]> {
        return await this.repository.find();
    }
    async getOne(id: number): Promise<AdsEntity> {
        return await this.repository.findOneBy({ id });
    }
    async update(entity: AdsEntity): Promise<AdsEntity> {
        return await this.repository.save(entity);
    }
    async delete(entity: AdsEntity): Promise<AdsEntity> {
        return await this.repository.remove(entity);
    }
}