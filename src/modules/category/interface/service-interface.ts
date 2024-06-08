import { ResData } from "src/lib/resData";
import { CategoryEntity } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { ICategoryEntityCount } from "./repository-interface";

export interface ICategoryService {
    findAll(word: string, limit: number, page: number): Promise<ResData<ICategoryEntityCount>>;
    findOne(id: number): Promise<ResData<CategoryEntity>>;
    findByName(name: string): Promise<ResData<CategoryEntity | null>>;
    create(category: CreateCategoryDto): Promise<ResData<CategoryEntity>>;
    update(id: number, category: UpdateCategoryDto): Promise<ResData<CategoryEntity>>;
    remove(entity: CategoryEntity): Promise<ResData<CategoryEntity>>;
}