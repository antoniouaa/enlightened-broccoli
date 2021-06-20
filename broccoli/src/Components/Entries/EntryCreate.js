import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { FiPlus } from "react-icons/fi";
import { fetchItems } from "../../Actions/itemsSlice";
import { addItemToEntry } from "../../Actions/entriesSlice";

import {
  Title,
  Form,
  LoginWrapper,
  WrapInput,
  Input,
  COLORS,
  Container,
} from "../StyledComponents";

const CreateWrapper = styled(Container)`
  display: flex;
  flex-direction: row;
  flex: 1 2;
`;

const EntryFormWrapper = styled(LoginWrapper)`
  background-color: ${COLORS.defaultWrapInputColor};
  position: fixed;
  left: 38%;
`;

const AddedItems = styled(EntryFormWrapper)`
  background-color: white;
  left: 15%;
  order: -1;
`;

const ItemSearch = styled(Input)`
  color: ${COLORS.titleGreyColor};
`;

export const EntryCreate = () => {
  const allItems = useSelector(fetchItems);
  const userInput = useRef(null);
  const [filtered, setFiltered] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  const appendItem = (item) => setAddedItems([...addedItems, item]);

  useEffect(() => setFiltered(allItems), []);

  const onUserInput = (e) => {
    setFiltered(allItems.filter((item) => item.title.includes(e.target.value)));
  };

  return (
    <CreateWrapper>
      <AddedItems>
        {addedItems.length > 0 && "Today's Items"}
        {addedItems.map((i, key) => (
          <EntryListItem key={key} {...i} />
        ))}
      </AddedItems>
      <EntryFormWrapper>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Title>Create a new entry</Title>
          <WrapInput bgColor={COLORS.defaultBackground}>
            <ItemSearch
              ref={userInput}
              id='item'
              placeholder='Search items'
              onChange={onUserInput}
            />
          </WrapInput>
          <ul>
            {filtered.map((item, key) => (
              <EntryListItem key={key} addItem={appendItem} {...item} />
            ))}
          </ul>
        </Form>
      </EntryFormWrapper>
    </CreateWrapper>
  );
};

const EntryItemContainer = styled(Container)`
  margin: 0.5rem 0 0.5rem 0;
  padding: 0.5rem;
  background-color: ${COLORS.defaultWrapInputColor};
  border-radius: 4px;
`;

const EntryListItem = ({ title, description, calories, id, addItem }) => {
  const dispatch = useDispatch();

  const onAddClick = (id) => {
    addItem({ title, description, calories });
    dispatch(addItemToEntry(id));
  };

  return (
    <EntryItemContainer>
      <span>
        {title}
        {calories} kcal
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
