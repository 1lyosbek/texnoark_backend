import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResData } from 'src/lib/resData';
import { ProductEntity } from './entities/product.entity';
import { IProductEntityCount, IProductRepository } from './interfaces/repository-interface';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { BrandCategoryService } from '../brand-category/brand-category.service';
import { IProductService } from './interfaces/server-interface';
import { ProductNotFound } from './exceptions/product.exceptions';

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @Inject("IProductRepository") private readonly productRepository: IProductRepository,
    @Inject("IBrandService") private readonly brandService: BrandService,
    @Inject("ICategoryService") private readonly categoryService: CategoryService,
    @Inject("IBrandCategoryService") private readonly brandCategoryService: BrandCategoryService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<ResData<ProductEntity>> {
    const { data: foundCategory } = await this.categoryService.findOne(createProductDto.category_id);
    const { data: foundBrand } = await this.brandService.findOne(createProductDto.brand_id);
    const { data: foundBrandCategory } = await this.brandCategoryService.findOneBrandCategory(createProductDto.brand_category_id);
    const newProduct = new ProductEntity();
    newProduct.name = createProductDto.name;
    newProduct.price = createProductDto.price;
    newProduct.category_id = foundCategory;
    newProduct.brand_id = foundBrand;
    newProduct.brand_category_id = foundBrandCategory;
    const created = await this.productRepository.createProduct(newProduct);
    return new ResData<ProductEntity>("Product created successfully", 201, created);
  }

  async findAll(word: string, limit: number, page: number): Promise<ResData<IProductEntityCount>>{
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundProducts = await this.productRepository.getProducts(word, limit, page);
    return new ResData<IProductEntityCount>("Products", 200, {products: foundProducts.products, count: foundProducts.count});
  }

  async findOne(id: number): Promise<ResData<ProductEntity>> {
    const foundProduct = await this.productRepository.getProduct(id);
    if (!foundProduct) {
      throw new ProductNotFound();
    }
    return new ResData<ProductEntity>("Product found", 200, foundProduct);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ResData<ProductEntity>> {
    const { data: foundCategory } = await this.categoryService.findOne(updateProductDto.category_id);
    const { data: foundBrand } = await this.brandService.findOne(updateProductDto.brand_id);
    const { data: foundBrandCategory } = await this.brandCategoryService.findOneBrandCategory(updateProductDto.brand_category_id);
    const {data: foundProduct } = await this.findOne(id);
    foundProduct.name = updateProductDto.name;
    foundProduct.price = updateProductDto.price;
    foundProduct.category_id = foundCategory;
    foundProduct.brand_id = foundBrand;
    foundProduct.brand_category_id = foundBrandCategory;
    const updated = await this.productRepository.updateProduct(foundProduct);
    return new ResData<ProductEntity>("Product updated successfully", 200, updated);
  }

  async remove(entity: ProductEntity): Promise<ResData<ProductEntity>> {
    const deleted = await this.productRepository.deleteProduct(entity);
    return new ResData<ProductEntity>("Product deleted successfully", 200, deleted);
  }
}
