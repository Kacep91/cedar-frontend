import styled from "styled-components";
import { Dropdown as DropdownPrime } from "primereact/dropdown";

export const Dropdown = styled(DropdownPrime)`
  border: 1px solid #c7cccf;
  border-radius: 10px;

  :not(.p-disabled):hover {
    border-color: #c7cccf;
  }

  &&.p-focus {
    outline: 0;
    box-shadow: unset;
  }
`;
