import styled from "styled-components";

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(245.64deg, #05040c -6.75%, #241d52 88.23%);
  width: 100vw;
  height: 100vh;
`;

export const AuthModal = styled.div`
  position: relative;
  background: transparent;
  border-radius: 26px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  min-width: 385px;
  min-height: 350px;
`;

export const AuthHeader = styled.div`
  font-family: var(--body-font-family);
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 80px;
  letter-spacing: 0.32px;
`;
