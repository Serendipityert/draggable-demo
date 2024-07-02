import request from "@/util/modules/request";

/**
 * 获取省市区县树结构
 * @param data
 * @returns
 */
export const getCascaderAreaList = async (data: any) => {
  return await request({
    url: "/sys/getCascaderAreaList",
    method: "post",
    data,
  });
};
