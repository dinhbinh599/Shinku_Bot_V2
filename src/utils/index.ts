/**
 * It takes a timestamp and returns an object with three properties: date, time, and datetime
 * @param {Date} timestamp - Date - The timestamp you want to convert
 * @returns An object with three properties: date, time, and datetime.
 */
export const datetimeConverter = (timestamp: Date | number | string): { [key: string]: string } => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`;
    const minute = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    const second = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`;
    return {
      date: `${day}/${month}/${year}`,
      time: `${hour}/${minute}/${second}`,
      datetime: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
      studentBirthday: `${month}/${day}`,
    };
  };


  export const sortArray = {
    asc: (arr: Array<any>, field: string) =>
      arr?.sort((a, b) => (a[field as keyof Object] > b[field as keyof Object] ? 1 : -1)),
    desc: (arr: Array<any>, field: string) =>
      arr?.sort((a, b) => (a[field as keyof Object] > b[field as keyof Object] ? -1 : 1)),
    ascAlphabet: (arr: Array<any>, field: string) =>
      arr?.sort((a, b) => (a[field as keyof Object] > b[field as keyof Object] ? 1 : 1)),
    descAlphabet: (arr: Array<any>, field: string) =>
      arr?.sort((a, b) => (a[field as keyof Object] > b[field as keyof Object] ? -1 : 1)),
  };

  export const timeout = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));