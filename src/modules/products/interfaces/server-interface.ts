import { ResData } from "src/lib/resData";
import { IProductEntityCount } from "./repository-interface";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateRateDto, ICreateProductDto } from "../dto/create-product.dto";
import { ProductDetailEntity } from "src/modules/product-detail/entities/product-detail.entity";

export interface IProductService {
    findAll(word: string, limit: number, page: number): Promise<ResData<IProductEntityCount>>;
    findByBrandId(brandId: number): Promise<ResData<ProductEntity[]>>;
    findOne(id: number): Promise<ResData<IProductDetailData>>;
    findPopular(limit: number, page: number): Promise<ResData<IProductEntityCount>>;
    create(files: Array<Express.Multer.File>, product: ICreateProductDto ): Promise<ResData<ProductEntity>>;
    createRate(dto: CreateRateDto): Promise<ResData<ProductEntity>>;
    update(id: number, product: UpdateProductDto): Promise<ResData<ProductEntity>>;
    remove(entity: ProductEntity): Promise<ResData<ProductEntity>>;
}

export interface IProductDetailData{
    product: ProductEntity;
    product_detail: ProductDetailEntity;
}
