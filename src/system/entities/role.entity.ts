import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommonEntity } from "@/common/entity/common.entity";
import { Menu } from "@/system/entities/menu";
import { User } from "@/system/entities/user.entity";

@Entity({
  name: "sys_role",
})
export class Role extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  role_id: string;

  @Column({ length: 30, comment: "角色名称" })
  role_name: string;

  @Column({ length: 100, comment: "角色KEY" })
  role_key: string;

  @Column({ comment: "排序" })
  role_sort: number;

  @Column({ comment: "冻结", nullable: true, default: false })
  is_frozen: boolean;

  @CreateDateColumn()
  createTime: Date;

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable({
    name: "sys_role_menu",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "role_id",
    },
    inverseJoinColumn: {
      name: "menu_id",
      referencedColumnName: "menu_id",
    },
  })
  menus: Menu[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
