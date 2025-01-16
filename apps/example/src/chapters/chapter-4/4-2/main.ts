import { fx2, take } from '../../../lib/fx2';

function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

async function code_4_13() {
  type File = {
    name: string;
    body: string;
    size: number;
  };

  function getFile(name: string, size = 1000): Promise<File> {
    return delay(size, { name, body: '...', size });
  }

  async function test() {
    const files: File[] = await Promise.all([
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
    ]);

    console.log(files);
  }

  await test();
  // 약 1,000ms 뒤:
  // [
  //   { name: 'img.png', body: '...', size: 1000 },
  //   { name: 'book.pdf', body: '...', size: 1000 },
  //   { name: 'index.html', body: '...', size: 1000 },
  //   { name: 'img.png', body: '...', size: 1000 },
  //   { name: 'book.pdf', body: '...', size: 1000 },
  //   { name: 'index.html', body: '...', size: 1000 },
  // ]
}

async function code_4_14() {
  type File = {
    name: string;
    body: string;
    size: number;
  };

  function getFile(name: string, size = 1000): Promise<File> {
    return delay(size, { name, body: '...', size });
  }

  async function executeWithLimit<T>(
    promises: Promise<T>[],
    limit: number
  ): Promise<T[]> {
    const result1 = await Promise.all([promises[0], promises[1], promises[2]]);
    const result2 = await Promise.all([promises[3], promises[4], promises[5]]);
    return [
      ...result1,
      ...result2
    ];
  }

  async function test() {
    const files: File[] = await executeWithLimit([
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
    ], 3);

    console.log(files);
  }

  await test();
  // 약 1,000ms 뒤:
  // [
  //   { name: 'img.png', body: '...', size: 1000 },
  //   { name: 'book.pdf', body: '...', size: 1000 },
  //   { name: 'index.html', body: '...', size: 1000 },
  //   { name: 'img.png', body: '...', size: 1000 },
  //   { name: 'book.pdf', body: '...', size: 1000 },
  //   { name: 'index.html', body: '...', size: 1000 },
  // ]
}

type File = {
  name: string;
  body: string;
  size: number;
};

function getFile(name: string, size = 1000): Promise<File> {
  console.log(`${name} 시작`);  // 각 파일의 다운로드 시작 시 로그 출력
  return delay(size, { name, body: '...', size });
}

async function code_4_14a() {
  async function executeWithLimit<T>(
    promises: Promise<T>[],
    limit: number
  ): Promise<T[]> {
    const result1 = await Promise.all([promises[0], promises[1], promises[2]]);
    const result2 = await Promise.all([promises[3], promises[4], promises[5]]);
    return [
      ...result1,
      ...result2
    ];
  }

  async function test() {
    const promises = [
      getFile('1-img.png'),
      getFile('2-book.pdf'),
      getFile('3-index.html'),
      getFile('4-img2.png'),
      getFile('5-book.pdf'),
      getFile('6-index.html'),
    ];
    // 동시에 아래 6개 출력
    // 1-img.png 시작
    // 2-book.pdf 시작
    // 3-index.html 시작
    // 4-img2.png 시작
    // 5-book.pdf 시작
    // 6-index.html 시작

    const files: File[] = await executeWithLimit(promises, 3);

    console.log(files);
  }

  await test();
  // 약 1,000ms 뒤:
  // [
  //   { name: '1-img.png', body: '...', size: 1000 },
  //   { name: '2-book.pdf', body: '...', size: 1000 },
  //   ...
  //   { name: '6-index.html', body: '...', size: 1000 },
  // ]
}

async function code_4_15() {
  async function executeWithLimit<T>(
    fs: (() => Promise<T>)[],
    limit: number
  ): Promise<T[]> {
    const result1 = await Promise.all([fs[0](), fs[1](), fs[2]()]);
    const result2 = await Promise.all([fs[3](), fs[4](), fs[5]()]);
    return [
      ...result1,
      ...result2
    ];
  }

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
    ], 3);

    console.log(files);
  }

  await test();
  // 즉시 3개 출력:
  // 1-img.png 시작
  // 2-book.pdf 시작
  // 3-index.html 시작

  // 약 1,000ms 뒤, 아래 3개 출력:
  // 4-img2.png 시작
  // 5-book.pdf 시작
  // 6-index.html 시작

  // 약 2,000ms 뒤:
  // [
  //   { name: '1-img.png', body: '...', size: 1000 },
  //   { name: '2-book.pdf', body: '...', size: 1000 },
  //   { name: '3-index.html', body: '...', size: 1000 },
  //   { name: '4-img.png', body: '...', size: 1000 },
  //   { name: '5-book.pdf', body: '...', size: 1000 },
  //   { name: '6-index.html', body: '...', size: 1000 },
  // ]
}

