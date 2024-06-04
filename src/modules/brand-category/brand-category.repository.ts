import { InjectRepository } from "@nestjs/typeorm";
import { IBrandCategoryRepository } from "./interface/repository-interface";
import { Repository } from "typeorm";
import { BrandCategoryEntity } from "./entities/brand-category.entity";

export class BrandCategoryRepository implements IBrandCategoryRepository {
    constructor(@InjectRepository(BrandCategoryEntity) private repository: Repository<BrandCategoryEntity>) {}
    async getBrandCategories(): Promise<BrandCategoryEntity[]> {
        return await this.repository.find();
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