import React, { useCallback, useEffect, useState } from "react";
import {
  TShortcutGroupProps,
  TShortcutGroupValue,
  TShortcutOptionValue,
} from "./types";
import { ShortcutGroupAtom } from "./atoms";
import { ShortcutButton } from "./ShortcutButton";

export const ShortcutGroup = ({
  value: currentSelected,
  options,
  onChange,
  multiple,
  behavior = "checkbox",
}: TShortcutGroupProps) => {
  const [selected, setSelected] = useState(currentSelected);

  const handleClick = useCallback(
    (value: TShortcutOptionValue) => () => {
      // uncheck
      if (isCheckbox(behavior) && isOptionSelected(currentSelected, value)) {
        setSelected((prev) => prev && prev.filter((v) => v !== value));
        return;
      }

      multiple
        ? setSelected((prev) => prev && [...prev, value])
        : setSelected([value]);
    },
    [currentSelected, multiple, behavior],
  );

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <ShortcutGroupAtom>
      {options.map((option) => {
        return (
          <ShortcutButton
            key={option.label}
            {...option}
            onClick={handleClick(option.value)}
            selected={isOptionSelected(currentSelected, option.value)}
          ></ShortcutButton>
        );
      })}
    </ShortcutGroupAtom>
  );
};

const isOptionSelected = (
  currentSelected: TShortcutGroupValue,
  value: TShortcutOptionValue,
) => !!(currentSelected && currentSelected.includes(value));

const isCheckbox = (behavior: TShortcutGroupProps["behavior"]) =>
  behavior === "checkbox";
