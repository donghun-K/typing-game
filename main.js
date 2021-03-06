'use strict';
import words from './words.js';
{
  const START_SECTION = 0;
  const LEVEL_SECTION = 1;
  const GAME_SECTION = 2;
  const RESULT_SECTION = 3;
  const INPUT_SECTION = 4;

  let isPlaying = false;
  let highScore = 0;
  if (localStorage.getItem('highScore') != null) {
    highScore = localStorage.getItem('highScore');
  }
  let highScoreUser = 'Unknown';
  if (localStorage.getItem('highScoreUser') != null) {
    highScoreUser = localStorage.getItem('highScoreUser');
  }

  const sections = document.querySelectorAll('section');

  // 화
  // 면
  // 전
  // 환
  // 구
  // 현
  // 함
  // 수
  function changeScreen(step) {
    sections.forEach((section, i) => {
      section.classList.add('inactive');
      if (i === step) {
        section.classList.remove('inactive');
      }
    });
  }

  changeScreen(START_SECTION);

  // start section
  const startSection = document.getElementById('start');
  startSection.addEventListener('click', () => {
    changeScreen(LEVEL_SECTION);
  });

  // level section
  // 난
  // 이
  // 도
  // 설
  // 정
  // 구
  // 현
  let level = 0;
  const levelItems = document.querySelectorAll('.level-item');
  levelItems.forEach((levelItem, i) => {
    levelItem.addEventListener('click', () => {
      level = i;
      changeScreen(GAME_SECTION);
      startGame();
    });
  });

  // game section
  let loc = 0;
  let life = 5;
  let score = 0;
  let word = getWord();
  const timeLimit = 20 * 1000;
  let startTime;

  const gameLife = document.getElementById('game-life');
  const gameWord = document.getElementById('game-word');
  const gameScore = document.getElementById('game-score');
  const gameTimer = document.getElementById('game-timer');

  function getWord() {
    return words[level][Math.floor(Math.random() * words[level].length)];
  }
  function updateLife() {
    let placeholder = 'Life: ';
    for (let i = 0; i < life; i++) {
      placeholder += '♥';
    }
    for (let i = 0; i < 5 - life; i++) {
      placeholder += '♡';
    }
    gameLife.textContent = placeholder;
  }
  function updateWord() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    gameWord.textContent = placeholder + word.substring(loc);
  }
  function updateScore() {
    gameScore.textContent = `Score: ${score}`;
  }
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    gameTimer.textContent = `LEFT TIME: ${(timeLeft / 1000).toFixed(2)}`;

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
    if (timeLeft <= 0 || isPlaying == false) {
      gameTimer.textContent = '0.00';
      isPlaying = false;
      clearTimeout(timeoutId);
      isPlaying == true ? alert('Time out!') : null;
      // 최
      // 고
      // 기
      // 록
      // 인
      // 지
      // 확
      // 인
      // !
      score > highScore
        ? changeScreen(INPUT_SECTION)
        : changeScreen(RESULT_SECTION);

      setResult();
    }
  }

  function startGame() {
    gameWord.textContent = 'Ready?';
    gameLife.textContent = '';
    gameScore.textContent = '';
    gameTimer.textContent = '';
    loc = 0;
    life = 5;
    score = 0;
    setTimeout(() => {
      gameWord.textContent = 3;
    }, 1000);
    setTimeout(() => {
      gameWord.textContent = 2;
    }, 1500);
    setTimeout(() => {
      gameWord.textContent = 1;
    }, 2000);
    setTimeout(() => {
      gameWord.textContent = 'Start!';
    }, 2500);
    setTimeout(() => {
      isPlaying = true;
      word = getWord();
      gameWord.textContent = word;
      startTime = Date.now();
      updateTimer();
      updateLife();
      updateScore();
    }, 3000);
  }

  window.addEventListener('keydown', (e) => {
    if (isPlaying == false) {
      return;
    }
    // key down value validation
    if (!e.key.match(/^[a-z]$/gi)) {
      return;
    } else if (e.key === gameWord.textContent[loc]) {
      console.log('correct!');
      loc++;
      if (loc === word.length) {
        word = getWord();
        loc = 0;
        score += 1;
        updateScore();
      }
      updateWord();
    } else {
      console.log('miss');
      gameWord.textContent = word;
      gameWord.classList.remove('wrong');
      gameWord.classList.add('wrong');
      setTimeout(() => {
        gameWord.classList.remove('wrong');
      }, 300);
      loc = 0;
      life--;
      updateLife();
      if (life == 0) {
        isPlaying = false;
        alert('Game Over!');
        score > highScore
          ? changeScreen(INPUT_SECTION)
          : changeScreen(RESULT_SECTION);
      }      
    }
  });

  // result section
  const resultHighScore = document.getElementById('result-highScore');
  const resultScore = document.getElementById('result-score');
  const resultRetry = document.getElementById('result-retry');
  const resultTitle = document.getElementById('result-title');

  function setResult() {
    resultHighScore.textContent = `${highScoreUser}: ${highScore}`;
    resultScore.textContent = `You: ${score}`;
  }

  resultRetry.addEventListener('click', () => {
    changeScreen(GAME_SECTION);
    startGame();
  });
  resultTitle.addEventListener('click', () => {
    changeScreen(START_SECTION);
  });

  // input section
  const inputText = document.getElementById('input-text');
  // 최
  // 고
  // 기
  // 록
  // 이
  // 면
  // 여
  // 기
  // 작
  // 동
  inputText.addEventListener('click', () => {
    const user = document.getElementById('input-username').value;
    // input value validation
    if (user === '') {
      alert('Name cannot be empty!');
    }
    highScore = score;
    highScoreUser = user;
    localStorage.setItem('highScore', highScore);
    localStorage.setItem('highScoreUser', highScoreUser);
    changeScreen(RESULT_SECTION);
    setResult();
  });
}
