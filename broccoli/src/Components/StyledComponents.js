import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: ${({ spacing }) => spacing || "space-around"};
  align-items: center;
  padding: 15px;
`;

export const WrapSignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WrapInput = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ isButton }) => (isButton ? "#827ffe" : "#e6e6e6")};
  border: 1pc solid transparent;
  border-radius: 3px;
  margin-bottom: 8px;
  margin-top: ${({ mt }) => mt || "8px"};

  &:hover {
    cursor: ${({ isButton }) => (isButton ? "pointer" : "")};
    background-color: ${({ isButton }) => (isButton ? "#482ff7" : "#e6e6e6")};
  }
`;

export const Input = styled.input`
  color: ${({ textColor }) => textColor || "#403866"};
  font-weight: ${({ textHeavy }) => textHeavy || 400};
  line-height: 1.2;
  letter-spacing: 0.1rem;
  font-size: 18px;
  display: block;
  width: 100%;
  background: 0 0;
  height: ${({ height }) => height || "62px"};
  padding: 0 20px 0 38px;
  outlier: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledLink = styled.a`
  &:hover {
    color: #482ff7;
    cursor: pointer;
  }
`;