async function code_4_16() {

  async function executeWithLimit<T>(
    fs: (() => Promise<T>)[],
    limit: number
  ): Promise<T[]> {
    const results: T[] = [];

    // 전체 배열을 순회하면서 limit 단위로 그룹화
    for (let i = 0; i < fs.length; i += limit) {
      const batchPromises: Promise<T>[] = [];

      // limit 단위로 그룹화된 작업을 생성
      for (let j = 0; j < limit && (i + j) < fs.length; j++) {
        batchPromises.push(fs[i + j]());
      }

      // 그룹화된 작업을 병렬로 실행하고 결과를 수집
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // i += limit 로 인덱스를 limit만큼 증가시켜 다음 그룹으로 이동
    }

    return results;
  }

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ], 3);

    console.log(files);
  }

  await test();
  // 즉시 3개 출력:
  // 1-img.png 시작
  // 2-book.pdf 시작
  // 3-index.html 시작

  // 약 1,000ms 뒤, 아래 3개 출력:
  // 4-img2.png 시작
  // 5-book.pdf 시작
  // 6-index.html 시작

  // 약 2,000ms 뒤, 아래 1개 출력:
  // 7-img.png 시작

  // 약 3,000ms 뒤:
  // [
  //   { name: '1-img.png', body: '...', size: 1000 },
  //   { name: '2-book.pdf', body: '...', size: 1000 },
  //   { name: '3-index.html', body: '...', size: 1000 },
  //   { name: '4-img2.png', body: '...', size: 1000 },
  //   { name: '5-book.pdf', body: '...', size: 1000 },
  //   { name: '6-index.html', body: '...', size: 1000 },
  //   { name: '7-img.png', body: '...', size: 1000 },
  // ]
}

async function code_4_17() {
  function* chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const arr = [
        ...take(size, {
          [Symbol.iterator]() {
            return iterator;
          },
        }),
      ];
      if (arr.length) yield arr;
      if (arr.length < size) break;
    }
  }

  // class FxIterable<A> {
  //   // ... 생략된 메서드들 ...
  //
  //   chunk(size: number) {
  //     return fx(chunk(size, this));
  //   }
  // }

  console.log([...chunk(2, [1, 2, 3, 4, 5])]);
  // [[1, 2], [3, 4], [5]]

  fx2([1, 2, 3, 4, 5])
    .chunk(2)
    .map(arr => arr.map(a => a * 10)) // [arr: number[]], [a: number]
    .forEach(arr => console.log(arr));
  // [10, 20]
  // [30, 40]
  // [50]
}

async function fromAsync<T>(
  iterable: Iterable<Promise<T>> | AsyncIterable<T>
): Promise<T[]> {
  const arr: T[] = [];
  for await (const a of iterable) {
    arr.push(a);
  }
  return arr;
}

async function code_4_18() {
  const executeWithLimit = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> =>
    fx2(fs)
      .chunk(limit)
      .map(fs => fs.map(f => f()))
      .map(ps => Promise.all(ps))
      .to(fromAsync)
      .then(arr => arr.flat());

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ], 3);

    console.log(files);
  }

  await test();
  // 콘솔 출력:
  // [코드 4-16]과 결과 같음
}

async function code_4_19() {
  const executeWithLimit = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> =>
    fx2(fs)
      .map(f => f())
      .chunk(limit)
      .map(ps => Promise.all(ps))
      .to(fromAsync)
      .then(arr => arr.flat());

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ], 3);

    console.log(files);
  }

  await test();
  // 콘솔 출력:
  // [코드 4-16]과 결과 같음
}

export async function main() {
  await code_4_13();
  await code_4_14();
  await code_4_14a();
  await code_4_15();
  await code_4_16();
  await code_4_17();
  await code_4_18();
  await code_4_19();
}
