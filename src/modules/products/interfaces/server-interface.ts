import { ResData } from "src/lib/resData";
import { IProductEntityCount } from "./repository-interface";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";

export interface IProductService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IProductEntityCount>>;
    findOne(id: number): Promise<ResData<ProductEntity>>;
    create(product: CreateProductDto): Promise<ResData<ProductEntity>>;
    update(id: number, product: UpdateProductDto): Promise<ResData<ProductEntity>>;
    remove(entity: ProductEntity): Promise<ResData<ProductEntity>>;
}