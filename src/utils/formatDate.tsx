import { format } from "date-fns";

const formatDate = (
  date: Date | string | number,
  dateFormat: string = "yyyy-MM-dd HH:mm:ss",
): string => {
  if (!date) return "";
  return format(new Date(date), dateFormat);
};

export { formatDate };
