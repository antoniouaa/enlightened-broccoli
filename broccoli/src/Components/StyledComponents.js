import styled from "styled-components";

export const COLORS = {
  buttonColor: "#827ffe",
  buttonColorHover: "#482ff7",
  defaultWrapInputColor: "#e6e6e6",
  inputBackgroundColor: "#403866",
  titleColor: "#403866",
  titleGreyColor: "#475569",
  styledLinkColor: "#482ff7",
  defaultBackground: "#fff",
};

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
  background-color: ${({ bgColor }) => bgColor || COLORS.defaultWrapInputColor};
  border: 1pc solid transparent;
  border-radius: 3px;
  margin-bottom: 8px;
  margin-top: ${({ mt }) => mt || "8px"};

  &:hover {
    cursor: ${({ isHoverable }) => (isHoverable ? "pointer" : "")};
    background-color: ${({ isHoverable }) =>
      isHoverable && COLORS.buttonColorHover};
  }
`;

export const Input = styled.input`
  color: ${({ textColor }) => textColor || COLORS.inputBackgroundColor};
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
    color: ${COLORS.styledLinkColor};
    cursor: pointer;
  }
`;

export const LoginWrapper = styled.div`
  max-width: 25rem;
  position: relative;
  margin-top: 45px;
  padding: 45px;
  border-radius: 5px;
  background-color: ${({ formColor }) => formColor || COLORS.defaultBackground};

  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: #403866;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 51px;
`;
