import React from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from "./Element";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import SearchBox from './SearchBox';

const Sidebar = ({ isOpen, toggle }) => {
  const {cartProducts} = useContext(CartContext);
  return (
    <SidebarContainer isOpen={isOpen}>
      
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SearchBox toggle={toggle} />
      <SidebarWrapper>
        <SidebarMenu>         
          <SidebarLink href='/category' onClick={toggle} smooth="true" duration={500} spy="true"  exact='true' offset={-80} >Category</SidebarLink>
          <SidebarLink href='/cart' onClick={toggle} smooth="true"  duration={500} spy="true" exact='true' offset={-80}>Cart ({cartProducts.length})</SidebarLink>
          <SideBtnWrap>
          <SidebarRoute href="/signin" style={{ fontWeight:'bold'}}>Sign In</SidebarRoute>
        </SideBtnWrap>
        </SidebarMenu>
        

          
        
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
