import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDetailDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsNumber()
    @IsOptional()
    quantity: number;
    
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    colors: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsNumber()
    discount: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    product_id: number;
}
