[English](https://github.com/marpple/multi-paradigm-ts?tab=readme-ov-file#multi-paradigm-programming-with-typescript) | [한국어](https://github.com/marpple/multi-paradigm-ts?tab=readme-ov-file#%EB%A9%80%ED%8B%B0%ED%8C%A8%EB%9F%AC%EB%8B%A4%EC%9E%84-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EA%B3%BC-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)


# Multi-Paradigm Programming with TypeScript

Combining Functional, Object-Oriented, and Lisp Paradigms for Software Design and Implementation

## Project Setup

### Node.js with Volta

[Volta Guide](https://docs.volta.sh/guide/getting-started)

### Unix Installation

```shell
curl https://get.volta.sh | bash
volta install node@22
```

### Windows Installation

```shell
winget install Volta.Volta
volta install node@22
```

### pnpm

[pnpm Guide](https://docs.volta.sh/guide/getting-started)

```bash
npm install -g pnpm@10
```

### Installing and Running the Examples

```
pnpm install
pnpm -F example dev
```

Open the terminal, run the code above, and then navigate to http://localhost:2118/.

## License & Copyright

All example codes in this repository are licensed under the MIT License. However, the original book text and any text partially disclosed in this repository are licensed under [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/).

The materials herein are all © 2025 [Marpple Corporation](https://www.marpplecorp.com/).

<br>

---

# 멀티패러다임 프로그래밍과 타입스크립트

함수형, 객체 지향, LISP을 결합한 소프트웨어 설계와 구현

- [목차]()
- [예제 환경 설치]()
- [온라인 커뮤니티 및 유튜브 채널]()
- [인프런 영상 강의 및 유튜브 채널]()
- [라이센스 및 저작권]()

## 목차

[상세 목차](bool/ko/0.0-목차.md) <br>
[지은이의 글](book/ko/0.1-지은이의-글.md) <br>
[추천의 글](book/ko/0.2-추천의-글.md) <br>

1. [멀티패러다임이 현대 언어를 확장하는 방법](book/ko/1.0-멀티패러다임이-현대-언어를-확장하는-방법.md)
   1. [객체 지향 디자인 패턴의 반복자 패턴과 일급 함수](book/ko/1.1-객체-지향-디자인-패턴의-반복자-패턴과-일급-함수.md)
   3. [타입스크립트에서의 반복자 패턴 사례 - 이터레이션 프로토콜](book/ko/1.3-타입스크립트에서의-반복자-패턴-사례---이터레이션-프로토콜.md)
   4. [이터러블을 다루는 함수형 프로그래밍](book/ko/1.4-이터러블을-다루는-함수형-프로그래밍.md)
   5. [이터러블 프로토콜이 상속이 아닌 인터페이스로 설계된 이유](book/ko/1.5-이터러블-프로토콜이-상속이-아닌-인터페이스로-설계된-이유.md)
2. [함수형 프로그래밍과 타입 시스템, 그리고 LISP](book/ko/2.0-함수형-프로그래밍과-타입-시스템,-그리고-LISP.md)
   1. [타입 추론과 함수 타입, 그리고 제네릭](book/ko/2.1-타입-추론과-함수-타입,-그리고-제네릭.md)
   2. [멀티패러다임 언어에서의 함수형 타입 시스템](book/ko/2.2-멀티패러다임-언어에서의-함수형-타입-시스템.md)
   3. [멀티패러다임 언어와 메타프로그래밍 - LISP으로부터](book/ko/2.3-멀티패러다임-언어와-메타프로그래밍---LISP으로부터.md)
3. [코드:객체:함수 = Generator:Iterator:LISP = IP:OOP:FP](book/ko/3.0-코드%3A객체%3A함수-=-Generator%3AIterator%3ALISP-=-IP%3AOOP%3AFP.md)
   1. [코드가 곧 데이터 - 로직이 담긴 리스트](book/ko/3.1-코드가-곧-데이터---로직이-담긴-리스트.md)
   2. [하스켈로부터 배우기](book/ko/3.2-하스켈로부터-배우기.md)
   3. [지연 평가 자세히 보기](book/ko/3.3-지연-평가-자세히-보기.md)
   4. [Generator:Iterator:LISP - 지연 평가와 합성](book/ko/3.4-Generator%3AIterator%3ALISP---지연-평가와-합성.md)
4. 비동기 프로그래밍
   1. 값으로 다루는 비동기
   2. 지연성으로 다루는 비동기
   3. 타입으로 다루는 비동기
   4. 비동기 에러 핸들링
5. 실전 함수형 프로그래밍
   1. 실전 데이터 다루기
   2. 더 많은 문제에 적용하기
   3. 백엔드 비동기 프로그래밍
   4. 리스트 프로세싱 패턴화
6. 멀티패러다임 프로그래밍
   1. HTML 템플릿 엔진 만들기
   2. 멀티패러다임을 활용한 동시성 핸들링
7. 객체 지향 프론트엔드 개발, 그리고 멀티패러다임적 접근과 응용
   1. Setting 앱 만들기
   2. Todo 앱 만들기
   3. Todo 앱 만들기 2부
   4. Todo 앱 만들기 3부
   5. 비동기와 UI, Promise와 Class

## 예제 환경 설치

### Node.js with Volta

[Volta Guide](https://docs.volta.sh/guide/getting-started)

### Unix 환경

```shell
curl https://get.volta.sh | bash
volta install node@22
```

### Windows 환경

```shell
winget install Volta.Volta
volta install node@22
```

### pnpm

[pnpm Guide](https://docs.volta.sh/guide/getting-started)

```bash
npm install -g pnpm@10
```

### 패키지 설치 및 예제 실행

```
pnpm install
pnpm -F example dev
```

터미널을 열어 위 코드를 실행한 후 http://localhost:2118/ 로 접속하세요.

## 온라인 커뮤니티 및 유튜브 채널

온라인 커뮤니티에서 멀티패러다임 프로그래밍과 타입스크립트에 관한 더욱 폭넓은 학습을 진행할 수 있습니다. 추가로, 이 책과 관련된 퀴즈와 정답 풀이, 다양한 교육 자료가 공유되고 있어, 책의 내용을 더 깊이 이해하고 응용력을 키우는 데 큰 도움이 됩니다. 필요하신 분들은 꼭 방문해 참고해 보세요.

마플개발대학(MDU)은 소프트웨어 대학을 콘셉트로 활동하는 커뮤니티로, 개발자들과 함께 성장하며 프로그래밍의 즐거움을 나누고, 보다 깊이 있는 소프트웨어 공학 문화를 만들어가기 위해 설립되었습니다.

- [온라인 커뮤니티 바로가기](https://ciety.xyz/@mduniv)
- [유튜브 채널 바로가기](https://www.youtube.com/@mduniv)

## 인프런 영상 강의 및 유튜브 채널

인프런에서 본 책과 관련된 여러 영상 강의를 수강할 수 있습니다. 특히 라이브 코딩 형식으로 진행되어, 코드가 발전해 나가는 과정을 좀 더 상세하고 직관적으로 볼 수 있습니다.

본 책과 동일한 강의는 3월 말 본책 출간과 함께 업로드될 예정입니다. 
- [인프런 강의 바로가기](https://www.inflearn.com/users/@mduniv)

## 라이센스 및 저작권

이 저장소의 예제 코드는 모두 MIT 라이선스로 배포됩니다. 다만, 책의 원문과 이 저장소에 공개된 모든 텍스트는 [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) 라이선스를 적용받습니다.

본 문서의 모든 자료는 © 2025 [마플코퍼레이션](https://www.marpplecorp.com/)의 저작권이 적용됩니다.