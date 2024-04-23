import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { MenuTypeConstants } from "../../constants/system.constants";
import { PartialType } from "@nestjs/swagger";

export class CreateMenuDto {
  @IsNotEmpty({ message: "菜单名称不能为空" })
  menu_name: string;

  @IsNotEmpty({ message: "菜单类型" })
  menu_type: MenuTypeConstants;

  @IsNumber()
  @IsNotEmpty({ message: "父ID不能为空" })
  pid: number;

  @IsNumber()
  @IsNotEmpty({ message: "排序" })
  menu_sort: number;

  @IsOptional()
  path?: string;

  @IsOptional()
  component?: string;

  @IsOptional()
  keep_alive?: boolean;

  @IsOptional()
  is_frame?: boolean;

  @IsOptional()
  hidden?: boolean;

  @IsOptional()
  icon?: string;

  @IsOptional()
  perms?: string;
}
export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
