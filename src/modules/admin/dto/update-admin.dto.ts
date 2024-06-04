import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
    @ApiPropertyOptional({
        type: String,
        example: 'John',
        description: 'The first name of the admin.',
    })
    @IsString()
    @IsOptional()
    first_name: string;

    @ApiPropertyOptional({
        type: String,
        example: 'Doe',
        description: 'The last name of the admin.',
    })
    @IsString()
    @IsOptional()
    last_name: string;

    @ApiPropertyOptional({
        type: String,
        example: '+998335701001',
        description: 'The phone number of the admin for verification.',
    })
    @IsString()
    @IsOptional()
    phone_number: string;

    @ApiPropertyOptional({
        type: String,
        example: 'admin@example.com',
        description: 'The email address of the admin.',
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiPropertyOptional({
        type: String,
        example: 'password',
        description: 'The password of the admin.',
    })
    @IsString()
    @IsOptional()
    password: string;
}
