import React from "react";

import { Svg } from "./Svg.js";
import { monthLabels, weekLabels } from "../../utils";

const Heatmap = (props) => {
  return <Svg {...props} {...{ monthLabels, weekLabels }} />;
};

export default Heatmap;
