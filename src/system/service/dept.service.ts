import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDeptDto, UpdateDeptDto } from "@/system/dto/dept.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Dept } from "@/system/entities/dept.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private readonly deptRepository: Repository<Dept>,
  ) {}

  async create(createDeptDto: CreateDeptDto) {
    return this.deptRepository.save(createDeptDto);
  }

  async findOne(dept_id: number) {
    return this.deptRepository.findOneBy({ dept_id });
  }

  async update(id: number, updateDeptDto: UpdateDeptDto) {
    const { affected } = await this.deptRepository.update(
      {
        dept_id: id,
      },
      updateDeptDto,
    );
    return affected ? "更新成功" : "更新失败";
  }

  async findDeptAllUser(dept_id: number) {
    const dept_child = await this.deptRepository.find({
      where: {
        pid: dept_id,
      },
    });

    const childIds = dept_child.map((dept) => dept.dept_id);

    const dept = await this.deptRepository.findOne({
      where: {
        dept_id: In([dept_id, ...childIds]),
      },
      relations: {
        users: true,
      },
    });
    dept.users.forEach((user) => {
      delete user.password;
    });
    return dept.users;
  }

  async remove(dept_id: number) {
    const dept = await this.deptRepository.findOne({
      where: [{ dept_id }, { pid: dept_id }],
    });
    if (dept.users.length > 0) {
      throw new BadRequestException("当前部门还有未分配走的用户，不能删除");
    }

    if (dept) {
      throw new BadRequestException("存在子级不能删除");
    }
    const { affected } = await this.deptRepository.delete({
      dept_id,
    });
    return affected ? "删除成功" : "删除失败";
  }
}
