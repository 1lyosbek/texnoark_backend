import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDetailDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    quantity: number;

    @ApiPropertyOptional({
        type: Array
    })
    @IsArray()
    @IsOptional()
    colors: Array<string>;

    @ApiPropertyOptional({
        type: String
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    discount: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    product_id: number;
}
