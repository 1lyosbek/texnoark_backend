import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateLikeDto {
    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    product_id: number;
}
