import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    comment: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    product_id: number;
}
