import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { SubCategoryEntity } from "../entities/sub-category.entity";

export interface ISubCategoryRepository {
    getSubCategories(id: number, word: string, limit: number, offset: number): Promise<ISubCategoryEntityCount>;
    getSubCategory(id: number): Promise<SubCategoryEntity>;
    createSubCategory(entity: SubCategoryEntity): Promise<SubCategoryEntity>;
    updateSubCategory(entity: SubCategoryEntity): Promise<SubCategoryEntity>;
    deleteSubCategory(entity: SubCategoryEntity): Promise<SubCategoryEntity>;
}

export interface ISubCategoryEntityCount {
    subcategories: SubCategoryEntity[];
    count: number;
}