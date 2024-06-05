import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSubCategoryDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    parent_category_id: number;
}
