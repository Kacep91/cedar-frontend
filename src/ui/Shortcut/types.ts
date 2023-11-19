import { TIconName } from "../Icon/types";

export type TShortcutOptionValue = number | string;

export type TShortcutOption = {
  label: string;
  value: TShortcutOptionValue;
  disabled?: boolean;
  iconName?: TIconName;
};

export type TShortcutGroupValue = Nullable<TShortcutOptionValue[]>;

export type TShortcutGroupProps = {
  name: string;
  label?: string;
  value: TShortcutGroupValue;
  onChange: (value: TShortcutGroupValue) => void;
  options: TShortcutOption[];

  /**
   * Есть множественный выбор
   */
  multiple?: boolean;

  /**
   * Поведение аналогично
   * checkbox - выбранный может быть отжат
   * radio - всегда выбран один из
   */
  behavior?: "checkbox" | "radio";
};
