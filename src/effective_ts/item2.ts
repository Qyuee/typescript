
// Implicit: 암시적
// explicit: 명시적

// noImplicitAny 설정: 타입을 명확하게 명시해야한다. (false인 경우 타입 추론을 하지 않음)
function add(a: number, b: number) {
    return a + b;
}

console.log(add(10, 20));


// stricNullChecks: null과 undefinded가 모든 타입에서 허용되는지 확인하는 설정
// JS를 마이그레이션하거나 TS에 익숙한 경우 설정하지 않아도 되지만 undefineded는 객체가 아니라는 에러가 발생할 수 있다.
// 새로운 프로젝트를 시작하는 경우 가급적 설정하여 시작 할 것.
const x: number = null; // error
const y: number | null = null; // 명시적으로 'null'이 가능하다고 표기해야 error 회피가능