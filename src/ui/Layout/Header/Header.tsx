import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions, AuthSelectors } from "store/auth";
import {
  HeaderWrapper,
  UserBlock,
  WrapperIcon,
  UserName,
  UserLogout,
  UserLogoutText,
  UserBlockMobile,
  MobileMenu,
} from "./atoms";
import { Button } from "primereact/button";

// import DatePicker from "react-datepicker";
// import { Icon } from "ui/Icon";
// import { datePickerTextDateGenerator } from "utils/date";
// import { CustomDropdown } from "components/UserProfile/PeriodDropdown";
import { VersionInfoUI } from "../VersionInfoUI";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
// import { isBefore, isAfter, subDays } from "date-fns";
import { BurgerButton } from "./BurgerButton";
import { Dialog } from "primereact/dialog";

export const Header = () => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const currentUser = useSelector(AuthSelectors.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClose = useCallback(() => {
    dispatch(AuthActions.logout());
    navigate("/auth");
  }, []);

  const location = useLocation();
  const toggleMenu = () => setIsUserMenuOpened(!isUserMenuOpened);
  const [isModalExit, setModalExit] = useState(false);
  // const [activeButton, setActiveButton] = useState(0);

  // const onChange = (dates: Date[] | any) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  useEffect(() => {
    localStorage.setItem("extendedVersion", String(true));
  }, []);

  // const isExtendButtonVisible = useMemo(
  //   () =>
  //     currentUser?.visibleComponents?.TAB.includes(
  //       "GENERALDATA" || "SEGMENTS" || "USERS" || "LOADOUTS"
  //     ),
  //   [currentUser]
  // );

  return (
    <HeaderWrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MobileMenu>
          <BurgerButton />
        </MobileMenu>
        {/* {isExtendButtonVisible && (
          <InputSwitchWrapper>
            <InputSwitch
              style={{
                marginRight: "20px",
              }}
              checked={isExtendedVersion}
              tooltip={`Переключить в ${!isExtendedVersion ? "расширенную" : "стандартную"
                } версию`}
              tooltipOptions={{ position: "bottom" }}
              onChange={() => {
                localStorage.setItem(
                  "extendedVersion",
                  String(!isExtendedVersion)
                );
                setExtendedVersion(!isExtendedVersion);
              }}
            />
          </InputSwitchWrapper>
        )} */}
        {location.pathname === "/adminPanel" && <VersionInfoUI />}
        {/* {location.pathname !== "/segments" &&
          location.pathname !== "/users" &&
          location.pathname !== "/loadOuts" && (
            <DatePicker
              locale="ru"
              dateFormat={"d MMM yyyy г."}
              customInput={<CustomDropdown editable />}
              selected={startDate}
              selectsRange
              placeholderText="Выбор дат"
              disabledKeyboardNavigation
              dayClassName={(date) => {
                return isAfter(date, new Date("2022-12-31")) &&
                  isBefore(date, subDays(new Date(), 1))
                  ? ""
                  : "disabledDateToPick";
              }}
              calendarClassName={"customDatePickerTaxes"}
              wrapperClassName="datePickerUPTime"
              showDisabledMonthNavigation
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              excludeDateIntervals={[
                { start: new Date("2020-01-01"), end: new Date("2022-12-31") },
              ]}
              minDate={new Date("2023-01-01")}
              maxDate={subDays(new Date(), 1)}
              renderCustomHeader={({
                date,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
                increaseMonth,
                decreaseMonth,
              }) => {
                return (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        style={{ padding: "0.25rem" }}
                        label="7 дней"
                        icon={
                          activeButton === 7 ? "pi pi-check" : "pi pi-calendar"
                        }
                        className={
                          activeButton === 7
                            ? "p-button-raised p-button-rounded p-button-calendar-selected"
                            : "p-button-raised p-button-rounded"
                        }
                        onClick={() => {
                          setActiveButton(activeButton === 7 ? 0 : 7);
                          const dates =
                            activeButton === 7
                              ? [
                                  subDays(new Date(), 31),
                                  subDays(new Date(), 1),
                                ]
                              : [subDays(new Date(), 7), new Date()];
                          return onChange(dates);
                        }}
                      />
                      <Button
                        style={{ padding: "0.25rem" }}
                        label="30 дней"
                        icon={
                          activeButton === 30 ? "pi pi-check" : "pi pi-calendar"
                        }
                        className={
                          activeButton === 30
                            ? "p-button-raised p-button-rounded p-button-calendar-selected"
                            : "p-button-raised p-button-rounded"
                        }
                        onClick={() => {
                          setActiveButton(activeButton === 30 ? 0 : 30);
                          const dates =
                            activeButton === 30
                              ? [
                                  subDays(new Date(), 31),
                                  subDays(new Date(), 1),
                                ]
                              : [subDays(new Date(), 30), new Date()];
                          return onChange(dates);
                        }}
                      />
                      <Button
                        style={{ padding: "0.25rem" }}
                        label="90 дней"
                        icon={
                          activeButton === 90 ? "pi pi-check" : "pi pi-calendar"
                        }
                        className={
                          activeButton === 90
                            ? "p-button-raised p-button-rounded p-button-calendar-selected"
                            : "p-button-raised p-button-rounded"
                        }
                        disabled={
                          !isAfter(
                            subDays(new Date(), 90),
                            new Date("2023-01-01")
                          )
                        }
                        onClick={() => {
                          setActiveButton(activeButton === 90 ? 0 : 90);
                          const dates =
                            activeButton === 90
                              ? [
                                  subDays(new Date(), 31),
                                  subDays(new Date(), 1),
                                ]
                              : [subDays(new Date(), 90), new Date()];
                          return onChange(dates);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name={"arrowLeftIcon"}
                        onClick={
                          prevMonthButtonDisabled ? () => {} : decreaseMonth
                        }
                      />

                      <div className="datePickerYear">
                        {datePickerTextDateGenerator(date)}
                      </div>

                      <Icon
                        name={"arrowRightIcon"}
                        onClick={
                          nextMonthButtonDisabled ? () => {} : increaseMonth
                        }
                      />
                    </div>
                  </div>
                );
              }}
            />
          )}*/}
      </div>
      <UserBlockMobile isUserMenuOpened={isUserMenuOpened}>
        <Button
          type="button"
          style={{
            background: "var(--primary) !important",
            marginLeft: "auto",
          }}
          icon="pi pi-user"
          label="Выйти"
          onClick={() => setModalExit(true)}
        ></Button>
      </UserBlockMobile>
      <UserBlock isUserMenuOpened={isUserMenuOpened}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <WrapperIcon
            name={"userIcon"}
            size={"xs"}
            iconColor={"blue"}
            onClick={toggleMenu}
          />
          <UserName>{`${currentUser?.lastName} ${currentUser?.firstName}`}</UserName>
          <WrapperIcon
            name={isUserMenuOpened ? "arrowUpIcon" : "arrowDownIcon"}
            onClick={toggleMenu}
            size={"xxs"}
          />
        </div>

        {isUserMenuOpened ? (
          <UserLogout onClick={onClose}>
            <WrapperIcon name={"exitIcon"} size={"s"} onClick={toggleMenu} />
            <UserLogoutText>Выйти</UserLogoutText>
          </UserLogout>
        ) : null}
      </UserBlock>
      <Dialog
        header="Вы действительно хотите выйти?"
        visible={isModalExit}
        onHide={() => setModalExit(false)}
        style={{ width: "92vw" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="button"
            style={{
              background: "var(--primary) !important",
              marginRight: "20px",
            }}
            icon="pi pi-check"
            label="Подтвердить"
            onClick={onClose}
          ></Button>
          <Button
            severity="danger"
            type="button"
            icon="pi pi-times"
            label="Отмена"
            onClick={() => setModalExit(false)}
          ></Button>
        </div>
      </Dialog>
    </HeaderWrapper>
  );
};
