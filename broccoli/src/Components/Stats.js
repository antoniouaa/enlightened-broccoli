import React from "react";
import styled from "styled-components";

const testData = {
  username: "antoniouaa",
  email: "antoniouaa@hotmail.com",
  height: "175",
  weight: "68",
  age: "25",
  sex: "Male",
};

const StatsContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0px 10px 0px;
`;

export const Stats = () => {
  const { username, email, height, weight, age, sex } = testData;
  return (
    <StatsContainer>
      <h3>{username}</h3>
      <h3>{email}</h3>
      <div>
        <p>{height}</p>
        <p>{weight}</p>
        <p>{age}</p>
        <p>{sex}</p>
      </div>
    </StatsContainer>
  );
};

export default Stats;
