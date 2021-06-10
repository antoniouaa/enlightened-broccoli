import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { loginUser } from "../Actions/userSlice";

const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const LoginWrapper = styled.div`
  width: 25rem;
  position: relative;
  padding-top: 90px;
  padding-bottom: 90px;
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

const WrapInput = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ isButton }) => (isButton ? "#827ffe" : "#e6e6e6")};
  border: 1pc solid transparent;
  border-radius: 3px;
  margin-bottom: 16px;

  &:hover {
    cursor: ${({ isButton }) => (isButton ? "pointer" : "")};
    background-color: ${({ isButton }) => (isButton ? "#482ff7" : "#e6e6e6")};
  }
`;

const Input = styled.input`
  color: ${({ textColor }) => textColor || "#403866"};
  font-weight: ${({ textHeavy }) => textHeavy || 400};
  line-height: 1.2;
  letter-spacing: 0.1rem;
  font-size: 18px;
  display: block;
  width: 100%;
  background: 0 0;
  height: 62px;
  padding: 0 20px 0 38px;
  outlier: none;
  border: none;
`;

const WrapSignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpLink = styled.a`
  &:hover {
    color: #482ff7;
    cursor: pointer;
  }
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
              />
            </WrapInput>
            <WrapInput>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={onPasswordChange}
                placeholder="Password"
              />
            </WrapInput>
            <WrapInput isButton={true}>
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
            <SignUpLink onClick={() => history.push("/signup")}>
              Sign up
            </SignUpLink>
          </WrapSignUp>
        </LoginWrapper>
      </Wrapper>
    </Container>
  );
};

export default LogIn;
