import { fx, map, range } from '@fxts/core';

function delay<T>(time: number): Promise<undefined>;
function delay<T>(time: number, value: T): Promise<T>;
function delay<T>(time: number, value?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}

type Payment = {
  pg_uid: string;
  store_order_id: number;
  amount: number;
};

const pgDataPaymentsPages: Payment[][] = [
  [
    { pg_uid: 'PG11', store_order_id: 1, amount: 15000 },
    { pg_uid: 'PG12', store_order_id: 2, amount: 25000 },
    { pg_uid: 'PG13', store_order_id: 3, amount: 10000 }
  ],
  [
    { pg_uid: 'PG14', store_order_id: 4, amount: 25000 },
    { pg_uid: 'PG15', store_order_id: 5, amount: 45000 },
    { pg_uid: 'PG16', store_order_id: 6, amount: 15000 }
  ],
  [
    { pg_uid: 'PG17', store_order_id: 7, amount: 20000 },
    { pg_uid: 'PG18', store_order_id: 8, amount: 30000 }
  ],
];

// Payment Gateway API
const PgApi = {
  /**
   * 특정 시간 동안의 모든 결제 내역 조회 (편의상 시간 범위를 지정하는 인자는 생략)
   * @param page 조회할 페이지 번호
   */
  async getPayments(page: number) {
    console.log(`결제 내역 요청: https://pg.com/payments?page=${page}`);
    await delay(500);

    const payments = pgDataPaymentsPages[page - 1] ?? [];
    console.log(
      `${payments.length}개: ${payments.map(p => p.pg_uid).join(', ') || '-'}`
    );

    return payments;
  },

  /**
   * 결제 취소 및 환불
   * @param pg_uid 취소할 결제 ID
   */
  async cancelPayment(pg_uid: string) {
    console.log(`취소 요청: ${pg_uid}`);
    await delay(300);
    return {
      code: 200,
      message: `${pg_uid}: 취소 및 환불 완료`,
      pg_uid,
    };
  }
};

type Order = {
  id: number;
  amount: number;
  is_paid: boolean;
};

const StoreDB = {
  async getOrders(ids: number[]): Promise<Order[]> {
    console.log(`SELECT * FROM orders WHERE IN (${ids}) AND is_paid = true;`);
    await delay(100);
    return [
      { id: 1, amount: 15000, is_paid: true },
      { id: 3, amount: 10000, is_paid: true },
      { id: 5, amount: 45000, is_paid: true },
      { id: 7, amount: 20000, is_paid: true },
      { id: 8, amount: 30000, is_paid: true },
    ];
  }
};


async function code_5_32() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments =
      fx(range(1, Infinity))              // 언제 끝날지 모르는 작업 목록
        .map(page => [page, page, page])  // 1 => [1, 1, 1] (임시로 최대 3개의 값을 표현)
        .take(5)                          // 5번 만에 끝났다고 가정 (임시)
        .toArray();                       // 이터러블을 Array로 변환

    console.log(payments);
    // [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4], [5, 5, 5]]
  }

  await syncPayments();
}

async function code_5_33() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments =
      fx(range(1, Infinity))              // 언제 끝날지 모르는 작업 목록
        .map(page => [page, page, page])  // 1 => [1, 1, 1] (임시로 최대 3개의 값을 표현)
        .take(5)                          // 5번 만에 끝났다고 가정 (임시)
        .flat()                           // * 2차원 이터레이터를 1차원 이터레이터로 변경
        .toArray();                       // 이터러블을 Array로 변환

    console.log(payments);
    // [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]
  }

  await syncPayments();
}

