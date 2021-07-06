import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { addItem } from "../../Actions/itemsSlice";
import { getToken } from "../../Actions/userSlice";
import {
  Wrapper,
  Form,
  COLORS,
  WrapInput,
  Input,
  LoginWrapper as FormWrap,
} from "../StyledComponents";

const AboutText = styled.h1`
  margin: 0.2rem 0 0 0;
  color: ${({ isBlue }) => isBlue || COLORS.titleGreyColor};
`;

const EnquiryInput = styled(WrapInput)`
  display: block;
  margin-top: 0.5rem;
  color: white;
`;

const EnquiryForm = styled(Form)`
  margin-top: 1rem;
  width: 100%;
`;

const MessageBox = styled.textarea`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor || COLORS.defaultWrapInputColor};
  font-weight: 400;
  letter-spacing: 0.1rem;
  font-size: 18px;
  display: block;
  background: 0 0;
  padding: 20px 20px 0 20px;
  outlier: none;
  border: none;
  font-family: Tahoma;
  color: ${COLORS.titleColor};
`;

export const CreateItem = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [item, setItem] = useState({
    title: "",
    calories: "",
    description: "",
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (Boolean(item.title) && Boolean(item.calories)) {
      await dispatch(addItem({ token, item }));
      setTimeout(() => {
        history.push("/timeline");
      }, 1000);
    }
  };

  return (
    <Wrapper>
      <FormWrap>
        <AboutText>Add a new item</AboutText>
        <EnquiryForm>
          <label htmlFor='fullName'>Item Title</label>
          <EnquiryInput>
            <Input
              id='title'
              placeholder="What's the item's title?"
              value={item.title}
              required
              onChange={(e) => setItem({ ...item, title: e.target.value })}
            />
          </EnquiryInput>
          <label htmlFor='calories'>Total Calories</label>
          <EnquiryInput>
            <Input
              id='calories'
              placeholder='xxx kcal'
              value={item.calories}
              required
              onChange={(e) => setItem({ ...item, calories: e.target.value })}
            />
          </EnquiryInput>
          <label htmlFor='description'>Message</label>
          <EnquiryInput>
            <MessageBox
              id='description'
              placeholder='Add a small description for the item'
              value={item.description}
              required
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
          </EnquiryInput>
          <EnquiryInput isHoverable bgColor={COLORS.buttonColor}>
            <Input
              cur='pointer'
              type='button'
              textColor='#fff'
              textHeavy='500'
              value='Add to database'
              onClick={onFormSubmit}
            />
          </EnquiryInput>
        </EnquiryForm>
      </FormWrap>
    </Wrapper>
  );
};
