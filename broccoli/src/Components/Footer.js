import React from "react";
import styled from "styled-components";

import { COLORS } from "./StyledComponents";

const FooterWrapper = styled.footer`
  height: 3rem;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  left: 0px;
  right: 0px;

  color: ${COLORS.titleColor};
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>Copyright &copy; 2021 LorgCorp.</p>
      <p>All rights reserved</p>
    </FooterWrapper>
  );
};

export default Footer;
