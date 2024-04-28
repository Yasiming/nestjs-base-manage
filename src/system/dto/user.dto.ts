import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { PaginationDto } from "@/common/dto";

export class LoginUserDto {
  @ApiProperty({ description: "用户名", example: "admin" })
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({ description: "密码", example: "123456" })
  @IsNotEmpty()
  password: string;
}

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

export class CreateUserDto {
  @ApiProperty({ description: "用户名", example: "zhangsan" })
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({ description: "密码", example: "123456" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "昵称", example: "张三" })
  @IsNotEmpty()
  nick_name: string;

  @ApiProperty({ description: "头像", example: "", required: false })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: "邮件", example: "", required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "手机号", example: "", required: false })
  @IsOptional()
  phone?: string;
}
