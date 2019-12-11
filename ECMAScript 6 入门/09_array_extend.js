// spread
console.log(...[1, 2, 3]);
// 1 2 3
console.log(1, ...[2, 3, 4], 5);
// 1 2 3 4 5
[...document.querySelectorAll('div')]
// [<div>]
// 该运算符主要用于函数调用
function push(array, ...items) {
    array.push(...items);
}

function add(x, y) {
    return x + y;
}
let numbers = [1, 100];
add(...numbers);
// 101
// 上面的扩展运算符将一个数组，变为参数序列

// 扩展运算符与正常的函数参数可以结合使用
function f(v, w, x, y, z) {}
const args = [0, 1];
f(-1, ...args, 2, ...[3]);

// 扩展运算符后面还可以放置表达式
const arr = [
    ...(x > 0 ? ['a'] : []),
    'b'
];
// 扩展运算符后面是空数组，则不产生任何效果。
[...[], 1]
// [1]
// 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错
(...[1, 2])
// Uncaught SyntaxError: Unexpected token ...
console.log((...[1,2]));
// VM3965:1 Uncaught SyntaxError: Unexpected token ...
console.log(...[1, 2]);
// 1 2

// 扩展运算符替代 apply 方法
function f(x, y, z) {
    // ...
}
var args = [0, 1, 2];
f.apply(null, args);







