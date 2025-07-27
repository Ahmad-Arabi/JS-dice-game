'use strict';
//initial values
let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let winner;

const playerCard0 = document.querySelector(`.player--0`);
const playerCard1 = document.querySelector(`.player--1`);

//buttons & dicea
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

//Dice Roll functionallity
diceRollBtn.addEventListener('click', function () {
  //genrate random number for dice
  const generatedDiceNumber = Math.trunc(Math.random() * 6 + 1);
  //replae the dice image based on the generated number
  dice.setAttribute('src', `dice-${generatedDiceNumber}.png`);
  //show the dice
  dice.classList.remove('hidden');

  if (generatedDiceNumber != 1) {
    currentScore += generatedDiceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //dice is 1 we reset the current value and swith player turn
    setTimeout(() => {
      dice.classList.add('hidden');
    }, 1000);

    document.getElementById(`current--${activePlayer}`).textContent = 0;

    switchPlayer();
  }
});

//hold functionality
holdBtn.addEventListener('click', function () {
  if (currentScore != 0) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    switchPlayer();
    //dice is 1 we reset the current value and swith player turn
    dice.classList.add('hidden');

    //end game if there is winner
    gameWinner();
  }
});

//end game
const gameWinner = function () {
  if (totalScore[0] >= 100) {
    playerCard0.classList.toggle('player--winner');
    diceRollBtn.classList.toggle('hidden');
    holdBtn.classList.toggle('hidden');
    document.getElementById(`name--0`).textContent = '🎉 You won!';
    winner = playerCard0;
  } else if (totalScore[1] >= 100) {
    playerCard1.classList.toggle('player--winner');
    diceRollBtn.classList.toggle('hidden');
    holdBtn.classList.toggle('hidden');
    document.getElementById(`name--1`).textContent = '🎉 You won!';
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
  document.getElementById(`name--1`).textContent = 'Player 2';
  document.getElementById(`name--0`).textContent = 'Player 1';

  totalScore = [0, 0];
  currentScore = 0;

  for (let player = 0; player < 2; player++) {
    document.getElementById(`current--${player}`).textContent = 0;
    document.getElementById(`score--${player}`).textContent = 0;
    document.getElementById(`name--${player}`).textContent = `Player ${
      player + 1
    }`;
  }

  if (winner) winner.classList.toggle('player--winner');
});
