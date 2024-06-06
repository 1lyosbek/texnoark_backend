import { InjectRepository } from "@nestjs/typeorm";
import { IBrandEntityCount, IBrandRepository } from "./interfaces/repository-interface";
import { BrandEntity } from "./entities/brand.entity";
import { ILike, Repository } from "typeorm";

export class BrandRepository implements IBrandRepository {
    constructor(@InjectRepository(BrandEntity) private repository: Repository<BrandEntity>) {}
    async getBrands(word: string, limit: number, offset: number): Promise<IBrandEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
        }
        const foundBrands = await this.repository.find({ where: whereCondition, skip: offset, take: limit, relations: ["category_id"]});
        const count = foundBrands.length;
        return {brands: foundBrands, count};
    }
    async getBrand(id: number): Promise<BrandEntity> {
        return await this.repository.findOne({where: {id}, relations: ["category_id"]});
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