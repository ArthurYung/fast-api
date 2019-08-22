export function dateFormat(date?: Date | number, format?: string): string {
  let token = /d{1,4}|m{1,4}|yy(?:yy)?|H{1,2}|M{1,2}|S{1,2}/g;
  if (Boolean(date)) {
    date = date instanceof Date ? date : new Date(date as number);
    let flags: { [x: string]: string } = {
      yyyy: date.getFullYear().toString(),
      mm: ("0" + (date.getMonth() + 1)).slice(-2),
      dd: ("0" + date.getDate()).slice(-2),
      HH: ("0" + date.getHours()).slice(-2),
      MM: ("0" + date.getMinutes()).slice(-2),
      SS: ("0" + date.getSeconds()).slice(-2)
    };
    if (!format) {
      // 默认显示格式
      format = "yyyy-mm-dd HH:MM:SS";
    }
    format = format.replace(token, function(match: string) {
      if (match in flags) {
        return flags[match];
      }
      return "";
    });
    return format;
  }
  return "";
}
