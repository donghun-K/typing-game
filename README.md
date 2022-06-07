# Typing Game
JavaScript 연습용으로 만든 타자 게임입니다.

[Play here!](https://donghun-k.github.io/typing-game/)

## 1. 제작 기간 & 참여 인원
- 2022/5/23 ~ 2022/5/38
- 개인 프로젝트

## 2. 사용 기술
- JavaScript

## 3. 핵심 기능

## 4. 트러블 슈팅
<details>
  <summary>게임 중 대문자 입력을 위해 Shift 키를 눌렀을 때 라이프가 감소하는 현상</summary>
  
  - 정규표현식을 사용해서 문자 입력 시에만 keydown 이벤트를 실행하도록 처리
  https://github.com/donghun-K/typing-game/blob/bf8260b95bedbdfd6f4594d1e5da71f3cdded914/main.js#L166-L168
</details>
