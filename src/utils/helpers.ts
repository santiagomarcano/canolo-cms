export const getDateTime = (date: string | number): string => {
  const d = new Date(date);
  if (isNaN(d as any)) {
    return "";
  }
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
};
