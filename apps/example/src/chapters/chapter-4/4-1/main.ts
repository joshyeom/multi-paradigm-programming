function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

async function code_4_3() {
  function test() {
    console.time('test'); // 코드 실행 시간을 측정 시작

    delay(1000, "Hello, world!").then((result) => { // [result: string]
      console.log(result); // 1초 후에 "Hello, world!" 출력
    }).then(() => {
      return delay(2000, 40);
    }).then((result) => { // [result: number]
      console.log(result); // 2초 후에 40 출력

      console.timeEnd('test'); // 코드 실행 시간을 측정 종료 및 출력: 약 3000ms
    });
  }

  test();
  // Hello, world!
  // 40
  // main: 3002.367ms

  await delay(3500, undefined);
}


async function code_4_4() {
  async function test2() {
    console.time('test2'); // 코드 실행 시간을 측정 시작

    const result1 = await delay(1000, "Hello, world!"); // [result1: string]
    console.log(result1); // 1초 후에 "Hello, world!" 출력

    const result2 = await delay(2000, 40); // [result2: number]
    console.log(result2); // 2초 후에 40 출력

    console.timeEnd('test2'); // 코드 실행 시간을 측정 종료 및 출력: 약 3000ms
  }

  await test2();
  // Hello, world!
  // 40
  // test2: 3002.519ms
}

async function code_4_5() {
  const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'one'));

  const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'two'));

  await Promise.race([promise1, promise2]).then((value) => {
    console.log(value); // "two"가 출력됩니다. (먼저 완료된 Promise)
  });
}

function getRandomValue<T>(a: T, b: T): T {
  // 0 또는 1 중 하나를 무작위로 뽑은 뒤, 그 값에 따라 a 또는 b를 반환합니다.
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? a : b;
}

type User = {
  name: string;
};

function getFriends(): Promise<User[]> {
  // return fetch('/friends').then(res => res.json()); 와 유사한 역할을 하는 함수의 임시 구현
  return delay(
    getRandomValue(60, 6_000), // 0.06초 or 6초
    [{ name: 'Marty' }, { name: 'Michael' }, { name: 'Sarah' }]
  );
}

async function code_4_6() {
  const result = await Promise.race([
    getFriends(),
    delay(5000, 'timeout') // 5초
  ]);

  if (result === 'timeout') {
    console.log("현재 네트워크 환경이 좋지 않습니다.");
  } else {
    const friends = result as User[];
    console.log("친구 목록 렌더링: ", friends.map(({ name }) => `<li>${name}</li>`));
  }
}

async function code_4_7() {
  function toggleLoadingIndicator(show: boolean): void {
    if (show) {
      console.log("append loading...");
    } else {
      console.log("remove loading...");
    }
  }

  async function renderFriendsPicker(): Promise<void> {
    const friendsPromise = getFriends();

    const result = await Promise.race([
      friendsPromise,
      delay(100, 'isSlow')
    ]);

    if (result === 'isSlow') {
      toggleLoadingIndicator(true);
      await friendsPromise;
      toggleLoadingIndicator(false);
    }

    const friends = await friendsPromise;
    console.log("친구 목록 렌더링: ", friends.map(({ name }) => `<li>${name}</li>`));
  }

  await renderFriendsPicker();
  // 빠른 응답 시 (랜덤)
  // 0.06초 뒤
  // 친구 목록 렌더링: <li>Marty</li><li>Michael</li><li>Sarah</li>

  await renderFriendsPicker();
  // 느린 응답 시 (랜덤)
  // append loading...
  // 6초 뒤
  // remove loading...
  // 친구 목록 렌더링: <li>Marty</li><li>Michael</li><li>Sarah</li>
}

type File = {
  name: string;
  body: string;
  size: number;
};

function getFile(name: string, size = 1000): Promise<File> {
  return delay(size, { name, body: '...', size });
}

async function code_4_8() {
  const files = await Promise.all([
    getFile('img.png', 500),
    getFile('book.pdf', 1000),
    getFile('index.html', 1500)
  ]);

  console.log(files);
  // 약 1,500ms 뒤:
  // [
  //   { name: 'img.png', body: '...', size: 500 },
  //   { name: 'book.pdf', body: '...', size: 1000 },
  //   { name: 'index.html', body: '...', size: 1500 }
  // ]
}

async function code_4_9() {
  try {
    const files = await Promise.all([
      getFile('img.png'), // 기본 size: 1000, delay: 1000ms
      getFile('book.pdf'),
      getFile('index.html'),
      delay(500, Promise.reject('파일 다운로드 실패'))
    ]);
    console.log(files); // 이 라인은 실행되지 않습니다.
  } catch (error) {
    // 약 500ms 뒤
    console.error(error); // '파일 다운로드 실패'
  }
}

async function code_4_10() {
  const files = await Promise.allSettled([
    getFile('img.png'),
    getFile('book.pdf'),
    getFile('index.html'),
    Promise.reject('파일 다운로드 실패') // 즉시 실패
  ]);

  console.log(files);
  // 약 1,000ms 뒤:
  // [
  //   { status: 'fulfilled', value: { name: 'img.png', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'book.pdf', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'index.html', body: '...', size: 1000 } },
  //   { status: 'rejected', reason: '파일 다운로드 실패' }
  // ]
}

async function code_4_11() {
  const settlePromise = <T>(promise: Promise<T>) =>
    promise
      .then(value => ({ status: 'fulfilled', value }))
      .catch(reason => ({ status: 'rejected', reason }));

  const files = await Promise.all([
    getFile('img.png'),
    getFile('book.pdf'),
    getFile('index.html'),
    Promise.reject('파일 다운로드 실패')
  ].map(settlePromise));

  console.log(files);
  // [
  //   { status: 'fulfilled', value: { name: 'img.png', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'book.pdf', body: '...', size: 1000 } },
  //   { status: 'fulfilled', value: { name: 'index.html', body: '...', size: 1000 } },
  //   { status: 'rejected', reason: '파일 다운로드 실패' }
  // ]
}

async function code_4_12() {
  const files = await Promise.any([
    getFile('img.png', 1500),
    getFile('book.pdf', 700),
    getFile('index.html', 900),
    delay(100, Promise.reject('파일 다운로드 실패'))
  ]);

  console.log(files);
  // 약 700ms 후
  // { name: 'book.pdf', body: '...', size: 700 }

  const files2 = await Promise.any([
    delay(200, Promise.reject('파일 다운로드 실패')),
    delay(100, Promise.reject('파일 다운로드 실패'))
  ]);
  // 약 200ms 후
  // Uncaught (in promise) AggregateError: All promises were rejected
}

export async function main() {
  await code_4_3();
  await code_4_4();
  await code_4_5();
  await code_4_6();
  await code_4_7();
  await code_4_8();
  await code_4_9();
  await code_4_10();
  await code_4_11();
  await code_4_12();
}
