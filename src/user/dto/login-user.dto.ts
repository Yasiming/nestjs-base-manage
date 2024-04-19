import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ description: "用户名", example: "admin" })
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({ description: "密码", example: "123456" })
  @IsNotEmpty()
  password: string;
}
