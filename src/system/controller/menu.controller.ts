import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { MenuService } from "@/system/service/menu.service";
import { RequireLogin, RequireLoginKey, UserInfo } from "@/common/decorator";
import { User } from "@/system/entities/user.entity";
import {
  SwaggerBody,
  SwaggerQuery,
} from "@/common/decorator/swagger.decorator";
import { CreateMenuDto, UpdateMenuDto } from "@/system/dto/menu.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("menu")
@ApiTags("菜单管理")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @RequireLoginKey("system:menu:create")
  @SwaggerBody("创建菜单", CreateMenuDto)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @RequireLoginKey("system:menu:list")
  @SwaggerQuery("菜单列表")
  getMenusAll() {
    return this.menuService.findAll();
  }

  @Get(":id")
  @RequireLoginKey("system:menu:findOne")
  @SwaggerQuery("查询一个菜单信息")
  findOne(@Param("id") id: string) {
    return this.menuService.findOne(+id);
  }

  @Get("routes")
  @RequireLogin()
  @SwaggerQuery("获取路由信息")
  getRouteList(@UserInfo() user: User) {
    return this.menuService.getRouteList(user);
  }

  @Patch(":id")
  @RequireLoginKey("system:menu:update")
  @SwaggerBody("更新菜单", UpdateMenuDto)
  update(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(":id")
  @RequireLoginKey("system:menu:delete")
  @SwaggerBody("删除菜单", "")
  remove(@Param("id") id: string) {
    return this.menuService.remove(+id);
  }
}
