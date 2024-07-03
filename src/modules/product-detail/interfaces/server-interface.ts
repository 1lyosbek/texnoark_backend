import { ResData } from "src/lib/resData";
import { ProductDetailEntity } from "../entities/product-detail.entity";
import { CreateProductDetailDto } from "../dto/create-product-detail.dto";
import { UpdateProductDetailDto } from "../dto/update-product-detail.dto";

export interface IProductDetailService {
    findAll(): Promise<ResData<Array<ProductDetailEntity>>>;
    findOne(id: number): Promise<ResData<ProductDetailEntity>>;
    findByProductId(id: number): Promise<ResData<ProductDetailEntity>>;
    create(dto: CreateProductDetailDto): Promise<ResData<ProductDetailEntity>>;
    update(id: number, product: UpdateProductDetailDto): Promise<ResData<ProductDetailEntity>>;
    remove(entity: ProductDetailEntity): Promise<ResData<ProductDetailEntity>>;
}