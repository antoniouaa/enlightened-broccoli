import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { getUser, isUserLoggedIn } from "../../Actions/userSlice";
import { getItems } from "../../Actions/itemsSlice";
import { Container, Wrapper, StyledLink } from "../StyledComponents";
import { Welcome } from "./WelcomePage";

export const AuthedHome = (user) => {
  const history = useHistory();
  return (
    <Wrapper>
      <StyledLink onClick={() => history.push("/entries/create")}>
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
      <Wrapper spacing='space-between'>
        {loggedIn ? <AuthedHome {...user} /> : <Welcome />}
      </Wrapper>
    </Container>
  );
};

export default Home;
