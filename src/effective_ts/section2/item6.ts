/**
 * 타입스크립트의 타입 시스템
 * - 편집기가 제공하는 기능을 최대한 활용하자.
 */

const response = fetch('http://example.com');

type A = string | number;
declare const A2 : string | number;