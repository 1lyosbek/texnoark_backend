import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    getProducts(word: string, limit: number, page: number): Promise<IProductEntityCount>;
    getProduct(id: number): Promise<ProductEntity>;
    getByBrandId(brandId: number): Promise<ProductEntity[]>;
    createProduct(entity: ProductEntity): Promise<ProductEntity>;
    updateProduct(entity: ProductEntity): Promise<ProductEntity>;
    deleteProduct(entity: ProductEntity): Promise<ProductEntity>;
}

export interface IProductEntityCount {
    products: ProductEntity[];
    count: number;
}