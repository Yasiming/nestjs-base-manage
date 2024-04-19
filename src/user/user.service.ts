import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "../common/auth/auth.service";
import { ListUserDto } from "./dto/list-user.dto";
import { BuildLike } from "../common/query/BuildLike";

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

    let user = plainToClass(User, createUserDto);
    user = await user.save();
    delete user.password;
    return user;
  }

  async findAll(listUserDto: ListUserDto) {
    console.log("listUserDto", listUserDto);
    const dto = plainToClass(ListUserDto, listUserDto);
    const { current, pageSize } = dto;
    const queryWrapper = BuildLike(dto, ["nick_name", "phone", "email"]);

    const [users, totalCount] = await this.userRepository.findAndCount({
      where: [queryWrapper],
      skip: (current - 1) * pageSize,
      take: pageSize,
      relations: {
        roles: true,
      },
      order: {
        create_time: dto.order,
      },
    });

    return {
      list: users,
      total: totalCount,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new BadRequestException("用户不存在");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log("updateUserDto", updateUserDto);
    const { affected } = await this.userRepository.update(
      { user_id: id },
      updateUserDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async frozen(id: number, is_frozen: boolean) {
    const user = await this.findOne(id);
    user.is_frozen = is_frozen;
    await user.save();
    return `冻结成功`;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      user_name: loginUserDto.user_name,
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

    return {
      ...this.authService.token(user),
      ...user,
    };
  }
}
