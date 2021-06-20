import React, { useState } from "react";

export const Autocomplete = ({ suggestions }) => {
  const [suggestionState, setSuggestionState] = useState({
    active: 0,
    filtered: [],
    show: false,
    input: "",
  });

  return <div></div>;
};
