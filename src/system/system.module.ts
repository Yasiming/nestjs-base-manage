import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/system/entities/user.entity";
import { Role } from "@/system/entities/role.entity";
import { UserService } from "@/system/service/user.service";
import { UserController } from "@/system/controller/user.controller";
import { MenuService } from "@/system/service/menu.service";
import { Menu } from "@/system/entities/menu.entity";
import { MenuController } from "@/system/controller/menu.controller";
import { RoleController } from "@/system/controller/role.controller";
import { RoleService } from "@/system/service/role.service";
import { Dept } from "@/system/entities/dept.entity";
import { DeptController } from "@/system/controller/dept.controller";
import { DeptService } from "@/system/service/dept.service";
import { DictData, DictType } from "@/system/entities/dict.entity";
import { DictController } from "@/system/controller/dict.controller";
import { DictService } from "@/system/service/dict.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Menu, Dept, DictType, DictData]),
  ],
  controllers: [
    UserController,
    RoleController,
    MenuController,
    DeptController,
    DictController,
  ],
  providers: [UserService, RoleService, MenuService, DeptService, DictService],
})
export class SystemModule {}