async function code_5_34() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments = await                     // * await로 Promise 풀기
      fx(range(1, Infinity))                   // 언제 끝날지 모르는 작업 목록
        .toAsync()                             // * 비동기 작업으로 변환
        .map(page => PgApi.getPayments(page))  // * 결제 내역 가져오기 API 요청
        .take(5)                               // 5번 만에 끝났다고 가정 (임시)
        .flat()                                // 2차원 이터레이터를 1차원 이터레이터로 변경
        .toArray();                            // 이터러블을 Array로 변환

    console.log(payments);
    // 결제 내역 요청: https://pg.com/payments?page=1
    // 3개: PG11, PG12, PG13
    // 결제 내역 요청: https://pg.com/payments?page=2
    // 3개: PG14, PG15, PG16
    // 결제 내역 요청: https://pg.com/payments?page=3
    // 2개: PG17, PG18
    // 결제 내역 요청: https://pg.com/payments?page=4
    // 0개: -
    // 결제 내역 요청: https://pg.com/payments?page=5
    // 0개: -
    // [
    //   { pg_uid: 'PG11', store_order_id: 1, amount: 15000 },
    //   { pg_uid: 'PG12', store_order_id: 2, amount: 25000 },
    //   { pg_uid: 'PG13', store_order_id: 3, amount: 10000 }
    //   { pg_uid: 'PG14', store_order_id: 4, amount: 25000 },
    //   { pg_uid: 'PG15', store_order_id: 5, amount: 45000 },
    //   { pg_uid: 'PG16', store_order_id: 6, amount: 15000 }
    //   { pg_uid: 'PG17', store_order_id: 7, amount: 20000 },
    //   { pg_uid: 'PG18', store_order_id: 8, amount: 30000 }
    // ] (총 8개)
  }

  await syncPayments();
}

async function code_5_35() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments = await                     // await로 Promise 풀기
      fx(range(1, Infinity))                   // 언제 끝날지 모르는 작업 목록
        .toAsync()                             // 비동기 작업으로 변환
        .map(page => PgApi.getPayments(page))  // 결제 내역 가져오기 API 요청
        .takeWhile(({length}) => length > 0)   // * payments.length가 있으면 가져오고 없으면 멈추기
        .flat()                                // 2차원 이터레이터를 1차원 이터레이터로 변경
        .toArray();                            // 이터러블을 Array로 변환

    console.log(payments);
    // 결제 내역 요청: https://pg.com/payments?page=1
    // 3개: PG11, PG12, PG13
    // 결제 내역 요청: https://pg.com/payments?page=2
    // 3개: PG14, PG15, PG16
    // 결제 내역 요청: https://pg.com/payments?page=3
    // 2개: PG17, PG18
    // 결제 내역 요청: https://pg.com/payments?page=4
    // 0개: -
    // [
    //   { pg_uid: 'PG11', store_order_id: 1, amount: 15000 },
    //   ... 생략 ...
    //   { pg_uid: 'PG18', store_order_id: 8, amount: 30000 }
    // ] (총 8개)

  }

  await syncPayments();
}

async function code_5_36() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments = await                     // await로 Promise 풀기
      fx(range(1, Infinity))                   // 언제 끝날지 모르는 작업 목록
        .toAsync()                             // 비동기 작업으로 변환
        .map(page => PgApi.getPayments(page))  // 결제 내역 가져오기 API 요청
        .takeUntil(({length}) => length < 3)   // * 처음으로 3보다 적었을 때까지만 가져오고 즉시 멈춤
        .flat()                                // 2차원 이터레이터를 1차원 이터레이터로 변경
        .toArray();                            // 이터러블을 Array로 변환

    console.log(payments);
    // 결제 내역 요청: https://pg.com/payments?page=1
    // 3개: PG11, PG12, PG13
    // 결제 내역 요청: https://pg.com/payments?page=2
    // 3개: PG14, PG15, PG16
    // 결제 내역 요청: https://pg.com/payments?page=3
    // 2개: PG17, PG18
    // [
    //   { pg_uid: 'PG11', store_order_id: 1, amount: 15000 },
    //   ... 생략 ...
    //   { pg_uid: 'PG18', store_order_id: 8, amount: 30000 }
    // ] (총 8개)
  }

  await syncPayments();
}

