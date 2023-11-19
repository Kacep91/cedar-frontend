import styled, { css } from "styled-components";
import {
  DataTable as DataTablePrime,
  DataTableProps,
} from "primereact/datatable";
import React from "react";

const defaultBorderColor = "#eff1f8";

type BorderProps = {
  columnBorder?: boolean | string;
  rowBorder?: boolean | string;
};
const bordersCss = ({
  columnBorder = defaultBorderColor,
  rowBorder = defaultBorderColor,
}: BorderProps) => {
  const columnBorderColor =
    columnBorder === true ? defaultBorderColor : columnBorder;
  const rowBorderColor = rowBorder === true ? defaultBorderColor : rowBorder;

  if (columnBorder && rowBorder)
    return css`
      &.p-datatable .p-datatable-tbody > tr > td {
        border: 1px solid ${columnBorderColor};
        border-width: 0 0 1px 1px;
      }

      &.p-datatable .p-datatable-thead > tr > th {
        border: 1px solid ${columnBorderColor};
        border-width: 0 1px 1px 1px;
      }
    `;

  if (columnBorder)
    return css`
      &.p-datatable .p-datatable-tbody > tr > td {
        border: 1px solid ${columnBorderColor};
        border-width: 0 0 0 1px;
      }

      &.p-datatable .p-datatable-thead > tr > th {
        border: 1px solid ${columnBorderColor};
        border-width: 0 1px 0 1px;
      }
    `;

  if (rowBorder)
    return css`
      &.p-datatable .p-datatable-tbody > tr:not(:last-child) > td {
        border: 1px solid ${rowBorderColor};
        border-width: 0 0 1px 0;
      }

      &.p-datatable .p-datatable-tbody > tr:last-child > td {
        border: 0;
      }

      &.p-datatable .p-datatable-thead > tr > th {
        border: 1px solid ${rowBorderColor};
        border-width: 0 0 1px 0;
      }
    `;
};
export const DataTable = styled(
  ({
    className,
    columnBorder,
    rowBorder,
    ...props
  }: DataTableProps & BorderProps) => (
    <DataTablePrime className={className} {...props} />
  ),
)`
  font-size: 14px;
  line-height: 18px;

  ${bordersCss}

  &.p-datatable tr:first-child th:first-child {
    border-top-left-radius: 14px;
  }

  &.p-datatable tr:first-child th:last-child {
    border-top-right-radius: 14px;
  }

  &.p-datatable tr:last-child td:first-child {
    border-bottom-left-radius: 14px;
  }

  &.p-datatable tr:last-child td:last-child {
    border-bottom-right-radius: 14px;
  }

  &.p-datatable .p-datatable-tbody > tr > td {
    text-align: left;
    font-family: "IBM Plex Sans";
    font-size: 14px;
    line-height: 18px;
    padding: 15px 20px;
    color: var(--secondary-text) !important;
    font-weight: 400;
    letter-spacing: 0.26px;

    a {
      text-decoration: none;
    }
  }

  &.p-datatable .p-datatable-thead > tr > th,
  &.p-datatable .p-datatable-thead > tr > th:focus,
  &.p-datatable .p-sortable-column.p-highlight:not(.p-sortable-disabled):hover {
    background-color: var(--white) !important;
    color: var(--secondary-text) !important;
    height: 55px;
    box-shadow: unset;
    font-size: 14px;
    font-weight: 600;
    padding: 0 12px;
  }

  .p-sortable-column-icon:before {
    content: url("data:image/svg+xml,%3Csvg width='9' height='12' viewBox='0 0 9 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.34208 11.9997C4.5212 11.9984 4.69272 11.929 4.82039 11.8065L8.13027 8.57872C8.30497 8.4091 8.37366 8.16134 8.31036 7.92896C8.24706 7.69649 8.0614 7.51468 7.8234 7.45193C7.58531 7.38917 7.33106 7.45503 7.15626 7.62473L4.3335 10.3775L1.51074 7.62473C1.33594 7.45512 1.08168 7.38926 0.843588 7.45202C0.605589 7.51479 0.419928 7.6966 0.356636 7.92896C0.293337 8.16143 0.362023 8.40909 0.536722 8.57881L3.84661 11.8066H3.8467C3.97859 11.9333 4.15713 12.003 4.34232 11.9999L4.34208 11.9997Z' fill='%23939A9E'/%3E%3Cpath d='M4.34208 0.000267982C4.5212 0.00158167 4.69272 0.071003 4.82039 0.193523L8.13027 3.42128C8.30497 3.5909 8.37366 3.83866 8.31036 4.07104C8.24706 4.30351 8.0614 4.48532 7.8234 4.54807C7.58531 4.61083 7.33106 4.54497 7.15626 4.37527L4.3335 1.62254L1.51074 4.37527C1.33594 4.54488 1.08168 4.61074 0.843588 4.54798C0.605589 4.48521 0.419928 4.3034 0.356636 4.07104C0.293337 3.83857 0.362023 3.59091 0.536722 3.42119L3.84661 0.193429H3.8467C3.97859 0.0666895 4.15713 -0.00301456 4.34232 8.10623e-05L4.34208 0.000267982Z' fill='%23939A9E'/%3E%3C/svg%3E%0A");
    display: block;
  }

  th[aria-sort="ascending"] .p-sortable-column-icon:before {
    content: url("data:image/svg+xml,%3Csvg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.00858 11.9997C4.18771 11.9984 4.35922 11.929 4.48689 11.8065L7.79677 8.57872C7.97147 8.4091 8.04016 8.16134 7.97686 7.92896C7.91356 7.69649 7.7279 7.51468 7.48991 7.45193C7.25181 7.38917 6.99756 7.45503 6.82276 7.62473L4 10.3775L1.17724 7.62473C1.00244 7.45512 0.748187 7.38926 0.510092 7.45202C0.272093 7.51479 0.0864314 7.6966 0.0231397 7.92896C-0.0401593 8.16143 0.0285269 8.40909 0.203225 8.57881L3.51311 11.8066H3.51321C3.6451 11.9333 3.82363 12.003 4.00883 11.9999L4.00858 11.9997Z' fill='%23939A9E'/%3E%3Cpath d='M4.00858 0.000267982C4.18771 0.00158167 4.35922 0.071003 4.48689 0.193523L7.79677 3.42128C7.97147 3.5909 8.04016 3.83866 7.97686 4.07104C7.91356 4.30351 7.7279 4.48532 7.48991 4.54807C7.25181 4.61083 6.99756 4.54497 6.82276 4.37527L4 1.62254L1.17724 4.37527C1.00244 4.54488 0.748187 4.61074 0.510092 4.54798C0.272093 4.48521 0.0864314 4.3034 0.0231397 4.07104C-0.0401593 3.83857 0.0285269 3.59091 0.203225 3.42119L3.51311 0.193429H3.51321C3.6451 0.0666895 3.82363 -0.00301456 4.00883 8.10623e-05L4.00858 0.000267982Z' fill='%23FF5939'/%3E%3C/svg%3E%0A");
    display: block;
  }

  th[aria-sort="descending"] .p-sortable-column-icon:before {
    content: url("data:image/svg+xml,%3Csvg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.00858 11.9997C4.18771 11.9984 4.35922 11.929 4.48689 11.8065L7.79677 8.57872C7.97147 8.4091 8.04016 8.16134 7.97686 7.92896C7.91356 7.69649 7.7279 7.51468 7.48991 7.45193C7.25181 7.38917 6.99756 7.45503 6.82276 7.62473L4 10.3775L1.17724 7.62473C1.00244 7.45512 0.748187 7.38926 0.510092 7.45202C0.272093 7.51479 0.0864314 7.6966 0.0231397 7.92896C-0.0401593 8.16143 0.0285269 8.40909 0.203225 8.57881L3.51311 11.8066H3.51321C3.6451 11.9333 3.82363 12.003 4.00883 11.9999L4.00858 11.9997Z' fill='%23FF5939'/%3E%3Cpath d='M4.00858 0.000267982C4.18771 0.00158167 4.35922 0.071003 4.48689 0.193523L7.79677 3.42128C7.97147 3.5909 8.04016 3.83866 7.97686 4.07104C7.91356 4.30351 7.7279 4.48532 7.48991 4.54807C7.25181 4.61083 6.99756 4.54497 6.82276 4.37527L4 1.62254L1.17724 4.37527C1.00244 4.54488 0.748187 4.61074 0.510092 4.54798C0.272093 4.48521 0.0864314 4.3034 0.0231397 4.07104C-0.0401593 3.83857 0.0285269 3.59091 0.203225 3.42119L3.51311 0.193429H3.51321C3.6451 0.0666895 3.82363 -0.00301456 4.00883 8.10623e-05L4.00858 0.000267982Z' fill='%23939A9E'/%3E%3C/svg%3E%0A");
    display: block;
  }

  .p-paginator-bottom {
    background-color: transparent;
    border: unset;
    font-size: 14px;
    line-height: 20px;
    color: var(--black);
    margin-top: 25px;
  }

  .p-paginator .p-paginator-page {
    color: var(--black);
    font-size: 14px;
    border-radius: 4px;
    padding: 3px 11px;
    height: 32px;
    min-width: 32px;
  }

  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background-color: var(--control-active-bg);
  }

  @media screen and (max-width: 1023px) {
    &.p-datatable .p-datatable-tbody > tr > td {
      padding: 10px 10px;
    }
  }
`;
