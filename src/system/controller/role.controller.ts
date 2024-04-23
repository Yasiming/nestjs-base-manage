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
import { RoleService } from "@/system/service/role.service";
import {
  SwaggerBody,
  SwaggerQuery,
} from "@/common/decorator/swagger.decorator";
import {
  CreateRoleDto,
  UpdateRoleDto,
  FrozenRoleDto,
} from "@/system/dto/role.dto";
import { RequireLoginKey } from "@/common/decorator";
import { User } from "@/system/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";

@Controller("role")
@ApiTags("角色管理")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequireLoginKey("system:role:create")
  @SwaggerBody("创建角色", CreateRoleDto)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get("assignRoleToUser")
  @RequireLoginKey("system:role:assignRoleToUser")
  @SwaggerQuery("给角色分配用户")
  assignRoleToUser(
    @Query("user_id") user_id: string,
    @Query("role_id") role_id: string,
  ) {
    return this.roleService.assignRoleToUser(user_id, role_id);
  }

  @Get("deleteUserRole")
  @RequireLoginKey("system:role:deleteUserRole")
  @SwaggerQuery("给角色删除用户")
  deleteUserRole(@Query() user: User, @Query("role_id") role_id: string) {
    return this.roleService.deleteUserRole(user, role_id);
  }

  @Get(":id")
  @RequireLoginKey("system:role:find")
  @SwaggerQuery("查询一个角色")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(":id")
  @RequireLoginKey("system:role:update")
  @SwaggerBody("更新角色", UpdateRoleDto)
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Post("frozen")
  @RequireLoginKey("system:role:frozen")
  @SwaggerBody("冻结角色", FrozenRoleDto)
  is_frozen(@Body() frozenRoleDto: FrozenRoleDto) {
    return this.roleService.is_frozen(frozenRoleDto);
  }
}
