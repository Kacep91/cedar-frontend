import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AuthSelectors } from "store/auth";
import { useGlobalContext } from "utils/globalContext";
import { NavOptions, NavOption, NavOptionBadge } from "../atoms";
import { navOptions } from "../Nav";

export const BurgerButton = () => {
  const { isMenuOpened, isExtendedVersion, setIsMenuOpened } =
    useGlobalContext();
  const me = useSelector(AuthSelectors.currentUser);

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return () => {
      setMobileMenuOpened(false);
    };
  }, [location.pathname]);
  return (
    <div className="hamburger-menu">
      <input
        id="menu__toggle"
        type="checkbox"
        checked={isMobileMenuOpened}
        onClick={() => {
          setMobileMenuOpened(!isMobileMenuOpened);
          setIsMenuOpened(true);
        }}
        readOnly
      />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>

      <NavOptions isMenuOpened={isMenuOpened} className="menu__box">
        {navOptions
          .filter((item) =>
            !isExtendedVersion
              ? item.name !== "Общие данные" &&
                item.name !== "Сегменты" &&
                item.name !== "Пользователи" &&
                item.name !== "Выгрузки"
              : Boolean,
          )
          .map((item) => {
            return me?.visibleComponents?.TAB?.find(
              (x) => x === item.visibility,
            ) ? (
              <NavOption
                className="menu__item"
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
            ) : (
              <React.Fragment key={item.name} />
            );
          })}
      </NavOptions>
    </div>
  );
};
