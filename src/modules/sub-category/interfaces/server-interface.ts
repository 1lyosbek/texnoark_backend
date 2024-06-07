import { ResData } from "src/lib/resData";
import { CreateSubCategoryDto } from "../dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "../dto/update-sub-category.dto";
import { SubCategoryEntity } from "../entities/sub-category.entity";
import { ISubCategoryEntityCount } from "./repository-interface";

export interface ISubCategoryService {
    findAllSubCategories(id: number, search: string, limit: number, page: number): Promise<ResData<ISubCategoryEntityCount>>;
    findOneSubCategory(id: number): Promise<ResData<SubCategoryEntity>>;
    findSubCategoryByName(name: string): Promise<ResData<SubCategoryEntity>>;
    createSubCategory(createDto: CreateSubCategoryDto): Promise<ResData<SubCategoryEntity>>;
    updateSubCategory(id: number, updateDto: UpdateSubCategoryDto): Promise<ResData<SubCategoryEntity>>;
    removeSubCategory(entity: SubCategoryEntity): Promise<ResData<SubCategoryEntity>>;
}
