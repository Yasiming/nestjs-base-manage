import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ description: "昵称", example: "", required: false })
  @IsOptional()
  nick_name?: string;

  @ApiProperty({ description: "是否冻结", example: "", required: false })
  @IsOptional()
  is_frozen?: boolean;

  @ApiProperty({ description: "头像", example: "", required: false })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: "密码", example: "", required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ description: "邮箱", example: "", required: false })
  @IsOptional()
  email?: string;
}
