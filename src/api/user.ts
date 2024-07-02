import request from "@/util/modules/request";

/**
 * 获取用户信息
 * @param {*} params
 * @returns
 */
export const queryUserInfo = async (params: any) => {
  return await request({
    url: "/sys/userInfo/pageQuery",
    method: "post",
    data: params,
  });
};
