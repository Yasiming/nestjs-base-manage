import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommonEntity } from "@/common/entity/common.entity";

@Entity({
  name: "sys_dict_type",
})
export class DictType extends CommonEntity {
  @PrimaryGeneratedColumn()
  dict_id: number;

  @Column({ length: 30 })
  dict_type: string;

  @Column({ length: 30 })
  dict_name: string;

  @Column()
  status: boolean;

  @OneToMany(() => DictData, (dictData) => dictData.dict_type)
  dict_data: DictData[];
}

@Entity({
  name: "sys_dict_data",
})
export class DictData extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  dict_code: string;

  @Column({ length: 30 })
  dict_label: string;

  @Column({ length: 30 })
  dict_value: string;

  @Column({ default: false })
  status: boolean;

  @Column({ length: 1, default: "N" })
  is_default: string;

  @ManyToOne(() => DictType, (dictType) => dictType.dict_type, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "dept_type",
  })
  dict_type: DictType;
}
