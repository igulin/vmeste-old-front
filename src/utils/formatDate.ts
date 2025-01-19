import {ru} from "date-fns/locale"
import { format } from "date-fns";

/*
export const formatDate = (date: Date) => {

  return format(date, "EEEE d")
}
*/

export default function formatDate(date: Date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: ru
  });
}