# Typing Game
JavaScript 연습용으로 만든 타자 게임입니다.

[Play here!](https://donghun-k.github.io/typing-game/)

## 사용 기술
- JavaScript

## 프로젝트 소개

## 트러블 슈팅
<details>
  <summary>게임 중 대문자 입력을 위해 Shift 키를 눌렀을 때 의도치 않은 라이프 감소가 일어나는 현상</summary>
  
  ### ✅ 해결
  - 정규표현식을 사용해서 문자 입력 시에만 keydown 이벤트를 실행하도록 처리.
  https://github.com/donghun-K/typing-game/blob/bf8260b95bedbdfd6f4594d1e5da71f3cdded914/main.js#L166-L168
</details>
