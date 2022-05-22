'use strict';
{
  let isPlaying = false;
  let step = 0;

  const sections = document.querySelectorAll('section');

  function changeScreen() {
    sections.forEach((section, i) => {
      section.classList.add('inactive');
      if (i === step) {
        section.classList.remove('inactive');
      }
    });
  }

  changeScreen();

  // start section
  const startSection = document.getElementById('start');
  startSection.addEventListener('click', () => {
    step = 1;
    changeScreen();
  });

  // level section
  let level;

  // game section
  let loc = 0;
  let life = 5;
  const words = [[red, blue, pink, sky],[yellow, purple, crimson, hotpink],[lightgoldenrodyellow, palegoldenrod, mediumseagreen, cornflowerblue]]];
  let word = getWord();
  const timeLimit = 3 * 1000;
  let startTime;

  const gameLife = document.getElementById('game-life');
  const gameWord = document.getElementById('game-word');
  const gameTimer = document.getElementById('game-timer');

  function getWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  function updateWord() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    gameWord.textContent = placeholder + word.substring(loc);
  }
  function updateLife() {
    let placeholder = '';
    for (let i = 0; i < life; i++) {
      placeholder += '♥';
    }
    for (let i = 0; i < 5 - life; i++) {
      placeholder += '♡';
    }
    gameLife.textContent = placeholder;
  }
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    gameTimer.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
    if (timeLeft <= 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      gameTimer.textContent = '0.00';
    }
  }
  function startGame() {
    isPlaying = true;
    gameWord.textContent = word;
    startTime = Date.now();
    updateTimer();
    updateLife();
  }

  window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === gameWord.textContent[loc]) {
      console.log('correct!');
      loc++;
      if (loc === word.length) {
        word = getWord();
        loc = 0;
      }
      updateWord();
    } else {
      console.log('miss');
      gameWord.textContent = word;
      loc = 0;
      if (life > 0) {
        life--;
      }
      updateLife();
    }
  });
}
