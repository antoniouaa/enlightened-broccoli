import React, { useMemo } from "react";

export const Weekdays = ({
  weekLabels = [],
  cellSize = 0,
  y = 0,
  space = 0,
}) => {
  return useMemo(
    () => (
      <React.Fragment>
        {weekLabels.map((day, index) => {
          if (weekLabels) {
            return (
              <text
                key={index}
                x={15}
                y={y}
                dy={(index + 1) * (cellSize + space) - 5}
              >
                {day}
              </text>
            );
          }
          return null;
        })}
      </React.Fragment>
    ),
    [cellSize, space, y, weekLabels]
  );
};
