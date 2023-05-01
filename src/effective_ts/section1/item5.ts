/**
 * any 타입 지양하기
 * -> 최대한 사용을 피하자. 단, 사용해야하는 경우가 있을수도 있다. 이러한 경우는 추후에 알아보자
 */

let age: number;
// age = '12'; // error: Type 'string' is not assignable to type 'number'.
age = '12' as any;  // ok

// 컴파일 결과 -> 타입의 안정성이 전혀 없다.
// var age;
// age = '12'; // ok


// any 타입에는 타입 안정성이 없다.
// any는 함수 시그니처를 무시한다.
// 시그니처(constract) - 함수를 호출하는 쪽은 약속된 타입의 입력을 제공해야하고 함수는 약속된 타입의 출력을 반환해야한다.
function calculateAge(birthDate: Date): number {
    // Date 타입의 입력을 받고 number타입의 출력을 한다.
    // ...
    return 0;
}

let birthDate: any = '1992-ts-test';
calculateAge(birthDate);    // 올바른 형태가 아니지만 정상으로 인식된다. 메소드 내부로직에 따라 오류가 발생 할 가능성이 있다.

// any 타입에는 언어 서비스가 제공되지 않는다.
let person: any = { first: 'jone', last: 'label' };

// any는 타입 설계를 감춰버린다.

// any는 타입시스템의 신뢰도를 떨어뜨린다.