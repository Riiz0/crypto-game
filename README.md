# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Crypto Game Logic

!Below is a version 1 Game logic for this crypto game!
### Game Mechanics

1. Movement for Character (left-right-up-down), cant move outside of game container
2. Enemy Movement same as Character, but in a random pattern with the goal of shooting the character. 
3. Character spawn (starting place in game) bottom center of the game container
4. Enemy spawn pattern (random)
5. Enemy spawn increases as user progress through levels
6. There are 6 types of Enemies, left to right is smallest difficulty to hardest difficulty to kill (Grunt, Armored, Elite, Champion, Warlord, and Chancellor). When starting the game, users will experience more Grunts and as levels are beat the higher the chance of harder enemies spawning in.
7. Each enemy will have a drop rate % for tickets and each individual enemy when spawned in can only drop 1 ticket (no duplicates from a single enemy). For example Grunts 0.5%, Armored 2.5%, Elites 8.5%, Champions 12.5%, Warlords 18.5% and Chancellors 23.5% of dropping a ticket.
8. When a user clicks on "Play" they need to confirm a metamask transaction then game will start. When the game is over (the users character dies), game over screen and a metamask transaction will happen if  a user has collected any tickets they can confirm and receive tickets in their wallet.
9. Inventory UI and will display a users wallet items that are relevant to the game: $BUNI tokens $BUNI Tickets BUNI NFT Character(s).
10. when the users character takes damage a lose a life. All users that dont hold a BUNI NFT in their wallet will have one life, so if they take damage the game is over. Users with a common BUNI NFT will have 2 lives, Rare BUNI NFT will have 2 lives with a +2.5% of Ticket drops from all enemies, Epic BUNI NFT will have 3 lives with a +4.5% of Ticket drops from all enemies, and Legendary BUNI NFT will have 4 lives with a +7.5% of Ticket drops from all enemies.
11. When an enemy is killed their entity disappears from the screen with a dead animation
12. Waves will be seamless(continuous) their will be a 10 second break between levels and the Wave level will appear on the top center of the screen once a new wave is about to start.
13. Waves 1 will have 20 Enemies and every 5 rounds the enemies will increase by 3.5%

### Roulette Logic

There are a total of 22 roulette options in one spin:
- 13 of those options are blank boxes and they have a 53.5% chance of landing
- The other options are the Token, Ticket, and NFT amounts and each one has a specific chance of landing
1. 10 $GMTK Tokens  - 11.5% chance of landing
2. 25 $GMTK Tokens  - 6.5% chance of landing
3. 50 $GMTK Tokens  - 3.5% chance of landing
4. 100 $GMTK Tokens  - 1.5% chance of landing
5. 10 GMTT Tickets- 11.5% chance of landing
6. 25 GMTT Tickets- 6.5% chance of landing
7. 50 GMTT Tickets- 3.5% chance of landing
8. 100 GMTT Tickets- 1.5% chance of landing
9. 1 GameNFT - 0.5% chance of landing
