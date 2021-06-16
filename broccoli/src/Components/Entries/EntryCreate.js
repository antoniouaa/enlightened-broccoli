import React from "react";
import styled from "styled-components";

import {
  Title,
  Wrapper,
  Form,
  LoginWrapper,
  WrapInput,
  Input,
  COLORS,
} from "../StyledComponents";

const EntryFormWrapper = styled(LoginWrapper)`
  background-color: ${COLORS.defaultWrapInputColor};
`;

const ItemSearch = styled(Input)`
  color: ${COLORS.titleGreyColor};
`;

export const EntryCreate = () => {
  return (
    <Wrapper>
      <EntryFormWrapper>
        <Form>
          <Title>Create a new entry</Title>
          <WrapInput bgColor={COLORS.defaultBackground}>
            <ItemSearch id='item' placeholder='Search items' required />
          </WrapInput>
        </Form>
      </EntryFormWrapper>
    </Wrapper>
  );
};
