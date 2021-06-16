import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getToken } from "../../Actions/userSlice";
import { getEntries, getUserEntries } from "../../Actions/entriesSlice";
import { Container } from "../StyledComponents";

export const Entries = () => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const token = useSelector(getToken);
  const ent = useSelector(getEntries);

  useEffect(() => {
    const res = dispatch(getUserEntries(token));
    if (res.error) {
      return;
    }
    setEntries(res);
  }, []);

  const entryItems = ent.map(({ id, created_at, user_id }) => (
    <div>
      <p>Entry: {id}</p>
      <p>Created on: {created_at}</p>
      <p>Belongs to user: {user_id}</p>
    </div>
  ));
  return <Container>{entryItems}</Container>;
};
