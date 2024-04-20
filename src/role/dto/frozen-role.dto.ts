import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FrozenRoleDto {
  @ApiProperty({ description: "角色ID", example: "", required: true })
  @IsNotEmpty({ message: "角色ID不能为空" })
  role_id: number;

  @ApiProperty({ description: "是否冻结", example: false, required: true })
  @IsOptional()
  is_frozen = true;
}
