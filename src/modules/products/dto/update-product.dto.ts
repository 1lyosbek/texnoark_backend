import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    category_id: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    brand_category_id: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    brand_id: number;
}
