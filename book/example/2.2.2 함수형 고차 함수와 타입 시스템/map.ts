function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B>{
    for(const a of iterable){
        yield f(a);
    }
}

const array = ['1', '2', '3'];
const mapped = map(a => parseInt(a), array);
const array2: number[] = [...mapped];
console.log(array2);
// [1,2,3]


const [head] = map(a => a.toUpperCase(), ['a', 'b', 'c']);
console.log(head);
// A

export default {}