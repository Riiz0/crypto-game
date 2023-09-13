import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';

//Imports
import Image1 from './assets/Background.png';
import Game_Background from './assets/Game_Background.mp4';

const HomeContainer = styled(animated.div)`
  position: absolute;
  top: 2rem;
  left: 0;
  width: 100%;
  height: calc(100% - 2rem);
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin: 2.6rem;
  color: #fff; /* Add this line to set text color to white */
`;

const ImageContainer = styled.div`
  width: 350px;
  height: 350px;
  margin: 1rem;
  overflow: hidden;
  border-radius: 65px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.2s ease-in-out;
  opacity: 0.85; /* Set the image opacity to 75% */
`;

const Button = styled.button`
  background-color: #000; /* Change the button color to black (#000) */
  color: #fff;
  border: none;
  padding: 1rem 2rem; /* Increase padding to make the button even bigger */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, border-radius 0.2s, color 0.3s; /* Add color transition */
  border-radius: 25px; /* Apply border radius to give it curved edges */

  &:hover {
    background-color: #00aaff; /* Change the button background color on hover to light blue (#00aaff) */
    transform: scale(1.05); /* Add a hover pop-up effect */
    color: #fff; /* Change text color to white on hover */
  }
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #000; /* Change to black (#000) */
  color: #fff;
  text-align: center;
  padding: 0.25rem 0;
`;

function HomeScreen() {
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });
  return (
    <>
      <HomeContainer style={animationProps}>
      <VideoBackground autoPlay loop muted>
        <source src={Game_Background} type="video/mp4" />
      </VideoBackground>

        <ContentContainer>
          <h1>Welcome To The Best Crypto Game</h1>
          <p>Explore the world of blockchain gaming.</p>
        </ContentContainer>

        <ImageContainer>
          <Image src={Image1} alt="Image 1" />
        </ImageContainer>

        <ContentContainer>
        <Link to="/game">
          <Button>Go to Game</Button>
        </Link>
        </ContentContainer>
      </HomeContainer>

      <StyledFooter>
        &copy; 2023 Your Crypto Game. All rights reserved.
      </StyledFooter>
    </>
  );
}

export default HomeScreen;
