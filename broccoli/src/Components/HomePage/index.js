import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { getToken, getUser, isUserLoggedIn } from "../../Actions/userSlice";
import { createEntry } from "../../Actions/entriesSlice";
import { Container, Wrapper, StyledLink } from "../StyledComponents";
import { Welcome } from "./WelcomePage";

export const AuthedHome = (user) => {
  const history = useHistory();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <StyledLink
        onClick={async () => {
          const res = await dispatch(createEntry(token));
          if (res.error) {
            return;
          }
          const { id } = res.payload;
          history.push(`/entries/${id}/edit`);
        }}
      >
        Add an entry?
      </StyledLink>
    </Wrapper>
  );
};

export const Home = () => {
  const loggedIn = useSelector(isUserLoggedIn);
  const user = useSelector(getUser);

  return (
    <Container>
      <Wrapper spacing="space-between">
        {loggedIn ? <AuthedHome {...user} /> : <Welcome />}
      </Wrapper>
    </Container>
  );
};

export default Home;
