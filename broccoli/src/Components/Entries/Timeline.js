import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerticalTimeline } from "react-vertical-timeline-component";

import { getToken } from "../../Actions/userSlice";
import { getEntries, getUserEntries } from "../../Actions/entriesSlice";
import { Wrapper } from "../StyledComponents";
import { Element } from "./TimelineElement";

export const Timeline = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const ent = useSelector(getEntries);

  // useEffect(() => {
  //   const res = dispatch(getUserEntries(token));
  //   if (res.error) {
  //     return;
  //   }
  // }, []);

  const elements = ent
    .slice()
    .reverse()
    .map((entry) => <Element key={entry.id} {...entry} />);
  return (
    <Wrapper>
      <VerticalTimeline>{elements}</VerticalTimeline>
    </Wrapper>
  );
};
