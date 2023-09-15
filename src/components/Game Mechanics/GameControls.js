// GameBoard.js
import React from 'react';

function GameBoard() {
  // Your game board logic and visuals go here
  return (
    <div>
      {/* Your game board components */}
    </div>
  );
}

export default GameBoard;

// // Generate a random number between 0 and 1
// const randomNumber = Math.random();

// let rewardIndex;

// if (randomNumber < 0.535) {
//     // 53.5% chance of landing on a blank box
//     rewardIndex = -1; // You can use -1 or any other value to represent a blank box
// } else if (randomNumber < 0.65) {
//     // 11.5% chance of landing on 10 $GMTK Tokens
//     rewardIndex = 0;
// } else if (randomNumber < 0.715) {
//     // 6.5% chance of landing on 25 $GMTK Tokens
//     rewardIndex = 1;
// } else if (randomNumber < 0.75) {
//     // 3.5% chance of landing on 50 $GMTK Tokens
//     rewardIndex = 2;
// } else if (randomNumber < 0.765) {
//     // 1.5% chance of landing on 100 $GMTK Tokens
//     rewardIndex = 3;
// } else if (randomNumber < 0.88) {
//     // 11.5% chance of landing on 10 GMTT Tickets
//     rewardIndex = 4;
// } else if (randomNumber < 0.945) {
//     // 6.5% chance of landing on 25 GMTT Tickets
//     rewardIndex = 5;
// } else if (randomNumber < 0.98) {
//     // 3.5% chance of landing on 50 GMTT Tickets
//     rewardIndex = 6;
// } else if (randomNumber < 0.985) {
//     // 1.5% chance of landing on 100 GMTT Tickets
//     rewardIndex = 7;
// } else if (randomNumber < 0.995) {
//     // 0.5% chance of landing on 1 GameNFT
//     rewardIndex = 8;
// } else {
//     // Additional rewards, if any, can be handled here
// }

// // Now, you can call the appropriate contract function based on the rewardIndex
