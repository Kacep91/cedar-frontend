import React, { MouseEventHandler } from "react";
import { TShortcutOption } from "./types";
import { IconAtom, ShortcutButtonAtom } from "./atoms";

type ShortcutButtonProps = TShortcutOption & {
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const ShortcutButton = ({
  label,
  value,
  iconName,
  disabled,
  selected,
  onClick,
}: ShortcutButtonProps) => {
  const icon = iconName ? <IconAtom name={iconName} /> : null;

  return (
    <ShortcutButtonAtom
      selected={selected}
      disabled={!!disabled}
      onClick={onClick}
    >
      {icon}
      {label}
    </ShortcutButtonAtom>
  );
};
