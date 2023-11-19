import styled from "styled-components";
import { InputText as InputTextPrime } from "primereact/inputtext";

export const InputText = styled(InputTextPrime)`
  border: 1px solid var(--grey-4);
  border-radius: 10px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  padding: 6.5px 16px !important;
  min-height: 34px;
  width: 100%;

  :enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: none;
    border-color: var(--grey-4);
  }

  :enabled:hover {
    border-color: var(--grey-4);
  }
`;
