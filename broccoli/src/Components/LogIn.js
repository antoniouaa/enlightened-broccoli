import React from "react";
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onLoginClick = async () => {
    const res = await dispatch(loginUser({ username, password }));
    if (res.error) {
      alert(res.error.message);
      setUsername("");
      setPassword("");
      return;
    }
    history.push("/home");
  };

  const canLogin = Boolean(username) && Boolean(password);

  return (
    <Container>
      <Wrapper>
        <LoginWrapper formColor="#e6e6e6">
          <Form>
            <Title>Log in</Title>
            <WrapInput bgColor={COLORS.defaultBackground}>
              <Input
                id="username"
                value={username}
                placeholder="Username"
                onChange={onUsernameChange}
                required
              />
            </WrapInput>
            <WrapInput bgColor={COLORS.defaultBackground}>
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
                height="31px"
                textColor="#fff"
                textHeavy="500"
                type="button"
                value="LOG IN"
                onClick={onLoginClick}
                disabled={!canLogin}
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
