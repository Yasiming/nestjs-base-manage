import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export class PaginationDto {
  @ApiProperty({ minimum: 1, default: 1 })
  @IsOptional({ always: true })
  @Transform(({ value: val }) => (val ? +val : 1), { toClassOnly: true })
  @IsInt()
  current?: number = 1;

  @ApiProperty({ minimum: 1, maximum: 1000, default: 10 })
  @IsOptional({ always: true })
  @Transform(({ value: val }) => (val ? +val : 1), { toClassOnly: true })
  @IsInt()
  pageSize?: number = 10;

  @ApiProperty({ enum: Order })
  @IsEnum(Order)
  @IsOptional()
  @Transform(({ value }) => (value === "asc" ? Order.ASC : Order.DESC))
  order?: Order = Order.ASC;
}
