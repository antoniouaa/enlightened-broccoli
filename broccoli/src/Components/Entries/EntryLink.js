import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Wrapper, COLORS } from "../StyledComponents";
import { getUser } from "../../Actions/userSlice";
import { dateFormat } from "../../utils";

const EntryBox = styled.div`
  padding: 1rem;
  border-radius: 5px;
  border: 2px solid ${COLORS.buttonColor};
  background-color: ${COLORS.defaultWrapInputColor};
`;

export const EntryLink = ({ id, created_at, user_id }) => {
  const user = useSelector(getUser);
  const createdAt = dateFormat(created_at);

  return (
    <Wrapper>
      <Link to={`/entries/${id}`}>
        <EntryBox>
          <p> Entry: {id} </p>
          <p> Created on: {createdAt} </p>
          <p> Belongs to user: {user.username} </p>
        </EntryBox>
      </Link>
    </Wrapper>
  );
};