async function code_5_37() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntil(({length}) => length < 3)
        .flat()
        .toArray();

    // 2. PG사 결제 내역과 일치하는 커머스 플랫폼의 주문 데이터를 조회

    const orders = await StoreDB.getOrders(
      payments.map(p => p.store_order_id)
    );
    // [
    //   { id: 1, amount: 15000, is_paid: true },
    //   { id: 3, amount: 10000, is_paid: true },
    //   { id: 5, amount: 45000, is_paid: true },
    //   { id: 7, amount: 20000, is_paid: true },
    //   { id: 8, amount: 30000, is_paid: true },
    // ]

    // 3. 누락된 결제 취소 및 환불 처리
    //  - 주문 내역과 매칭되지 않은 PG사 결제를 추려내어,
    //  - 해당 결제 ID(pg_uid)를 취소 API를 통해 처리합니다.

    await fx(payments)
      .toAsync()
      .reject(p => orders.some(order => order.id === p.store_order_id)) // 정상적인 결제 내역 제거
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid); // 누락된 결제 취소 및 환불 API 실행
        console.log(message);
      });
    // PG12: 취소 및 환불 완료
    // PG14: 취소 및 환불 완료
    // PG16: 취소 및 환불 완료
  }

  await syncPayments();
}

async function code_5_38_39() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntil(({length}) => length < 3)
        .flat()
        .toArray();

    // 2. PG사 결제 내역과 일치하는 커머스 플랫폼의 주문 데이터를 조회

    const orders = await StoreDB.getOrders(
      payments.map(p => p.store_order_id)
    );

    // 3. 누락된 결제 취소 및 환불 처리
    //  - 주문 내역과 매칭되지 않은 PG사 결제를 추려내어,
    //  - 해당 결제 ID(pg_uid)를 취소 API를 통해 처리합니다.

    const ordersById = Object.fromEntries( // 키-값 배열을 객체로 변환하여 해시 구조 생성
      map(order => [order.id, true], orders) // orders 배열을 키-값 배열 형태로 변환
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersById[p.store_order_id]) // O(1)로 매칭된 결제 내역 제거
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
    // PG12: 취소 및 환불 완료
    // PG14: 취소 및 환불 완료
    // PG16: 취소 및 환불 완료

    // [5-39]
    /*
    const ordersMapById = new Map(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersMapById.has(p.store_order_id)) // Map의 has 메서드 실행
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
    */
    // PG12: 취소 및 환불 완료
    // PG14: 취소 및 환불 완료
    // PG16: 취소 및 환불 완료
  }

  await syncPayments();
}

async function code_5_40() {
  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntil(({length}) => length < 3)
        .flat()
        .toArray();

    // 2. PG사 결제 내역과 일치하는 커머스 플랫폼의 주문 데이터를 조회

    const orders = await StoreDB.getOrders(
      payments.map(p => p.store_order_id)
    );

    // 3. 누락된 결제 취소 및 환불 처리
    //  - 주문 내역과 매칭되지 않은 PG사 결제를 추려내어,
    //  - 해당 결제 ID(pg_uid)를 취소 API를 통해 처리합니다.

    // [5-39]
    const ordersMapById = new Map(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersMapById.has(p.store_order_id)) // Map의 has 메서드 실행
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
    // PG12: 취소 및 환불 완료
    // PG14: 취소 및 환불 완료
    // PG16: 취소 및 환불 완료
  }

  async function runScheduler() {
    await fx(range(Infinity))
      .toAsync()
      .forEach(() => Promise.all([
        syncPayments(),
        delay(10000)
      ]));
  }

  await runScheduler();
}

