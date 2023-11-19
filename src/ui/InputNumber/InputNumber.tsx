import styled from "styled-components";
import { InputNumber as InputNumberPrime } from "primereact/inputnumber";

export const InputNumber = styled(InputNumberPrime)`
  & input {
    border: 1px solid var(--grey-4);
    border-radius: 10px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 700;
    padding: 6.5px 16px !important;
    min-height: 34px;

    :enabled:focus {
      outline: 0 none;
      outline-offset: 0;
      box-shadow: none;
      border-color: var(--grey-4);
    }

    :enabled:hover {
      border-color: var(--grey-4);
    }
  }
`;
