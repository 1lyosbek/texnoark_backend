import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    parent_category_id: number;
}
