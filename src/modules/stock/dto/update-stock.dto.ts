import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateStockDto {
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
    brand_id: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    product_id: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    quantity: number;
}
