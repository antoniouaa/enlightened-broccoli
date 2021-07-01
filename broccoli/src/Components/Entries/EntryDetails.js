import React from "react";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { addItemToEntry } from "../../Actions/entriesSlice";
import { Container, COLORS } from "../StyledComponents";

const EntryItemContainer = styled(Container)`
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
  addItem,
}) => {
  const dispatch = useDispatch();

  const onAddClick = (id) => {
    addItem({ title, description, calories, id });
    dispatch(addItemToEntry(id));
  };

  return (
    <EntryItemContainer>
      <span>
        {title} {calories} kcal
      </span>
      <p>{description}</p>
      {addItem && (
        <button onClick={(e) => onAddClick(id)}>
          <FiPlus />
        </button>
      )}
    </EntryItemContainer>
  );
};
