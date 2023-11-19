import styled, { css } from "styled-components";
import { Icon } from "../Icon";

export const ShortcutGroupAtom = styled.fieldset`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0;
`;

export const IconAtom = styled(Icon)``;

export const ShortcutButtonAtom = styled.button<{
  selected: boolean;
  disabled: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  height: 32px;
  background: var(--control-inactive-bg);
  border-radius: 30px;
  font-size: 14px;
  line-height: 18px;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.5;
          pointer-events: none;
        `
      : ""}

  ${({ selected }) =>
    selected
      ? css`
          background-color: var(--control-active-bg);

          > span {
            color: var(--black);
          }
        `
      : css`
          > span {
            color: var(--secondary-text);
          }
        `}
`;
