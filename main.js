'use strict';
{
  const START_SECTION = 0;
  const LEVEL_SECTION = 1;
  const GAME_SECTION = 2;
  const RESULT_SECTION = 3;
  const INPUT_SECTION = 4;

  let isPlaying = false;
  let step = START_SECTION;
  let highScoreUser = 'Unknown';
  let highScore = 0;

  const sections = document.querySelectorAll('section');

  // 화
  // 면
  // 전
  // 환
  // 구
  // 현
  // 함
  // 수
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
    step = LEVEL_SECTION;
    changeScreen();
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
      console.log(level);
      step = GAME_SECTION;
      changeScreen();
      startGame();
    });
  });
  // game section
  let loc = 0;
  let life = 5;
  let score = 0;
  const words = [
    [
      'Freud',
      'Noir',
      'Eros',
      'Idea',
      'love',
      'Ocean',
      'Deus',
      'Logos',
      'Ethos',
      'Ego',
      'Nerd',
      'Kant',
      'Jung',
      'Marx',
      'Satan',
      'Nymph',
      'Libra',
      'Karma',
      'Vedas',
      'Fate',
    ],
    [
      'Nietzsche',
      'Spinoza',
      'Buddha',
      'Zeitgeist',
      'Hedonism',
      'Nostalgia',
      'Messiah',
      'Pathos',
      'Quantum',
      'Habitus',
      'Omerta',
      'Sarcasm',
      'Sephiroth',
      'Qliphoth',
      'Kabbalah',
      'Baalzebub',
      'Libido',
      'Conatus',
      'Lunatic',
      'Paranoid',
      'Nirvana',
      'Samsara',
      'Dharma',
    ],
    [
      'Schopenhauer',
      'Utilitarianism',
      'Unconsciousness',
      'Democritus',
      'Phenylethylamine',
      'Protestantism',
      'Determinism',
      'Rationalism',
      'Polymorphism',
      'Proletarian',
      'Bourgeoisie',
      'Simulacres',
      'Masochistic',
      'Nymphomaniac',
      'Megalomania',
      'Reincarnation',
    ],
  ];
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
      score > highScore ? (step = INPUT_SECTION) : (step = RESULT_SECTION);
      changeScreen();
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
    if (isPlaying == true) {
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
        loc = 0;
        life--;
        if (life == 0) {
          isPlaying = false;
          alert('Game Over!');
          step = RESULT_SECTION;
          if (score > highScore) {
            step = INPUT_SECTION;
          }
          changeScreen();
          setResult();
        }
        updateLife();
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
    step = GAME_SECTION;
    changeScreen();
    startGame();
  });
  resultTitle.addEventListener('click', () => {
    step = START_SECTION;
    changeScreen();
  });
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
    const newUser = document.getElementById('input-username').value;
    // input value validation
    if (newUser === '') {
      alert('Name cannot be empty!');
    }
    highScore = score;
    highScoreUser = newUser;
    step = RESULT_SECTION;
    changeScreen();
    setResult();
  });
}
