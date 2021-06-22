import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Months } from "./Months";
import { Weekdays } from "./Weekdays";

const SvgWrapper = styled.svg`
  height: 400px;
  width: 1000px;
`;

export const Svg = ({ monthLabels, weekLabels, cellSize, space, x, y }) => {
  const svgRef = useRef(null);
  const [X, setX] = useState(weekLabels ? 20 : 5);
  const [Y, setY] = useState(monthLabels ? 20 : 5);

  const gridNum = 12;

  useEffect(() => {
    setX(!!weekLabels ? 20 : 5);
  }, [weekLabels]);

  useEffect(() => {
    setY(!!monthLabels ? 20 : 5);
  }, [monthLabels]);

  return (
    <SvgWrapper ref={svgRef}>
      <Weekdays
        weekLabels={weekLabels}
        cellSize={cellSize}
        space={space}
        y={Y}
      />
      <Months
        monthLabels={monthLabels}
        cellSize={cellSize}
        space={space}
        x={X}
        colNum={gridNum}
        startDate={new Date(2021, 5, 1)}
      />
    </SvgWrapper>
  );
};
