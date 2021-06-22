import React, { useMemo } from "react";

import { oneDayTime } from "../../utils";

export const Months = ({
  monthLabels = [],
  cellSize = 0,
  x = 0,
  space = 0,
  colNum = 0,
  startDate,
}) => {
  const monthNames = useMemo(() => {
    return [...Array(colNum * 7)]
      .map((_, index) => {
        if ((index / 7) % 1 === 0) {
          const date = new Date(startDate.getTime() + index * oneDayTime);
          const month = date.getMonth();
          return {
            col: index / 7,
            index,
            month,
            day: date.getDate(),
            monthName: monthLabels[month],
            date,
          };
        }
        return null;
      })
      .filter(Boolean)
      .filter(
        (item, index, list) =>
          list[index - 1] && list[index - 1].month !== item.month
      );
  }, [colNum, monthLabels, startDate]);

  return useMemo(() => {
    return (
      <React.Fragment>
        {[...monthNames].map(
          (item, index) => {
            return (
              <text
                key={index}
                data-size={cellSize}
                x={x + space * 2}
                y={15}
                dx={item.col * (cellSize + space)}
                textAnchor="start"
              >
                {item.monthName}
              </text>
            );
          },
          [monthNames, x, cellSize, space]
        )}
      </React.Fragment>
    );
  }, [monthNames, x, cellSize, space]);
};
