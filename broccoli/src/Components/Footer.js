import React from "react";
import styled from "styled-components";

import { COLORS } from "./StyledComponents";

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${COLORS.titleColor};

  @media only screen and (min-height: 101vh) {
    position: relative;
    bottom: 0px;
    display: block;
  }
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
