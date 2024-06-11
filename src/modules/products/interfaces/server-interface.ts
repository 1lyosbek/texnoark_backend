import { ResData } from "src/lib/resData";
import { IProductEntityCount } from "./repository-interface";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductDetailEntity } from "src/modules/product-detail/entities/product-detail.entity";

export interface IProductService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IProductEntityCount>>;
    findByBrandId(brandId: number): Promise<ResData<ProductEntity[]>>;
    findOne(id: number): Promise<ResData<IProductDetailData>>;
    create(product: CreateProductDto): Promise<ResData<ProductEntity>>;
    update(id: number, product: UpdateProductDto): Promise<ResData<ProductEntity>>;
    remove(entity: ProductEntity): Promise<ResData<ProductEntity>>;
}

export interface IProductDetailData{
    product: ProductEntity;
    product_detail: ProductDetailEntity;
}
