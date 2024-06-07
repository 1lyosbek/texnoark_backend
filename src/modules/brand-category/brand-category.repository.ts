import { InjectRepository } from "@nestjs/typeorm";
import { IBrandCategoryEntityCount, IBrandCategoryRepository } from "./interface/repository-interface";
import { ILike, Repository } from "typeorm";
import { BrandCategoryEntity } from "./entities/brand-category.entity";
import { ResData } from "src/lib/resData";

export class BrandCategoryRepository implements IBrandCategoryRepository {
    constructor(@InjectRepository(BrandCategoryEntity) private repository: Repository<BrandCategoryEntity>) {}
    async getBrandCategories(word: string, limit: number, offset: number): Promise<IBrandCategoryEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
            const foundBrandCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit, relations: ["brand_id"] });
            const count = foundBrandCategories.length;
            return { brandCategories: foundBrandCategories, count };
        } else {
            const foundBrandCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit, relations: ["brand_id"]});
            const count = await this.repository.createQueryBuilder('brand_category')
                .select('COUNT(*) count')
                .getRawOne();
            return { brandCategories: foundBrandCategories, count: parseInt(count.count, 10)};
        }
    }
    async getBrandCategory(id: number): Promise<BrandCategoryEntity> {
        return await this.repository.findOne({where: {id}, relations: ["brand_id"]});
    }

    async getByBrandId(brandId: number, limit: number, offset: number): Promise<IBrandCategoryEntityCount> {
        const f = await this.repository.find({ where: { brand_id: brandId } });
        const foundBrandCategories = await this.repository.find({ where: { brand_id: brandId }, skip: offset, take: limit });
        const count = f.length;
        return { brandCategories: foundBrandCategories, count };
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