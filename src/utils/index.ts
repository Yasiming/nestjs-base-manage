import * as dayjs from "dayjs";
import { MenuTypeConstants } from "@/constants/system.constants";

export const dateTimeTransformer = {
  to: (value: Date) => {
    // 将日期时间格式化为你想要的格式
    return value;
  },
  from: (value: string) => {
    // 将字符串转换回日期时间对象
    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
  },
};

/**
 * 首字母转大写
 * @param str 字符串
 */
export function capitalizeFirstLetter(str: string) {
  if (str.charAt(0) === "/") {
    str = str.slice(1);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 判断数组全符合
 * @param subset
 * @param array
 */
export function isSubsetOfArray(subset: string[], array: string[]) {
  return subset.some((item) => array.includes(item));
}
