export function lesson1() {
  // Section 2. The Iterator Pattern in OOP and First-Class Functions
  // 2.1 GoF’s Iterator Pattern
  interface IteratorYieldResult<T> {
    done?: false;
    value: T;
  }
  // T라는 타입 인자를 받고 value는 해당 타입


  interface IteratorReturnResult {
    done: true;
    value: undefined;
  }
  // 이터레이터가 순회할 요소가 없을 때 반환


  type IteratorResult<T> = IteratorYieldResult<T> | IteratorReturnResult;
  // 이터레이터는 순회하거나 순회하지 않을때의 상태를 갖게 됨

  interface Iterator<T> {
    next(): IteratorResult<T>;
  }

  // 이터레이터는 next메서드를 제공하여 지연된 평가를 통해 원하는 만큼만 순회가능
}