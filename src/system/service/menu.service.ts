import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Menu } from "@/system/entities/menu.entity";
import { In, Repository } from "typeorm";
import { UserService } from "@/system/service/user.service";
import { User } from "@/system/entities/user.entity";
import { MenuTypeConstants } from "@/constants/system.constants";
import { CreateMenuDto, UpdateMenuDto } from "@/system/dto/menu.dto";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly userService: UserService,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.save(createMenuDto);
  }

  async getRouteList(user: User) {
    if (this.userService.hasAdmin(user)) {
      return this.menuRepository.find({
        where: {
          menu_type: In([MenuTypeConstants.M, MenuTypeConstants.C]),
        },
      });
    }
    return this.menuRepository.find({
      where: {
        menu_type: In([MenuTypeConstants.M, MenuTypeConstants.C]),
        roles: {
          users: {
            user_id: user.user_id,
          },
        },
      },
    });
  }

  findAll() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return this.menuRepository.findOne({ where: { menu_id: id } });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const { affected } = await this.menuRepository.update(
      { menu_id: id },
      updateMenuDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async remove(id: number) {
    const menu = await this.menuRepository.findOne({
      where: {
        pid: id,
      },
    });

    if (menu) {
      throw new BadRequestException("存在子级，不允许删除");
    }

    const { affected } = await this.menuRepository.delete({
      menu_id: id,
    });
    return affected ? "删除成功" : "删除失败";
  }
}
