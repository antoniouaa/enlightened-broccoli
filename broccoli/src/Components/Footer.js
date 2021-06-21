import React from "react";
import styled from "styled-components";

import { COLORS } from "./StyledComponents";

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 50px;
  margin-top: 20px;
  margin: 0 auto;

  color: ${COLORS.titleColor};

  @media only screen and (min-height: 101vh) {
    position: relative;
    bottom: 0px;
    display: block;
  }

  // @media only screen and (max-width: 768px) {
  //   position: relative;
  //   margin: 0;
  //   padding: 0;
  //   align-self: flex-end;
  // }
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
