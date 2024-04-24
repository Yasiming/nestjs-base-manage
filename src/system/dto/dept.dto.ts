import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateDeptDto {
  @IsNotEmpty({ message: "父级ID不能为空" })
  pid: number;

  @IsNotEmpty({ message: "部门名称不能为空" })
  dept_name: string;

  @IsNotEmpty({ message: "排序不能为空" })
  dept_sort: number;

  @IsNotEmpty({ message: "负责人不能为空" })
  leader: string;

  @IsPhoneNumber("CN")
  @IsNotEmpty({ message: "电话不能为空" })
  phone: string;
}

export class UpdateDeptDto extends PartialType(CreateDeptDto) {}
