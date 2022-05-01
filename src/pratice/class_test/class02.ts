/**
 * 추상클래스 - 하나 이상의 추상 메소드를 포함하며 일반 메소드도 포함 할 수 있다.
 * 추상메소드는 내용이 없이 메소드의 이름과 타입만이 선언된 메소드를 말한다. 선언 시, abstract를 사용한다.
 * abstract 키워드가 있는 경우 직접 인스턴스화를 생성할 수 없고, 상속만을 위해서 사용된다.
 * 추상 클래스를 상속한 클래스는 반드시 추상클래스의 메소드를 구현해야 한다.
 */

abstract class Book {
    constructor(private author: string, private title: string) {}

    // common methods
    public getBookTitle() {
        return this.title;
    }

    public getBookAuthor() {
        return this.author;
    }

    // 구현체가 없는 추상메소드
    abstract getBookType(): string;
}

class SfBook extends Book {
    constructor(author: string, title: string, public price: number) {
        super(author, title);   // 상위 클래스 생서자
    }

    public getPrice(): number {
        return this.price;
    }

    getBookType(): string {
        return "SF";
    }
}

const sf1 = new SfBook('dslee03', 'starwars', 1000);
console.log(`author: ${sf1.getBookAuthor()}, title: ${sf1.getBookTitle()}, price: ${sf1.getPrice()}, type: ${sf1.getBookType()}`);
