import { subDays } from "date-fns";
import dayjs from "dayjs";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { stringToBoolean } from "./utils";

export type TGlobalContext = {
  isMenuOpened: boolean;
  setIsMenuOpened: (value: boolean) => void;
  endDate: Date;
  endDateString: string;
  setEndDate: (date: Date) => void;
  startDate: Date;
  startDateString: string;
  setStartDate: (date: Date) => void;
  isExtendedVersion: boolean;
  setExtendedVersion: (value: boolean) => void;
  isFakeData: boolean;
  isAttributesOpened: boolean;
  setIsAttributesOpened: (value: boolean) => void;
};

export const GlobalContext = createContext<TGlobalContext>(undefined as any);

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
  const [endDate, setEndDate] = useState(subDays(new Date(), 1));
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 31));
  const [isExtendedVersion, setExtendedVersion] = useState<boolean>(
    stringToBoolean(localStorage.getItem("extendedVersion")),
  );
  const [isAttributesOpened, setIsAttributesOpened] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isMenuOpened,
      setIsMenuOpened,
      endDate,
      endDateString: endDate
        ? dayjs(endDate).locale("ru").format("DD.MM.YYYY")
        : "",
      setEndDate,
      startDate,
      startDateString: startDate
        ? dayjs(startDate).locale("ru").format("DD.MM.YYYY")
        : "",
      setStartDate,
      setExtendedVersion,
      isExtendedVersion,
      isFakeData: false,
      setIsAttributesOpened,
      isAttributesOpened,
    }),
    [
      isMenuOpened,
      setIsMenuOpened,
      endDate,
      setEndDate,
      startDate,
      setStartDate,
      setExtendedVersion,
      isExtendedVersion,
      isAttributesOpened,
      setIsAttributesOpened,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext<TGlobalContext>(GlobalContext);

  const newContext = { ...context };

  if (!context) {
    throw new Error("Global context is undefined");
  }

  return newContext;
};
