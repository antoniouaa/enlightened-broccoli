import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getToken } from "../../Actions/userSlice";
import { getEntries, getUserEntries } from "../../Actions/entriesSlice";
import { Container } from "../StyledComponents";
import { EntrySummary } from "./Entry";

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

  const entryItems = ent.map((entry) => <EntrySummary {...entry} />);
  return <Container>{entryItems}</Container>;
};

export default EntryList;
