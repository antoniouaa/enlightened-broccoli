import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

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
  StyledLink,
} from "../StyledComponents";
import { EntryListItem } from "./EntryDetails";
import { getToken } from "../../Actions/userSlice";

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
  const token = useSelector(getToken);
  const [filtered, setFiltered] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  const appendItem = (item) => setAddedItems([...addedItems, item]);

  useEffect(() => {
    async function addAndFilterItems() {
      const res = await dispatch(getEntryItems({ token, id }));
      if (res.error) return;
      setAddedItems(res.payload || []);
    }
    addAndFilterItems();
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
        {addedItems.map((i, key) => (
          <EntryListItem key={key} {...i} />
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
            <button onClick={onFormSubmit}>Submit</button>
          </SearchBar>
          <ItemCreate history={history} />
          <FilterList>
            {filtered.map((item, key) => (
              <EntryListItem key={key} addItem={appendItem} {...item} />
            ))}
          </FilterList>
        </EntryForm>
      </EntryFormWrapper>
    </CreateWrapper>
  );
};
