import styled from "styled-components";

import { WrapInput, COLORS } from "../StyledComponents";

export const ProgressBar = styled.ul`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  counter-reset: step;
`;

export const Step = styled.li`
  color: ${COLORS.titleColor};
  text-transform: uppercase;
  font-size: 12px;
  width: 33.33%;
  float: left;
  position: relative;

  &:before {
    content: counter(step);
    counter-increment: step;
    width: 20px;
    line-height: 20px;
    display: block;
    font-size: 15px;
    color: ${COLORS.styledLinkColor};
    background-color: #fff;
    border-radius: 3px;
    margin: 0 auto 5px auto;
  }

  &.active:before,
  &.active:after {
    background-color: ${COLORS.buttonColor};
    color: #fff;
  }
`;

export const FormStep = styled.fieldset`
  background-color: ${COLORS.defaultWrapInputColor};
  width: 100%;
  height: 100%;
  border: 0 none;
  border-radius: 3px;
  padding: 0;
  display: none;

  &.active {
    display: block;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex: 1 1;
`;

export const SmallButton = styled(WrapInput)`
  width: 100%;
  margin-right: ${({ marginRight }) => marginRight || "0px"};
  margin-left: ${({ marginLeft }) => marginLeft || "0px"};
`;

export const FormLabel = styled.p`
  text-align: center;
  margin-bottom: 20px;
`;

export const SexSelect = styled.select`
  color: ${({ textColor }) => textColor || COLORS.inputBackgroundColor};
  font-weight: ${({ textHeavy }) => textHeavy || 400};
  height: 62px;
  background-color: #fff;
  letter-spacing: 0.1rem;
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;

  option {
    color: ${COLORS.inputBackgroundColor};
  }
`;

export const WrapRadio = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  position: relative;
  border: 1px solid ${COLORS.buttonColor};
  border-radius: 5px;
  padding: 3px;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const RadioButton = styled.input`
  margin: 0 5px 0 5px;
`;
