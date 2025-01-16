import {delay, map, range} from "@fxts/core";

function createAsyncTask(name: string, ms: number): () => Promise<string> {
  return () =>
    new Promise(resolve => {
      console.log(`Started: ${name}`);
      setTimeout(() => {
        console.log(`Finished: ${name}`);
        resolve(name);
      }, ms);
    });
}

async function code_6_20_21() {
  async function runTasksWithPool<T>(
    fs: (() => Promise<T>)[],
    poolSize: number
  ): Promise<T[]> {
    const results: T[] = [];
    const activePromises: Promise<void>[] = [];

    for (let i = 0; i < fs.length; i++) {
      const taskFactory = fs[i];
      // 각 작업을 실행하고 결과를 해당 인덱스에 저장한 뒤, 완료 시 activePromises에서 제거
      const p = taskFactory()
        .then((fetchedValue) => {
          // 작업 완료 시 결과 배열에 할당
          results[i] = fetchedValue;
        })
        .then(() => {
          // 해당 작업이 완료되었으므로 activePromises에서 제거
          const removeIndex = activePromises.indexOf(p);
          if (removeIndex > -1) {
            activePromises.splice(removeIndex, 1);
          }
        });

      // 실행 중인 작업 리스트에 현재 작업 추가
      activePromises.push(p);

      // 현재 실행 중인 작업 수가 제한에 도달하면, 하나가 끝날 때까지 대기
      if (activePromises.length >= poolSize) {
        // 가장 먼저 완료되는 작업을 기다려, 실행 중인 작업 수를 조정
        await Promise.race(activePromises);
      }
    }

    // 남은 모든 작업이 완료될 때까지 대기 후 결과 반환
    await Promise.all(activePromises);

    return results;
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await runTasksWithPool(tasks, poolSize);
  console.log("Results:", results);
}

class TaskRunner<T> {
  private _promise: Promise<T> | null = null;
  private _isDone = false;
  get promise() { return this._promise ?? this.run(); }
  get isDone() { return this._isDone; }

  constructor(private f: () => Promise<T>) {}

  async run() {
    if (this._promise) {
      return this._promise;
    } else {
      return this._promise = this.f().then(res => {
        this._isDone = true;
        return res;
      });
    }
  }
}

async function code_6_22() {
  async function runTasksWithPool<T>(
    fs: (() => Promise<T>)[],
    poolSize: number
  ): Promise<T[]> {
    const tasks = fs.map(f => new TaskRunner(f));

    let pool: TaskRunner<T>[] = [];
    for (const nextTask of tasks) {
      // pool에 작업을 poolSize 만큼 추가
      pool.push(nextTask);
      if (pool.length < poolSize) continue;
      // 현재 풀에 있는 작업을 시작하고 하나가 끝날 때까지 대기
      await Promise.race(pool.map(task => task.run()));
      // 완료된 작업 제거
      pool.splice(pool.findIndex(task => task.isDone), 1);
    }

    return Promise.all(tasks.map(task => task.promise)); // 이미 완료되었을 결과를 수집
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await runTasksWithPool(tasks, poolSize);
  console.log("Results:", results);
}

async function code_6_24() {
  class TaskPool<T> {
    private readonly tasks: TaskRunner<T>[];
    private readonly pool: TaskRunner<T>[] = [];
    public poolSize: number;

    constructor(fs: (() => Promise<T>)[], poolSize: number) {
      this.tasks = fs.map(f => new TaskRunner(f));
      this.poolSize = poolSize;
    }

    setPoolSize(poolSize: number) {
      this.poolSize = poolSize;
    }

    private canExpandPool() {
      return this.pool.length < this.poolSize;
    }

    async runAll() {
      const { pool, tasks } = this;

      let i = 0;
      const { length } = tasks;
      while (i < length) {
        const nextTask = tasks[i];
        pool.push(nextTask);
        const isNotLast = ++i < length;
        if (isNotLast && this.canExpandPool()) continue;
        await Promise.race(pool.map(task => task.run()));
        pool.splice(pool.findIndex(task => task.isDone), 1);
      }

      return Promise.all(tasks.map(task => task.promise));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await new TaskPool(tasks, poolSize).runAll();
  console.log("Results:", results);
}

async function code_6_25_26() {
  class TaskPool<T> {
    private readonly taskIterator: IterableIterator<TaskRunner<T>>;
    private readonly pool: TaskRunner<T>[] = [];
    public poolSize: number;

    // (1) (() => Promise<T>)[]에서 Iterable<() => Promise<T>> 로 변경
    constructor(fs: Iterable<() => Promise<T>>, poolSize: number) {
      this.taskIterator = map(f => new TaskRunner(f), fs); // (2) 이터러블 map으로 변경
      this.poolSize = poolSize;
    }

    setPoolSize(poolSize: number) {
      this.poolSize = poolSize;
    }

    private canExpandPool() {
      return this.pool.length < this.poolSize;
    }

    async runAll() {
      const { pool, taskIterator } = this;
      const tasks: TaskRunner<T>[] = [];

      while (true) { // (3) 반복 방식 변경
        const { done, value: nextTask } = taskIterator.next();
        if (!done) {
          pool.push(nextTask);
          tasks.push(nextTask);
          if (this.canExpandPool()) continue;
        }
        if (done && pool.length === 0) break;
        await Promise.race(pool.map(task => task.run()));
        pool.splice(pool.findIndex(task => task.isDone), 1);
      }

      return Promise.all(tasks.map(task => task.promise));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    createAsyncTask("B", 500),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  const poolSize = 2;
  const results = await new TaskPool(tasks, poolSize).runAll();
  console.log("Results:", results);

  async function crawling(page: number) {
    console.log(`${page}페이지 분석 시작`)
    await delay(5_000);
    console.log(`${page}페이지 저장 완료`);
    return page;
  }

  void new TaskPool(
    map(page => () => crawling(page), range(Infinity)),
    5
  ).runAll();
}

async function crawling(page: number) {
  console.log(`${page}페이지 분석 시작`)
  await delay(5_000);
  console.log(`${page}페이지 저장 완료`);
  return page;
}

async function code_6_27_28() {
  class TaskPool<T> {
    private readonly taskIterator: IterableIterator<TaskRunner<T>>;
    private readonly pool: TaskRunner<T>[] = [];
    public poolSize: number;

    constructor(fs: Iterable<() => Promise<T>>, poolSize: number) {
      this.taskIterator = map(f => new TaskRunner(f), fs);
      this.poolSize = poolSize;
    }

    setPoolSize(poolSize: number) {
      this.poolSize = poolSize;
    }

    private canExpandPool() {
      return this.pool.length < this.poolSize;
    }

    private async run(errorHandle: (err: unknown) => unknown) {
      const { pool, taskIterator } = this;
      const tasks: TaskRunner<T>[] = [];

      while (true) {
        const { done, value: nextTask } = taskIterator.next();
        if (!done) {
          pool.push(nextTask);
          tasks.push(nextTask);
          if (this.canExpandPool()) continue;
        }
        if (done && pool.length === 0) break;
        await Promise.race(pool.map(task => task.run())).catch(errorHandle);
        pool.splice(pool.findIndex(task => task.isDone), 1);
      }

      return tasks.map(task => task.promise);
    }

    async runAll() {
      return Promise.all(await this.run(err => Promise.reject(err)));
    }

    async runAllSettled() {
      return Promise.allSettled(await this.run(() => undefined));
    }
  }

  const tasks = [
    createAsyncTask("A", 1000),
    () => createAsyncTask("B", 500)().then(() => Promise.reject('no!')),
    createAsyncTask("C", 800),
    createAsyncTask("D", 300),
    createAsyncTask("E", 1200),
  ];

  async function runAllTest() {
    try {
      const result = await new TaskPool(tasks, 2).runAll();
      console.log(result); // 여기 오지 않음
    } catch (e) {
      // 하나라도 실패하면 여기로
      console.log(e); // "no!"
    }
  }

  await runAllTest();

  async function runAllSettledTest() {
    const result = await new TaskPool(tasks, 2).runAllSettled();
    console.log(result);
    // [
    //   {status: "fulfilled", value: "A"},
    //   {status: "rejected", reason: "no!"},
    //   {status:"fulfilled",value:"C"},
    //   {status:"fulfilled",value:"D"},
    //   {status:"fulfilled",value:"E"}
    // ]
  }

  await runAllSettledTest();

  async function runAllTest2() {
    try {
      const task = (page: number) => () =>
        page === 7
          ? Promise.reject(page)
          : crawling(page);

      await new TaskPool(map(task, range(Infinity)), 5).runAll();
    } catch (e) {
      // 하나라도 실패하면 무한 작업을 중단하고 여기로
      console.log(`crawling 중간에 실패! (${e}페이지)`);
      // crawling 중간에 실패! (7페이지)
    }
  }

  await runAllTest2();

  await delay(10_000);
  console.log('------------');

  async function runAllSettledTest2() {
    const task = (page: number) => () =>
      page === 7
        ? Promise.reject(page)
        : crawling(page);

    const taskPool = new TaskPool(
      map(task, range(Infinity)), 5
    );

    // 중간에 실패해도 무한 작업 계속 진행
    void taskPool.runAllSettled();

    // 10초 후 poolSize를 5에서 10으로 변경
    setTimeout(() => {
      taskPool.setPoolSize(10);
    }, 10_000);
  }

  void runAllSettledTest2();
}

export async function main() {
  await code_6_20_21();
  // await code_6_22();
  // await code_6_24();
  // await code_6_25_26();
  await code_6_27_28();
}
