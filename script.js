'use strict';
let totalScoreValue = 0;
let currentScoreValue = 0;
let totalScore = [];
let currentScore = [];
let currentPlayer = [];
let winner = [];
//player0
let totalScore0 = 0;
let currentScore0 = 0;
const player0 = document.querySelector('.player--0');
const currentScorePlayer0 = document.getElementById('current--0');
const totalScorePlayer0 = document.getElementById('score--0');
const playerName0 = document.getElementById('name--0');

//player1
let totalScore1 = 0;
let currentScore1 = 0;
const player1 = document.querySelector('.player--1');
const currentScorePlayer1 = document.getElementById('current--1');
const totalScorePlayer1 = document.getElementById('score--1');
const playerName1 = document.getElementById('name--1');

//buttons
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

//player turn select
if (player0.classList.contains('player--active')) {
  currentPlayer = player0;
  currentScore = currentScorePlayer0;
  totalScore = totalScorePlayer0;
  currentScoreValue = currentScore0;
  totalScoreValue = totalScore0;
}

//Dice Roll functionallity
diceRollBtn.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6 + 1);
  const dicePicture = document.querySelector('.dice');
  dicePicture.setAttribute('src', `dice-${dice}.png`);

  if (dice != 1) {
    currentScoreValue += dice;
  } else {
    //dice is zero we reset the current value and swith player turn
    currentPlayer.classList.remove('player--active');
    currentScore.textContent = 0;
    if (currentPlayer === player0) {
      player1.classList.add('player--active');
      currentPlayer = player1;
      currentScore = currentScorePlayer1;
      totalScore = totalScorePlayer1;
      currentScoreValue = currentScore1;
      totalScoreValue = totalScore1;
    } else {
      player0.classList.add('player--active');
      currentPlayer = player0;
      currentScore = currentScorePlayer0;
      totalScore = totalScorePlayer0;
      currentScoreValue = currentScore0;
      totalScoreValue = totalScore0;
    }
  }
  currentScore.textContent = currentScoreValue;
});

// //hold functionality
holdBtn.addEventListener('click', function () {
  if (currentScoreValue != 0) {
    totalScoreValue += currentScoreValue;
    totalScore.textContent = totalScoreValue;
    currentScoreValue = 0;
    currentScore.textContent = currentScoreValue;
    //dice is zero we reset the current value and swith player turn
    currentPlayer.classList.remove('player--active');
    currentScore.textContent = 0;
    if (currentPlayer === player0) {
      totalScore0 = totalScoreValue;
      player1.classList.add('player--active');
      currentPlayer = player1;
      currentScore = currentScorePlayer1;
      totalScore = totalScorePlayer1;
      currentScoreValue = currentScore1;
      totalScoreValue = totalScore1;
    } else {
      totalScore1 = totalScoreValue;
      player0.classList.add('player--active');
      currentPlayer = player0;
      currentScore = currentScorePlayer0;
      totalScore = totalScorePlayer0;
      currentScoreValue = currentScore0;
      totalScoreValue = totalScore0;
    }
    gameWinner();
  }
});

//end game
const gameWinner = function () {
  if (totalScore0 >= 100) {
    player0.classList.add('player--winner');
    diceRollBtn.style.display = 'none';
    holdBtn.style.display = 'none';
    playerName0.textContent = '🎉 You won!';
    winner = player0;
  } else if (totalScore1 >= 100) {
    player1.classList.add('player--winner');
    diceRollBtn.style.display = 'none';
    holdBtn.style.display = 'none';
    playerName1.textContent = '🎉 You won!';
    winner = player1;
  }
};

//reset
newGameBtn.addEventListener('click', function () {
  diceRollBtn.style.display = 'block';
  holdBtn.style.display = 'block';
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  winner.classList.remove('player--winner');
  totalScore0 = 0;
  currentScore0 = 0;
  totalScore1 = 0;
  currentScore1 = 0;
  currentScorePlayer0.textContent = 0;
  totalScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  totalScorePlayer1.textContent = 0;
});
