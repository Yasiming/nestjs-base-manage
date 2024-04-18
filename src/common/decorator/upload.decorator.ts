//上传类型验证
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  applyDecorators,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from "@nestjs/common";

export function filterFilter(type: string) {
  return (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.includes(type)) {
      callback(new UnsupportedMediaTypeException("文件类型错误"), false);
    } else {
      callback(null, true);
    }
  };
}

//文件上传
export function Upload(field = "file", options: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(field, options)));
}

//图片上传
export function Image(field = "file") {
  return Upload(field, {
    //上传文件大小限制
    limits: { fileSize: Math.pow(1024, 2) * 4 },
    fileFilter: filterFilter("image"),
  } as MulterOptions);
}

//文档上传
export function Document(field = "file") {
  return Upload(field, {
    //上传文件大小限制
    limits: Math.pow(1024, 2) * 5,
    fileFilter: filterFilter("document"),
  } as MulterOptions);
}
