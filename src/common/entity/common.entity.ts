import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { dateTimeTransformer } from "../../utils";

export abstract class CommonEntity extends BaseEntity {
  @CreateDateColumn({ transformer: dateTimeTransformer })
  create_time: Date;

  @UpdateDateColumn({ transformer: dateTimeTransformer })
  update_time: Date;
}
