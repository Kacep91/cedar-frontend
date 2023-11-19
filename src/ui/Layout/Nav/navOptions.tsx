import React, { ReactNode } from "react";
import sidebarBadge from "assets/images/sidebarBadge.svg";
import { Icon } from "../../Icon";

export type NavOptionType = {
  Icon: ReactNode;
  name: string;
  isSelected: boolean;
  navigate: string;
  badge: string | null;
  styles?: any;
};

export type NavOptionMobileType = {
  Icon: ReactNode;
  label: string;
  isSelected: boolean;
  navigate: string;
  badge: string | null;
  styles?: any;
};

const style = {
  marginRight: "8px",
  marginLeft: "12px",
  verticalAlign: "middle",
};

export const navOptions: NavOptionType[] = [
  // {
  //   Icon: (
  //     <Icon
  //       name={"generalDataIcon"}
  //       iconColor={"white"}
  //       size={"s+"}
  //       style={{ ...style, marginLeft: "11px" }}
  //     />
  //   ),
  //   name: "Общие данные",
  //   isSelected: true,
  //   navigate: "/generalData",
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.GENERALDATA,
  // },
  // {
  //   Icon: (
  //     <Icon name={"reporting"} iconColor={"white"} size={"s+"} style={style} />
  //   ),
  //   name: "Верхнеуровневые метрики",
  //   navigate: "/upMetrics",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.REPORTING,
  // },
  // {
  //   Icon: (
  //     <Icon
  //       name={"reportingCEO"}
  //       iconColor={"white"}
  //       size={"s+"}
  //       style={style}
  //     />
  //   ),
  //   name: "ЗГД",
  //   navigate: "/reportingCEO",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.REPORTINGCEO,
  // },
  // {
  //   Icon: (
  //     <Icon name={"openRooms"} iconColor={"white"} size={"s+"} style={style} />
  //   ),
  //   name: "Открытые комнаты",
  //   navigate: "/openRooms",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.OPENROOMS,
  // },
  // {
  //   Icon: (
  //     <Icon
  //       name={"acquisition"}
  //       iconColor={"white"}
  //       size={"s+"}
  //       style={style}
  //     />
  //   ),
  //   name: "Acquisition",
  //   navigate: "/acquisition",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.ACQUISITION,
  // },
  {
    Icon: (
      <Icon
        name={"segmentsIcon"}
        iconColor={"white"}
        size={"xs"}
        style={style}
      />
    ),
    name: "Сегменты",
    isSelected: false,
    navigate: "/segments",
    badge: null,
  },
  // {
  //   Icon: (
  //     <Icon name={"userIcon"} iconColor={"white"} size={"xs"} style={style} />
  //   ),
  //   name: "Пользователи",
  //   navigate: "/users",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.USERS,
  // },
  {
    Icon: (
      <Icon name={"download"} iconColor={"white"} size={"xs"} style={style} />
    ),
    name: "Выгрузки",
    navigate: "/loadOuts",
    isSelected: false,
    badge: sidebarBadge,
  },
  // {
  //   Icon: <Icon name={"star"} iconColor={"white"} size={"s+"} style={style} />,
  //   name: "Главная",
  //   navigate: "/main",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.MAIN,
  // },
  // {
  //   Icon: (
  //     <Icon name={"authors"} iconColor={"white"} size={"s+"} style={style} />
  //   ),
  //   name: "Авторы 0 день",
  //   navigate: "/authorsZeroDay",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.ZERODAY,
  // },
  // {
  //   Icon: (
  //     <Icon
  //       name={"segmentsComparison"}
  //       iconColor={"white"}
  //       size={"s+"}
  //       style={style}
  //     />
  //   ),
  //   name: "Разница сегментов",
  //   navigate: "/segmentsComparison",
  //   isSelected: false,
  //   badge: null,
  //   visibility: VisibleComponentTabEnum.SEGMENTSCOMP,
  // },
  {
    Icon: (
      <Icon name={"adminPanel"} iconColor={"white"} size={"s+"} style={style} />
    ),
    name: "Панель администратора",
    navigate: "/adminPanel",
    styles: { marginTop: "auto" },
    badge: null,
    isSelected: false,
  },
];
