import request from "@/util/modules/request";

export const querySchoolByQw = async (params: any) => {
  return await request({
    url: "/sys/registerByQywx/querySchool",
    method: "post",
    data: params,
  });
};

export const queryUserInfoByQw = async (params: any) => {
  return await request({
    url: "/sys/registerByQywx/queryUserInfo",
    method: "post",
    data: params,
  });
};

export const loginByQw = async (params: any) => {
  return await request({
    url: "/login/app/corpUserId",
    method: "post",
    data: params,
  });
};

export const registerByQywx = async (params: any) => {
  return await request({
    url: "/sys/registerByQywx",
    method: "post",
    data: params,
  });
};
