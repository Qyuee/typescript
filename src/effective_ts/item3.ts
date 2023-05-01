
/**
 * 주제: 코드의 생성과 타입이 관계없음을 이해하기
 * 
 * 타입스크립트 컴파일러의 역할
 * - 최신 TS/JS를 브라우저에서 동작 할 수 있도록 구버전의 JS로 트랜스파일 한다.
 * - 타입 오류 체크
 */

// 오류가 있는 코드도 컴파일 될 수 있다.
// - "noEmitOnError" 옵션을 설정하여 타입체크 오류가 있는 경우 컴파일이 되지 않도록 설정 가능
// let x = 'hello';    // Cannot redeclare block-scoped variable 'x'.
// x = 1234;           // Cannot assign to 'x' because it is a constant.

// 런타임에는 타입 체크가 불가능하다.
interface Square {
    width: number;
}

interface Rectangle extends Square {
    height: number;
}

type Shape = Square | Rectangle;

function calc(shape: Shape) {
    // instanceof 체크는 런타임에 발생한다.
    // Rectangle은 타입이기에 런타임 시점에는 아무런 역할을 할 수 없다.
    // if (shape instanceof Rectangle) {
    //     return shape.width * shape.height;
    // } else {
    //     return shape.width * shape.width;
    // }

    // shape 타입을 명확하게 하려면 런타임에 타입정보를 유지하는 방법이 필요함
    // 대안1 - height 속성이 존재하는지 체크
    shape.height; // error
    if ('height' in shape) {
        shape;
        shape.height; // ok
        return shape.width * shape.height;
    } else {
        shape;
        shape.width;
        return shape.width * shape.width;
    }
}


// 대안2 - 런타임에 접근가능한 타입정보를 명시적으로 저장 (태크 기법)
interface Square2 {
    kind: 'square',
    width: number,
}

interface Rectangle2 {
    kind: 'rectangle',
    height: number,
    width: number
}

type Shape2 = Square2 | Rectangle2;

function cacl2(shape: Shape2) {
    if (shape.kind === 'rectangle') {
        shape;
        shape.height;
        shape.width;
        return shape.width * shape.height;
    } else {
        shape;
        shape.width;
        return shape.width * shape.width;
    }
}

// 대안3 - 타입(런타임에 접근 불가)과 값(런타임에 접근 가능)을 둘 다 사용하는 방법
// 타입을 클래스로 만든다.
class Square3 {
    constructor(public width: number) {}
}

class Rectangle3 extends Square3 {
    constructor(public width: number, public height: number) {
        super(width);   // 참조 class 생성자 초기화
    }
}

type Shape3 = Square3 | Rectangle3;

function calc3(shape: Shape3) {
    if (shape instanceof Rectangle3) {
        shape;
        return shape.width * shape.height;
    } else {
        return shape.width * shape.width;
    }
}


// 타입 연산은 런타임에 영향을 주지 않는다.
// string 또는 number 타입인 값을 항상 number로 정제하는 경우
function asNumber(val: number | string): number {
    return val as number;
}

// 컴파일 후
// function asNumber(val) {
//     return val;
// }

// as number는 타입연산이다. -> 런타임에 아무런 영향이 없다.
// 값을 정제하기 위해서는 런타임의 타입을 체크해야하고 JS 연산을 통해서 변환을 수행해야 한다.


// 런타임 타입은 선언된 타입과 다를 수 있다.

// 타입으로는 함수를 오버로드 할 수 없다.
// 하나의 함수에 대해서 여러개의 선언문을 작성 할 수 있지만, 구현체는 오직 하나뿐