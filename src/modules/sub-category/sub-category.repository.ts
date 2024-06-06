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
        const foundSubCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit, relations: ["parent_category_id"]});
        const count = foundSubCategories.length;
        return { subcategories: foundSubCategories, count };
    }
    async getSubCategory(id: number): Promise<SubCategoryEntity> {
        return await this.repository.findOne({where: {id}, relations: ["parent_category_id"]});
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