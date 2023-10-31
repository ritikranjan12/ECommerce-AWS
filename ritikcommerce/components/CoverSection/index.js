import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { CoverContainer, CoverBg, CoverContent, CoverH1, CoverP } from './Element';
import styled from 'styled-components';
import Image from 'next/image';

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

  @media (min-width: 768px) {
    text-align: left;
    width: 50%;
  }
`;

const ImageContainers = styled.div`
  text-align: center;
  height: 100vh;
  @media (min-width: 768px) {
    text-align: right;
    width: 50%;
  }
`;

const ImageComponent = styled(Image)`
  width: 100%;
  height: 80%;
  @media (min-width: 768px) {
    width: auto;
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
          marginTop: '40px',
          fontSize: '24px',
        }}
      >
        <TextContainer>
                    <CoverH1>Discover Uncompromising Quality</CoverH1>
                    <CoverP>Welcome to a world where excellence is the only currency, and where only the best will suffice.</CoverP>
                   
                </TextContainer>
      </div>

      <div
        style={{
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ImageContainers>
                    <ImageComponent src="/image.jpg" width={700} height={350} alt="Banner Image" />
                </ImageContainers>
      </div>
    </div>
            
                

                
            </Container>
        </CoverContainer>
    );
};

export default CoverSection;
