import { ProductDetailEntity } from "../entities/product-detail.entity";

export interface IProductDetailRepository {
    getProductDetails(): Promise<ProductDetailEntity[]>;
    getProductDetail(id: number): Promise<ProductDetailEntity>;
    getByProductId(id: number): Promise<ProductDetailEntity>;
    createProductDetail(entity: ProductDetailEntity): Promise<ProductDetailEntity>;
    updateProductDetail(entity: ProductDetailEntity): Promise<ProductDetailEntity>;
    deleteProductDetail(entity: ProductDetailEntity): Promise<ProductDetailEntity>;
}