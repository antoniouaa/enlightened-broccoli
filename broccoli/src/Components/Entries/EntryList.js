import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getToken } from "../../Actions/userSlice";
import { getEntries, getUserEntries } from "../../Actions/entriesSlice";
import { Container, Wrapper } from "../StyledComponents";
import { EntryLink } from "./EntryLink";

export const EntryList = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const ent = useSelector(getEntries);

  useEffect(() => {
    const res = dispatch(getUserEntries(token));
    if (res.error) {
      return;
    }
  }, []);

  const entryItems = ent
    .slice()
    .reverse()
    .map((entry) => <EntryLink {...entry} />);
  return (
    <Container>
      <Wrapper>{entryItems}</Wrapper>
    </Container>
  );
};
