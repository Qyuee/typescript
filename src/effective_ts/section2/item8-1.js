// 타입 공간과 값 공간을 잘 구분해야한다.
// type, interface 다음에 나오는 심벌은 타입 공간이고, let/const 뒤에 나오는 심벌은 값 공간이다.
// 구분하는 방법중 하나는 컴파일된 결과물에서 타입공간에 해당하는 심볼은 변환과정에서 제거된다.
var p = { first: 'Jane', last: 'Jacobs' };
// 결과: var p = { first: 'Jane', last: 'Jacobs' };
function email(p, subject, body) {
}
