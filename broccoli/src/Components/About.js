import React from "react";
import styled from "styled-components";

import Chicken from "../Assets/chicken.png";
import { Wrapper, BroccoliImg, COLORS } from "./StyledComponents";

const Article = styled.article`
  width: 50%;
`;

const AboutWrapper = styled(Wrapper)`
  text-align: center;

  h3 {
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 0.2rem;
    color: ${COLORS.styledLinkColor};
  }

  h4 {
    font-size: 42px;
    font-weight: 700;
    color: ${COLORS.titleGreyColor};
    margin: 0 0 2rem 0;
  }

  @media only screen and (max-width: 768px) {
    margin: 0;
    & > ${Article} {
      width: 18rem;
      text-align: justify;
    }
  }

  @media only screen and (max-width: 1024px) {
    margin: 0;
    & > ${Article} {
      width: 30rem;
      text-align: justify;
    }
  }
`;

const ChickenImg = styled(BroccoliImg)`
  margin: 2rem;
  height: 320px;
  width: 210px;
`;

export const About = () => {
  return (
    <AboutWrapper>
      <h3>broccoli</h3>
      <h4>About the App</h4>
      <Article>
        <p>Broccoli is a simple and intuitive calorie tracking application.</p>
        <br />
        <p>
          The project was started on May 21st right after the third wave of
          lockdown restrictions lifts and the world was opening up again.
        </p>
        <ChickenImg src={Chicken} />
      </Article>
    </AboutWrapper>
  );
};

export default About;
