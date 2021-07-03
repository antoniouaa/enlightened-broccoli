import React from "react";
import { useDispatch } from "react-redux";
import { FiPlus, FiMinus } from "react-icons/fi";
import styled from "styled-components";

import {
  addItemToEntry,
  removeItemFromEntry,
} from "../../Actions/entriesSlice";
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
  addItem,
}) => {
  const dispatch = useDispatch();

  const onAddClick = async (id) => {
    addItem({ title, description, calories, id });
    await dispatch(addItemToEntry(id));
  };

  const onRemoveClick = async (id) => {
    await dispatch(removeItemFromEntry(id));
  };

  return (
    <EntryItemContainer>
      <span>
        {title} {calories} kcal
      </span>
      <p>{description}</p>
      {!!addItem && (
        <button onClick={(e) => onAddClick(id)}>
          <FiPlus />
        </button>
      )}
      {!addItem && (
        <button onClick={(e) => onRemoveClick(id)}>
          <FiMinus />
        </button>
      )}
    </EntryItemContainer>
  );
};
