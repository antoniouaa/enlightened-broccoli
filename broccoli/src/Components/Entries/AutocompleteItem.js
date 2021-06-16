import React, { useState } from "react";

export const Autocomplete = () => {
  const [suggestionState, setSuggestionState] = useState({
    active: 0,
    filtered: [],
    show: false,
    input: "",
  });
};