async function code_5_41__49() {
  // Payment Gateway API
  const PgApi = {
    /**
     * 특정 시간 동안의 총 페이지 수 반환 (편의상 시간 범위를 지정하는 인자는 생략)
     * @returns 총 페이지 수
     */
    async getPageCount() {
      console.log('페이지 카운트 요청: https://pg.com/payments/page-count');
      await delay(50); // 데이터베이스에서 간단한 카운트 작업을 시뮬레이션
      return pgDataPaymentsPages.length; // 결제 내역이 저장된 총 페이지 수 반환
    },

    /**
     * 특정 시간 동안의 모든 결제 내역 조회 (편의상 시간 범위를 지정하는 인자는 생략)
     * @param page 조회할 페이지 번호
     */
    async getPayments(page: number) {
      console.log(`결제 내역 요청: https://pg.com/payments?page=${page}`);
      await delay(500); // 변경해보세요.

      const payments = pgDataPaymentsPages[page - 1] ?? [];
      console.log(
        `${payments.length}개: ${payments.map(p => p.pg_uid).join(', ') || '-'}`
      );

      return payments;
    },

    /**
     * 결제 취소 및 환불
     * @param pg_uid 취소할 결제 ID
     */
    async cancelPayment(pg_uid: string) {
      console.log(`취소 요청: ${pg_uid}`);
      await delay(3000); // 변경해보세요.
      return {
        code: 200,
        message: `${pg_uid}: 취소 및 환불 완료`,
        pg_uid,
      };
    }
  }

  const StoreDB = {
    async getOrders(ids: number[]): Promise<Order[]> {
      if (ids.length > 5) {
        throw new Error(`ID 갯수 초과: 최대 5개까지 요청할 수 있습니다. (전달된 갯수: ${ids.length})`);
      }
      console.log(`SELECT * FROM orders WHERE IN (${ids}) AND is_paid = true;`);
      await delay(100);
      return [
        { id: 1, amount: 15000, is_paid: true },
        { id: 3, amount: 10000, is_paid: true },
        { id: 5, amount: 45000, is_paid: true },
        { id: 7, amount: 20000, is_paid: true },
        { id: 8, amount: 30000, is_paid: true },
      ];
    }
  };

  async function syncPayments() {
    // 1. PG사의 결제 내역(payments) 가져오기
    //  - 페이지 단위로 데이터를 요청하여,
    //  - 결제 데이터가 있는 모든 페이지를 불러와 하나로 합칩니다.

    const totalPages = await PgApi.getPageCount(); // 3
    // (50ms 정도 소요)

    const RATE_LIMIT = 2;

    const payments = await
      fx(range(1, totalPages + 1))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .concurrent(RATE_LIMIT)  // * 항상 최대 2개씩 동시 요청
        .flat()
        .toArray();
    // 총 3번의 getPayments 요청을 최대 2개씩 동시에 요청
    // (1,000ms 정도 소요)

    // 2. PG사 결제 내역과 일치하는 커머스 플랫폼의 주문 데이터를 조회

    const orders = await
      fx(payments)
        .map(p => p.store_order_id)  // 각 payment의 store_order_id를 추출
        .chunk(5)                    // * 요청을 5개씩 분할
        .toAsync()                   // 비동기 이터러블로 변환
        .flatMap(StoreDB.getOrders)  // * 각 분할된 ids를 StoreDB.getOrders로 처리
        .toArray();                  // 결과를 배열로 변환
    // [
    //   { id: 1, amount: 15000, is_paid: true },
    //   { id: 3, amount: 10000, is_paid: true },
    //   { id: 5, amount: 45000, is_paid: true },
    //   { id: 7, amount: 20000, is_paid: true },
    //   { id: 8, amount: 30000, is_paid: true },
    // ]

    // 3. 누락된 결제 취소 및 환불 처리
    //  - 주문 내역과 매칭되지 않은 PG사 결제를 추려내어,
    //  - 해당 결제 ID(pg_uid)를 취소 API를 통해 처리합니다.

    // [5-39]
    const ordersMapById = new Map(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersMapById.has(p.store_order_id)) // Map의 has 메서드 실행
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
    // PG12: 취소 및 환불 완료
    // PG14: 취소 및 환불 완료
    // PG16: 취소 및 환불 완료
  }

  async function runScheduler() {
    await fx(range(Infinity))
      .toAsync()
      .forEach(() => Promise.all([
        syncPayments(),
        delay(10000)
      ]));
  }

  await runScheduler();
}

export async function main() {
  await code_5_32();
  // await code_5_33();
  // await code_5_34();
  // await code_5_35();
  // await code_5_36();
  // await code_5_37();
  // await code_5_38_39();
  await code_5_40();
  // await code_5_41__49();
}
