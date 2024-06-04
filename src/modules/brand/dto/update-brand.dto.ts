import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto {
    @ApiPropertyOptional({
        type: String,
        example: 'honor',
        description: 'Name of brand'
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({
        type: Number,
        example: 1,
        description: 'Category Id'
    })
    @IsInt()
    @IsOptional()
    categoryId: number;

    @ApiPropertyOptional({
        type: String,
        example: 'the best brand',
        description: 'Desription of brand'
    })
    @IsString()
    @IsOptional()
    description: string;
}
