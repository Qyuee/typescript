/**
 * '_' : 매개변수 혹은 함수구현을 무시하기 위해서 사용
 * '_'이 아니라 () => {}
 */
function ttt(a: number, fn:(param?: number) => any[]): void {
    console.log(fn());
}

function cb(a: number | undefined, b: string): any[] {
    console.log(`a: ${a}, b: ${b}`);
    return [a, parseInt(b)]
}

// ttt(11, (n) => {
//     console.log(`n:${n}`)
//     return n+10
// });

// ttt(10, _ => 20);

ttt(10, _ => []);
// ttt(10, (n) => cb(n, '123'));
// ttt(10, _ => cb(_, '9999'));


