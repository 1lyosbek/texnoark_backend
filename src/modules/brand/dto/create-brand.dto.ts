import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export interface ICreateBrandDto {
    name: string;
    category_id: number;
    description: string;
}
