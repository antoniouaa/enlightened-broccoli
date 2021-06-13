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

  &.active:before,
  &.active:after {
    background-color: ${COLORS.buttonColor};
    color: #fff;
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

const FormLabel = styled.p`
  text-align: center;
  margin-bottom: 20px;
`;

const SexSelect = styled.select`
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

const WrapRadio = styled.div`
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

const RadioButton = styled.input`
  margin: 0 5px 0 5px;
`;

export const SignUp = () => {
  const userInput = useRef(null);
  const passInput = useRef(null);
  const retypePassInput = useRef(null);
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
  const [retypePassword, setRetypePassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [goal, setGoal] = useState("maintain");

  const [currentFieldset, setCurrentFieldset] = useState(0);

  const fieldsets = [accountDetails, personalDetails, submitForm];
  const progressSteps = [step1, step2, step3];

  const onNextClick = () => {
    // if (!canSignup) {
    //   addValidationStyles();
    //   return;
    // }

    fieldsets[currentFieldset].current.classList.toggle("active");

    fieldsets[currentFieldset + 1].current.classList.toggle("active");
    progressSteps[currentFieldset + 1].current.classList.toggle("active");

    setCurrentFieldset(currentFieldset + 1);
  };

  const onPrevClick = () => {
    fieldsets[currentFieldset].current.classList.toggle("active");
    progressSteps[currentFieldset].current.classList.toggle("active");

    fieldsets[currentFieldset - 1].current.classList.toggle("active");

    setCurrentFieldset(currentFieldset - 1);
  };

  const onSubmitClick = () => {
    if (!canSignup) {
      alert("You need to complete the form!");
      return;
    }
  };

  const addValidationStyles = () => {
    userInput.current.classList.add("invalid");
    passInput.current.classList.add("invalid");
    emailInput.current.classList.add("invalid");
    retypePassInput.current.classList.add("invalid");
  };

  const removeValidationStyles = () => {
    userInput.current.classList.remove("invalid");
    passInput.current.classList.remove("invalid");
    emailInput.current.classList.remove("invalid");
    retypePassInput.current.classList.remove("invalid");
  };

  const onUsernameChange = (e) => {
    removeValidationStyles();
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    removeValidationStyles();
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    removeValidationStyles();
    setEmail(e.target.value);
  };

  const onRetypePassword = (e) => {
    removeValidationStyles();
    setRetypePassword(e.target.value);
  };

  const checkEqualPasswords = () => {
    return retypePassword === password;
  };

  const canSignup =
    checkEqualPasswords() &&
    Boolean(username) &&
    Boolean(password) &&
    Boolean(email);

  const onHeightChange = (e) => setHeight(e.target.value);
  const onWeightChange = (e) => setWeight(e.target.value);
  const onSexChange = (e) => setSex(e.target.value);
  const onAgeChange = (e) => setAge(e.target.value);

  return (
    <Container>
      <Wrapper>
        <ProgressBar>
          <Step ref={step1} className="active">
            Account
          </Step>
          <Step ref={step2}>Personal</Step>
          <Step ref={step3}>Goals</Step>
        </ProgressBar>
        <SignUpWrapper formColor={COLORS.defaultWrapInputColor}>
          <Form>
            <Title>Sign up</Title>
            <FormStep ref={accountDetails} className="active">
              <FormLabel>Account Details</FormLabel>
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
              <WrapInput
                ref={retypePassInput}
                bgColor={COLORS.defaultBackground}>
                <Input
                  type="password"
                  id="retypepassword"
                  value={retypePassword}
                  placeholder="Confirm Password"
                  onChange={onRetypePassword}
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
              <FormLabel>Personal Details</FormLabel>
              <WrapInput bgColor={COLORS.defaultBackground}>
                <Input
                  id="height"
                  value={height}
                  placeholder="Height (cm)"
                  onChange={onHeightChange}
                  required
                />
              </WrapInput>
              <ButtonWrap>
                <SmallButton
                  bgColor={COLORS.defaultBackground}
                  marginRight="10px">
                  <Input
                    id="Age"
                    value={age}
                    placeholder="Age"
                    onChange={onAgeChange}
                    required
                  />
                </SmallButton>
                <SmallButton
                  bgColor={COLORS.defaultBackground}
                  marginLeft="10px">
                  <SexSelect
                    name="sex"
                    id="sex"
                    onChange={onSexChange}
                    required>
                    <option hidden>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </SexSelect>
                </SmallButton>
              </ButtonWrap>
              <WrapInput bgColor={COLORS.defaultBackground}>
                <Input
                  id="weight"
                  value={weight}
                  placeholder="Weight (kg)"
                  onChange={onWeightChange}
                  required
                />
              </WrapInput>

              <ButtonWrap>
                <SmallButton
                  isHoverable
                  bgColor={COLORS.buttonColor}
                  marginRight="10px">
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
              <FormLabel>What are your goals for joining?</FormLabel>
              <WrapRadio>
                <label>
                  <RadioButton
                    type="radio"
                    id="lose"
                    name="goal"
                    value="lose"
                  />
                  Lose weight
                </label>
              </WrapRadio>
              <WrapRadio>
                <label>
                  <RadioButton
                    type="radio"
                    id="maintain"
                    name="goal"
                    value="maintain"
                    checked
                  />
                  Maintain weight
                </label>
              </WrapRadio>
              <WrapRadio>
                <label>
                  <RadioButton
                    type="radio"
                    id="gain"
                    name="goal"
                    value="gain"
                  />
                  Gain weight
                </label>
              </WrapRadio>
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
                    value="Sign up"
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
