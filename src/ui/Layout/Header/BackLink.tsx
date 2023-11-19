import { ReactNode } from "react";
import styled from "styled-components";
import { LinkProps, NavLink } from "react-router-dom";
import { Icon } from "ui/Icon";

type BackLinkProps = {
  to: LinkProps["to"];
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const BackLink = ({
  to,
  children,
  onClick,
  className,
}: BackLinkProps) => {
  return (
    <BackLinkAtom to={to} onClick={onClick} className={className}>
      <Icon name="lessThan" /> {children}
    </BackLinkAtom>
  );
};

export const BackLinkAtom = styled(NavLink)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    color: var(--grey-6);
    text-decoration: none;
    font-size: 14px;
    margin-left: 40px;
  }
`;
