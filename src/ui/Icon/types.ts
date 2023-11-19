import * as iconMap from "./icons";
import { ReactNode } from "react";

export type TIconName = keyof typeof iconMap;

export interface IIconProps {
  name?: TIconName;
  size?: "xxl" | "xl" | "l" | "m" | "s+" | "s" | "xs" | "xxs";
  background?: boolean;
  iconColor:
    | "grey"
    | "blue"
    | "green"
    | "switchActive"
    | "switchInactive"
    | "black"
    | "white";
  children?: ReactNode;
}
