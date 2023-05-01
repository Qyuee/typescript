/**
 * 타입 공간과 값 공간의 심벌 구분하기
 * - TS의 Symbol은 타입공간이나 값 공간 중의 한곳에 존재한다. 심벌은 이름이 같더라도 속하는 공간에 따라 다른 것을 나타낼 수 있다.
 */

interface Cylinder {    // 타입
    radius: number;
    height: number;
}

// 인터페이스 Cylinder와 값 Cylinder는 아무런 관련이 없다.
// 상황에 따라서 Cylinder는 값으로 사용 될 수도 있고 타입으로 사용 될 수도 있다.
const Cylinder = (radius: number, height: number) => ({radius, height});    // 값

// 위와 같은 상황이 의도치않은 오류를 발생 시킬 수 있다.
function calculateVolume(shape: unknown) {
    // instanceof를 사용하여 shape의 타입이 'Cylinder'인지 확인
    // 하지만, instanceof는 JS 런타임 연산자이기에 값에 대한 연산을 한다. 그렇기에 instanceof Cylinder는 타입이 아니라 함수를 참조하게 된다.
    if (shape instanceof Cylinder) {
        shape.radius;   // error: Property 'radius' does not exist on type '{}'
    }
}