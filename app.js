const diceEl = document.querySelectorAll('.dice');
const btns = document.querySelectorAll('.btn');
const currentScoreEl = document.querySelectorAll('.currentScore');
const scoreEl = document.querySelectorAll('.score');
const players = document.querySelectorAll('.player');
const container = document.querySelector('.container');
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
// Starting point
let currentScore = 0;
let player = 1;
let scoreTab = [0, 0];

// Check the player
function switchPlayer() {
  if (player === 1) {
    player1.classList.add('active');
    player2.classList.remove('active');
  } else if (player === 2) {
    player2.classList.add('active');
    player1.classList.remove('active');
  }

  currentScore = 0;

  currentScoreEl.forEach(function (cS) {
    cS.textContent = currentScore;
  });
}

function startedGame() {
  currentScore = 0;

  diceNum = 0;
  player = 1;
  currentScoreEl.forEach(function (cS) {
    cS.textContent = currentScore;
  });
  scoreEl.forEach(function (s) {
    s.textContent = scoreTab[`${player - 1}`];
  });
  diceEl.forEach(function (dice) {
    dice.textContent = diceNum;
  });
}
startedGame();
// Default values when loaded
document.addEventListener('DOMContentLoaded', function () {
  startedGame();
  switchPlayer();
});

btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const id = btn.dataset.id;
    e.preventDefault();
    if (scoreTab[`${player - 1}`] < 30) {
      if (id === `roll-${player}`) {
        let dice = Math.floor(Math.random() * 6) + 1;

        currentScore += dice;
        if (dice > 1) {
          diceEl.forEach(function (diceNum) {
            if (diceNum.dataset.id === `dice-${player}`) {
              diceNum.textContent = dice;
            }
          });

          currentScoreEl.forEach(function (cS) {
            if (cS.dataset.id === `currentScore-${player}`) {
              cS.textContent = currentScore;
            }
          });
        } else {
          player = player === 2 ? 1 : 2;
          dice = 0;
          diceEl.forEach(function (diceNum) {
            diceNum.textContent = dice;
          });
          switchPlayer();
        }
      }
      if (id === `save-${player}`) {
        dice = 0;
        diceEl.forEach(function (diceNum) {
          diceNum.textContent = dice;
        });

        scoreEl.forEach(function (scr) {
          if (scr.dataset.id === `score-${player}`) {
            scoreTab[`${player - 1}`] =
              currentScore + scoreTab[`${player - 1}`];
            scr.textContent = scoreTab[`${player - 1}`];
          }
        });
        currentScoreEl.forEach(function (cS) {
          if (cS.dataset.id === `currentScore-${player}`) {
            currentScore = 0;
            cS.textContent = currentScore;
          }
        });
        if (scoreTab[`${player - 1}`] < 30) {
          player = player === 2 ? 1 : 2;
        } else {
          players.forEach(function (player) {
            if (player.classList.contains('active')) {
              player.classList.add('win');
            }
          });
        }
        switchPlayer();
      }
    }
    if (id === 'new-game') {
      scoreTab = [0, 0];
      currentScore = 0;
      player = 1;
      diceNum = 0;
      players.forEach(function (player) {
        if (player.classList.contains('active')) {
          player.classList.remove('win');
        }
      });
      currentScoreEl.forEach(function (cS) {
        cS.textContent = currentScore;
      });
      scoreEl.forEach(function (s) {
        s.textContent = scoreTab[`${player - 1}`];
      });
      diceEl.forEach(function (dice) {
        dice.textContent = diceNum;
      });
      switchPlayer();
    }
  });
});
