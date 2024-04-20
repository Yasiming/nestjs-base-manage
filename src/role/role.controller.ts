import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags } from "@nestjs/swagger";
import {
  SwaggerBody,
  SwaggerQuery,
} from "../common/decorator/swagger.decorator";
import { RequireLogin } from "../common/decorator";
import { FindRoleDto } from "./dto/find-role.dto";
import { FrozenRoleDto } from "./dto/frozen-role.dto";

@ApiTags("角色管理")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequireLogin()
  @SwaggerBody("创建角色", CreateRoleDto)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @RequireLogin()
  @SwaggerQuery("角色列表")
  findAll(@Query() findAllDto: FindRoleDto) {
    return this.roleService.findAll(findAllDto);
  }

  @Get("assignRoleToUser")
  @RequireLogin()
  @SwaggerQuery("用户添加角色")
  assignRoleToUser(
    @Query("user_id") user_id: number,
    @Query("role_id") role_id: number,
  ) {
    return this.roleService.assignRoleToUser(user_id, role_id);
  }

  @Get("deleteUserRole")
  @RequireLogin()
  @SwaggerQuery("用户删除角色")
  deleteUserRole(
    @Query("user_id") user_id: number,
    @Query("role_id") role_id: number,
  ) {
    return this.roleService.deleteUserRole(user_id, role_id);
  }

  @Get(":id")
  @RequireLogin()
  @SwaggerQuery("查询一个角色")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(":id")
  @RequireLogin()
  @SwaggerBody("更新角色", UpdateRoleDto)
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Post("frozen")
  @RequireLogin()
  @SwaggerBody("冻结角色", FrozenRoleDto)
  is_frozen(@Body() frozenRoleDto: FrozenRoleDto) {
    return this.roleService.is_frozen(
      +frozenRoleDto.role_id,
      frozenRoleDto.is_frozen,
    );
  }
}
