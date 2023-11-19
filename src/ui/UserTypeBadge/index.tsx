import styled from "styled-components";
import { TUserType } from "../../models/common";
import { USER_TYPE, UserTypeName } from "../../models/constants";
import React from "react";

const USER_TYPE_STYLE: Record<TUserType, string> = {
  [USER_TYPE.CREATOR]: "#6C60E2",
  [USER_TYPE.WATCHER]: "#4DB8AD",
  [USER_TYPE.WATCHER_CREATOR]: "#CE7C00",
  [USER_TYPE.WAITING]: "#FF5939",
};

const Badge = styled.span<{ type: TUserType }>`
  color: ${({ type }) => `${USER_TYPE_STYLE[type]}` || ""};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px 1px;
  height: 24px;
  border-radius: 90px;
  border-width: thin;
  border-style: solid;
  white-space: nowrap;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
  width: fit-content;

  span {
    color: #7e818a;
    text-transform: lowercase;
  }
`;

export const UserTypeBadge = ({ type }: { type: TUserType }) => {
  return type ? (
    <Badge type={type}>
      <span>{UserTypeName[type]}</span>
    </Badge>
  ) : null;
};
