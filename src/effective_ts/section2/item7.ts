/**
 * 타입이 값들의 집합이라고 생각하기
 * - JS의 변수에는 다양한 종류의 값을 할당 할 수 있으며 타입스크립트가 오류를 체크하는 순간에는 '타입'을 가지고 있다.
 * - 할당 가능한 값들의 집합이 타입이라고 생각하면 된다.
 * - 이 집합은 '범위'라고 부르기도 한다. 예를 들어서 모든 숫자값의 집합을 number라고 하고 42와 37.25는 number 타입에 해당된다.
 * - 가장 작은 집합은 아무것도 포함하지 않는 never 타입으로 표현된다. -> 아무런 값도 할당 할 수 없다.
 */


// 공집합이기에 아무런 값도 할당 할 수 없다.
// let a: never = 'test';

// 그 다음으로 작은 집합은 unit 타입이라고도 불리는 리터럴 타입이다.
type A1 = 'A';
type B1 = 'B';
type Twelve = 12;

// 두 개 혹은 세개로 묶으려면 유니온(union) 타입을 사용한다.
type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;

// 다양한 타입스크립트 오류에서 "~할당 가능한"이라는 문구를 볼 수 있다.
// 이 문구는 집합의 관점에서 '~의 원소' 또는 '~의 부분집합'을 의미한다.
const aa: AB = 'A'; // ok
// const bb: AB = 'C'  // fail: 'C'는 AB타입에 할당 불가능
const ab: AB = Math.random() < 0.5 ? 'A' : 'B'; // ok
const ab12: AB12 = ab;  // ok 'A' 혹은 'B'는 AB12의 부분집합이므로 정상


// 인터페이스로 원소를 서술하는 방법
interface Identified {
    id: string;
}


//  인터섹션 타입 이해
interface IPerson {
    name: string;
}

interface ILifespan {
    // name: string;
    birth: Date;
    death: Date;
}

// &(타입 연산자)는 두 타입의 교집합을 계산한다.
// 두 인터페이스가 공통으로 가지는 속성이 없기에 공집합(never)으로 생각 할 수 있지만, 타입연산자는 인터페이스의 속성이아닌 값의 집합에 적용된다.
// 그렇기에 Person과 Lifespan의 속성을 모두 가지는 값은 인터섹션 타입에 속할 수 있다.
type PersonSpan = IPerson & ILifespan;
type PersonSpanUnion = IPerson | ILifespan;

// 인터섹션 타입의 값은 각 타입내의 속성을 모두 포함하는 것이 일반적인 규칙이다.
const ps: PersonSpan = {
    name: 'john',
    birth: new Date('1992/12/29'),
    death: new Date('1991/11/11')
}

// IPerson 인터페이스와 ILifespan 인터페이스의 속성들중 하나만 있어도 ok
const ps2: PersonSpanUnion = {
    name: ''
}

// 두 인터페이스의 유니온에서는 그렇지 않다.
// 두 인터페이스에 중복되는 속성이 없으면 never 타입으로 취급된다.
type K = keyof (IPerson | ILifespan);

// never 타입으로 값의 할당은 불가하다.
// const psUnion: K = {}; // error: Type '{}' is not assignable to type 'never'


// 정리하자면,,
// keyof(A & B) = (keyof A) | (keyof B)
// keyof(A | B) = (keyof A) & (keyof B)


// 조금 더 일반적으로 PersonSpan 타입을 선언하는 방식은 extends 키워드를 사용하는 것
// PersonSpan2 타입의 모든 값은 문자열 name 속성을 가져야 한다. 그리고 birth 속성을 가져야 부분집합이 될 수 있다.
interface IPerson2 {
    name: string;
}

interface PersonSpan2 extends IPerson2 {
    birth: Date;
    death: Date;
}


// 할당과 상속의 관점을 집합관점으로 보면 보다 이해하기 쉽다.
interface Point {
    x: number;
    y: number;
}

type PointKeys = keyof Point;

// K(x 혹은 y)는 keyof T(keyof Point === Pointkeys)의 부분집합이다.
function sortBy<T, K extends keyof T>(vals: T[], key: K) {
    // ...
    console.log(vals);
    console.log(key);
}

const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 0}];
sortBy(pts, 'x');
sortBy(pts, 'y');
// sortBy(pts, 'z');   // error