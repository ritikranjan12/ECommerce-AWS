import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link'

const TextContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
  color: black;

  @media (min-width: 768px) {
    text-align: left;
    margin-left: 3rem;
  }
`;


export const CoverH1 = styled.h1`
  color: black;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const CoverP = styled.p`
  margin-top: 24px;
  color: black;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;


export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
  }
`;



const NewsLetter = () => {
  return (
    
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '20vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '24px',
          
        }}
      >
        <TextContainer>
                    <CoverH1>Shop wide variety of Products</CoverH1>
                    <CoverP>Our collection includes a wide variety of products, each meticulously chosen for its quality, style, and value.</CoverP>
                <NavBtn>
                    <NavBtnLink href="/category">Shop Now</NavBtnLink>
                </NavBtn>
                </TextContainer>
      </div>

      <div
        style={{
          maxWidth: '100%',
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          margin:'auto'
        }}
      >
        <Image src={'/category.png'} alt="heading Poster" width={400} height={300} />
      </div>
    </div>
  );
};

export default NewsLetter;
