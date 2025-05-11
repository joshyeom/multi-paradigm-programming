function baseReduce<A, Acc>(
    f: (Acc: Acc, a: A) => Acc, acc: Acc, iterator: Iterator<A>
): Acc{
    while(true){
        const {done, value} = iterator.next();
        if (done) break;
        acc = f(acc, value);
    }
    return acc;
}

function reduce<A, Acc>(
    f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>
): Acc;

function reduce<A, Acc>(
    f: (a: A, b: A) => Acc, iterable: Iterable<A>
): Acc;

function reduce<A, Acc>(
    f: (a: Acc | A, b: A) => Acc,
    accOrIterable: Acc | Iterable<A>,
    iterable?: Iterable<A>
): Acc {
    if(iterable === undefined){
        const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
        const { done, value: acc } = iterator.next();
        if(done) throw new TypeError("'reduce'j of empty iterable with no initial value");
        return baseReduce(f, acc, iterator) as Acc;
    }else{
        return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
    }
}

// 1. 초깃값을 포함한 예제
const array = [1,2,3];
const sum = reduce((acc, a) => acc + a, 0, array);
console.log(sum);
// 6

const strings = ['a', 'b', 'c'];
const abc = reduce((acc, a) => `${acc}${a}`, '', strings);
console.log(abc);
// abc

// 2. 초깃값을 포함하지 않은 예제
const array2 = [1,2,3];
const sum2 = reduce((a, b) => a + b, array2);
console.log(sum2);
// 6

const words = ['hello', 'beautiful', 'world'];
const sentence = reduce((a, b) => `${a} ${b}`, words);
console.log(sentence);
// hello beautiful world

const array3 = [3,2,1];
const str = reduce((a, b) => `${a}${b}`, array3);
console.log(str);
// 321


export {}