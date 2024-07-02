export function isEmpty(obj: string) {
  if (
    typeof obj === "undefined" ||
    obj == null ||
    obj === "" ||
    obj === "null"
  ) {
    return true;
  } else {
    return false;
  }
}
