import styled, { css } from "styled-components";
import { IIconProps } from "./types";

type IconAtomProps = Pick<
  IIconProps,
  "size" | "background" | "iconColor" | "name"
> & {
  clickable: boolean;
};

export const isStrokeSvg = (name?: string) =>
  name === "lineChart" ||
  name === "barChart" ||
  name === "segmentsIcon" ||
  name === "generalDataIcon";

const colors: {
  [icon in IIconProps["iconColor"]]: { icon: string; background: string };
} = {
  grey: { icon: "#939A9E", background: "rgba(215, 220, 223, 0.5)" },
  blue: { icon: "var(--primary)", background: "var(--grey-2)" },
  green: { icon: "var(--primary-green)", background: "var(--grey-2)" },
  switchActive: {
    icon: "var(--main-text-color)",
    background: "var(--control-active-bg)",
  },
  switchInactive: {
    icon: "var(--grey-5)",
    background: "var(--control-inactive-bg)",
  },
  black: { icon: "var(--main-text-color)", background: "" },
  white: { icon: "var(--white)", background: "" },
};

const sizeCss = {
  xxl: css`
     {
      height: 64px;
      width: 64px;
      line-height: 64px;
    }
  `,
  xl: css`
     {
      height: 48px;
      width: 48px;
      line-height: 48px;
    }
  `,
  l: css`
     {
      height: 32px;
      width: 32px;
      line-height: 32px;
    }
  `,

  m: css`
     {
      height: 24px;
      width: 24px;
      line-height: 24px;
    }
  `,
  "s+": css`
     {
      height: 17px;
      width: 17px;
      line-height: 17px;
    }
  `,
  s: css`
     {
      height: 16px;
      width: 16px;
      line-height: 16px;
    }
  `,
  xs: css`
     {
      height: 14px;
      width: 14px;
      line-height: 14px;
    }
  `,
  xxs: css`
     {
      height: 12px;
      width: 12px;
      line-height: 12px;
    }
  `,
};

const backgroundSizeCss = {
  xxl: css`
     {
      height: 78px;
      width: 78px;
      line-height: 78px;
    }
  `,
  xl: css`
     {
      height: 62px;
      width: 62px;
      line-height: 62px;
    }
  `,
  l: css`
     {
      height: 46px;
      width: 46px;
      line-height: 46px;
    }
  `,

  m: css`
     {
      height: 38px;
      width: 38px;
      line-height: 38px;
    }
  `,
  "s+": css`
     {
      height: 32px;
      width: 32px;
      line-height: 32px;
    }
  `,
  s: css`
     {
      height: 30px;
      width: 30px;
      line-height: 30px;
    }
  `,
  xs: css`
     {
      height: 28px;
      width: 28px;
      line-height: 28px;
    }
  `,
  xxs: css`
     {
      height: 26px;
      width: 26px;
      line-height: 26px;
    }
  `,
};

export const IconAtom = styled.span<IconAtomProps>`
  display: inline-block;
  font-style: normal;
  position: relative;

  height: 1em;
  width: 1em;
  line-height: 1em;

  ${({ size, background }) =>
    background
      ? backgroundSizeCss[size || "xxs"]
      : size
      ? sizeCss[size] || ""
      : ""}

  ${({ background, iconColor }) => {
    const bckgrnd = `background: ${colors[iconColor].background};`;
    return background
      ? `${bckgrnd} display:flex; align-items: center; border-radius: 10px;`
      : "";
  }}
    
  ${({ clickable }) =>
    clickable
      ? css`
          cursor: pointer;
        `
      : ""}

  img {
    max-width: 100%;
    max-height: 100%;
  }

  svg {
    ${({ iconColor, name }) =>
      `${isStrokeSvg(name) ? "stroke" : "fill"}: ${colors[iconColor].icon};`}

    height: 100%;
    width: 100%;
    ${({ background, size }) => (background && size ? sizeCss[size] || "" : "")}
    ${({ background }) => (background ? "margin: auto;" : "")} 
    position: absolute;
    left: 0;
    right: 0;
    vertical-align: top;
    transform: translateZ(0);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  span {
    width: 20px;
    height: 20px;
  }
`;
