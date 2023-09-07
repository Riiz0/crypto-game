// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

// Styled Navbar Container
const NavbarContainer = styled(animated.nav)`
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
`;

// Styled Navbar List
const NavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`;

// Styled Navbar Item
const NavItem = styled.li`
  margin: 0 1rem;
`;

// Styled Navbar Link
const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #ff9900;
  }
`;

function Navbar() {
  // Define animation using react-spring
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <NavbarContainer style={animationProps}>
      <NavList>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/game">Game</NavLink>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
}

export default Navbar;
