import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    parent_category_id: number;
}
