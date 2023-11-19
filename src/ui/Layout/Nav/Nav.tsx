import React from "react";
import {
  NavOption,
  NavOptionBadge,
  NavOptions,
  NavTop,
  NavWrapper,
} from "../atoms";
import { navOptions } from "./navOptions";
import { Icon } from "../../Icon";
import { useGlobalContext } from "utils/globalContext";

export const Nav = () => {
  const { isMenuOpened, setIsMenuOpened, isExtendedVersion } =
    useGlobalContext();

  return (
    <NavWrapper isMenuOpened={isMenuOpened}>
      <NavTop isMenuOpened={isMenuOpened}>
        <Icon
          name={isMenuOpened ? "forwardLeftIcon" : "forwardRightIcon"}
          iconColor={"white"}
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        />
      </NavTop>
      <NavOptions isMenuOpened={isMenuOpened}>
        {navOptions
          .filter((item) =>
            !isExtendedVersion
              ? item.name !== "Общие данные" &&
                item.name !== "Сегменты" &&
                item.name !== "Пользователи" &&
                item.name !== "Выгрузки"
              : Boolean,
          )
          .map((item) => (
            <NavOption
              key={item.name}
              isMenuOpened={isMenuOpened}
              to={item.navigate}
              style={{ ...item.styles }}
            >
              {item.Icon}
              {isMenuOpened && <span>{item.name}</span>}
              {item.badge && isMenuOpened && (
                <NavOptionBadge src={item.badge} />
              )}
            </NavOption>
          ))}
      </NavOptions>
    </NavWrapper>
  );
};
