import dayjs from "dayjs";
import { registerLocale } from "react-datepicker";
import { russianMonths } from "utils/utils";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
require("dayjs/locale/ru");

export const datePickerLocale: Locale = {
  ...ru,
  localize: {
    ...ru.localize!,
    month: (value: string) =>
      russianMonths[value as unknown as keyof typeof russianMonths],
  },
};

export const convertToRussianDate = (string: string, format = "DD.MM.YYYY") => {
  const newString = String(string)?.includes(".")
    ? String(string)?.split(".").reverse().join("-")
    : String(string);
  return dayjs(newString).locale("ru").format(format);
};

export const convertToAmericanDate = (
  string: string,
  format = "YYYY-MM-DD"
) => {
  const newString = String(string)?.includes(".")
    ? String(string)?.split(".").reverse().join("-")
    : String(string);
  return dayjs(newString).format(format);
};

export const datePickerTextDateGenerator = (date: Date) => {
  return `${
    russianMonths[
      new Date(date).getMonth() as number as keyof typeof russianMonths
    ]
  } ${new Date(date).getFullYear()}`;
};

export const milliSecondsToDuration = (milliSeconds: number): string =>
  new Date(milliSeconds * 1000).toISOString().substring(11, 19);

export const addLeadingZero = (num: number) => String("0" + num).slice(-2);

export function getDaysArray(startDate: string, endDate: string, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray.map((item) => dayjs(item).format("YYYY-MM-DD")).sort();
}
