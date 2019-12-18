// 1. 扩展运算符
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
// ES5 的写法
function f(x, y, z) {
    // ...
}
var args = [0, 1, 2];
f.apply(null, args);
// ES6的写法
function f (x, y, z) {
    // ...
}
let args = [0, 1, 2];
f(...args);

Math.max.apply(null, [14, 2, 7])
Math.max(...[14, 2, 7])
Math.max(14, 2, 7)

// 通过push函数，将一个数组添加到另一个数组的尾部
// ES5 的写法
var arr1 = [0, 1, 2]
var arr2 = [3, 4, 5]
Array.prototype.push.apply(arr1, arr2)

// ES6的写法
arr1.push(...arr2);
// ES5 写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。

// ES5 写法
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6 写法
new Date(...[2015, 1, 1])

// 扩展运算符的应用
// (1) 复制数组
// 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
// ES5 只能用变通方法来复制数组
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

// 扩展运算符提供了复制数组的简便写法
const a1 = [1, 2]
const a2 = [...a1]
const [...a2] = a1

// (2) 合并数组
// 扩展运算符提供了数组合并的新写法。
let arr1 = [1, 2]
let arr2 = [3, 4]
let arr3 = [5, 6]

// ES5 的合并数组
arr1.concat(arr2, arr3)
// ES6 的合并数组
[...arr1, ...arr2, ...arr3]

//  不过，这两种方法都是浅拷贝，使用的时候需要注意
const a1 = [{ a1: 1 }]
const a2 = [{ a2: 2 }]

const a3 = a1.concat(a2)
const a4 = [...a1, ...a2]

a3[0] === a4[0] // true
// 上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，
// 这就是浅拷贝。如果修改了原数组的成员，会同步反映到新数组。

// (3) 与解耦赋值结合
// 扩展运算符可以与解构赋值结合起来，用于生成数组。
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

// (4) 字符串
// 扩展运算符还可以将字符串转为真正的数组
[...'hello']
// [ "h", "e", "l", "l", "o" ]
// 上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

// 上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，
// 采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写
function length (str) {
    return [...str].length
}
length('x\uD83D\uDE80y') // 3

// 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
let str = 'x\uD83D\uDE80y';
str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'
[...str].reverse().split('')
// "y🚀x" // 'y\uD83D\uDE80x'

// (5) 实现了 Iterator 接口的对象
// 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
//上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。
// 这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。

Number.prototype[Symbol.iterator] = function*() {
    let i = 0
    let num = this.valueOf()
    while (i < num) {
        yield i++
    }
}

console.log([...5]) // [0, 1, 2, 3, 4]
// 上面代码中，先定义了Number对象的遍历器接口，扩展运算符将5自动转成Number实例以后，
// 就会调用这个接口，就会返回自定义的结果

// 对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
  
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];

// 上面代码中，arrayLike是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。
// 这时，可以改为使用Array.from方法将arrayLike转为真正的数组。

// (6) Map, Set 结构，Generator 函数
// 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
])
let arr = [...map.keys()] // [1, 2, 3]

// Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
let ge = function*() {
    yield 1;
    yield 2;
    yield 3;
};
[...ge()] // [1, 2, 3]
// 上面代码中，变量ge是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

// 如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。
const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))


// 2. Array.from()
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5 的写法
[].slice.call(arrayLike) // ["a", "b", "c"]
// ES6 
Array.from(arrayLike)

// 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，
// 以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。

// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

//上面代码中，querySelectorAll方法返回的是一个类似数组的对象，可以将这个对象转为真正的数组，再使用filter方法。

// 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
Array.from('hello') // ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 上面代码中，字符串和 Set 结构都具有 Iterator 接口，因此可以被Array.from转为真正的数组。

// 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。

Array.from([1, 2, 3])
// [1, 2, 3]

// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
// arguments对象
function foo() {
    const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]

// 扩展运算符背后调用的是遍历器接口(Symbol.iterator), 如果一个对象没有部署这个接口，就无法转换。
// Array.form方法 还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有 length 属性
// 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换
Array.from({ length: 3});
// [undefined, undefined, undefined]
// 上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。

// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
const toArray = (() =>
    Array.from ? Array.from : obj => [].slice.call(obj))();
// Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x)
// 等同于
Array.from(arrayLike).map(x => x * x)

Array.from([1, 2, 3], x => x * x);
// [1, 4, 9]

// 下面的例子是取出一组 DOM 节点的文本内容。
let spans = document.querySelectorAll('span.name')
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent)
// Array.from()
let names2 = Array.from(spans, s => s.textContent)

// 下面的例子将数组中布尔值为false的成员转为0。
Array.from([1,,2,,3], n => n || 0)
// [1, 0, 2, 0, 3]

// 返回各种数据的类型
function typesOf() {
    return Array.from(arguments, value => typeof value)
}
typesOf(null, [], undefined, NaN, 1, '2', false)
["object", "object", "undefined", "number", "number", "string", "boolean"]

// 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

// Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，
// 只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法

Array.from({ length: 2}, () => 'jack')
// ["jack", "jack"]
// 上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

// Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
// 因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。

function countSymbols(string) {
    return Array.from(string).length
}

// 3. Array.of()
// Array.of() 方法用于将一组值，转换为数组
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
// 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

// 上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。
// 只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。
// 参数个数只有一个时，实际上是指定数组的长度。

// Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
// Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

// Array.of方法可以用下面的代码模拟实现。
function ArrayOf() {
    return [].slice.call(arguments)
}

// 4. 数组实例的 copyWithin()
// 数组实例的copyWithin()，在当前数组内部，将指定位置的成员复制到其他位置(会覆盖原有成员)，然后返回当前数组。
// 也就是说，使用这个方法，会修改当前数组。
Array.prototype.copyWithin(target, start = 0, end = this.length)

//它接受三个参数。
// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
// 这三个参数都应该是数值，如果不是，会自动转为数值。

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
// 上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。








