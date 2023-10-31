import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { MenuIcon, Nav, NavbarContainer, NavItem, NavLink, NavLogo, NavMenu, NavBtn, NavBtnLink } from './Element';
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import SearchBar from '../SearchBar';
const Navbar = ({ toggle }) => {
  const {cartProducts} = useContext(CartContext);
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo href='/' onClick={toggleHome}>
              NazCommerce
          </NavLogo>
            <MenuIcon onClick={toggle}>
              <FaBars />
            </MenuIcon>
            <NavMenu>
              <NavItem>
                <SearchBar/>
              </NavItem>
            </NavMenu>
            <NavBtn>
                <NavLink href='/category' smooth={true} duration={500} spy={true} exact='true' offset={-80} >Category</NavLink>
              
              
                <NavLink href='/cart' smooth={true} duration={500} spy={true} exact='true' offset={-80}>Cart ({cartProducts.length})</NavLink>
              
              <NavBtnLink href="/signin">Sign In</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;