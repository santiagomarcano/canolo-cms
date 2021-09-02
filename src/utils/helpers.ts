export const getDateTime = (date: string | number): string => {
  const d = new Date(date);
  if (isNaN(d as any)) {
    return "";
  }
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
};

export const formatModuleNameAlias = ({
  id,
  is,
}: {
  id: string | number;
  is: "name" | "alias";
}): string => {
  console.log("Aqui?", id);
  const arr = id.toString().split("-");
  if (is === "alias") {
    return arr[1];
  } else if (is === "name") {
    return arr[0];
  }
  return "";
};
