import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Wrapper, COLORS } from "../StyledComponents";

const EntryBox = styled.div`
  padding: 1rem;
  border-radius: 5px;
  border: 2px solid ${COLORS.buttonColor};
  background-color: ${COLORS.defaultWrapInputColor};
`;

export const EntrySummary = ({ id, created_at, user_id }) => {
  return (
    <Wrapper>
      <Link to={`/entries/${id}`}>
        <EntryBox>
          <p>Entry: {id}</p>
          <p>Created on: {created_at}</p>
          <p>Belongs to user: {user_id}</p>
        </EntryBox>
      </Link>
    </Wrapper>
  );
};
