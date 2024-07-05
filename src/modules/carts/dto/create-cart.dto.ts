import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto {
    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    product_id: number;
}
