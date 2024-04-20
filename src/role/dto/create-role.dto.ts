import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ description: "角色名称", example: "", required: true })
  @IsNotEmpty({ message: "角色名称不能为空" })
  role_name: string;

  @ApiProperty({ description: "角色权限", example: "", required: true })
  @IsString({ message: "角色权限需为字符串" })
  @IsNotEmpty({ message: "角色权限符不能为空" })
  role_key: string;

  @ApiProperty({ description: "排序", example: 1, required: true })
  @IsNumber({}, { message: "排序需为数字类型" })
  @IsNotEmpty({ message: "排序不能为空" })
  role_sort: number;
}
