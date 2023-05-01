// 타입연산을 사용하여 런타임에 아무런 영향을 주지 못한 예
// function asNumber(val: number | string): number {
//     return val as number;
// }
// JS 연산을 통해 런타임에 정제과정을 올바르게 적용한 예
function asNumber2(val) {
    return typeof (val) === 'string' ? Number(val) : val;
}
