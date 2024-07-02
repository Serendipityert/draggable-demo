import request from "@/util/modules/request";

export const fileUpload = async (data: any) => {
  return await request({
    url: "/upload/file",
    method: "post",
    data,
  });
};
