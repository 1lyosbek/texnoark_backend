import { InjectRepository } from "@nestjs/typeorm";
import { ISubCategoryEntityCount, ISubCategoryRepository } from "./interfaces/repository-interface";
import { SubCategoryEntity } from "./entities/sub-category.entity";
import { ILike, Repository } from "typeorm";

export class SubCategoryRepository implements ISubCategoryRepository {
    constructor(@InjectRepository(SubCategoryEntity) private repository: Repository<SubCategoryEntity>) {}
    async getSubCategories(parent_id: number, word: string, limit: number, offset: number): Promise<ISubCategoryEntityCount> {
        let whereCondition = {};
        if (word && word.trim() !== "") {
            whereCondition = { parent_category_id: parent_id, name: ILike(`%${word}%`) };
            const foundSubCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit});
            const count = foundSubCategories.length;
            return { subcategories: foundSubCategories, count };
        } else {
            const f = await this.repository.find({where: {parent_category_id: parent_id}});
            const foundSubCategories = await this.repository.find({ where: { parent_category_id: parent_id }, skip: offset, take: limit});
            const count = f.length;
            return { subcategories: foundSubCategories, count};
        }
    }
    async getSubCategory(id: number): Promise<SubCategoryEntity> {
        return await this.repository.findOneBy({id});
    }
    async getSubCategoryByName(name: string): Promise<SubCategoryEntity> {
        return await this.repository.findOneBy({name});
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