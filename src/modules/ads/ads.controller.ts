import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Inject, ParseIntPipe, Put } from '@nestjs/common';
import { AdsService } from './ads.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/lib/fileOpitions';
import { ICreateAdsDto } from './dto/create-ads.dto';
import { IAdsService } from './interfaces/service-interface';
import { IUpdateAdsDto } from './dto/update-ads.dto';

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(@Inject("IAdsService") private readonly adsService: IAdsService) {}
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        },
        position: {
          type: "number",
        },
      },
    }
  })
  @ApiOperation({summary: "Create new advertisement"})
  @ApiConsumes("multipart/form-data")
  @Post('create')
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async createAds(@UploadedFile() file: Express.Multer.File, @Body() dto: ICreateAdsDto) {
    return await this.adsService.create(file, dto);
  }

  @ApiOperation({summary: "Get all advertisements"})
  @Get()
  async findAll() {
    return await this.adsService.findAll();
  }

  @ApiOperation({summary: "Get advertisement by id"})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adsService.findOne(id);
  }


  @ApiOperation({summary: "Update advertisement by id"})
  @ApiConsumes("multipart/form-data")
  @Put('update/:id')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        },
        position: {
          type: "number",
        },
      },
    }
  })
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async update(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() dto: any) {
    return await this.adsService.update(id, file, dto);
  }
  @ApiOperation({summary: "Delete advertisement by id"})
  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { data: foundAds } = await this.adsService.findOne(id);
    return await this.adsService.remove(foundAds);
  }
}
