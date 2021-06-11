import React, { useState, useRef } from "react";
import styled from "styled-components";

import {
  Container,
  Wrapper,
  WrapInput,
  Input,
  LoginWrapper as SignUpWrapper,
  Title,
  Form,
  COLORS,
} from "./StyledComponents";

const ProgressBar = styled.ul`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  counter-reset: step;
`;

const Step = styled.li`
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

  &.active {
    background-color: ${COLORS.buttonColor},
    color: #fff
  }
`;

const FormStep = styled.fieldset`
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

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex: 1 1;
`;

const SmallButton = styled(WrapInput)`
  width: 100%;
  margin-right: ${({ marginRight }) => marginRight || "0px"};
  margin-left: ${({ marginLeft }) => marginLeft || "0px"};
`;

export const SignUp = () => {
  const userInput = useRef(null);
  const passInput = useRef(null);
  const emailInput = useRef(null);
  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);
  const accountDetails = useRef(null);
  const personalDetails = useRef(null);
  const submitForm = useRef(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentFieldset, setCurrentFieldset] = useState(0);

  const fieldsets = [accountDetails, personalDetails, submitForm];
  const progressSteps = [step1, step2, step3];

  const onNextClick = () => {
    fieldsets[currentFieldset + 1].current.classList.toggle("active");
    setCurrentFieldset(currentFieldset + 1);
    fieldsets[currentFieldset].current.classList.toggle("active");
    progressSteps[currentFieldset].current.classList.toggle("active");
  };

  const onPrevClick = () => {
    fieldsets[currentFieldset - 1].current.classList.toggle("active");
    setCurrentFieldset(currentFieldset - 1);
    fieldsets[currentFieldset].current.classList.toggle("active");
    progressSteps[currentFieldset].current.classList.toggle("active");
  };

  const onSubmitClick = () => {
    if (!canSignup) {
      alert("You need to complete the form!");
      return;
    }
  };

  const toggleValidationStyles = () => {
    userInput.current.classList.toggle("invalid");
    passInput.current.classList.toggle("invalid");
    emailInput.current.classList.toggle("invalid");
  };

  const onUsernameChange = (e) => {
    toggleValidationStyles();
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    toggleValidationStyles();
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    toggleValidationStyles();
    setEmail(e.target.value);
  };

  const canSignup = Boolean(username) && Boolean(password) && Boolean(email);

  return (
    <Container>
      <Wrapper>
        <ProgressBar>
          <Step ref={step1} className="active">
            Account
          </Step>
          <Step ref={step2}>Personal</Step>
          <Step ref={step3}>Confirm</Step>
        </ProgressBar>
        <SignUpWrapper formColor={COLORS.defaultWrapInputColor}>
          <Form>
            <Title>Sign up</Title>
            <FormStep ref={accountDetails} className="active">
              Account Details
              <WrapInput ref={emailInput} bgColor={COLORS.defaultBackground}>
                <Input
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={onEmailChange}
                  required
                />
              </WrapInput>
              <WrapInput ref={userInput} bgColor={COLORS.defaultBackground}>
                <Input
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={onUsernameChange}
                  required
                />
              </WrapInput>
              <WrapInput ref={passInput} bgColor={COLORS.defaultBackground}>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={onPasswordChange}
                  required
                />
              </WrapInput>
              <WrapInput isHoverable bgColor={COLORS.buttonColor} mt="20px">
                <Input
                  textColor="#fff"
                  textHeavy="500"
                  type="button"
                  value="Next"
                  onClick={onNextClick}
                />
              </WrapInput>
            </FormStep>
            <FormStep ref={personalDetails}>
              Personal Details
              <WrapInput bgColor={COLORS.defaultBackground}>
                <Input id="height" value="" placeholder="Height" required />
              </WrapInput>
              <WrapInput bgColor={COLORS.defaultBackground}>
                <Input id="weight" value="" placeholder="Weight" required />
              </WrapInput>
              <ButtonWrap>
                <SmallButton
                  isHoverable
                  bgColor={COLORS.buttonColor}
                  marginright="10px">
                  <Input
                    textColor="#fff"
                    textHeavy="500"
                    type="button"
                    value="Back"
                    onClick={onPrevClick}
                  />
                </SmallButton>
                <SmallButton
                  isHoverable
                  bgColor={COLORS.buttonColor}
                  marginLeft="10px">
                  <Input
                    textColor="#fff"
                    textHeavy="500"
                    type="button"
                    value="Next"
                    onClick={onNextClick}
                  />
                </SmallButton>
              </ButtonWrap>
            </FormStep>
            <FormStep ref={submitForm}>
              Confirm account creation
              <ButtonWrap>
                <SmallButton
                  isHoverable
                  bgColor={COLORS.buttonColor}
                  marginright="10px">
                  <Input
                    textColor="#fff"
                    textHeavy="500"
                    type="button"
                    value="Back"
                    onClick={onPrevClick}
                  />
                </SmallButton>
                <SmallButton
                  isHoverable
                  isSubmit
                  bgColor={COLORS.greenSubmitButtonColor}
                  marginLeft="10px">
                  <Input
                    textColor="#fff"
                    textHeavy="500"
                    type="button"
                    value="Submit"
                    onClick={onSubmitClick}
                  />
                </SmallButton>
              </ButtonWrap>
            </FormStep>
          </Form>
        </SignUpWrapper>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
