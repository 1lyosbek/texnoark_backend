import { InjectRepository } from "@nestjs/typeorm";
import { IBrandRepository } from "./interfaces/repository-interface";
import { BrandEntity } from "./entities/brand.entity";
import { ILike, Repository } from "typeorm";

export class BrandRepository implements IBrandRepository {
    constructor(@InjectRepository(BrandEntity) private repository: Repository<BrandEntity>) {}
    async getBrands(limit: number, offset: number): Promise<BrandEntity[]> {
        return await this.repository.find({skip: offset, take: limit});
    }
    async getByWord(word: string): Promise<BrandEntity[]> {
        return await this.repository.find({ where: { name: ILike(`%${word}%`) } });
    }
    async getBrand(id: number): Promise<BrandEntity> {
        return await this.repository.findOneBy({id});
    }
    async createBrand(brand: BrandEntity): Promise<BrandEntity> {
        return await this.repository.save(brand);
    }
    async updateBrand(brand: BrandEntity): Promise<BrandEntity> {
        return await this.repository.save(brand);
    }
    async deleteBrand(entity: BrandEntity): Promise<BrandEntity> {
        return await this.repository.remove(entity);
    }
}