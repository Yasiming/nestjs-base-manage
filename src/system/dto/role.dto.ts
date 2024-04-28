import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ description: "角色名称", example: "", required: true })
  @IsNotEmpty({ message: "角色名称不能为空" })
  role_name: string;

  @ApiProperty({ description: "角色权限", example: "", required: true })
  @IsString({ message: "角色权限需为字符串" })
  @IsNotEmpty({ message: "角色权限符不能为空" })
  role_key: string;

  @ApiProperty({ description: "排序", example: 1, required: true })
  @IsNotEmpty({ message: "排序不能为空" })
  role_sort: number;

  @ApiProperty({ description: "菜单ID", example: [1, 2, 3], required: false })
  @IsOptional()
  menuIds: number[];
}

export class UpdateRoleDto {
  @ApiProperty({ description: "角色名称", example: "", required: false })
  @IsOptional()
  role_name?: string;

  @ApiProperty({ description: "角色权限", example: "", required: false })
  @IsOptional()
  role_key?: string;

  @ApiProperty({ description: "排序", example: 1, required: false })
  @IsOptional()
  role_sort?: number;
  @ApiProperty({ description: "排序", example: false, required: false })
  @IsOptional()
  is_frozen: boolean;

  @ApiProperty({ description: "菜单ID", example: [1, 2, 3], required: false })
  @IsOptional()
  menuIds: number[];
}

export class FrozenRoleDto {
  @ApiProperty({ description: "角色ID", example: "", required: true })
  @IsNotEmpty({ message: "角色ID不能为空" })
  role_id: string;

  @ApiProperty({ description: "是否冻结", example: false, required: true })
  @IsOptional()
  is_frozen = true;
}
