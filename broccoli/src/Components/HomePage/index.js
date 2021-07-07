import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import Rice from "../../Assets/rice.png";
import { getToken, getUser, isUserLoggedIn } from "../../Actions/userSlice";
import {
  createEntry,
  getEntries,
  getUserEntries,
} from "../../Actions/entriesSlice";
import {
  Container,
  StyledLink,
  WrapIcon,
  BroccoliImg as Image,
  COLORS,
} from "../StyledComponents";
import { dateGreeting, getDifferenceBetweenEntries } from "../../utils";
import { Welcome } from "./WelcomePage";

const WelcomeWrapper = styled.div`
  margin: 2rem;
  padding: 2rem;

  & > h1 {
    color: ${COLORS.titleGreyColor};
    margin: 0 0 2rem 0;
    text-align: left;
  }
  & > h1:nth-child(2) {
    margin-bottom: 0;
  }
  & > h1 > span {
    font-size: 30px;
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
  const entries = useSelector(getEntries);

  useEffect(() => {
    const res = dispatch(getUserEntries());
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
    <WrapIcon>
      <Image src={Rice} />
      <WelcomeWrapper>
        <h1>Hello {user.username},</h1>
        <h1>The date today is</h1>
        <h1>
          <span>{dateGreeting(today)}</span>
        </h1>
        {entries.length > 0 ? (
          <h3>Your last entry was {diff}</h3>
        ) : (
          <h3>Make your first entry today!</h3>
        )}
        <AddEntryLink
          onClick={async () => {
            const res = await dispatch(createEntry());
            if (res.error) {
              return;
            }
            const { id } = res.payload;
            history.push(`/timeline/${id}/edit`);
          }}>
          Add an entry?
        </AddEntryLink>
      </WelcomeWrapper>
    </WrapIcon>
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
