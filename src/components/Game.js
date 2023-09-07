import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

const GameContainer = styled(animated.div)`
  text-align: center;
  padding: 2rem;
  background-color: #00aaff;
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
  background-color: #ff9900;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, border-radius 0.2s;

  &:hover {
    background-color: #2e2e2e;
    transform: scale(1.05);
    border-radius: 25px;
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
          <GameTitle>Your Crypto Game Page</GameTitle>
          <GameContent>
            <p>Welcome to the exciting world of crypto gaming! Explore, trade, and compete to win amazing rewards.</p>
            <PlayButton onClick={handlePlayClick}>Play Now</PlayButton>
          </GameContent>
        </>
      ) : (
        /* Add your game content and styling here */
        <GameContent>
          {/* Your game elements go here */}
          <p>Your awesome crypto game content!</p>
        </GameContent>
      )}
    </GameContainer>
  );
}

export default Game;
