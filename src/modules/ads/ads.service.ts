import { Inject, Injectable } from '@nestjs/common';
import { IAdsService } from './interfaces/service-interface';
import { ResData } from 'src/lib/resData';
import { AdsEntity } from './entities/ads.entity';
import { ICreateAdsDto } from './dto/create-ads.dto';
import { IAdsRepository } from './interfaces/repository-interface';
import { AdsNotFound } from './exceptions/ads.exceptions';
import { IUpdateAdsDto } from './dto/update-ads.dto';

@Injectable()
export class AdsService implements IAdsService {
  constructor(@Inject("IAdsRepository") private readonly adsRepository: IAdsRepository) {} 
  async create(file: Express.Multer.File , createAdDto: ICreateAdsDto): Promise<ResData<AdsEntity>> {
    const newAdvertisement = new AdsEntity();
    newAdvertisement.image = `https://ecomapi.ilyosbekdev.uz/${file.path}`;
    newAdvertisement.position = createAdDto.position;
    const created = await this.adsRepository.create(newAdvertisement);
    return new ResData<AdsEntity>("Advertisement created successfully", 201, created);
  }

  async findAll(): Promise<ResData<AdsEntity[]>> {
    const foundAds = await this.adsRepository.getAll();
    return new ResData<AdsEntity[]>("All available ads", 200, foundAds);
  }

  async findOne(id: number): Promise<ResData<AdsEntity>> {
    const foundAdvertisement = await this.adsRepository.getOne(id);
    if (!foundAdvertisement) {
      throw new AdsNotFound();
    }
    return new ResData<AdsEntity>("Advertisement found successfully", 200, foundAdvertisement);;
  }

  async update(id: number, file: Express.Multer.File, updateAdDto: IUpdateAdsDto): Promise<ResData<AdsEntity>> {
    const { data : foundAds } = await this.findOne(id);
    foundAds.image = `https://ecomapi.ilyosbekdev.uz/${file.path}`;
    foundAds.position = updateAdDto.position;
    const updated = await this.adsRepository.update(foundAds);
    return new ResData<AdsEntity>("Advertisement updated successfully", 200, updated);
  }

  async remove(entity: AdsEntity): Promise<ResData<AdsEntity>> {
    const deleted = await this.adsRepository.delete(entity);
    return new ResData<AdsEntity>("Advertisement deleted successfully", 200, deleted);
  }
}
