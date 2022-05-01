/**
 * Generic
 * 무엇인가?
 * - 제네릭은 어떠한 클래스 혹은 함수에서 사용할 타입을 그 함수나 클래스를 사용하는 시점에 결정하는 프로그래밍 기법
 *
 * 무엇이 가능한가?
 * - 기존의 하나의 타입만을 통해 활용하던 함수를 다양한 타입을 지원하도록하여 재사용성이 강화될 수 있다.
 *
 * typescript에서 제네릭?
 * - java와 매우 유사한 것으로 보인다. typescript도 정적타입의 언어이므로 범용성을 위해서 제네릭을 활용할 수 있다.
*/

// 예시1 - any타입을 통해 범용적이지만 데이터가 일관적이지 않은 경우
class Stack {
    private data: any[] = [];
    constructor() {}

    push(item: any): void{
        this.data.push(item);
    }

    pop(): any {
        return this.data.pop();
    }
}
const stack = new Stack();
stack.push(1);
stack.push('a');
console.log(stack.pop().substring(0));  //  'a'
//console.log(stack.pop().substring(0));  // error number 타입인 1에는 substring 함수 지원x
// stack에 저장된 데이터의 타입이 모두 다를 수 있기에 항상 자료형을 검사해야한다. -> 비효율적

// 예시2 - Stack class를 상속하여 특정타입의 데이터만 담을 수 있도록 제한
class NumberStack extends Stack {
    constructor() {
        super();
    }

    push(item: number): void {
        super.push(item);
    }

    pop(): number {
        return super.pop();
    }
}

const stack2 = new NumberStack();
stack2.push(10);
stack2.push(20);

//@ts-ignore
stack2.push('a'); // type이 number가 아니므로 데이터를 담을 수 없다.
// 하지만 타입별로 이렇게 stack을 모두 상속하여 클래스를 구성하기에도 비효율적이다.
// 이 때, 제네릭을 사용하여 클래스에 타입의 유연성을 부여한다.

// 예시3 - 제네릭을 활용한 stack 클래스 구성
class GenericStack<T> {
    private data: T[] = [];
    constructor() {}

    push(item: T): void {
        this.data.push(item);
    }

    pop(): T {
        // pop()의 경우 데이터가 더 이상 없는 경우 undefined를 반환하므로 <T>를 명시하여 형변환
        return <T>this.data.pop();
    }
}

const numberStack = new GenericStack<number>();
numberStack.push(10);
numberStack.pop();
// 이렇게 제네릭을 통해 타입별 stack 클래스 없이 같은 타입의 데이터로만 stack구성이 가능하도록 하였다.

/**
 * 두 개 이상의 타입 변수
 */

// 예시1 - 두 개의 파라미터와 두 개의 반환값을 가지는 함수
function toPair(a: any, b: any): [any, any] {
    return [a, b];
}

// 특정한 타입의 제한없이 함수 호출
toPair(10, 20);
toPair(10, 'a');

// 예시2 - 제네릭 적용
function genericToPair<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

genericToPair<string, string>('a', 'b'); // string, string 형태로 호출
genericToPair<number, string>(1, 'a');  // number, string 형태로 호출
genericToPair('a', 1);  // 추론적 사용한 경우 - 타입을 추론하여 제네릭에 대입한다.

/**
 * 상속된 타입 변수
 * - 타입 변수는 기존에 사용하고 있는 타입을 상속할 수 있다.
 * - 이를 활용하여 입력 받을 변수의 타입을 제한할 수 있다.
 */
function getFirst<T extends GenericStack<U>, U>(container: T): U {
    const item = container.pop();
    return item;
}

const numStack = new GenericStack<number>();
numStack.push(10);
numStack.push(20);
getFirst<GenericStack<number>, number>(numStack)


// 특정 함수를 가지고 있는 타입만 허용하기 - 1
function onlySupportToString<T extends {toString: Function}>(str: T): T {
    console.log(str);
    return str;
}
onlySupportToString('hello');
onlySupportToString(10);
onlySupportToString(true);

//@ts-ignore
onlySupportToString(undefined);   // error
//@ts-ignore
onlySupportToString(null);  // error

onlySupportToString({'test': 10});
onlySupportToString('');

// 특정 함수를 가지고 있는 타입만 허용하기 - 2
function onlySupportLength<T extends {length: number}>(num: T): T[] {
    return Array.from(num);
}

console.log(onlySupportLength('123'));
console.log(onlySupportLength(['123', '456']));

//@ts-ignore
console.log(onlySupportLength(123));    // error



// 강력한 제네릭타입을 통해서 입력되는 값의 타입을 추측하는 것은 좋다.
// 하지만, 모든 타입을 고려하여 함수를 작성하기보단 extends를 사용하여 특정 타입만 지원하도록 한다.

console.log([1,2,3].length);
console.log('123'.length);
//console.log(1.length); // error

function longest<T extends {length: number}>(a: T, b: T) {
    return a.length >= b.length ? a : b;
}
longest([1,2], [1,2,3]);
longest('123', '1234');

//@ts-ignore
longest(1, 23); // error