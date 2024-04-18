import * as dayjs from "dayjs";

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
