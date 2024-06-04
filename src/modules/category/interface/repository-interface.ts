import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
    getCategories(limit: number, offset: number): Promise<CategoryEntity[]>;
    getCategory(id: number): Promise<CategoryEntity>;
    getCategoryByWord(word: string): Promise<Array<CategoryEntity>>;
    createCategory(entity: CategoryEntity): Promise<CategoryEntity>;
    updateCategory(entity: CategoryEntity): Promise<CategoryEntity>;
    deleteCategory(entity: CategoryEntity): Promise<CategoryEntity>;
}