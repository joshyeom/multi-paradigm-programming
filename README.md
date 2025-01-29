[English](#multi-paradigm-programming-with-typescript) | [한국어](#멀티패러다임-프로그래밍과-타입스크립트)

# Multi-Paradigm Programming with TypeScript

Combining Functional, Object-Oriented, and Lisp Paradigms for Software Design and Implementation

- [Table of Contents](#Table-of-Contents)
- [Project Setup](#Project-Setup)
- [License & Copyright](#License-&-Copyright)

## Table of Contents

[View Detailed Table of Contents](book/en/README.md) <br>
[From the Author](book/en/0.1-From-the-Author.md) <br>
[Endorsements](book/en/0.2-Endorsements.md) <br>

1. [How Multiparadigm Is Expanding Modern Languages](book/en/1.0.-How-Multiparadigm-Is-Expanding-Modern-Languages.md)
   1. [The Iterator Pattern in OOP and First-Class Functions](book/en/1.1-The-Iterator-Pattern-in-OOP-and-First-Class-Functions.md)
   2. [Generators: Building Iterators with Imperative Programming](book/en/1.2-Generators:-Building-Iterators-with-Imperative-Programming.md)
   3. [The Iterator Pattern in TypeScript: The Iteration Protocol](book/en/1.3-The-Iterator-Pattern-in-TypeScript:-The-Iteration-Protocol.md)
   4. [Functional Programming with Iterables](book/en/1.4-Functional-Programming-with-Iterables.md)
   5. [Why the Iteration Protocol Is Designed as an Interface Rather Than Inheritance](book/en/1.5-Why-the-Iteration-Protocol-Is-Designed-as-an-Interface-Rather-Than-Inheritance.md)
2. [Functional Programming, Type Systems, and Lisp](book/en/2.0-Functional-Programming,-Type-Systems,-and-Lisp.md)
   1. [Type Inference, Function Types, and Generics](book/en/2.1-Type-Inference,-Function-Types,-and-Generics.md)
   2. [Functional Type Systems in a Multi-Paradigm Language](book/en/2.2-Functional-Type-Systems-in-a-Multi-Paradigm-Language.md)
   3. [Multiparadigm Languages and Metaprogramming – From LISP](book/en/2.3-Multiparadigm-Languages-and-Metaprogramming-–-From-LISP.md)
3. [Code:Object:Function = Generator:Iterator:LISP = IP:OOP:FP](book/en/3.0-Code%3AObject%3AFunction-=-Generator%3AIterator%3ALISP-=-IP%3AOOP%3AFP.md)
   1. [Code Is Data – A List Containing Logic](book/en/3.1-Code-Is-Data-–-A-List-Containing-Logic.md)
   2. [Learning from Haskell](book/en/3.2-Learning-from-Haskell.md)
   3. [Taking a Closer Look at Lazy Evaluation](book/en/3.3-Taking-a-Closer-Look-at-Lazy-Evaluation.md)
   4. [Generator:Iterator:LISP – Lazy Evaluation and Safe Composition](book/en/3.4-Generator:Iterator:LISP-–-Lazy-Evaluation-and-Safe-Composition.md)
4. Asynchronous Programming
   1. Asynchronous as a Value
   2. Asynchronous Handling with Laziness
   3. Treating Asynchronous as a Type
   4. Asynchronous Error Handling
5. Practical Functional Programming
   1. Working With Real World Data
   2. Applying to More Problems
   3. Backend Asynchronous Programming
   4. Patternizing List Processing
6. Multi-Paradigm Programming
   1. Building an HTML Template Engine
   2. Handling Concurrency with a Multi-Paradigm Approach
7. Object-Oriented Front-End Development and Multi-Paradigm Approaches in Practice
   1. Building a "Settings" App
   2. Building a Todo App
   3. Building a Todo App, Part 2
   4. Building a Todo App, Part 3
   5. Asynchronous Flows with UI, Promise, and Class

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

- [목차](#목차)
- [예제 환경 설치](#예제-환경-설치)
- [온라인 커뮤니티 및 유튜브 채널](#온라인-커뮤니티-및-유튜브-채널)
- [인프런 영상 강의](#인프런-영상-강의)
- [라이센스 및 저작권](#라이센스-및-저작권)

## 목차

[상세 목차](book/ko/README.md) <br>
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

## 인프런 영상 강의

인프런에서 본 책과 관련된 여러 영상 강의를 수강할 수 있습니다. 특히 라이브 코딩 형식으로 진행되어, 코드가 발전해 나가는 과정을 좀 더 상세하고 직관적으로 볼 수 있습니다.

본 책과 동일한 강의는 3월 말 본책 출간과 함께 업로드될 예정입니다. 
- [인프런 강의 바로가기](https://www.inflearn.com/users/@mduniv)

## 라이센스 및 저작권

이 저장소의 예제 코드는 모두 MIT 라이선스로 배포됩니다. 다만, 책의 원문과 이 저장소에 공개된 모든 텍스트는 [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) 라이선스를 적용받습니다.

본 문서의 모든 자료는 © 2025 [마플코퍼레이션](https://www.marpplecorp.com/)의 저작권이 적용됩니다.