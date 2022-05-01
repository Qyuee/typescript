class Person {
    name: string;   // 프로퍼티를 사전 선언하여야 한다.

    // 생성자 - 클래스 및 프로퍼티 초기화
    constructor(name: string) {
        this.name = name;
    }

    walk() {
        console.log(`${this.name} is walking`);
    }
}

const jone = new Person('dslee03');
jone.walk();

/**
 * 접근제어자
 * - 클래스 기반 객체지향 언어가 지원하는 접근 제어자 (public, private, protected)를 지원한다. 의미 또한 동일
 * 단, 접근제어자를 지정하지 않는 경우 일반적으로 protected로 지정되어서 패키지 레벨로만 공개되지만, typescript에서는 public으로 지정된다.
 */
class Foo {
    public x: string;
    protected y: string;
    private z: string;
    constructor(x: string, y: string, z: string) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const foo = new Foo('hello', 'world', 'seoul');

// public 접근 제어자는 클래스 인스턴스를 통해서 클래스 외부에서 접근이 가능하다.
foo.x;

//@ts-ignore
// protected 접근 제어자는 클래스 인스턴스를 통해서 접근 할 수 없다.
// Foo class를 상속받은 sub-class내부에서만 접근 가능하다.
foo.y;

//@ts-ignore
// private 접근 제어자는 클래스 인스턴스를 통해서 접근 할 수 없다.
// 자식 클래스에서도 접근 할 수 없다.
foo.z;


class Bar extends Foo {
    constructor(x: string, y: string, z: string){
        super(x, y, z);

        console.log(this.x);
        console.log(this.y);
        // @ts-ignore
        console.log(this.z); // z는 private이므로 자식클래스에서도 접근 불가
    }
}


// 접근제어자가 설정된 생서자 파라미터는 암묵적으로 클래스 프로퍼티로 선언되고 생성자 내부에서 별도의 초기화 없이 암묵적으로 초기화된다.
class Foo2 {
    // 생성자 파라미터에 접근제어자가 있으면 암묵적으로 초기화
    // 없으면 생서자 내부의 지역변수로써만 사용가능
    constructor(public x: string, y: string) {}
}

const foo2 = new Foo2("helloworld", 'dslee03');
console.log(foo2);      // Foo2 { x: 'helloworld' }
console.log(foo2.x);    // 별도의 초기화가 없었지만 생성자 내부에서 암묵적으로 초기화됨


// readOnly 키워드
// 해당 키워드가 선언된 클래스 프로퍼티는 생성자 내부에서만 값을 할당할 수 있다.
// 그 외의 경우에는 값을 할당할 수 없고, 오직 읽기만 가능하다. 이를 사용하여 상수선언에 사용한다.
class Bar2 {
    private readonly MIN_NUM: number = 1;
    private readonly MAX_NUM: number = 1000;
    private readonly NAME: string;

    // 생성자에서만 readonly 프로퍼티를 수정 할 수 있다.
    constructor(public str: string){
        this.NAME = str;
    }

    // 생성자외에서는 readonly 프로퍼티를 수정할 수 없다.
    logging() {
        //@ts-ignore - error TS2540: Cannot assign to 'MIN_NUM' because it is a read-only property.
        this.MIN_NUM = 1000;

        console.log(`NAME: ${this.NAME}, MIN_NUM: ${this.MIN_NUM}`);
    }
}

const bar2 = new Bar2('TEST');
bar2.logging();