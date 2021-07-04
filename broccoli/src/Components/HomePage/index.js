import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { getToken, getUser, isUserLoggedIn } from "../../Actions/userSlice";
import {
  createEntry,
  getEntries,
  getUserEntries,
} from "../../Actions/entriesSlice";
import { Container, Wrapper, StyledLink, COLORS } from "../StyledComponents";
import { Welcome } from "./WelcomePage";
import { dateGreeting, getDifferenceBetweenEntries } from "../../utils";
import { useEffect } from "react";

const WelcomeWrapper = styled(Wrapper)`
  justify-content: center;
  margin-top: 4rem;
  & > h4 {
    font-size: 42px;
    font-weight: 700;
    color: ${COLORS.titleGreyColor};
    margin: 0 0 2rem 0;
  }
  & > h4 > span {
    color: ${COLORS.styledLinkColor};
  }
  & > h3 {
    font-size: 26px;
  }
`;

const AddEntryLink = styled(StyledLink)`
  font-size: 26px;
`;

export const AuthedHome = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const entries = useSelector(getEntries);

  useEffect(() => {
    const res = dispatch(getUserEntries(token));
    if (res.error) {
      return;
    }
  }, []);

  const today = Date.now();
  let diff = "";
  if (entries.length > 0) {
    const [latest] = entries.slice().reverse().slice(0, 1);
    diff = getDifferenceBetweenEntries(today, Date.parse(latest.created_at));
  }
  return (
    <WelcomeWrapper>
      <h4>Hello {user.username}</h4>
      <h4>
        The date today is <span>{dateGreeting(today)}</span>
      </h4>
      {entries.length > 0 ? (
        <h3>Your last entry was {diff}</h3>
      ) : (
        <h3>Make your first entry today!</h3>
      )}
      <AddEntryLink
        onClick={async () => {
          const res = await dispatch(createEntry(token));
          if (res.error) {
            return;
          }
          const { id } = res.payload;
          history.push(`/timeline/${id}/edit`);
        }}>
        Add an entry?
      </AddEntryLink>
    </WelcomeWrapper>
  );
};

export const Home = () => {
  const loggedIn = useSelector(isUserLoggedIn);
  const user = useSelector(getUser);

  return (
    <Container>{loggedIn ? <AuthedHome user={user} /> : <Welcome />}</Container>
  );
};

export default Home;
