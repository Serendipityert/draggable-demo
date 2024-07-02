// 消息提示
import { notice } from "@/util";

export const formDataFormat = (form: any) => {
  let newForm = {} as any;
  for (let item in form) {
    if (typeof form[item] == "object") {
      let str = "";
      form[item].map((m: any) => {
        str += m + ",";
      });
      newForm[item] = str.slice(0, -1);
    } else {
      if (form[item] === "true" || form[item] === "false") {
        newForm[item] = JSON.parse(form[item]);
      } else {
        newForm[item] = form[item];
      }
    }
  }
  return newForm;
};

export const isNullCheck = (form: any, warningMsgInfo: any) => {
  for (let item in form) {
    if (typeof form[item] === "string") {
      if (form[item] === "") {
        notice.MESSAGE({
          theme: "warning",
          content: warningMsgInfo[item],
        });
        return;
      }
    } else {
      if (form[item].length === 0) {
        notice.MESSAGE({
          theme: "warning",
          content: warningMsgInfo[item],
        });
        return;
      }
    }
  }
};

export const isFormValidator = (
  warningMsgInfo: any,
  val: any,
  key: any,
  isStr: any
) => {
  if (warningMsgInfo[key].required) {
    return isStr ? val !== "" : val.length !== 0;
  } else {
    return true;
  }
};

export const checkFormData = (form: any, warningMsgInfo: any) => {
  for (let key in form) {
    if (
      form[key] == "" ||
      form[key] == null ||
      form[key] == "[]" ||
      // @ts-ignore
      form[key] == [] ||
      typeof form[key] == undefined
    ) {
      if (warningMsgInfo[key].required) {
        notice.MESSAGE({
          theme: "warning",
          content: warningMsgInfo[key].msg,
        });
        return;
      }
    }
  }
};
