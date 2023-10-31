import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { CoverContainer, CoverBg } from './Element';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

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
  color: yellow;
  font-size: 38px;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 32px;
    text-align: left;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 28px;
    text-align: left;
  }
`;

export const CoverP = styled.p`
  margin-top: 24px;
  color: white;
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

const CoverSection = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log(container);
    }, []);

    return (
        <CoverContainer>
          <Container>
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
                    <CoverH1>Uncompromising Quality</CoverH1>
                    
                    <CoverP>Welcome to a world where excellence is the only currency, and where only the best will suffice.</CoverP>
                
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
        <Image src={'/image.jpg'} alt="heading Poster" width={300} height={300} />
      </div>
    </div>
            
                

                
            </Container>
            <CoverBg style={{ background: 'transparent' }}>
            <Particles
                    parent="CoverBg"
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0.5,
                    }}
                    options={{
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                
                                repulse: {
                                    distance: 200,
                                    duration: 0.6,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: true,
                                speed: 6,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 100,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "square",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </CoverBg>
            
        </CoverContainer>
    );
};

export default CoverSection;
