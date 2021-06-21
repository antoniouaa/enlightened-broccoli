import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { FiPlus } from "react-icons/fi";
import { fetchItems } from "../../Actions/itemsSlice";
import { addItemToEntry, getEntryItems } from "../../Actions/entriesSlice";

import {
  Title,
  Form,
  LoginWrapper,
  WrapInput,
  Input,
  COLORS,
  Container,
} from "../StyledComponents";
import { getToken } from "../../Actions/userSlice";

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

const SearchBar = styled(WrapInput)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  & > button {
    height: 80%;
    margin: 0 0.5rem 0 0.5rem;
    width: 6rem;
    align-self: center;

    border: 0;
    background: none;
    background-color: ${COLORS.greenSubmitButtonColor};
    border-radius: 4px;
    color: white;
    font-weight: 600;

    :hover {
      cursor: pointer;
      background-color: ${COLORS.greenSubmitButtonColorHover};
    }
  }
`;

export const EntryCreate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const allItems = useSelector(fetchItems);
  const token = useSelector(getToken);
  const [filtered, setFiltered] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  const appendItem = (item) => setAddedItems([...addedItems, item]);

  useEffect(async () => {
    setFiltered(allItems);
    const res = await dispatch(getEntryItems({ token, id }));
    if (res.error) return;
    setAddedItems(res.payload || []);
  }, []);

  const onUserInput = (e) => {
    setFiltered(allItems.filter((item) => item.title.includes(e.target.value)));
  };

  const onFormSubmit = async (e) => {
    if (addedItems.length > 0) {
      const res = await dispatch(
        addItemToEntry({ items: addedItems, token, id })
      );
      if (res.error) return;
      alert("Items added!");
    } else {
      alert("Items not added!");
    }
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
          <SearchBar bgColor={COLORS.defaultBackground}>
            <ItemSearch
              id='item'
              placeholder='Search items'
              onChange={onUserInput}
            />
            <button onClick={onFormSubmit}>Submit</button>
          </SearchBar>
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
    addItem({ title, description, calories, id });
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
