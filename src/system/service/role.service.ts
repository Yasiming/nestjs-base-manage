import { BadRequestException, Injectable } from "@nestjs/common";
import {
  CreateRoleDto,
  FrozenRoleDto,
  UpdateRoleDto,
} from "@/system/dto/role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "@/system/entities/role.entity";
import { In, Repository } from "typeorm";
import { User } from "@/system/entities/user.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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

  async assignRoleToUser(user_id: string, role_id: string) {
    const user = await User.findOne({
      where: {
        user_id,
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

  async deleteUserRole(user: User, role_id: string) {
    user.roles = user.roles.filter((role) => role.role_id != role_id);
    await user.save();
    return "删除成功";
  }

  findOne(role_id: string) {
    return this.roleRepository.findOne({ where: { role_id } });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { affected } = await this.roleRepository.update(
      { role_id: id },
      updateRoleDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async is_frozen(frozenRoleDto: FrozenRoleDto) {
    const { role_id, is_frozen } = frozenRoleDto;
    const role = await this.roleRepository.findOne({
      where: {
        role_id,
      },
      relations: {
        users: true,
      },
    });
    if (is_frozen && role.users.length > 0) {
      throw new BadRequestException("当前角色还有用户未转移");
    }
    role.is_frozen = is_frozen;
    await role.save();
    return "操作成功！";
  }
}
