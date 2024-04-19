import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
}
