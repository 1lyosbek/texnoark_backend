import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateStockDto {
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
    brand_id: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    product_id: number;

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
