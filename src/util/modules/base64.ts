const Base64 = {
  //加密
  encode(str: string) {
    return btoa(
      encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(_match: any, p1: any) {
          // @ts-ignore
          return String.fromCharCode("0x" + p1);
        }
      )
    );
  },
  //解密
  decode(str: string) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  },
};

export const base64ToPNG = (base64Data: any) => {
  // 将Base64字符串转换为Blob对象
  const base64Blob = base64ToBlob(base64Data);
  // 创建一个指向该Blob的URL
  const blobUrl = URL.createObjectURL(base64Blob);
  return blobUrl;
};

export const base64ToBlob = (base64Data: any) => {
  // 将Base64字符串转换为ArrayBuffer
  const b64 = atob(base64Data.split(",")[1]);
  let len = b64.length;
  const buffer = new ArrayBuffer(len);
  const uview = new Uint8Array(buffer);

  for (let i = 0; i < len; i++) {
    uview[i] = b64.charCodeAt(i);
  }
  // 创建Blob对象
  return new Blob([buffer], { type: "image/png" });
};

export default Base64;
