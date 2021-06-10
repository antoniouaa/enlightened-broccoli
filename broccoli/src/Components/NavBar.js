import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

import { isUserLoggedIn } from "../Actions/userSlice";

const Header = styled.header`
  border-bottom: 1px solid #e2e8f0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.5rem 10rem;
`;

const Headline = styled.h1`
  font-weight: 500;
  letter-spacing: 0.2rem;
  color: #482ff7;
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 768px) {
    position: fixed;
    right: -100%;
    top: 4rem;
    flex-direction: column;
    background: #fff;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    transition: 0.3s;
    box_shadow: 0 10px 27px rgba(0, 0, 0, 0.5);
    justify-content: stretch;

    &.active {
      right: 0;
    }
  }
`;

const NavItem = styled.li`
  margin-left: 2.5rem;
  margin-right: 2rem;
  font-weight: 400;

  a {
    color: #475569;
  }

  a:hover {
    color: #482ff7;
  }

  @media only screen and (max-width: 768px) {
    margin: 2.5rem 0;
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

  return (
    <Header>
      <Nav>
        <Link to="/home">
          <Headline>enlightened broccoli</Headline>
        </Link>
        <NavMenu ref={menu}>
          <NavItem>
            {loggedIn ? (
              <Link onClick={closeMenu} to="/profile">
                Profile
              </Link>
            ) : (
              <Link onClick={closeMenu} to="/login">
                Login
              </Link>
            )}
          </NavItem>
          <NavItem>
            <Link onClick={closeMenu} to="/about">
              About
            </Link>
          </NavItem>
          <NavItem>
            <Link onClick={closeMenu} to="/contact">
              Contact
            </Link>
          </NavItem>
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
