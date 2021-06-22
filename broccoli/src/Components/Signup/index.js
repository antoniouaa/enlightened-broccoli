import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Container,
  Wrapper,
  WrapInput,
  Input,
  LoginWrapper as SignUpWrapper,
  Title,
  Form,
  COLORS,
} from "../StyledComponents";
import {
  ProgressBar,
  Step,
  FormStep,
  FormLabel,
  ButtonWrap,
  SexSelect,
  SmallButton,
  RadioButton,
  WrapRadio,
} from "./SignupComponents";
import { signUpUser } from "../../Actions/userSlice";

export const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInput = useRef(null);
  const passInput = useRef(null);
  const retypePassInput = useRef(null);
  const emailInput = useRef(null);
  const heightInput = useRef(null);
  const sexInput = useRef(null);
  const weightInput = useRef(null);
  const ageInput = useRef(null);
  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);
  const accountDetails = useRef(null);
  const personalDetails = useRef(null);
  const submitForm = useRef(null);

  const [userState, setUserState] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
    height: "",
    weight: "",
    age: "",
    sex: "",
    goal: "maintain",
  });

  const [currentFieldset, setCurrentFieldset] = useState(0);

  const fieldsets = [accountDetails, personalDetails, submitForm];
  const progressSteps = [step1, step2, step3];

  const onNextClick = () => {
    if (currentFieldset === 0 && !accountDetailsValid) {
      addValidationStyles();
      return;
    }
    if (currentFieldset === 1 && !personalDetailsValid) {
      addValidationStyles();
      return;
    }

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

  const onSubmitClick = async () => {
    if (accountDetailsValid && personalDetailsValid) {
      const res = await dispatch(signUpUser(userState));
      if (res.error) {
        alert(res.error.message);
      } else {
        history.push("/login");
      }
    } else {
      alert("You need to complete the form!");
    }
  };

  const addValidationStyles = () => {
    userInput.current.classList.add("invalid");
    passInput.current.classList.add("invalid");
    emailInput.current.classList.add("invalid");
    retypePassInput.current.classList.add("invalid");
    heightInput.current.classList.add("invalid");
    weightInput.current.classList.add("invalid");
    sexInput.current.classList.add("invalid");
    ageInput.current.classList.add("invalid");
  };

  const removeValidationStyles = () => {
    userInput.current.classList.remove("invalid");
    passInput.current.classList.remove("invalid");
    emailInput.current.classList.remove("invalid");
    retypePassInput.current.classList.remove("invalid");
    heightInput.current.classList.remove("invalid");
    weightInput.current.classList.remove("invalid");
    sexInput.current.classList.remove("invalid");
    ageInput.current.classList.remove("invalid");
  };

  const onStateChange = (e) => {
    removeValidationStyles();
    const key = e.target.id;
    const val = e.target.value;
    setUserState({ ...userState, [key]: val });
  };

  const checkEqualPasswords = () => {
    return userState.retypePassword === userState.password;
  };

  const accountDetailsValid =
    checkEqualPasswords() &&
    Boolean(userState.username) &&
    Boolean(userState.password) &&
    Boolean(userState.email);

  const personalDetailsValid =
    Boolean(userState.height) &&
    Boolean(userState.sex) &&
    Boolean(userState.weight) &&
    Boolean(userState.age);

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
                  value={userState.email}
                  placeholder="Email"
                  onChange={onStateChange}
                  required
                />
              </WrapInput>
              <WrapInput ref={userInput} bgColor={COLORS.defaultBackground}>
                <Input
                  id="username"
                  value={userState.username}
                  placeholder="Username"
                  onChange={onStateChange}
                  required
                />
              </WrapInput>
              <WrapInput ref={passInput} bgColor={COLORS.defaultBackground}>
                <Input
                  type="password"
                  id="password"
                  value={userState.password}
                  placeholder="Password"
                  onChange={onStateChange}
                  required
                />
              </WrapInput>
              <WrapInput
                ref={retypePassInput}
                bgColor={COLORS.defaultBackground}
              >
                <Input
                  type="password"
                  id="retypePassword"
                  value={userState.retypePassword}
                  placeholder="Confirm Password"
                  onChange={onStateChange}
                  required
                />
              </WrapInput>
              <WrapInput isHoverable bgColor={COLORS.buttonColor} mt="20px">
                <Input
                  cur="pointer"
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
              <WrapInput ref={heightInput} bgColor={COLORS.defaultBackground}>
                <Input
                  id="height"
                  value={userState.height}
                  placeholder="Height (cm)"
                  onChange={onStateChange}
                  required
                />
              </WrapInput>
              <ButtonWrap>
                <SmallButton
                  ref={ageInput}
                  bgColor={COLORS.defaultBackground}
                  marginRight="10px"
                >
                  <Input
                    id="age"
                    value={userState.age}
                    placeholder="Age"
                    onChange={onStateChange}
                    required
                  />
                </SmallButton>
                <SmallButton
                  bgColor={COLORS.defaultBackground}
                  marginLeft="10px"
                  ref={sexInput}
                >
                  <SexSelect
                    name="sex"
                    id="sex"
                    onChange={onStateChange}
                    required
                  >
                    <option hidden>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </SexSelect>
                </SmallButton>
              </ButtonWrap>
              <WrapInput ref={weightInput} bgColor={COLORS.defaultBackground}>
                <Input
                  id="weight"
                  value={userState.weight}
                  placeholder="Weight (kg)"
                  onChange={onStateChange}
                  required
                />
              </WrapInput>

              <ButtonWrap>
                <SmallButton
                  isHoverable
                  bgColor={COLORS.buttonColor}
                  marginRight="10px"
                >
                  <Input
                    cur="pointer"
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
                  marginLeft="10px"
                >
                  <Input
                    cur="pointer"
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
                    onClick={onStateChange}
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
                    onClick={onStateChange}
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
                    onClick={onStateChange}
                  />
                  Gain weight
                </label>
              </WrapRadio>
              <ButtonWrap>
                <SmallButton
                  isHoverable
                  bgColor={COLORS.buttonColor}
                  marginright="10px"
                >
                  <Input
                    cur="pointer"
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
                  marginLeft="10px"
                >
                  <Input
                    cur="pointer"
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
