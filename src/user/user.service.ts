import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "../common/auth/auth.service";

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

  async findAll() {
    return this.userRepository.find({
      relations: {
        roles: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ user_id: id });
    return this.userRepository.findOneBy({ user_id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { affected } = await this.userRepository.update(
      { user_id: id },
      updateUserDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  remove(id: number) {
    this.findOne(id);
    return `This action removes a #${id} user`;
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
