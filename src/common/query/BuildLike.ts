import { FindOptionsWhere, Like } from "typeorm";

export function BuildLike<T extends Record<string, any>>(
  dto: T,
  likes: Array<keyof T>,
): FindOptionsWhere<T> {
  const obj = {};

  Object.keys(dto).forEach((key) => {
    if (likes.includes(key)) {
      obj[key] = Like(`%${dto[key]}%`);
    }
  });
  return obj;
}
