import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryEntityCount, ICategoryRepository } from "./interface/repository-interface";
import { CategoryEntity } from "./entities/category.entity";
import { ILike, Repository } from "typeorm";

export class CategoryRepository implements ICategoryRepository{
    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) {}
    async getCategories(word: string, limit: number, offset: number): Promise<ICategoryEntityCount> {
        let whereCondition = {};

        if (word && word.trim() !== "") {
            whereCondition = { name: ILike(`%${word}%`) };
        }
        const count = await this.repository.createQueryBuilder("categories")
            .select("COUNT(*)", 'count')
            .getRawOne();
        const foundCategories = await this.repository.find({ where: whereCondition, skip: offset, take: limit});
        return {categories: foundCategories, count: parseInt(count.count, 10)};
    }
    async getCategory(id: number): Promise<CategoryEntity> {
        return await this.repository.findOneBy({id});
    }
    async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
        return await this.repository.save(category);
    }
    async updateCategory(category: CategoryEntity): Promise<CategoryEntity> {
        return await this.repository.save(category);
    }
    async deleteCategory(entity: CategoryEntity): Promise<CategoryEntity> {
        return await this.repository.remove(entity);
    }
}