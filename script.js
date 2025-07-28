'use strict';
//initial values
let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let winner;

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

const declareWinner = (playerCard, playerNameId) => {
  playerCard.classList.toggle('player--winner');
  diceRollBtn.classList.toggle('hidden');
  holdBtn.classList.toggle('hidden');
  document.getElementById(playerNameId).textContent = '🎉 You won!';
};

//buttons & dice
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

//hide dice at the start
dice.classList.add('hidden');

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
  if (totalScore[0] >= 10) {
    declareWinner(playerCard0, 'name--0');
    winner = playerCard0;
  } else if (totalScore[1] >= 10) {
    declareWinner(playerCard1, 'name--1');
    winner = playerCard1;
  }
};

//reset
newGameBtn.addEventListener('click', function () {
  diceRollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
  dice.classList.add('hidden');
  playerCard1.classList.remove('player--active');
  playerCard0.classList.add('player--active');

  totalScore = [0, 0];
  currentScore = 0;

  for (let player = 0; player < 2; player++) {
    currentScoreEl(player, 0);
    totalScoreEl(player, 0);
    playerNameEl(player, `Player ${player + 1}`);
  }

  if (winner) winner.classList.toggle('player--winner');
  winner = null;
});
