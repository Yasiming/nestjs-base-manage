import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindRoleDto {
  @ApiProperty({ description: "角色名称", example: "", required: false })
  @IsOptional()
  role_name?: string;

  @ApiProperty({ description: "角色权限", example: "", required: false })
  @IsOptional()
  role_key?: string;

  @ApiProperty({ description: "角色状态", example: null, required: false })
  @IsOptional()
  is_frozen?: boolean;
}
