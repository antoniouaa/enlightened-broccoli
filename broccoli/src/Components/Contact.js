import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {
  WrapIcon,
  BroccoliImg,
  Form,
  Wrapper,
  COLORS,
  WrapInput,
  Input,
} from "./StyledComponents";
import Broccoli from "../Assets/broccoli.png";

const WrapIconText = styled.div`
  margin-right: 3rem;

  h1:nth-child(3) {
    padding-bottom: 3rem;
  }

  @media only screen and (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

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
  width: 30rem;
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

  &:hover {
    height: 200px;
    cursor: text;
  }
`;

const AboutImg = styled(BroccoliImg)`
  left: 10%;
  top: 10%;
`;

const WrapAbout = styled(WrapIcon)`
  align-items: flex-start;
`;

export const Contact = () => {
  const history = useHistory();
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message, we will get back to you shortly!");
    setFormDetails({ fullName: "", email: "", message: "" });
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <Wrapper>
      <WrapAbout>
        <WrapIconText>
          <AboutText>Have a question?</AboutText>
          <AboutText isBlue={COLORS.buttonColor}>Drop us a message!</AboutText>
          <EnquiryForm>
            <label htmlFor='fullName'>Full Name</label>
            <EnquiryInput>
              <Input
                id='fullName'
                placeholder="What's your name"
                value={formDetails.fullName}
                required
                onChange={(e) =>
                  setFormDetails({ ...formDetails, fullName: e.target.value })
                }
              />
            </EnquiryInput>
            <label htmlFor='email'>Email address</label>
            <EnquiryInput>
              <Input
                id='email'
                placeholder='your_email@example.com'
                value={formDetails.email}
                required
                onChange={(e) =>
                  setFormDetails({ ...formDetails, email: e.target.value })
                }
              />
            </EnquiryInput>
            <label htmlFor='message'>Message</label>
            <EnquiryInput>
              <MessageBox
                id='message'
                placeholder='What issues have you experienced?'
                value={formDetails.message}
                required
                onChange={(e) =>
                  setFormDetails({ ...formDetails, message: e.target.value })
                }
              />
            </EnquiryInput>
            <EnquiryInput isHoverable bgColor={COLORS.buttonColor}>
              <Input
                cur='pointer'
                type='button'
                textColor='#fff'
                textHeavy='500'
                value='Submit'
                onClick={onFormSubmit}
              />
            </EnquiryInput>
          </EnquiryForm>
        </WrapIconText>
        <AboutImg src={Broccoli} />
      </WrapAbout>
    </Wrapper>
  );
};

export default Contact;
