import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
    getCategories(word: string, limit: number, offset: number): Promise<ICategoryEntityCount>;
    getCategory(id: number): Promise<CategoryEntity>;
    createCategory(entity: CategoryEntity): Promise<CategoryEntity>;
    updateCategory(entity: CategoryEntity): Promise<CategoryEntity>;
    deleteCategory(entity: CategoryEntity): Promise<CategoryEntity>;
}

export interface ICategoryEntityCount {
    categories: CategoryEntity[];
    count: number;
}