import React from "react";
import { VersionInfoType } from "../../../../libs/buildVersionInfo/buildVersionInfo";
import { Text } from "ui/Typography";
import { addLeadingZero } from "../../../utils/date";
// import { useNavigate } from "react-router";
import { useGlobalContext } from "utils/globalContext";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __INFO__: VersionInfoType;

export const VersionInfoUI = () => {
  const date = new Date(__INFO__.panalytics["git"].date);
  // const navigate = useNavigate();
  const { isExtendedVersion } = useGlobalContext();
  return (
    <VersionInfoUIWrapper>
      <Text.T3Regular
        // onClick={() => navigate(`/game`)}
        style={{ marginRight: "10px" }}
      >{`${isExtendedVersion ? "Расширенная версия" : "Версия"}: v${
        __INFO__.panalytics["version"]
      }, ${date.toLocaleDateString("ru")}
      в ${addLeadingZero(date.getHours())}:${addLeadingZero(
        date.getMinutes(),
      )}`}</Text.T3Regular>
    </VersionInfoUIWrapper>
  );
};

export const VersionInfoUIWrapper = styled.div`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;
