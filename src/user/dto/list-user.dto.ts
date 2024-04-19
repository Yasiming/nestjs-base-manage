import { PaginationDto } from "../../common/dto";
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ListUserDto extends PaginationDto {
  @ApiProperty({ description: "用户名", example: "adm", required: false })
  @IsOptional()
  user_name?: string;

  @ApiProperty({ description: "昵称", example: "", required: false })
  @IsOptional()
  nick_name?: string;

  @ApiProperty({ description: "是否冻结", example: false, required: false })
  @IsOptional()
  is_frozen?: boolean = false;

  @ApiProperty({ description: "邮箱", example: "", required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "手机号", example: "", required: false })
  @IsOptional()
  phone?: string;
}
