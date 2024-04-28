import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DictService } from "@/system/service/dict.service";
import {
  CreateDictDataDto,
  CreateDictTypeDto,
  UpdateDictDataDto,
  UpdateDictTypeDto,
} from "@/system/dto/dict.dto";
import { ApiTags } from "@nestjs/swagger";
import {
  SwaggerBody,
  SwaggerQuery,
} from "@/common/decorator/swagger.decorator";
import { RequireLoginKey } from "@/common/decorator";

@Controller("dict")
@ApiTags("字典管理")
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post("type")
  @RequireLoginKey("system:dict:createType")
  @SwaggerBody("创建字典类型", CreateDictTypeDto)
  createType(@Body() createDictTypeDto: CreateDictTypeDto) {
    return this.dictService.createType(createDictTypeDto);
  }

  @Post("data")
  @RequireLoginKey("system:dict:createTypeData")
  @SwaggerBody("创建类型内容", CreateDictDataDto)
  createData(@Body() createDictDataDto: CreateDictDataDto) {
    return this.dictService.createDictDataDto(createDictDataDto);
  }

  @Get("all")
  @RequireLoginKey("system:dict:findAll")
  @SwaggerQuery("查询所有字典")
  findAll() {
    return this.dictService.findAll();
  }

  @Patch("type:id")
  @RequireLoginKey("system:dict:updateType")
  @SwaggerBody("更新类型", UpdateDictTypeDto)
  updateType(
    @Param("id") id: string,
    @Body() updateDeptTypeDto: UpdateDictTypeDto,
  ) {
    return this.dictService.updateType(+id, updateDeptTypeDto);
  }

  @Patch("data:id")
  @RequireLoginKey("system:dict:updateData")
  @SwaggerBody("更新类型内容", UpdateDictDataDto)
  updateData(
    @Param("id") id: string,
    @Body() updateDictDataDto: UpdateDictDataDto,
  ) {
    return this.dictService.updateData(id, updateDictDataDto);
  }

  @Delete("type:id")
  @RequireLoginKey("system:dict:deleteType")
  @SwaggerBody("删除类型", "")
  deleteType(@Param("id") id: string) {
    return this.dictService.deleteType(+id);
  }

  @Delete("data:id")
  @RequireLoginKey("system:dict:deleteData")
  @SwaggerBody("删除类型内容", "")
  deleteData(@Param("id") id: string) {
    return this.dictService.deleteData(id);
  }
}
