import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

//Imports
import GameBoard from './Game Mechanics/GameBoard';
import GameControls from './Game Mechanics/GameBoard';

const GameContainer = styled(animated.div)`
  text-align: center;
  padding: 2rem;
  background-color: #06003d; /* Dark blue with a hint of purple background color */
  color: #fff;
  height: calc(100vh - 4rem); /* Adjust the height to cover a good portion of the screen */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff; /* Add a border around the game screen */
`;

const GameTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const GameContent = styled.div`
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background for a futuristic look */
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%; /* Adjust the width as needed */
`;

const PlayButton = styled.button`
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

function Game() {
  const [showGame, setShowGame] = useState(false); // State to control game screen visibility

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const handlePlayClick = () => {
    setShowGame(true); // Show the game screen when the "Play Now" button is clicked
  };
  return (
    <GameContainer style={animationProps}>
      {!showGame ? (
        <>
          <GameTitle>Crypto Game Page</GameTitle>
          <GameContent>
            <p>Welcome to the exciting world of crypto gaming! Survive and have a chance win collect tickets for a chance at a roulette spin!</p>
            <PlayButton onClick={handlePlayClick}>Play Now</PlayButton>
          </GameContent>
        </>
      ) : (
        <GameContent>
          <GameBoard />
          <GameControls />
        </GameContent>
      )}
    </GameContainer>
  );
}

export default Game;
