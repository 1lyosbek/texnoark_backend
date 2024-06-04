import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBrandCategoryDto  {
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
    brand_id: number;
}
