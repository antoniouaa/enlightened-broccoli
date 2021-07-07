import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { VerticalTimeline } from "react-vertical-timeline-component";

import { getEntries, createEntry } from "../../Actions/entriesSlice";
import { Wrapper, AddEntryLink } from "../StyledComponents";
import { Element } from "./TimelineElement";

export const Timeline = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ent = useSelector(getEntries)
    .slice()
    .reverse()
    .filter((entry) => entry.items.length > 0);

  return (
    <Wrapper>
      {ent.length > 0 ? (
        <VerticalTimeline>
          {ent.map((entry) => (
            <Element key={entry.id} {...entry} />
          ))}
        </VerticalTimeline>
      ) : (
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
      )}
    </Wrapper>
  );
};
