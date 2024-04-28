import { CommonEntity } from "@/common/entity/common.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuTypeConstants } from "@/constants/system.constants";
import { Role } from "@/system/entities/role.entity";

@Entity({
  name: "sys_menu",
})
export class Menu extends CommonEntity {
  @PrimaryGeneratedColumn()
  menu_id: number;

  @Column({ length: 50, comment: "菜单名称" })
  menu_name: string;

  @Column({ length: 1, type: "char", comment: "菜单类型M-C-F" })
  menu_type: MenuTypeConstants;

  @Column()
  pid: number;

  @Column({ comment: "排序" })
  menu_sort: number;

  @Column({ nullable: true, comment: "路径" })
  path: string;

  @Column({ nullable: true, comment: "组件路径" })
  component: string;

  @Column({ nullable: true, comment: "缓存组件", default: false })
  is_alive: boolean;

  @Column({ nullable: true, comment: "外链" })
  is_frame: boolean;

  @Column({ nullable: true, comment: "是否显示", default: false })
  hidden: boolean;

  @Column({ nullable: true, comment: "图标" })
  icon: string;

  @Column({ nullable: true, comment: "权限" })
  perms: string;

  @ManyToMany(() => Role, (role) => role.menus, {
    onDelete: "CASCADE",
  })
  roles: Role[];
}
