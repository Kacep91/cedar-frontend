import styled from "styled-components";

const Heading1 = styled.h1`
  font-family: var(--heading-font-family);
  font-style: normal;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.36px;
  margin: 0;
  color: var(--main-text-color);

  @media screen and (max-width: 1023px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const Heading2 = styled.h2`
  font-family: var(--heading-font-family);
  font-style: normal;
  font-size: 24px;
  font-weight: 600;
  line-height: 31px;
  letter-spacing: 0.32px;
  margin: 0;
  color: var(--main-text-color);
`;

const Heading3 = styled.h3`
  font-family: var(--heading-font-family);
  font-style: normal;
  font-size: 16px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.01em;
  margin: 0;
  color: var(--main-text-color);
`;

const Caption1 = styled.p`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 0.26px;
  margin: 0;
`;

const Caption2 = styled.p`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.24px;
  margin: 0;
`;

const Caption3M = styled.p`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.24px;
  margin: 0;
`;

const Caption3R = styled.p`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.24px;
  margin: 0;
`;

const Links1 = styled.a`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.24px;
  text-decoration-line: underline;
`;

export const Heading = {
  H1: Heading1,
  H2: Heading2,
  H3: Heading3,
};

export const Text = {
  T1: Caption1,
  T2: Caption2,
  T3Medium: Caption3M,
  T3Regular: Caption3R,
};

export const Links = {
  L1: Links1,
};
