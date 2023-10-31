import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const CardContainer = styled.div`
  max-width: 400px;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 1px 1px 1px 1px #149e9e80;
  position: relative;
  margin: 20px;
  padding: 125px 50px 30px;
  overflow: hidden;
`;

const QuoteContainer = styled.div`
  background-color: "#149e9e";
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 30px 50px 50px 30px;
  border-radius: 0 0 114px 0;
`;

const Quote = styled.img`
  width: 40px;
  height: 40px;
`;

const Line1 = styled.span`
  width: 8px;
  height: 100px;
  display: inline-block;
  background: linear-gradient(to bottom, "#000100" 50%, "#149e9e" 50%);
  position: absolute;
  top: 10%;
  right: 0;
`;

const Line2 = styled(Line1)`
  top: auto;
  right: auto;
  bottom: 10%;
  left: 0;
`;

const Tile = styled.h3`
  color: ${({ theme }) => "#149e9e"};
  text-transform: uppercase;
`;

const Name = styled.h2`
  text-transform: uppercase;
`;

const TestimonialCarousel = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {testimonials.map((data, index) => (
        <div key={index}>
          <CardContainer>
            <QuoteContainer>
              <Quote src="/quote.png" alt="quote-pic" />
            </QuoteContainer>
            <Line1 />
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image width={50} height={50} src="/profile.png" alt="profile" />
            </div>
            <Tile>{data.text}</Tile>
            <Name>{data.author}</Name>

          </CardContainer>
        </div>
      ))}
    </Slider>
  );
};

export default TestimonialCarousel;
