/**
 * 1. Array.from()
 * 2. Array.filter()
 * 3. Array.map()
 */
// 기본함수
function consoleResult(arr: any): void {
    for (const [index, command] of arr.entries()) {
        if (typeof command === 'function') {
            command();
            continue;
        }
        console.log(command);
    }
};

console.log('==================Array.from(...)==================');
let array_test = [
     Array.from('123'),
     Array.from('456'),
     Array.from([123, 456]),
     Array.from([[123], [456]]),
     Array.from([1,2,3], x => x+x),
     Array.from([1,2,3,4,5], x => x.toString()),
     Array.from(new Map([[1,2]])),
     Array.from({length: 5}, (v, i) => i)
];
consoleResult(array_test);

// Array.map(...)
// map을 호출해서 원본이 변경되지는 않지만, 콜백에 의해서 변경 될 수 있음에 주의
console.log('==================Array.map(...)==================');
let arr_info: {value: number[], initArray: Function} = {
    value: [],
    initArray(): void {
        arr_info.value = [1, 4, 9, 16];
    }
};
arr_info.initArray();

let map_test = [
    arr_info.value.map(x => x+2),
    arr_info.value.map(x => arr_info.value.push(x)),   // 원본이 바뀔 수 있음, push()후 인덱스 값 반환
    arr_info.initArray,
];
consoleResult(map_test);

// Array.map(...)으로 객체 구성 재배열하기
var kvArray = [
    {key:1, value:10},
    {key:2, value:20},
    {key:3, value: 30}
];
const afterKvArray = kvArray.map((obj) => {
    const tmpKey = obj.key;
    obj.key = obj.value;
    obj.value = tmpKey;
    return obj;
});
console.log(afterKvArray);