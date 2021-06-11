import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUser } from "../Actions/userSlice";
import {
  Container,
  Wrapper,
  WrapSignUp,
  WrapInput,
  Input,
  StyledLink,
  Form,
  Title,
  LoginWrapper,
  COLORS,
} from "./StyledComponents";

export const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInput = useRef(null);
  const passInput = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => {
    toggleValidationStyles();
    setUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    toggleValidationStyles();
    setPassword(e.target.value);
  };

  const canLogin = Boolean(username) && Boolean(password);

  const toggleValidationStyles = () => {
    userInput.current.classList.toggle("invalid");
    passInput.current.classList.toggle("invalid");
  };

  const onLoginClick = async () => {
    if (!canLogin) {
      alert("Fill in your login details!");
      toggleValidationStyles();
      return;
    }
    const res = await dispatch(loginUser({ username, password }));
    if (res.error) {
      alert(res.error.message);
      setUsername("");
      setPassword("");
      return;
    }
    history.push("/home");
  };

  return (
    <Container>
      <Wrapper>
        <LoginWrapper formColor={COLORS.defaultWrapInputColor}>
          <Form>
            <Title>Log in</Title>
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
                onChange={onPasswordChange}
                placeholder="Password"
                required
              />
            </WrapInput>
            <WrapInput isHoverable bgColor={COLORS.buttonColor} mt="20px">
              <Input
                textColor="#fff"
                textHeavy="500"
                type="button"
                value="LOG IN"
                onClick={onLoginClick}
              />
            </WrapInput>
          </Form>
          <WrapSignUp>
            Don't have an account?
            <StyledLink onClick={() => history.push("/signup")}>
              Sign up
            </StyledLink>
          </WrapSignUp>
        </LoginWrapper>
      </Wrapper>
    </Container>
  );
};

export default LogIn;
