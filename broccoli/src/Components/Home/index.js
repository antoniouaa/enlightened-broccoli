import React from "react";
import { useSelector } from "react-redux";

import { isUserLoggedIn } from "../../Actions/userSlice";
import { Container, Wrapper } from "../StyledComponents";
import { IconHelper } from "./IconHelper";

export const Home = () => {
  const loggedIn = useSelector(isUserLoggedIn);

  return (
    <Container>
      <Wrapper spacing="space-between">{!loggedIn && <IconHelper />}</Wrapper>
    </Container>
  );
};

export default Home;
