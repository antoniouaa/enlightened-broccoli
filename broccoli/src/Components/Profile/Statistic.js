import React from "react";
import styled from "styled-components";

import { COLORS } from "../StyledComponents";

const StatisticWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0 5px 0;
  padding: 5px;
  border-radius: 5px;
  border-bottom: 2px solid ${COLORS.defaultBackground};
`;

const StatSpan = styled.span`
  color: ${COLORS.titleColor};
`;

export const Statistic = ({ name, stat, unit }) => {
  return (
    <StatisticWrapper>
      <span>{name}</span>
      <span>
        <StatSpan>{stat} </StatSpan>
        {unit}
      </span>
    </StatisticWrapper>
  );
};
