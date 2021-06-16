import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { getUser } from "../../Actions/userSlice";
import carrot from "../../Assets/carrot.png";
import onion from "../../Assets/onion.png";
import {
  Container,
  Wrapper,
  Title,
  BroccoliImg,
  COLORS,
} from "../StyledComponents";
import { Statistic } from "./Statistic";

const ProfileContainer = styled(Container)`
  margin-top: 2.5rem;
  background-color: ${COLORS.defaultWrapInputColor};
  border-radius: 1rem;
`;

const ProfileIcon = styled(BroccoliImg)`
  margin: 0;
  left: 0;
  border-radius: 50%;
  object-fit: cover;
  width: 10rem;
  height: 10rem;
  padding: 0.2rem;
  border: 0.2rem solid ${COLORS.buttonColor};
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ProfileSubTitle = styled(Title)`
  font-size: 26px;
  margin-bottom: 0;
  padding-bottom: 0;
`;

export const Profile = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  if (!user) {
    history.push("/login");
  }

  const { username, height, weight, age, sex, goal } = user;
  const userStats = {
    Height: height,
    Weight: weight,
    Age: age,
    Sex: sex,
  };

  const maleBMR = 66.47 + 13.75 * +weight + 5.003 * +height - 6.755 * +age;
  const femaleBMR = 655.1 + 9.563 * +weight + 1.85 * +height - 4.676 * +age;
  const BMR = Math.round(sex === "male" ? maleBMR : femaleBMR);
  const multipliers = {
    sed: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.75,
    extreme: 1.95,
  };
  const extraCalories = {
    lose: 0.8,
    maintain: 1,
    gain: 1.2,
  };
  const sedentaryCalories = Math.round(BMR * multipliers.sed);
  const target = Math.round(sedentaryCalories * extraCalories[goal]);

  const about = Object.entries(userStats).map(([name, stat]) => {
    const unit = name === "Height" ? "cm" : name === "Weight" ? "kg" : "";
    return <Statistic key={name} name={name} stat={stat} unit={unit} />;
  });
  const caloric = (
    <Statistic name="Basal Metabolic Rate" stat={BMR} unit="kcal" />
  );
  const sedentary = (
    <Statistic name="Sedentary" stat={sedentaryCalories} unit="kcal" />
  );
  const targetCalories = <Statistic name="Target" stat={target} unit="kcal" />;

  return (
    <ProfileContainer>
      <Wrapper direction="row" spacing="center">
        <Wrapper direction="column">
          <ProfileIcon src={sex === "male" ? carrot : onion} />
          <p>@{username}</p>
        </Wrapper>
        <Wrapper>
          <ProfileSubTitle>About you</ProfileSubTitle>
          {about}
        </Wrapper>
        <Wrapper>
          <ProfileSubTitle>Caloric Needs</ProfileSubTitle>
          {caloric}
          {sedentary}
          {targetCalories}
        </Wrapper>
      </Wrapper>
    </ProfileContainer>
  );
};

export default Profile;
