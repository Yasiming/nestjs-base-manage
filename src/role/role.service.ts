import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { User } from "../user/entities/user.entity";
import { FindRoleDto } from "./dto/find-role.dto";
import { BuildLike } from "../common/query/BuildLike";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOneBy([
      {
        role_name: createRoleDto.role_name,
      },
      {
        role_key: createRoleDto.role_key,
      },
    ]);
    if (role) {
      throw new BadRequestException("角色已存在");
    }
    await this.roleRepository.save(createRoleDto);
    return "添加成功";
  }

  async findAll(findAllDto: FindRoleDto) {
    const queryWrapper = BuildLike(findAllDto, ["role_name", "role_key"]);
    queryWrapper.is_frozen = findAllDto.is_frozen;
    return this.roleRepository.find({
      where: queryWrapper,
      order: {
        role_id: "ASC",
      },
    });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: {
        role_id: id,
      },
      relations: {
        users: true,
      },
    });

    if (!role) {
      throw new BadRequestException("角色不存在");
    }

    role.users.forEach((user) => {
      delete user.password;
    });
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    const { affected } = await this.roleRepository.update(
      { role_id: id },
      updateRoleDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async assignRoleToUser(user_id: number, role_id: number) {
    if (!user_id || !role_id) {
      throw new BadRequestException("ID只能为数字");
    }
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: {
        roles: true,
      },
    });
    if (!user) {
      throw new BadRequestException("用户不存在");
    }
    const role = await this.roleRepository.findOneBy({ role_id });
    if (!role) {
      throw new BadRequestException("角色不存在");
    }
    user.roles.forEach((user) => {
      if (user.role_id === role.role_id) {
        throw new BadRequestException("已拥有该角色");
      }
    });
    user.roles.push(role);
    await user.save();
    return "添加成功";
  }

  async deleteUserRole(user_id: number, role_id: number) {
    if (!user_id || !role_id) {
      throw new BadRequestException("ID只能为数字");
    }
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: {
        roles: true,
      },
    });
    if (!user) {
      throw new BadRequestException("用户不存在");
    }
    const role = await this.roleRepository.findOneBy({ role_id });
    if (!role) {
      throw new BadRequestException("角色不存在");
    }
    user.roles = user.roles.filter((role) => role.role_id != role_id);
    await user.save();
    return "删除成功";
  }

  async is_frozen(id: number, is_frozen: boolean) {
    const role = await this.findOne(id);
    if (!role) {
      throw new BadRequestException("用户不存在");
    }
    role.is_frozen = is_frozen;
    await role.save();
    return `操作成功`;
  }
}
