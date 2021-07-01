import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoFastFood } from "react-icons/io5";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { dateFormat, dayNameFromDate, energyExpenditures } from "../../utils";
import { COLORS } from "../StyledComponents";
import { getToken, getUser } from "../../Actions/userSlice";
import { getEntryItems } from "../../Actions/entriesSlice";

const EntryLink = styled(Link)`
  margin: 0;
  padding: 0;
  color: white;
`;

export const Element = ({ id, created_at, ...rest }) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const userStats = useSelector(getUser);
  const [entryItems, setEntryItems] = useState([]);

  useEffect(async () => {
    const items = await dispatch(getEntryItems({ token, id }));
    if (items.error) return;
    setEntryItems(items.payload);
  }, []);

  const namedMonth = dateFormat(created_at);
  const dayMonth = dayNameFromDate(created_at);
  console.log(entryItems);
  console.log(rest);
  const totalCalories =
    entryItems.length > 0
      ? entryItems
          .map((item) => item.calories)
          .reduce((acc, item) => acc + item)
      : 0;
  return (
    <VerticalTimelineElement
      className='vertical-timeline-element--work'
      contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
      contentStyle={{
        background: COLORS.buttonColor,
        color: COLORS.titleGreyColor,
      }}
      date={namedMonth}
      dateClassName='vertical-timeline-element-date'
      icon={<IoFastFood />}
      iconStyle={{ background: COLORS.styledLinkColor, color: "#fff" }}>
      <EntryLink to={`timeline/${id}/edit`}>
        <h3 className='vertical-timeline-element-title'>{dayMonth}</h3>
        <p>{entryItems.length} items logged</p>
        <h4>
          {totalCalories} kcal out of {energyExpenditures(userStats).target}
        </h4>
      </EntryLink>
    </VerticalTimelineElement>
  );
};