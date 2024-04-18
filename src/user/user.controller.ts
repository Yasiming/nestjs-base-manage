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
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RequireAdmin, RequireLogin, UserInfo } from "../common/decorator";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ListUserDto } from "./dto/list-user.dto";
import { UserConstants } from "../constants/system.constants";

@ApiTags("用户管理")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "创建用户" })
  @RequireAdmin()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @ApiOperation({ summary: "用户登录" })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @RequireLogin()
  @ApiOperation({ summary: "获取用户列表" })
  findAll(@Body() listUserDto: ListUserDto) {
    return this.userService.findAll(listUserDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "查询一个用户" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "更新用户" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "冻结用户" })
  @RequireAdmin()
  frozen(
    @Param("id") id: string,
    @UserInfo("user_type") user_type: UserConstants,
    @Body("is_frozen", ParseBoolPipe) is_frozen = true,
  ) {
    if (UserConstants.ADMIN !== user_type) {
      throw new ForbiddenException("用户权限不足");
    }
    return this.userService.frozen(+id, is_frozen);
  }
}
