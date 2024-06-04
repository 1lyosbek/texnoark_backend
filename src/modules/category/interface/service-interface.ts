import { ResData } from "src/lib/resData";
import { CategoryEntity } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

export interface ICategoryService {
    findAll(limit: number, page: number): Promise<ResData<Array<CategoryEntity>>>;
    findOne(id: number): Promise<ResData<CategoryEntity>>;
    searchCategory(word: string): Promise<ResData<Array<CategoryEntity>>>;
    create(category: CreateCategoryDto): Promise<ResData<CategoryEntity>>;
    update(id: number, category: UpdateCategoryDto): Promise<ResData<CategoryEntity>>;
    remove(entity: CategoryEntity): Promise<ResData<CategoryEntity>>;
}