// 명시적 서브타이핑
type Food = {
    protein: number;
    carbohydrates: number;
    fat: number;
};

function claculateCalorie(food: Food) {
    return food.protein * 4
        + food.carbohydrates * 4
        + food.fat * 9;
}

// 상속 관계 명시한 경우
// Buger 타입은 Food 타입의 속성과 주어진 bugerBrand 속성을 모두 가지는 인터섹션 타입이다.
type Buger = Food & {
    bugerBrand: string;
};

const buger: Buger = {
    protein: 29,
    carbohydrates: 48,
    fat: 13,
    bugerBrand: '버거킹'
};

// buger는 Food 타입을 상속한 Buger 타입이므로 타입검사 통과 가능
const calorie = claculateCalorie(buger);


// 구조적 서브타이핑 (별도의 상속관계를 명시하지 않았다.)
// 다만, Food 타입으로써 가져야하는 protein, carbohydrates, fat 속성을 모두 가지고 있다.
const buger2 = {
    protein: 29,
    carbohydrates: 48,
    fat: 13,
    bugerName: '버거킹'
};

// 타입검사를 통과 할 수 있다.
// buger2는 명시적으로 Food 타입이라고 어디에도 선언하지 않았다.
// buger2의 객체의 프로퍼티가 calculateCalorie()를 호출하는데 문제가 없다. (모든 필요한 속성을 가지고 있으므로)
// Type Checker가 이를 지원해준다.
const calorie2 = claculateCalorie(buger2);


// 하지만 아래의 코드는 타입 오류가 발생한다.
// Argument of type '{ protein: number; carbohydrates: number; fat: number; bugerBrand: string; }'
// is not assignable to parameter of type 'Food'.
const calorie3 = claculateCalorie({
    protein: 29,
    carbohydrates: 48,
    fat: 13,
    bugerBrand: '버거킹'
});

// TS는 기본적으로 '구조적 서브타이핑'을 지원하지만 예외 상황이 있다.
// 함수의 매개변수에 인자를 바로 전달하는 경우이다. 이는 Fresh Literal인 객체가 바로 전달된 경우이다.

/*
 Fresh Literal이란?
 모든 Object literal은 초기에 fresh하다고 간주되고 '타입단언(as string과 같은)' 혹은 '타입 추론'에의해 타입이 확장되면
 fresh하지 않다고 판단한다.

 즉, 매개변수를 통해서 전달된 object는 별도의 타입단언 혹은 타입추론이 발생하지 않기에 fresh한 상태이다.
 TypeScript에서는 fresh한 object literal이 매개변수에 전달되는 경우 타입을 호환하지 않는것으로 결정했다고 한다.

 이유
 - 코드를 읽는 다른 개발자가 오해 할 가능성이 높다.
 - bugerBrand 속성대신에 오타에 의한 다른 속성이 전달되어도 호환오류가 발생하지 않는다. (오류 탐지 불가능 현상)
*/

// fresh object에 대해서 타입호환을 허용하는 방식이 존재한다.
// - 함수 매개변수 타입에 index signature를 포함시켜두어 명시적으로 타입 호환을 허용
type Food2 = {
    protein: number;
    carbohydrates: number;
    fat: number;
    [x: string]: any;   /* index signature */
}

function claculateCalorie2(food: Food2) {
    return food.protein * 4
        + food.carbohydrates * 4
        + food.fat * 9;
}

// bugerBrand 속성이 포함된 매개변수가 바로 전달된다.
const calorie4 = claculateCalorie2({
    protein: 29,
    carbohydrates: 48,
    fat: 13,
    bugerBrand: '버거킹'
});


type Brand<K, T> = K & {  __brand: T };
type Food3 = Brand<{
    protein: number;
    carbohydrates: number;
    fat: number;
}, 'Food'>

const buger3 = {
    protein: 100,
    carbohydrates: 100,
    fat: 10,
    bugerBrand: '버거킹',
};

function claculateCalorie3(food: Food3) {
    return food.protein * 4
        + food.carbohydrates * 4
        + food.fat * 9;
}

// Argument of type '{ protein: number; carbohydrates: number; fat: number; bugerBrand: string; }' is not assignable to parameter of type 'Food3'.
// Property '__brand' is missing in type '{ protein: number; carbohydrates: number; fat: number; bugerBrand: string; }' but required in type '{ __brand: "Food"; }'.
claculateCalorie3(buger3);