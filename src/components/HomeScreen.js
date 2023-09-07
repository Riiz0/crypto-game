// HomeScreen.js
import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

//Imports
import Image1 from './assets/PlaceHolder_Image2.jpg';
import Image2 from './assets/PlaceHolder_Image2.jpg';

const HomeContainer = styled(animated.div)`
  position: absolute;
  top: 2rem; /* Adjust the top position as needed */
  left: 0;
  width: 100%;
  height: calc(100% - 2rem); /* Adjust the height and top position as needed */
  background-color: #5a4fcf;
  color: #fff;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin: 2.6rem;
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
`;

const Button = styled.button`
  background-color: #2e2e2e; /* Choose a color that complements the navbar */
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, border-radius 0.2s;

  &:hover {
    background-color: #ff9900; /* Change the button background color on hover */
    transform: scale(1.05); /* Add a hover pop-up effect */
    border-radius: 25px; /* Add a border radius color effect */
  }
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
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
        <ContentContainer>
          <h1>Welcome to Your Crypto Game</h1>
          <p>Explore the world of blockchain gaming.</p>
        </ContentContainer>

        <ImageContainer>
          <Image src={Image1} alt="Image 1" />
        </ImageContainer>

        <ImageContainer>
          <Image src={Image2} alt="Image 2" />
        </ImageContainer>

        <ContentContainer>
          <Button to="/game">Go to Game</Button>
        </ContentContainer>
      </HomeContainer>

      <StyledFooter>
        &copy; 2023 Your Crypto Game. All rights reserved.
      </StyledFooter>
    </>
  );
}

export default HomeScreen;
