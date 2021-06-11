import React from "react";

import {
  Container,
  Wrapper,
  WrapInput,
  Input,
  LoginWrapper as SignUpWrapper,
  Title,
  Form,
} from "./StyledComponents";

export const SignUp = () => {
  return (
    <Container>
      <Wrapper>
        <SignUpWrapper>
          <Form>
            <Title>Sign up</Title>
            <WrapInput>
              <Input />
            </WrapInput>
          </Form>
        </SignUpWrapper>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
