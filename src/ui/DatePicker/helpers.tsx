import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { datePickerTextDateGenerator } from "utils/date";
import { Icon } from "../Icon";

export const renderCustomHeader = ({
  date,
  increaseMonth,
  decreaseMonth,
}: ReactDatePickerCustomHeaderProps) => (
  <div
    style={{
      margin: 10,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Icon name={"arrowLeftIcon"} onClick={decreaseMonth} />
    <div className="datePickerYear">{datePickerTextDateGenerator(date)}</div>
    <Icon name={"arrowRightIcon"} onClick={increaseMonth} />
  </div>
);
