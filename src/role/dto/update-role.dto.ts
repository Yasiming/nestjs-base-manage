import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

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
}
