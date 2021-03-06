import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Broccoli from "../../Assets/broccoli.png";
import {
  WrapSignUp,
  WrapInput,
  WrapIcon,
  Input,
  StyledLink,
  BroccoliImg,
  COLORS,
} from "../StyledComponents";

const WrapIconText = styled.div`
  margin: 2rem;
  padding: 2rem;

  h1:nth-child(3) {
    padding-bottom: 3rem;
  }

  @media only screen and (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const Headline = styled.h1`
  color: ${({ isBlue }) => isBlue || COLORS.titleGreyColor};
`;

export const Welcome = () => {
  const history = useHistory();

  return (
    <WrapIcon>
      <BroccoliImg src={Broccoli} />
      <WrapIconText>
        <Headline>Calorie</Headline>
        <Headline>and macronutrient </Headline>
        <Headline isBlue={COLORS.buttonColor}>tracking for dummies</Headline>
        <WrapSignUp>
          <WrapInput isHoverable bgColor={COLORS.buttonColor} mt="20px">
            <Input
              cur="pointer"
              type="button"
              value="Sign up - for free"
              textColor="#fff"
              onClick={() => history.push("/signup")}
            />
          </WrapInput>
        </WrapSignUp>
        <WrapSignUp>
          Already have an account?
          <StyledLink onClick={() => history.push("/login")}>Log in</StyledLink>
        </WrapSignUp>
      </WrapIconText>
    </WrapIcon>
  );
};
