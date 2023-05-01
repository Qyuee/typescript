/**
 * 구조적 타이핑에 익숙해지기
 * - 덕타이핑: 객체가 어떤 타입에 부합하는 변수와 메소드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식
 * ex) 만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거리는 소리는 낸다면 그 새를 '오리'로 간주한다.
 */
// 벡터 길이 계산
// 메서드는 Vector2D 타입의 매개변수를 받아들인다.
function calculateLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
var v = { name: 'Zee', x: 3, y: 4 };
// Vector2D가 아닌 NamedVector 타입으로 매개변수를 전달하여도 정상실행
// NamedVector는 Vector2D의 x, y 속성을 포함하기에 Vector2D에 호환된다.
// 그렇기에 아래 메서드를 호출하는데 문제가 없다. (덕 타이핑 때문에 가능)
calculateLength(v);
// 정규화 처리
function normalize(v) {
    var length = calculateLength(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };
}
console.log(normalize({ x: 3, y: 4, z: 5 }));
