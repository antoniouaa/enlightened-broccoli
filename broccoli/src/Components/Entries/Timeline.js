import React from "react";
import { useSelector } from "react-redux";
import { VerticalTimeline } from "react-vertical-timeline-component";

import { getEntries } from "../../Actions/entriesSlice";
import { Wrapper } from "../StyledComponents";
import { Element } from "./TimelineElement";

export const Timeline = () => {
  const ent = useSelector(getEntries);

  return (
    <Wrapper>
      <VerticalTimeline>
        {ent
          .slice()
          .reverse()
          .map((entry) => (
            <Element key={entry.id} {...entry} />
          ))}
      </VerticalTimeline>
    </Wrapper>
  );
};
