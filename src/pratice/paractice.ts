/**
 * typescript는 기존의 script와 달리 타입을 지정 할 수 있다.
 * 타입이 선언되고 적절한 타입이 할당되지 못하는 경우에는 "타입에러"가 발생한다.
 */

let var1 = 'lee dong'; // any 타입
let var2 : string = 'lee'; // 특정한 타입을 명시 할 수 있음

let num1: number = 100;
let num2: number = 1.1;
let num3: number = -100;

let bool1 : boolean = true;
let bool2 : boolean = false;

let something1: any = true;
let something2: any = 'test';
let something3: any = 100;

let e1: string | number = '100';
let e2: string | number = 100;
//let e3: string = 100; -> 타입에러 발생

console.log(var1);
console.log(var2);
console.log(num1, num2, num3);
console.log(e1, e2);

// typescript는 ES5, ES6의 상위확장인 언어이므로 자바스크립트의 타입을 그대로 사용 할 수 있고,
// 타입스크립트의 고유의 타입이 추가로 제공된다.
let nullvalue = null;
let undefinedValue = undefined;

// 배열(Array)
// for..of를 사용하는게 더 낫다. for..of를 속도가 비교적 느리다.
// (typescript에서 ES5로 변환되면서 기존의 for루프 코드가 생성되므로 속도 페널티가 없음)
let array: string[] = ['a', 'b', 'c'];
for (const[i, v] of array.entries()) {
    console.log(i, v);
}

let array2: Array<string> = ['a', 'b', 'c', 'd'];
for (const value of array2) {
    console.log(value);
}

// 숫자형만 가지는 배열
let arr03: number[] = [1,2,3,4];
let arr04: Array<number> = [1,2,3,4,5,6,7];
arr03.forEach(num => {
    console.log(num);
});
for (const [index, val] of arr04.entries()) {
    console.log(`index: ${index}, value: ${val}`);
}

// 다중타입 배열 (ex. 문자열과 숫자를 동시에 가지는 배열)
let arr05: (string | number)[] = [1, 'a', 2, 'b', 3, 'c'];
for (const [i, v] of arr05.entries()) {
    console.log(i, v);
}

let arr06: Array<string | number> = [1, 'a', 2, 'b', 3, 'c'];
let tmp: number[] = [];
arr06.map(value => {
    if(typeof value == 'number') {
        tmp.push(value);
    }
});
console.log(tmp);

// 함수 + array
let arr = [1,2,3,4,5,6];
const fold = (arr: number[], initValue: number, cb: (sum: number, value: number) => number) : number => {
    let sum = initValue;
    for(let i in arr) {
        sum = cb(sum, arr[i])
    }
    return sum;
};

console.log(fold(arr, 0, (sum: number, res: number): number => sum-res));

