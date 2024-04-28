import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { DictDefault } from "@/constants/system.constants";

export class CreateDictTypeDto {
  @ApiProperty({ example: "dict_type_1" })
  @IsNotEmpty({ message: "请输入字段类型" })
  dict_type: string;

  @ApiProperty({ example: "选择内容" })
  @IsNotEmpty({ message: "请输入字典名称" })
  dict_name: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  status = false;
}

export class CreateDictDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: "类型不能为空" })
  dict_type: string;

  @ApiProperty()
  @IsNotEmpty({ message: "label不能为空" })
  dict_label: string;

  @ApiProperty()
  @IsNotEmpty({ message: "值不能为空" })
  dict_value: string;

  @ApiProperty()
  @IsOptional()
  status = false;

  @ApiProperty()
  @IsOptional()
  is_default: DictDefault = DictDefault.N;
}

export class UpdateDictTypeDto extends PartialType(CreateDictTypeDto) {}

export class UpdateDictDataDto {
  @ApiProperty()
  @IsNotEmpty({ message: "code不能为空" })
  dict_code: string;

  @ApiProperty()
  @IsOptional()
  dict_label: string;

  @ApiProperty()
  @IsOptional()
  dict_value: string;

  @ApiProperty()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  is_default: string;
}
