import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryRepository } from "./interface/repository-interface";
import { CategoryEntity } from "./entities/category.entity";
import { ILike, Repository } from "typeorm";

export class CategoryRepository implements ICategoryRepository{
    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) {}
    async getCategories(limit: number, offset: number): Promise<CategoryEntity[]> {
        return await this.repository.find({skip: offset, take: limit});
    }
    async getCategory(id: number): Promise<CategoryEntity> {
        return await this.repository.findOneBy({id});
    }
    async getCategoryByWord(word: string): Promise<Array<CategoryEntity>> {
        return await this.repository.find({where: {name: ILike(`%${word}%`)}});
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