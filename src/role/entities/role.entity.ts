import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({
  name: "sys_role",
})
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  role_id: number;

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

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
