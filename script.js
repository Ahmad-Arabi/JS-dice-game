'use strict';

//UI elements for players
const playerCard0 = document.querySelector(`.player--0`);
const playerCard1 = document.querySelector(`.player--1`);
const playerNameEl = function (player, name) {
  document.getElementById(`name--${player}`).textContent = name;
};
const totalScoreEl = function (player, value) {
  document.getElementById(`score--${player}`).textContent = value;
};
const currentScoreEl = function (player, value) {
  document.getElementById(`current--${player}`).textContent = value;
};

//adjust UI for winner
const declareWinner = (playerCard, playerNameId) => {
  playerCard.classList.remove('player--active');
  const otherPlayerCard =
    playerCard === playerCard1 ? playerCard0 : playerCard1;
  otherPlayerCard.classList.remove('player--active');
  playerCard.classList.toggle('player--winner');
  diceRollBtn.classList.toggle('hidden');
  holdBtn.classList.toggle('hidden');
  document.getElementById(playerNameId).textContent = '🎉 You won!';
};

//buttons & dice UI elements
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

//initial values
let totalScore, currentScore, activePlayer, winner;

// Starting conditions
const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  for (let player = 0; player < 2; player++) {
    currentScoreEl(player, 0);
    totalScoreEl(player, 0);
    playerNameEl(player, `Player ${player + 1}`);
  }

  if (winner) winner.classList.toggle('player--winner');
  winner = null;

  dice.classList.add('hidden');
  diceRollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');

  playerCard1.classList.remove('player--active');
  playerCard0.classList.add('player--active');
};

//start the game
init();

//player switch
const switchPlayer = function () {
  playerCard0.classList.toggle('player--active');
  playerCard1.classList.toggle('player--active');
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
};

//Dice Roll functionality
diceRollBtn.addEventListener('click', function () {
  //generate random number for dice
  const diceNumber = Math.trunc(Math.random() * 6 + 1);
  //replace the dice image based on the generated number
  dice.setAttribute('src', `dice-${diceNumber}.png`);
  //show the dice
  dice.classList.remove('hidden');

  if (diceNumber != 1) {
    currentScore += diceNumber;
    currentScoreEl(activePlayer, currentScore);
  } else {
    currentScoreEl(activePlayer, 0);
    switchPlayer();
  }
});

//hold functionality
holdBtn.addEventListener('click', function () {
  if (currentScore != 0) {
    totalScore[activePlayer] += currentScore;
    totalScoreEl(activePlayer, totalScore[activePlayer]);
    currentScoreEl(activePlayer, 0);

    //dice is 1 we reset the current value and swicth player turn
    switchPlayer();
    dice.classList.add('hidden');

    //end game if there is winner
    gameWinner();
  }
});

//end game
const gameWinner = function () {
  if (totalScore[0] >= 100) {
    declareWinner(playerCard0, 'name--0');
    winner = playerCard0;
  } else if (totalScore[1] >= 100) {
    declareWinner(playerCard1, 'name--1');
    winner = playerCard1;
  }
};

//reset
newGameBtn.addEventListener('click', init);
