import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { isUserLoggedIn, logoutUser } from "../Actions/userSlice";
import { COLORS } from "./StyledComponents";

const Header = styled.header`
  border-bottom: 1px solid #e2e8f0;
`;

const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.5rem 0.5rem;
  height: 5rem;
  z-index: 9990;
`;

const Headline = styled.h1`
  font-weight: 500;
  letter-spacing: 0.2rem;
  color: ${COLORS.styledLinkColor};
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 768px) {
    position: absolute;
    display: none;

    flex-direction: column;
    background: #fff;
    width: 95%;
    height: 200px;
    text-align: center;
    box_shadow: 0 10px 27px rgba(0, 0, 0, 0.5);

    &.active {
      display: flex;
      top: calc(5rem + 1px);
      box-shadow: 0 10px 5px -2px ${COLORS.titleGreyColor};
    }
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;
  margin-right: 2rem;
  font-weight: 400;

  a {
    color: ${COLORS.titleGreyColor};
  }

  a:hover {
    color: ${COLORS.styledLinkColor};
  }

  @media only screen and (max-width: 768px) {
    margin: 1rem 0;
    &:hover {
      background-color: #fff;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
    &.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    &.active span:nth-child(2) {
      opacity: 0;
    }
    &.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
`;

const Bar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
  background-color: #101010;
`;

export const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const menu = useRef(null);
  const hamburger = useRef(null);
  const loggedIn = useSelector(isUserLoggedIn);

  const openMenu = () => {
    hamburger.current.classList.toggle("active");
    menu.current.classList.toggle("active");
  };

  const closeMenu = () => {
    hamburger.current.classList.remove("active");
    menu.current.classList.remove("active");
  };

  const onLogout = async () => {
    const res = await dispatch(logoutUser());
    if (res.error) {
      alert(res.error.message);
    }
    history.push("/");
  };

  const Profile = (
    <Link onClick={closeMenu} to='/profile'>
      Profile
    </Link>
  );
  const Entries = (
    <Link onClick={closeMenu} to='/entries'>
      Entries
    </Link>
  );
  const Login = (
    <Link onClick={closeMenu} to='/login'>
      Login
    </Link>
  );
  const About = (
    <Link onClick={closeMenu} to='/about'>
      About
    </Link>
  );
  const Contact = (
    <Link onClick={closeMenu} to='/contact'>
      Contact
    </Link>
  );
  const Logout = (
    <Link onClick={onLogout} to='/'>
      Log out
    </Link>
  );
  return (
    <Header>
      <Nav>
        <Link to='/'>
          <Headline>enlightened broccoli</Headline>
        </Link>
        <NavMenu ref={menu}>
          <NavItem>{loggedIn ? Profile : Login}</NavItem>
          {loggedIn && <NavItem>{Entries}</NavItem>}
          <NavItem>{About}</NavItem>
          <NavItem>{Contact}</NavItem>
          {loggedIn && <NavItem>{Logout}</NavItem>}
        </NavMenu>
        <Hamburger ref={hamburger} onClick={openMenu}>
          <Bar></Bar>
          <Bar></Bar>
          <Bar></Bar>
        </Hamburger>
      </Nav>
    </Header>
  );
};

export default NavBar;
