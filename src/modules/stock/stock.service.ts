import { Inject, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { IStockEntityCount, IStockService } from './interfaces/service.interface';
import { IStockRepository } from './interfaces/repository.interface';
import { ResData } from 'src/lib/resData';
import { StockEntity } from './entities/stock.entity';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { ProductsService } from '../products/products.service';
import { StockNotFound } from './exceptions/stock.exceptions';

@Injectable()
export class StockService implements IStockService {
  constructor(
    @Inject("IStockRepository") private readonly stockRepository: IStockRepository,
    @Inject("ICategoryService") private readonly categoryService: CategoryService,
    @Inject("IBrandService") private readonly brandService: BrandService,
    @Inject("IProductService") private readonly productService: ProductsService
  ) { }
  async create(createStockDto: CreateStockDto): Promise<ResData<StockEntity>> {
    const { data: foundCategory } = await this.categoryService.findOne(createStockDto.category_id);
    const { data: foundBrand } = await this.brandService.findOne(createStockDto.brand_id);
    const { data: foundProduct } = await this.productService.findOne(createStockDto.product_id);
    const newStock = new StockEntity();
    newStock.category_id = foundCategory;
    newStock.brand_id = foundBrand.id;
    newStock.product_id = foundProduct.product;
    newStock.quantity = createStockDto.quantity;
    const created = await this.stockRepository.createStock(newStock);
    return new ResData<StockEntity>("Stock created successfully", 201, created);
  }

  async findAll(limit: number, page: number): Promise<ResData<IStockEntityCount>> {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    page = (page - 1) * limit;
    const foundStocks = await this.stockRepository.getStocks(limit, page);
    return new ResData<IStockEntityCount>("All available stocks", 200, foundStocks);
  }

  async findByBrandId(brandId: number): Promise<ResData<StockEntity[]>> {
    const foundStocks = await this.stockRepository.getByBrandId(brandId);
    return new ResData<StockEntity[]>("All available stocks", 200, foundStocks);
  }

  async findOne(id: number): Promise<ResData<StockEntity>> {
    const foundStock = await this.stockRepository.getStock(id);
    if (!foundStock) {
      throw new StockNotFound();
    }
    return new ResData<StockEntity>("Stock found", 200, foundStock);
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<ResData<StockEntity>> {
    const { data: foundStock } = await this.findOne(id);
    const { data: foundCategory } = await this.categoryService.findOne(updateStockDto.category_id);
    const { data: foundBrand } = await this.brandService.findOne(updateStockDto.brand_id);
    const { data: foundProduct } = await this.productService.findOne(updateStockDto.product_id);
    foundStock.category_id = foundCategory;
    foundStock.brand_id = foundBrand.id;
    foundStock.product_id = foundProduct.product;
    foundStock.quantity = updateStockDto.quantity;
    const updated = await this.stockRepository.updateStock(foundStock);
    return new ResData<StockEntity>("Stock updated successfully", 200, updated);
  }

  async remove(entity: StockEntity): Promise<ResData<StockEntity>> {
    const deleted = await this.stockRepository.deleteStock(entity);
    return new ResData<StockEntity>("Stock deleted successfully", 200, deleted);
  }
}
