import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { loginUser } from "../Actions/userSlice";
import {
  Container,
  Wrapper,
  WrapSignUp,
  WrapInput,
  Input,
  StyledLink,
} from "./StyledComponents";

const LoginWrapper = styled.div`
  max-width: 25rem;
  position: relative;
  padding-top: 90px;
  padding-bottom: 90px;

  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: #403866;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 51px;
`;

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
        <LoginWrapper>
          <Form>
            <Title>Log in</Title>
            <WrapInput>
              <Input
                id="username"
                value={username}
                placeholder="Username"
                onChange={onUsernameChange}
                required
              />
            </WrapInput>
            <WrapInput>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={onPasswordChange}
                placeholder="Password"
                required
              />
            </WrapInput>
            <WrapInput isButton>
              <Input
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
