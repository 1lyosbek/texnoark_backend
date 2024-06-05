import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        type: String,
        example: "+998335701001",
        description: "Phone number for login"
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
