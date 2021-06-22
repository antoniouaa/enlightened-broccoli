import React from "react";
import { useSelector } from "react-redux";

import { getEntries } from "../../Actions/entriesSlice";
import { Wrapper, Title, COLORS } from "../StyledComponents";
import { dateStringSlashes } from "../../utils";
import Heatmap from "./Heatmap.js";

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

  return (
    <Wrapper>
      <Title>Your Entries</Title>
      <Heatmap values={values} cellSize={15} space={20} y={10} />
    </Wrapper>
  );
}
