import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { CommonEntity } from "@/common/entity/common.entity";
import { User } from "@/system/entities/user.entity";

@Entity({
  name: "sys_dept",
})
export class Dept extends CommonEntity {
  @PrimaryGeneratedColumn()
  dept_id: number;

  @Column()
  pid: number;

  @Column({ length: 30 })
  dept_name: string;

  @Column()
  dept_sort: number;

  @Column({ length: 30 })
  leader: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ comment: "冻结", nullable: true, default: false })
  is_frozen: boolean;

  @OneToMany(() => User, (user) => user.dept)
  users: User[];
}
