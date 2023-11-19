import { useMediaQuery } from "react-responsive";
export const screenSizes = {
  smallMobile: { query: "(max-width: 400px)" },
  smallTablet: { query: "(max-width: 650px)" },
  mobile: { query: "(max-width: 1023px)" },
  wip: { query: "(max-width: 1060px)" },
  bigTablet: { query: "(min-width: 1024px) and (max-width: 1279px)" },
  desktop: { query: "(min-width: 1280px)" },
  largeDesktop: { query: "(min-width: 1440px)" },
};

export const useScreenSize = (name) => useMediaQuery(screenSizes[name]);
