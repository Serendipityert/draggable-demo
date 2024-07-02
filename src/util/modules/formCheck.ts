// 提交表单数据校验，form数据及规则必传
export function checkData(data: any, rule: any) {
  let resData = { sign: true, msg: "" };
  for (let key in data) {
    if (data[key] == "" || data[key] == null || data[key] == 0) {
      for (let m in rule) {
        if (rule[m].key == key) {
          resData.sign = false;
          resData.msg = rule[m].value;
          return resData;
        }
      }
    }
  }
  return resData;
}
