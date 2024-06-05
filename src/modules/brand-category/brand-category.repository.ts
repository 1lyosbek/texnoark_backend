import { InjectRepository } from "@nestjs/typeorm";
import { IBrandCategoryEntityCount, IBrandCategoryRepository } from "./interface/repository-interface";
import { ILike, Repository } from "typeorm";
import { BrandCategoryEntity } from "./entities/brand-category.entity";

export class BrandCategoryRepository implements IBrandCategoryRepository {
    constructor(@InjectRepository(BrandCategoryEntity) private repository: Repository<BrandCategoryEntity>) {}
    async getBrandCategories(word: string, limit: number, offset: number): Promise<IBrandCategoryEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
        }
        const count = await this.repository.createQueryBuilder("brand_category")
            .select("COUNT(*)", 'count')
            .getRawOne();
        const foundBrandCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit });
        return { brandCategories: foundBrandCategories, count: parseInt(count.count, 10) };
    }
    async getBrandCategory(id: number): Promise<BrandCategoryEntity> {
        return await this.repository.findOneBy({id});
    }
    async createBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity> {
        return await this.repository.save(entity);
    }
    async updateBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity> {
        return await this.repository.save(entity);
    }
    async deleteBrandCategory(entity: BrandCategoryEntity): Promise<BrandCategoryEntity> {
        return await this.repository.remove(entity);
    }
}