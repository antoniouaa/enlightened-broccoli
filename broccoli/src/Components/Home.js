import React from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import Broccoli from "../Assets/broccoli.png";
import {
  Container,
  Wrapper,
  WrapSignUp,
  WrapInput,
  Input,
  StyledLink,
} from "./StyledComponents";

const WrapIcon = styled.div`
  padding-top: 90px;
  padding-bottom: 90px;
  display: flex;
  flex: 1 2;

  @media only screen and (max-width: 768px) {
    padding-top: 15px;
  }
`;

const BroccoliImg = styled.img`
  margin-right: 2rem;
  left: 10rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

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
  color: ${({ isBlue }) => (isBlue ? "#827ffe" : "#475569")};
`;

export const Home = () => {
  const history = useHistory();

  return (
    <Container>
      <Wrapper spacing="space-between">
        <WrapIcon>
          <BroccoliImg src={Broccoli} />
          <WrapIconText>
            <Headline>Calorie</Headline>
            <Headline>and macronutrient </Headline>
            <Headline isBlue={"#403866"}>tracking for dummies</Headline>
            <WrapSignUp>
              <WrapInput isButton mt="20px">
                <Input
                  type="button"
                  value="Sign up - for free"
                  height="31px"
                  textColor="#fff"
                  onClick={() => history.push("/signup")}
                />
              </WrapInput>
            </WrapSignUp>
            <WrapSignUp>
              Already have an account?
              <StyledLink onClick={() => history.push("/login")}>
                Log in
              </StyledLink>
            </WrapSignUp>
          </WrapIconText>
        </WrapIcon>
      </Wrapper>
    </Container>
  );
};

export default Home;
