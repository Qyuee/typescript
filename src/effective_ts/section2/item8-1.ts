// 타입 공간과 값 공간을 잘 구분해야한다.
// type, interface 다음에 나오는 심벌은 타입 공간이고, let/const 뒤에 나오는 심벌은 값 공간이다.
// 구분하는 방법중 하나는 컴파일된 결과물에서 타입공간에 해당하는 심볼은 변환과정에서 제거된다.

interface Person3 {
    first: string;
    last: string;
}

const p: Person3 = { first: 'Jane', last: 'Jacobs' };
// 결과: var p = { first: 'Jane', last: 'Jacobs' };

function email(p: Person3, subject: string, body: string): Response {}
// 결과: function email(p, subject, body) {}
// Person3, string, Response 심볼은 모두 타입공간이다.

// class와 enum은 모두 상황에 따라 타입과 값 두 가지 가능한 예약어이다.

class Cylinder2 {
    radius=1;
    height=1;
    test = (): number => { return 0; }

    constructor() {
        console.log('생성자 called..');
    }
}

// class가 타입으로 쓰일 때는 형태(속성과 메소드)가 사용되는 반면에 값으로 쓰이 때는 생성자가 사용된다.
function calculateVolume(shape: unknown) {
    if (shape instanceof Cylinder2) {
        shape;          // 정상, 타입은 Cylinder2
        shape.radius    // 정상, 타입은 number
        shape.test      // 정상, 타입은 ?
    }
}
calculateVolume(new Cylinder2());

// 연산자 중에는 타입에서 사용될 때와 값에서 사용 될 때 다른 기능을 하는 예약어들이 있음 -> typeof

type T1 = typeof p; // 값을 읽어서 타입스크립트의 타입을 반환, type T1 = Person3
type T2 = typeof email; // type T2 = (p: Person3, subject: string, body: string) => Response

const v1 = typeof p;    // object
const v2 = typeof email;    // function


// 구조분해할당