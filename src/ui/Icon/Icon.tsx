import { Fragment, HTMLProps } from "react";
import * as iconMap from "./icons";
import { IconAtom } from "./atoms";
import { IIconProps } from "./types";

export function Icon({
  className,
  style,
  name,
  size,
  background,
  iconColor,
  children,
  onClick,
  ...props
}: Omit<IIconProps, "iconColor"> &
  Omit<HTMLProps<HTMLSpanElement>, "size"> & {
    iconColor?: IIconProps["iconColor"];
  }): JSX.Element {
  const Cmp = name && iconMap[name] ? iconMap[name] : Fragment;
  const color = iconColor || "grey";
  return (
    <IconAtom
      size={size}
      clickable={!!onClick}
      background={!!background}
      iconColor={color}
      onClick={onClick}
      name={name}
      className={className}
      style={style}
    >
      <Cmp>{children}</Cmp>
    </IconAtom>
  );
}
