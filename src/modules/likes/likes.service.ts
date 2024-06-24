import { Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { ResData } from 'src/lib/resData';
import { LikeEntity } from './entities/like.entity';
import { ILikeEntityCount, ILikeRepository } from './interfaces/repository-interface';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(@Inject("ILikeRepository") private likeRepository: ILikeRepository) {}
  async create(createLikeDto: CreateLikeDto, currentUser: UserEntity):Promise<ResData<LikeEntity>> {
    const newLike = new LikeEntity();
    newLike.user_id = currentUser.id;
    newLike.product_id = createLikeDto.product_id;
    const created = await this.likeRepository.createLike(newLike);
    return new ResData<LikeEntity>("Like created successfully", 201, created);
  }

  async findAll():Promise<ResData<ILikeEntityCount>> {
    const foundLikes = await this.likeRepository.getLikes();
    return new ResData<ILikeEntityCount>("All available likes", 200, {likes: foundLikes.likes, count: foundLikes.count});
  }

  async findOne(id: number):Promise<ResData<LikeEntity>> {
    const foundLike = await this.likeRepository.getLike(id);
    return new ResData<LikeEntity>("Like found ", 200, foundLike);;
  }

  async remove(entity: LikeEntity): Promise<ResData<LikeEntity>> {
    const deleted = await this.likeRepository.deleteLike(entity);
    return new ResData<LikeEntity>("Like deleted successfully", 200, deleted);
  }
}
