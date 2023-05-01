/**
 * 구조적 타이핑에 익숙해지기
 * - 덕타이핑: 객체가 어떤 타입에 부합하는 변수와 메소드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식
 * ex) 만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거리는 소리는 낸다면 그 새를 '오리'로 간주한다.
 * 
 * 요약
 * - TS의 타입은 봉인되어 있지 않다. -> 어떤 속성이든지 가질 수 있다.
 * - 구조적 타이핑을 사용하면 유닛 테스팅을 손쉽게 할 수 있다.
 */

interface Vector2D {
    x: number;
    y: number;
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

// 벡터 길이 계산
// 메서드는 Vector2D 타입의 매개변수를 받아들인다.
function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

const v: NamedVector = {name: 'Zee', x: 3, y: 4};

// Vector2D가 아닌 NamedVector 타입으로 매개변수를 전달하여도 정상실행
// NamedVector는 Vector2D의 x, y 속성을 포함하기에 Vector2D에 호환된다.
// 그렇기에 아래 메서드를 호출하는데 문제가 없다. (덕 타이핑 때문에 가능)
calculateLength(v);

// 하지만, 이 '덕 타이핑' 때문에 구조적인 문제가 발생하기도 한다.
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

// 정규화 처리
function normalize(v: Vector3D) {
    const length = calculateLength(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    }
}

// 타입오류가 없다. 하지만 결과는 예상과 다르다.
// Vesctor3D가 위와 동일하게 Vector2D으로 호환되면서 올바른 계산에 z가 무시됨
// 이런 경우를 오류로 처리하기 위한 설정도 별도로 존재하긴 함
console.log(normalize({x: 3, y:4, z: 5}));


// 함수를 작성 할 때, 호출에 사용되는 매개변수 속성들이 타입에 선언된 속성만 가질 것이라고 생각하기 쉽다.
// 이러한 타입은 봉인된(sealed) 혹은 정확한(precise)타입이라고 하며, TS 타입 시스템에서는 표현 할 수 없다.
// TS는 좋든 싫든 타입에 열려(open)있다.

// axis는 "x", "y", "z"중에 하나로 예상되기에 문제가 없을것이라고 생각했지만 아니다.
// v는 어떠한 속성이드 가질 수 있기 때문에 axis의 타입은 string이 될 수도 있다. 그렇기에 TS가 오류로 인식한 것이 맞는 동작이다.
function calculateLenghtV1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis];
        length += Math.abs(coord);
    }
}