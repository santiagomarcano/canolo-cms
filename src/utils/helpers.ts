export const getDateTime = (date: string | number): string => {
  const d = new Date(date);
  if (isNaN(d as any)) {
    return "";
  }
  const hours = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`;
  const minutes = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`;
  const day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
  const month = d.getMonth() > 9 ? d.getMonth() : `0${d.getMonth()}`;
  return `${day}-${month} - ${hours}:${minutes}`;
};
