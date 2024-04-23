import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/system/entities/user.entity";
import {
  CreateUserDto,
  ListUserDto,
  LoginUserDto,
  UpdateUserDto,
} from "@/system/dto/user.dto";
import { AuthService } from "@/common/auth/auth.service";
import { LoginUserVo, UserInfo } from "@/system/vo/user.vo";
import { RoleKeyConstants } from "@/constants/system.constants";
import { BuildLike } from "@/common/query/BuildLike";
import { plainToClass } from "class-transformer";
import { Role } from "@/system/entities/role.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isRegister = await this.userRepository.findOneBy({
      user_name: createUserDto.user_name,
    });

    if (isRegister) {
      throw new BadRequestException("用户已注册");
    }

    const user = plainToClass(User, createUserDto);
    // 默认角色
    const role = await Role.findOne({
      where: {
        role_key: RoleKeyConstants.DEFAULT,
      },
    });
    user.roles = [role];

    await user.save();

    return "创建成功";
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        user_name: loginUserDto.user_name,
      },
      relations: {
        roles: {
          menus: true,
        },
      },
    });

    if (!user) {
      throw new BadRequestException("用户不存在");
    }

    if (user.is_frozen) {
      throw new BadRequestException("用户已冻结");
    }

    if (user.password !== loginUserDto.password) {
      throw new BadRequestException("密码错误");
    }

    delete user.password;
    const tokenInfo = this.authService.token(user);
    const loginUserVo = new LoginUserVo();
    loginUserVo.accessToken = tokenInfo.accessToken;
    loginUserVo.refreshToken = tokenInfo.refreshToken;

    loginUserVo.userInfo = this.getUserInfo(user);

    return loginUserVo;
  }

  getUserInfo(user: User) {
    const userInfo = new UserInfo();
    userInfo.user_id = user.user_id;
    userInfo.user_name = user.user_name;
    userInfo.nick_name = user.nick_name;
    userInfo.avatar = user.avatar;
    userInfo.email = user.email;
    userInfo.phone = user.phone;
    userInfo.roles = user.roles.map((item) => item.role_name);

    if (
      user.roles.map((item) => item.role_key).includes(RoleKeyConstants.ADMIN)
    ) {
      userInfo.permissions = ["*"];
    } else {
      userInfo.permissions = user.roles.reduce((arr, item) => {
        item.menus.forEach((permission) => {
          if (arr.indexOf(permission) === -1 && permission.perms) {
            arr.push(permission.perms);
          }
        });
        return arr;
      }, []);
    }
    return userInfo;
  }

  hasAdmin(user: User) {
    return user.roles
      .map((item) => item.role_key)
      .includes(RoleKeyConstants.ADMIN);
  }

  async list(listUserDto: ListUserDto) {
    const { current, pageSize, order } = listUserDto;
    const queryWrapper = BuildLike(listUserDto, [
      "nick_name",
      "phone",
      "email",
    ]);

    const [users, totalCount] = await this.userRepository.findAndCount({
      where: [queryWrapper],
      skip: (current - 1) * pageSize,
      take: pageSize,
      relations: {
        roles: true,
      },
      order: {
        create_time: order,
      },
    });

    return {
      list: users,
      total: totalCount,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { affected } = await this.userRepository.update(
      { user_id: id },
      updateUserDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async frozen(id: string, is_frozen: boolean) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    user.is_frozen = is_frozen;
    await user.save();
    return `操作成功`;
  }
}
