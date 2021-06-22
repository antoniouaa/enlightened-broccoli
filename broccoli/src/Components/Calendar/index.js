import React from "react";
import { useSelector } from "react-redux";
import HeatMap from "@uiw/react-heat-map";

import { getEntries } from "../../Actions/entriesSlice";
import { Wrapper, Title, COLORS } from "../StyledComponents";
import { dateStringSlashes } from "../../utils";

const panelColors = {
  0: COLORS.defaultBackground,
  2: COLORS.defaultWrapInputColor,
  4: COLORS.buttonColor,
  6: COLORS.greenSubmitButtonColor,
};

export default function Calendar(props) {
  const entries = useSelector(getEntries);

  const values = entries.map((entry) => {
    return { ...entry, created_at: dateStringSlashes(entry.created_at) };
  });
  console.log(values);

  return (
    <Wrapper>
      <Title>Your Entries</Title>
      <HeatMap
        width={600}
        style={{ color: "#ad001d" }}
        startDate={new Date("2021/06/01")}
        panelColors={panelColors}
      />
    </Wrapper>
  );
}
