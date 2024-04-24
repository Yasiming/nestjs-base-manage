import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { DeptService } from "@/system/service/dept.service";
import { CreateDeptDto, UpdateDeptDto } from "@/system/dto/dept.dto";
import { ApiTags } from "@nestjs/swagger";
import {
  SwaggerBody,
  SwaggerQuery,
} from "@/common/decorator/swagger.decorator";
import { RequireLoginKey } from "@/common/decorator";

@Controller("dept")
@ApiTags("部门管理")
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post()
  @RequireLoginKey("system:dept:create")
  @SwaggerBody("创建部门", CreateDeptDto)
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Get("users")
  @RequireLoginKey("system:dept:findDeptAllUser")
  @SwaggerQuery("查询指定部门所有用户")
  findDeptAllUser(@Query("dept_id") dept_id: number) {
    return this.deptService.findDeptAllUser(dept_id);
  }

  @Get(":id")
  @RequireLoginKey("system:dept:findOne")
  @SwaggerQuery("查询一个部门")
  findOne(@Param("id") id: string) {
    return this.deptService.findOne(+id);
  }

  @Patch(":id")
  @RequireLoginKey("system:dept:update")
  @SwaggerBody("更新角色", UpdateDeptDto)
  update(@Param("id") id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(+id, updateDeptDto);
  }

  @Delete(":id")
  @RequireLoginKey("system:dept:delete")
  @SwaggerBody("删除角色", "")
  remove(@Param("id") id: string) {
    return this.deptService.remove(+id);
  }
}
