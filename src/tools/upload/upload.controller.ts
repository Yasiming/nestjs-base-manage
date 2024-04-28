import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
} from "@nestjs/common";
import { Image } from "@/common/decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("upload")
@ApiTags("文件上传")
export class UploadController {
  @Post("image")
  @Image("file", 4)
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file?.path) {
      throw new BadRequestException("上传失败，请检测参数");
    }
    return file?.path;
  }
}
