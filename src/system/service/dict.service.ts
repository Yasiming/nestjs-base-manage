import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DictData, DictType } from "@/system/entities/dict.entity";
import { Repository } from "typeorm";
import {
  CreateDictDataDto,
  CreateDictTypeDto,
  UpdateDictDataDto,
  UpdateDictTypeDto,
} from "@/system/dto/dict.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(DictType)
    private readonly DictRepository: Repository<DictType>,
    @InjectRepository(DictData)
    private readonly DictDataRepository: Repository<DictData>,
  ) {}

  async createType(createDictTypeDto: CreateDictTypeDto) {
    return this.DictRepository.save(createDictTypeDto);
  }

  async createDictDataDto(createDictDataDto: CreateDictDataDto) {
    const dict = await this.DictRepository.findOne({
      where: {
        dict_type: createDictDataDto.dict_type,
      },
      relations: {
        dict_data: true,
      },
    });
    if (!dict) {
      throw new BadRequestException("字典不存在");
    }
    const dictData = plainToClass(DictData, createDictDataDto);
    dict.dict_data = [...dict.dict_data, dictData];
    return dict.save();
  }

  async findAll() {
    return this.DictRepository.find({
      relations: {
        dict_data: true,
      },
    });
  }

  async updateType(dict_id: number, updateDictTypeDto: UpdateDictTypeDto) {
    const { affected } = await this.DictRepository.update(
      {
        dict_id,
      },
      updateDictTypeDto,
    );

    return affected ? "更新成功" : "更新失败";
  }

  async updateData(dict_code: string, updateDeptTypeDto: UpdateDictDataDto) {
    const { affected } = await this.DictDataRepository.update(
      {
        dict_code,
      },
      updateDeptTypeDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async deleteType(id: number) {
    return this.DictRepository.delete({ dict_id: id });
  }

  async deleteData(id: string) {
    return this.DictDataRepository.delete({ dict_code: id });
  }
}
