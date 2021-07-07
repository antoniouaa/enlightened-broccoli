import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { fetchItems } from "../../Actions/itemsSlice";
import {
  patchEntry,
  getItemsByEntryId,
  getUserEntries,
} from "../../Actions/entriesSlice";
import {
  Title,
  Form,
  LoginWrapper,
  WrapInput,
  Input,
  COLORS,
  Container,
  StyledLink,
} from "../StyledComponents";
import { EntryListItem } from "./EntryDetails";

const CreateWrapper = styled(Container)`
  display: flex;
  flex-direction: row;
  flex: 1 2;
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
  }
`;

const EntryFormWrapper = styled(LoginWrapper)`
  background-color: ${COLORS.defaultWrapInputColor};
  position: fixed;
  left: 38%;
  @media only screen and (max-width: 768px) {
    left: 0%;
    position: relative;
  }
`;

const AddedItems = styled(EntryFormWrapper)`
  width: 18rem;
  padding: 0;
  background-color: white;
  left: 15%;

  @media only screen and (max-width: 768px) {
    left: 0%;
  }
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

const FilterList = styled.ul`
  width: 100%;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const EntryForm = styled(Form)`
  justify-content: center;
`;

const ItemCreateLink = styled(StyledLink)`
  color: ${COLORS.buttonColorHover};
`;

const CreateDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ItemCreate = ({ history }) => {
  return (
    <CreateDiv>
      <span>Filter items</span>
      <span>
        <ItemCreateLink onClick={() => history.push("/item/create")}>
          Create new item
        </ItemCreateLink>
        .
      </span>
    </CreateDiv>
  );
};

export const EntryCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const allItems = useSelector(fetchItems);
  const items = useSelector(getItemsByEntryId(Number(id)));
  const [filtered, setFiltered] = useState([]);
  const [addedItems, setAddedItems] = useState(items);

  const appendItem = (item) => {
    setAddedItems([...addedItems, item]);
    dispatch(patchEntry({ item_id: item.id, id, action: "add" }));
    dispatch(getUserEntries());
  };
  const removeItem = (item) => {
    setAddedItems(addedItems.filter((i) => i !== item));
    dispatch(patchEntry({ item_id: item.id, id, action: "remove" }));
    dispatch(getUserEntries());
  };
  const onUserInput = (e) => {
    if (e.target.value === "") {
      setFiltered([]);
    } else {
      setFiltered(
        allItems.filter((item) => item.title.includes(e.target.value))
      );
    }
  };

  const onFormSubmit = async (e) => {
    if (addedItems.length > 0) {
      alert("Items added!");
    } else {
      alert("Items not added!");
    }
  };

  const totalCalories =
    addedItems.length > 0
      ? addedItems
          .map((item) => item.calories)
          .reduce((acc, next) => acc + next)
      : 0;

  return (
    <CreateWrapper>
      <AddedItems>
        {addedItems.length > 0 && `Today's Items (${totalCalories}kcal)`}
        {addedItems.map((item, key) => (
          <EntryListItem key={key} {...item} remove={() => removeItem(item)} />
        ))}
      </AddedItems>
      <EntryFormWrapper>
        <EntryForm onSubmit={(e) => e.preventDefault()}>
          <Title>Create a new entry</Title>
          <SearchBar bgColor={COLORS.defaultBackground}>
            <ItemSearch
              id='item'
              placeholder='Search items'
              onChange={onUserInput}
            />
            <button onClick={onFormSubmit}>Add to Entry</button>
          </SearchBar>
          <ItemCreate history={history} />
          <FilterList>
            {filtered.map((item, key) => (
              <EntryListItem key={key} {...item} add={() => appendItem(item)} />
            ))}
          </FilterList>
        </EntryForm>
      </EntryFormWrapper>
    </CreateWrapper>
  );
};
