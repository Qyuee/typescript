// 함수
function sum(a: number, b: number): number {
    return a+b;
}

const sum2 = (a: number, b: number): number => {
    return a+b;
}

// 함수를 정의하는 가장 단순한 방법
// void는 해당 함수가 반환값이 없는 함수임을 의미한다.
function greeter(fn: (a: string) => void) {
    fn("Hello world!");
}

function printToConsole(s: string | number) {
    console.log(s);
}
greeter(printToConsole);

// 함수는 type으로 정의할 수 있다.
type GreetFunction = (a: string) => void;
type GreetFunction2 = (a: number) => void;

function greeter2(fn: GreetFunction) {
    fn("hello world2!!");
}

function greeter3(fn: GreetFunction2) {
    fn(100);
}

greeter2(printToConsole);
greeter3(printToConsole);

/**
 * Call signature
 * type을 사용하여 함수를 정의하는 새로운 방법
 * 하지만, 모양이 다르다. => 대신에 :을 사용한다.
 */
type DescriableFunction = {
    description: string;
    (someArg: number): boolean;
}
function doSomething(fn: DescriableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

// type내의 함수를 재정의하여 doSomething에 인자로써 객체를 전달
const fn = function(n: number) {
    return n+1 > 1;
};
fn.description = 'BLACK';
doSomething(fn);


//------------------------------------------------------------
interface Func0<T> {
    (arg: T): boolean;    // call signature (함수)
    prop1: T;       // 추가적인 property
}
const num: Func0<number> = (num) => true;
num.prop1 = 10;
console.log(num(1));
console.log(num.prop1);


// number 타입으로 Func0 인터페이스를 활용하여 오버로딩
function Func0_0(fn: Func0<number>) {
    console.log(fn.prop1 + " returned: "+ fn(100));
}
const Func0_fn = (n: number) => {
    return 10 < n;
}
Func0_fn.prop1 = 123;   // 추가적인 property를 정의하지 않으면 에러가 발생함
Func0_0(Func0_fn);

//------------------------------------------------------------
// type alias로 함수정의하기
type Func<T> = (str: T) => T;
const func: Func<string> = (str) => {
    return str;
}
console.log(func('hello'));

//------------------------------------------------------------
// type alias로 정의된 함수에 추가적인 property가 있는 경우 정의 가능
type Func2<T> = {
    (str: T): T;
    validation: (str: T) => boolean;
    id: string;
}

const func2: Func2<string> = (str) => {
    return str;
}

func2.id = '1';
func2.validation = () => true;
func2('hi');

// Generic
// 두 값 사이의 연관성을 설명하고 싶을 때, generics를 사용 할 수 있다.
// type을 사용하여 input 파라미터 arr과 리턴 Type을 연결하였다.
// firstElement의 Type이 number이므로 입력파라미터도 number[]이여야하고 리턴 Type도 number으로 결정된다.
function firstElement<Type>(arr: Type[]): Type {
    return arr[0];
}
console.log(firstElement<number>([1,2,3,4]));

// 두 개 이상의 type 파라미터를 추가할 수 있다.
function generics1<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}
// 첫번째 파라미터인 arr을 통해서 Input의 타입을 추론하고, 두번째 파라미터인 func를 통해서 Output도 추론한다.
console.log(generics1([1,2,3,4], (n) => n+1));

// generic을 arrow function 형태와 함께 사용하기
const firstElementWithArrow = <Type>(arr: Type[]): Type => {
    return arr[0];
}
console.log(firstElementWithArrow([1,2,3,4])); // 1

const generics1WithArrow = <Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] => {
    return arr.map(func);
}
console.log(generics1WithArrow([1,2,3,4], (n) => n + 2));


const generics2WithArrow = <Input, Output>(arr: Input[], func: (arg: Input) => Output) : Input[] => {
    return arr.filter(func);
}
console.log(generics2WithArrow(['1123', '2'], (n) => n.length > 3));
