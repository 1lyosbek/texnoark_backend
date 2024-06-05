import { ApiPropertyOptional } from '@nestjs/swagger';
import {  IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @ApiPropertyOptional({
        type: String,
        example: 'Elektronika'
    })
    @IsString()
    @IsOptional()
    name: string;
}
