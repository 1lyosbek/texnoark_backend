import { InjectRepository } from "@nestjs/typeorm";
import { ISubCategoryEntityCount, ISubCategoryRepository } from "./interfaces/repository-interface";
import { SubCategoryEntity } from "./entities/sub-category.entity";
import { ILike, Repository } from "typeorm";

export class SubCategoryRepository implements ISubCategoryRepository {
    constructor(@InjectRepository(SubCategoryEntity) private repository: Repository<SubCategoryEntity>) {}
    async getSubCategories(word: string, limit: number, offset: number): Promise<ISubCategoryEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
        }
        const count = await this.repository.createQueryBuilder("sub_category")
            .select("COUNT(*)", 'count')
            .getRawOne();
        const foundSubCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit });
        return { subcategories: foundSubCategories, count: parseInt(count.count, 10) };
    }
    async getSubCategory(id: number): Promise<SubCategoryEntity> {
        return await this.repository.findOneBy({id});
    }
    async createSubCategory(entity: SubCategoryEntity): Promise<SubCategoryEntity> {
        return await this.repository.save(entity);
    }
    async updateSubCategory(entity: SubCategoryEntity): Promise<SubCategoryEntity> {
        return await this.repository.save(entity);
    }
    async deleteSubCategory(entity: SubCategoryEntity): Promise<SubCategoryEntity> {
        return await this.repository.remove(entity);
    }
}