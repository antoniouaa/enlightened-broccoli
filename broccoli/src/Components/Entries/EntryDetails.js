import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import styled from "styled-components";

import { Wrapper, COLORS } from "../StyledComponents";

const EntryItemContainer = styled(Wrapper)`
  margin: 0.5rem 0 0.5rem 0;
  padding: 0.5rem;
  background-color: ${COLORS.defaultWrapInputColor};
  border-radius: 4px;
`;

export const EntryListItem = ({
  title,
  description,
  calories,
  id,
  add,
  remove,
}) => {
  const onAddClick = (id) => {
    add({ title, description, calories, id });
  };

  const onRemoveClick = (id) => {
    remove({ title, description, calories, id });
  };

  return (
    <EntryItemContainer>
      <span>
        {title} {calories} kcal
      </span>
      <p>{description}</p>
      {!!add && (
        <button onClick={() => onAddClick(id)}>
          <FiPlus />
        </button>
      )}
      {!!remove && (
        <button onClick={() => onRemoveClick(id)}>
          <FiMinus />
        </button>
      )}
    </EntryItemContainer>
  );
};
