import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, max, Min } from "class-validator";

export interface ICreateProductDto {
  name: string;
  price: number;
  category_id: number;
  brand_category_id: number;
  brand_id: number;
}

export class CreateRateDto {
  @ApiProperty({
    type: Number
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
