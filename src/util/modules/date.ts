// 获取常用时间
import dayjs from "dayjs";

export const LAST_7_DAYS = [
  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  dayjs().subtract(1, "day").format("YYYY-MM-DD"),
];

export const LAST_30_DAYS = [
  dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  dayjs().subtract(1, "day").format("YYYY-MM-DD"),
];

export const dateFormat = (date: string): string => {
  // 将时间字符串转换为 Date 对象
  const dateObject = new Date(date);

  // 格式化日期部分
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  // 格式化时间部分
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  // 最终格式化结果
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

export const dateFormatYMH = (date: string): string => {
  // 将时间字符串转换为 Date 对象
  const dateObject = new Date(date);

  // 格式化日期部分
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  // 最终格式化结果
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatDate = (date: Date, fmt: string) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o: any = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};

function padLeftZero(str: string) {
  return ("00" + str).slice(-2);
}

export function getDateDiff(
  startTime: string,
  endTime: string,
  diffType: string
) {
  //将时间转为xxxx/xx/xx格式
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");

  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  let sTime = new Date(startTime); //开始时间
  let eTime = new Date(endTime); //结束时间
  //作为除数的数字
  let divNum = 1 as any;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return Number((eTime.getTime() - sTime.getTime()) / Number(divNum));
}

export function formatSeconds(value: string) {
  let result = parseInt(value);
  let h =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600);
  let m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  let s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60);

  let res = "";

  if (h !== "00") {
    h = h.toString();
    if (h.substring(0, 1) == "0") {
      h = h.substring(1, h.length);
    }
    res += `${h}小时`;
  }
  if (m !== "00") {
    m = m.toString();
    if (m.substring(0, 1) == "0") {
      m = m.substring(1, m.length);
    }
    res += `${m}分`;
  }
  res += `${s}秒`;
  return res;
}
