import styled from "styled-components";
import { Checkbox as CheckboxPrime, CheckboxProps } from "primereact/checkbox";
import { Text } from "../Typography";

export type CheckboxType<T> = {
  checked: boolean;
  onChange: CheckboxProps["onChange"];
  value: T;
  label: string;
  children?: any;
};
export function Checkbox<T>({
  value,
  checked,
  label,
  children,
  onChange,
}: CheckboxType<T>) {
  return (
    <Wrapper>
      <CheckboxPrime
        inputId={label}
        checked={checked}
        value={value}
        onChange={onChange}
      />
      <Label htmlFor={label}>
        <Text.T3Medium>{label}</Text.T3Medium>
      </Label>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-left: 1rem;
`;
