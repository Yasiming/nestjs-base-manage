import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { CommonEntity } from "@/common/entity/common.entity";
import { Role } from "@/system/entities/role.entity";
import { Dept } from "@/system/entities/dept.entity";

@Entity({
  name: "sys_user",
})
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  user_id: string;

  @Column({ length: 30, unique: true, comment: "用户账号" })
  user_name: string;

  @Column({ length: 30, comment: "用户昵称" })
  nick_name: string;

  @Column({ length: 2, nullable: true, comment: "用户类型", default: "00" })
  user_type: string;

  @Column({ comment: "冻结", nullable: true, default: false })
  is_frozen: boolean;

  @Column({ length: 100, nullable: true, comment: "头像" })
  avatar: string;

  @Column({ length: 100, comment: "密码" })
  password: string;

  @Column({ nullable: true, comment: "用户邮箱" })
  email: string;

  @Column({ length: 11, nullable: true, comment: "手机号" })
  phone: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "sys_user_role",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "user_id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "role_id",
    },
  })
  roles: Role[];

  @ManyToOne(() => Dept, (dept) => dept.users)
  @JoinColumn({ name: "dept_id" })
  dept: Dept;
}
