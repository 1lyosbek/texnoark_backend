import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty , IsOptional, IsString } from "class-validator";

export class UserRegisterDto {
  @ApiProperty({
    type: String,
    example: 'John',
    description: 'The first name of the admin.',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description: 'The last name of the admin.',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
    description: 'The phone number of the admin for verification.',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiPropertyOptional({
    type: String,
    example: 'admin@example.com',
    description: 'The email address of the admin.',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
    description: 'The password of the admin.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

