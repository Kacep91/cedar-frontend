import React, { ReactNode } from "react";
import styled from "styled-components";
import { BlurredPanelText } from "components/atoms";

type NoDataProps = {
  className?: string;
  children?: ReactNode;
};

const NoData = ({ children, className }: NoDataProps) => {
  return (
    <NoDataComponent className={className}>
      <BlurredPanelText>
        {children || "Данные за выбранный период отсутствуют"}
      </BlurredPanelText>
    </NoDataComponent>
  );
};

export const NoDataComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  flex-direction: column;
  min-height: 250px;
  color: #7367f0;
  background: #ffffff;
  border-radius: 8px;
  text-align: center;
`;

export default NoData;
