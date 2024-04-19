import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  ParseBoolPipe,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RequireAdmin, RequireLogin } from "../common/decorator";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { ListUserDto } from "./dto/list-user.dto";
import {
  SwaggerBody,
  SwaggerQuery,
} from "../common/decorator/swagger.decorator";

@ApiTags("用户管理")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequireAdmin()
  @SwaggerBody("创建用户", CreateUserDto)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @SwaggerBody("用户登录", LoginUserDto, false)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @RequireLogin()
  @SwaggerQuery("用户列表")
  findAll(@Query() listUserDto: ListUserDto) {
    return this.userService.findAll(listUserDto);
  }

  @Get(":id")
  @RequireLogin()
  @SwaggerQuery("查询一个用户")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @RequireAdmin()
  @SwaggerBody("更新用户", UpdateUserDto)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @RequireAdmin()
  @SwaggerBody("冻结用户", UpdateUserDto)
  frozen(
    @Param("id") id: string,
    @Body("is_frozen", ParseBoolPipe) is_frozen = true,
  ) {
    return this.userService.frozen(+id, is_frozen);
  }
}
