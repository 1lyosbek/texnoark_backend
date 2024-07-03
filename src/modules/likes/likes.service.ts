import { Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { ResData } from 'src/lib/resData';
import { LikeEntity } from './entities/like.entity';
import { ILikeEntityCount, ILikeRepository } from './interfaces/repository-interface';
import { UserEntity } from '../user/entities/user.entity';
import { ILikeService } from './interfaces/service-interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class LikeService implements ILikeService {
  constructor(
    @Inject("ILikeRepository") private likeRepository: ILikeRepository,
    @Inject("IProductService") private productService: ProductsService,
  ) {}
  async create(createLikeDto: CreateLikeDto, currentUser: UserEntity):Promise<ResData<LikeEntity>> {
    const { data: foundLike } = await this.findOneByProductId(createLikeDto.product_id);
    if (foundLike) {
      const deleted = await this.remove(foundLike);
      return deleted; 
    }
    const newLike = new LikeEntity();
    newLike.user_id = currentUser.id;
    newLike.product_id = createLikeDto.product_id;
    newLike.is_liked = true;
    const created = await this.likeRepository.createLike(newLike);
    return new ResData<LikeEntity>("Like created successfully", 201, created);
  }

  async findAll(id: number):Promise<ResData<ILikeEntityCount>> {
    const foundLikes = await this.likeRepository.getLikes(id);
    return new ResData<ILikeEntityCount>("All available likes", 200, {likes: foundLikes.likes, count: foundLikes.count});
  }

  async findOne(id: number):Promise<ResData<LikeEntity>> {
    const foundLike = await this.likeRepository.getLike(id);
    return new ResData<LikeEntity>("Like found ", 200, foundLike);;
  }

  async findOneByProductId(id: number): Promise<ResData<LikeEntity | null>> {
    const foundLike = await this.likeRepository.getLikeByProductId(id);
    const resData = new ResData<LikeEntity | null>("Like found by product id", 200, foundLike);
    if (!foundLike) {
      resData.message = "No such product found";
      resData.statusCode = 404;
    }
    return resData;
  }

  async remove(entity: LikeEntity): Promise<ResData<LikeEntity>> {
    const deleted = await this.likeRepository.deleteLike(entity);
    return new ResData<LikeEntity>("Like deleted successfully", 200, deleted);
  }
}
