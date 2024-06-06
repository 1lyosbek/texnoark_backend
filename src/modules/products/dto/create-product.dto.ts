import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    category_id: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    brand_category_id: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    brand_id: number;
}
