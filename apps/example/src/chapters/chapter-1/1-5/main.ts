function code_1_46() {
  forEach(console.log,
    filter(x => x % 2 === 1,
      map(node => parseInt(node.textContent),
        document.querySelectorAll('li'))));
  // 1
  // 3
  // 5

  forEach(element => element.remove(),
    filter(node => parseInt(node.textContent) % 2 === 0,
      document.querySelectorAll('li')));
  // removed: <li>2</li>
  // removed: <li>4</li>
}

function code_1_47() {
  const nodes: NodeList = document.querySelectorAll('li');

  console.log(nodes[0], nodes[1], nodes.length);
  // <li>1</li> <li>3</li> 3
  // nodes는 Array처럼 보입니다.

  // nodes.map(node => node.textContent);
  // Uncaught TypeError: nodes.map is not a function
}

export function main() {
  code_1_46();
  code_1_47()
}

function forEach(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  let result = iterator.next();
  while (!result.done) {
    f(result.value);
    result = iterator.next();
  }
}

function* map(f, iterable) {
  for (const value of iterable) {
    yield f(value);
  }
}

function* filter(f, iterable) {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}
