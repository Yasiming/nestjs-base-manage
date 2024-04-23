import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UserService } from "@/system/service/user.service";
import {
  ListUserDto,
  LoginUserDto,
  UpdateUserDto,
  CreateUserDto,
} from "@/system/dto/user.dto";
import { RequireLogin, RequireLoginKey, UserInfo } from "@/common/decorator";
import { User } from "@/system/entities/user.entity";
import {
  SwaggerBody,
  SwaggerQuery,
} from "@/common/decorator/swagger.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("用户管理")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @SwaggerBody("创建用户", CreateUserDto)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @SwaggerBody("用户登录", LoginUserDto, false)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get("info")
  @RequireLogin()
  @SwaggerQuery("个人信息")
  info(@UserInfo() user: User) {
    return this.userService.getUserInfo(user);
  }

  @Get("list")
  @RequireLoginKey("system:user:list")
  @SwaggerQuery("用户列表")
  list(@Query() listUserDto: ListUserDto) {
    return this.userService.list(listUserDto);
  }

  @Patch(":id")
  @RequireLogin()
  @SwaggerBody("更新用户", UpdateUserDto)
  async update(
    @Param("id") id: string,
    @UserInfo() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (id === user.user_id || this.userService.hasAdmin(user)) {
      return this.userService.update(id, updateUserDto);
    }
    return "更新异常";
  }

  @Delete(":id")
  @RequireLoginKey("system:user:frozen")
  @SwaggerBody("冻结用户", UpdateUserDto)
  frozen(
    @Param("id") id: string,
    @Body("is_frozen", ParseBoolPipe) is_frozen = true,
  ) {
    return this.userService.frozen(id, is_frozen);
  }
}
