import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoFastFood } from "react-icons/io5";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { dateFormat, getTime, energyExpenditures } from "../../utils";
import { COLORS } from "../StyledComponents";
import { getUser } from "../../Actions/userSlice";

const EntryLink = styled(Link)`
  margin: 0;
  padding: 0;
  color: white;
`;

export const Element = ({ id, created_at, entryitems }) => {
  const userStats = useSelector(getUser);

  const namedMonth = dateFormat(created_at);
  const dayTime = getTime(created_at);
  const totalCalories =
    entryitems.length > 0
      ? entryitems
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
        <h3 className='vertical-timeline-element-title'>{dayTime}</h3>
        <p>{entryitems.length} items logged</p>
        <h4>
          {totalCalories} kcal out of {energyExpenditures(userStats).target}
        </h4>
      </EntryLink>
    </VerticalTimelineElement>
  );
};
