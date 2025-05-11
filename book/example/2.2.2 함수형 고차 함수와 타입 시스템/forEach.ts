function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void{
    for(const a of iterable){
        f(a);
    }
}

const array = [1,2,3];
forEach(a => console.log(a.toFixed(2)), array);