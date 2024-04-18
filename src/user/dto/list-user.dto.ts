import { PaginationDto } from "../../common/dto";
import { IsOptional } from "class-validator";

export class ListUserDto extends PaginationDto {
  @IsOptional()
  user_name?: string;

  @IsOptional()
  nick_name?: string;

  @IsOptional()
  is_frozen?: boolean = false;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;
}
