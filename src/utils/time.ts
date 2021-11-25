import { formatDistanceToNowStrict } from "date-fns";
import zhTW from "date-fns/locale/zh-TW";

export const second = (num: number) => num * 1000;
export const minute = (num: number) => num * second(60);
export const hour = (num: number) => num * minute(60);
export const day = (num: number) => num * hour(24);

export const formatDistanceToNow = (time: Date) =>
  formatDistanceToNowStrict(time, { locale: zhTW });
