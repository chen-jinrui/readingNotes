// 函数参数的默认值
// ES5
function log(x, y) {
    y = y || 'world';
    console.log(x, y);
}

log('Hello', 'China');
// Hello China
log('Hello', '')
// Hello World

// 这种写法的缺点是：如果参数数赋值了，但是对应的布尔值为 false ，该赋值不起作用。例如 最后一行代码 参数
// y 等于空字符，结果改为默认值

// 为避免这个问题，需要先判断一下参数是否被赋值。
if ( typeof y === undefined) {
    y = 'World';
}

function log(x, y = 'World') {
    console.log(x, y);
}

log('Hello', '');
// Hello 
log('Hello');
// Hello World

function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
var point = new Point();
point;
// Point {x: 0, y: 0}

// 参数变量是默认声明的，所以不能用 let 或 const 再次声明
function foo(x = 5) {
    let x = 1; // error
    const x = 2; // error
}

// 使用参数默认值时，函数不能有同名参数
function foo(x, x, y) {
    // 不报错
}
function foo (x, x, y = 1) {
    // Uncaught SyntaxError: Duplicate parameter name not allowed in this context
}

// 参数默认值不是传值的，而是每次重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo(p = x + 1) {
    console.log(p);
}
foo();
// 100
x = 100
foo()
// 101
//  参数 p 的默认值是 x + 1。这时，每次调用函数foo，都会重新计算 x + 1，而不是默认 p 等于 100 。

// 参数默认值与解构赋值的默认值结合起来使用
function foo({x, y = 5}) {
    console.log(x, y);
}
foo({});
// undefined 5
foo({x: 1});
// 1 5
foo();
// Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'
// 上面的代码只是用了对象的解构赋值默认值，没有使用函数参数的默认值。如果函数foo调用时没有提供参数，变量 x 和 y 就不会生成，从而报错。
// 通过提供函数参数的默认值，可以避免这种情况
function foo({x, y = 5} = {}) {
    console.log(x, y);
}
foo();
// undefined 5

// 解构赋值默认值
function fetch(url, { body = '', method = 'GET', headers = {} }) {
    console.log(method);
}
fetch('http://example.com', {});
// GET
fetch('http://example.com');
// Uncaught TypeError: Cannot destructure property `body` of 'undefined' or 'null'.
// 如果函数 fetch 的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数。如果结合函数参数的默认值，就可以
// 省略第二个参数。这时，就出现了双重默认值
function fetch (url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method);
}
fetch('http://example.com');
// GET

// 下面的写法有什么差别
// 写法一
function m1({x = 0, y = 0} = {}) {
    console.log([x, y]);
}
// 写法二
function m2({x, y} = { x: 0, y: 0}) {
    console.log([x, y]);
}

m1();
// [0, 0]
m2();
// [0, 0]
m1({})
// [0, 0]
m2({})
// [undefined, undefined]
m1({x: 1});
// [1, 0]
m2({x: 1});
// [1, undefined]
m1({x: 2, y: 5});
// [2, 5]
m2({x: 2, y: 5});
// [2, 5]
m1({z: 4});
// [0, 0]
m2({z: 4});
// [undefined, undefined]

// 第一种写法函数参数的默认值是空对象，但是设置了对象解构赋值的默认值，
// 写法二函数参数的默认值是一个具体属性的对象，但是没有对象解构赋值的默认值

// 参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。可以较容易明确省略了哪些参数。
// 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
function f(x = 1, y) {
    return [x, y];
}
f();
// [1, undefined]
f(2);
// [2, undefined]
f(, 1); // 报错
f(undefined, 1);
// [1, 1]
function f(x, y = 5, z) {
    return [x, y, z];
}
f();
// [undefined, 5, undefined]
f(1, undefined, 2);
// [1, 5, 2]
// 上面代码中，有默认值的参数不是尾参数，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。
// undefined 可以触发默认值，null不会触发。
function foo(x = 5, y = 6) {
    console.log([x, y]);
}
foo(undefined, null);
//  [5, null]

// 函数的 length 属性
// 指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。指定默认值后，length属性将失真。
(function(){}).length
// 0
(function(a, b){}).length
// 2
(function(a, b = 1){}).length
// 1

// length属性的含义是：该函数预期传入的参数个数。某个参数指定默认值后，预期传入的参数个数就不包括这个参数了。
// 同理，rest 参数也不会计入 length 属性
(function(...args){}).length
// 0
// 如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了。
(function(a = 0, b, c){}).length;
// 0
(function(a, b = 0, c){}).length;
// 1

// 作用域
// 一旦设置了参数的默认值，函数进行声明初始化时，函数会形成一个单独的作用域（context）。
// 等到初始化结束，这个作用域就会消失，这种语法行为，在不设置参数默认值时，是不会出现的。
var x = 1;
function f(x, y = x) {
    console.log(y);
}
f(2);
// 2
// 参数 y 的默认值等于变量 x 。调用函数 f 时，参数形成一个单独的作用域。在这个作用域里面，默认变量 y 指向第一个参数 x，所以输出是 2 。

let x = 1;
function f(y = x) {
    let x = 2;
    console.log(y)
}
f();
// 1
// 调用函数 f 时，参数 y = x 形成一个单独的作用域。在这个作用域里面，变量 x 本身没有定义，所以指向外层的全局变量x，
// 函数调用时，函数体内部的局部变量影响不到默认变量x 。

// 如果此时，全局变量 z 不存在，就会报错。
function f(y = z) {
    let z = 2;
    console.log(y)
}
f();
// Uncaught ReferenceError: z is not defined

// 如果参数的默认值是一个函数,该函数的作用域也遵守这个规则
let foo = 'outer';
function bar(func = () => foo) {
    let foo = 'inner';
    console.log(func());
}
bar();
// outer

var x = 1;
function foo(x, y = function() {x = 2;}) {
    var x = 3;
    y();
    console.log(x);
}
foo(); // 3
x; // 1
// 函数 foo 形成了一个单独的作用域。这个作用域里声明了变量x,y,变量y是一个匿名函数，这个匿名函数内部的变量 x 指向同一个作用域的第一个参数x。
// 函数 foo 内部声明的变量 x ，与第一个参数 x 由于不是同一个作用域，所以不是同一个变量。因此执行y后，内部变量x和外部全局变量x的值都没变。
// 如果将 var x 的 var 去除，函数 foo 的内部变量 x 就指向第一个参数x, 与匿名函数的内部 x 是一致的，所以输出是 2。
var x = 1;
function foo(x, y = function() {x = 2;}) {
    x = 3;
    y();
    console.log(x);
}
foo(); // 2
x; // 1

// 利用参数默认值，可以指定某一个参数不得省略。
function throwIfMissing() {
    throw new Error('Missing parameter');
}
function foo(mustBeProvied = throwIfMissing()) {
    return mustBeProvied;
}
foo();
// Uncaught Error: Missing parameter
foo('1');
// '1'

// 可以将参数默认值设为 undefined,表明这个参数是可以省略的
function foo(optional = undefined) { ... }


// rest 参数
// 获取函数的多余参数 代替 arguments 对象。 rest 参数搭配的变量是一个数组，该参数将多余的变量放入一个数组中。
function add(...values) {
    let sum = 0;
    for(let val of values) {
        sum += val;
    }
    return sum;
}
add(1, 2, 3);
// 6

// rest 参数代替 arguments变量的例子
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}
// arguments 对象不是数组，而是一个类似数组的对象，所以为了使用数组的方法，必须使用Array.prototype.slice.call将其转为数组。
// rest 参数就不存在这个问题，它就是一个真正的数组。

// rest 参数的写法
const sortNumbers = (...numbers) => numbers.sort();


// rest 参数改写数组的push方法
function push(array, ...items) {
    for (let item of items) {
        array.push(item);
        console.log(item);
    }
}
var a = [];
push(a, 1, 2, 3);

// rest 参数之后不能再有其他参数，否则会报错，（即 只能是最后一个参数）
function f(a, ...b, c) {

}
// Uncaught SyntaxError: Rest parameter must be last formal parameter

// 函数的 length 属性 不包括 rest 参数
(function(a){}).length;
// 1
(function(...a){}).length;
// 0
(function(a, ...b){}).length;
// 1

// 严格模式
// 从 ES5 开始，函数内部可以设定为严格模式
// ES2016 做了一点修改，规定只要函数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设置为严格模式，否则报错
// 报错
function doSomething(a, b = a) {
    'use strict';
}
// Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
var doSomething = function({a, b}) {
    'use strict';
}
// Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
var doSomething = (...a) => {
    'use strict';
}
// Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
var obj = {
    doSomething({a, b}) {
        'use strict';
    }
}
// Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
// 这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数
// 函数执行的时候，先执行函数参数，然后执行函数体。这样就有一个不合理的地方，只有从函数体中，才能知道参数是否应该以严格模式执行
// 但是参数却应该先于函数体执行

// 两种方法可以规避这种限制。
// 第一种是设定全局性的严格模式，这是合法的
'use strict'
function doSomething(a, b = a) {

}
// 第二种是把函数包在一个无参数的立即执行函数里面
const doSomething = (function() {
    'use strict';
    return function(...values) {

    }
}())


// 函数的 name 属性 返回函数的函数名
function foo() {}
foo.name;
// 'foo'

// 箭头函数
var sum = (num1, num2) => num1 + num2;
var sum = function(num1, num2) {
    return num1 + num2;
}

// 如果箭头函数的代码块部分多余一条语句，就要使用大括号括起来，并且使用return 语句返回
var sum = (num1, num2) => { return num1 + num2;}
// 返回对象，必须在对象外面加括号
let getTempItem = id => ({
    id: id,
    name: 'Temp'
})

// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的语句，就不用写大括号了
let fn = () => void doesNotReturn();

// 箭头函数可以与变量解构结合使用
const full = ({ first, last }) => first + '' + last;
// 等同于
function full(person) {
    return person.first + '' + person.last;
}

const isEven = n => n % 2 === 0;
const square = n => n * n;

// 箭头函数一个用处是 简化回调函数
[1, 2, 3].map(function(x) {
    return x * x;
})
[1, 2, 3].map(x => x * x);

var result = values.sort(function(a, b) {
    return a - b;
})
var result = values.sort((a, b) => a - b);

// rest 函数与箭头函数结合的例子
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5);
// [1, 2, 3, 4, 5]
const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4);
// [1, [2, 3, 4]]

// 注意点
// 1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
// 2. 不可以当做构造函数 不可以使用new命令，否则会抛出一个错误
// 3. 不可以使用 arguments 对象， 该对象在函数体内不存在。如果要用，可以使用 rest 参数代替
// 4. 不能使用 yield 命令，因此箭头函数不能用作 Generator 函数

// this 对象的指向是可变的，但是在箭头函数中,它是固定的。
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100)
}
var id = 21;
foo.call({ id: 42 });
// id: 42

// setTimeout 的参数是一个箭头函数，这个箭头函数的定义生效是在 foo 函数生成时，而它真正执行要等到 100 毫秒后,
// 如果是普通函数，执行时 this 应该指向全局对象 window，这时应该输出 21。 但是，箭头函数导致 this 总是指向函数定义生效时所在的对象，所以输出是42

// 箭头函数可以让 setTimeout 里面的 this, 绑定定义时所在的作用域，而不是指向运行时所在的作用域。
function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function() {
        this.s2++;
    }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1:  3
// s2:  0

// this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this, 导致内部的 this  就是外层代码块的 this。
// 正式应为没有 this 所以也就不能用作构造函数。

// 箭头函数转换成 ES5 
// ES6
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100)
}
// ES5
function foo() {
    let _this = this;
    setTimeout(function() {
        console.log('id:', _this.id);
    }, 100)
}

// 除了 this, 以下三个变量在箭头函数之中也是不存在的，指向外层的对应变量：arguments、super、new.target

// 由于箭头函数没有自己的 this, 所以当然也就不能用 call()、 apply()、 bind()这些方法改变 this 的指向。
(function(){
    return [
        (() => this.x ).bind({ x: 'inner' })()
    ];
}).call({ x: 'outer' });
// ["outer"]

// 上面代码中，箭头函数没有自己的 this, 所以 bind 方法无效， 内部的 this 指向外部的 this。

// 箭头函数不适用的场合
// 第一个场合是定义对象的方法，且该方法内部包含 this
const cat = {
    lives: 9,
    jumps: () => {
        this.lives--;
    }
}

// 第二个场合是需要动态 this 的时候，也不应使用箭头函数
var button = document.getElementById('press');
button.addEventListener('click', () => {
    this.classList.toggle('on');
})
// 上面两种场合下的 this 指向的都是全局对象

// 嵌套的箭头函数
function insert(value) {
    return {
        into: function(array) {
            return {
                after: function(afterValue) {
                    array.splice(array.indexOf(afterValue) + 1, 0, value);
                    return array;
                }
            };
        }
    };
}
insert(2).into([1, 3]).after(1);
// [1, 2, 3]

// 箭头函数改写
let insert = (value) => ({
    into: (array) => ({
        after: (afterValue) => {
            array.splice(array.indexOf(afterValue) + 1, 0, value);
            return array;
        }
    })
})
insert(2).into([1, 3]).after(1);
// [1, 2, 3]

// 部署管道机制（pipeline）的例子 前一个函数的输出是后一个函数的输入
const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val)

const plus1 = a => a + 1;
const mult2 = a => a*2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5);
// 12

// 可读性好些的写法
var plus1 = a => a + 1;
var mult2 = a => a*2;
mult2(plus1(5));
// 12

// 尾调用优化
// 尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数
function f(x) {
    return g(x);
}
// 函数 f 的最后一步是调用另一个函数。
// 以下不属于尾调用
function f(x) {
    return g(x) + 1;
}

function f(x) {
    var y = g(x);
    return y;
}

function f(x) {
    g(x);
}
// 等同于
function f(x) {
    g(x);
    return undefined;
}

// 尾调用不一定出现在函数的尾部，只要是最后一步操作即可
function f(x) {
    if(x > 0) {
        return m(x);
    }
    return n(x);
}
// 上面 m n 都属于尾调用，因为它们都是函数 f 的最后一步操作。

// 函数调用会在内存形成一个'调用记录'，又称'调用帧'(call frame)，保存调用位置和内存变量等信息。
// 如果在函数 A 的内部调用函数 B, 那么在 A 的调用帧上方，还会形成一个 B 的调用帧。等到B运行结束，将结果返回到 A, B 的调用帧
// 才会消失。 如果函数 B 内部还调用函数 C , 那么还有一个 C 的调用帧，以此类推。所有的调用帧，就形成一个‘调用栈’(Call stack)

// 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要
// 直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
}
f();
// 等同于
function f() {
    return g(3);
}
f();
// 等同于
g(3);

// 如果函数 g 不是尾调用，函数 f 就需要保存内部变量 m 和 n 的值、g 的调用位置等信息。但由于调用 g 之后，函数 f 就结束了，
// 所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。
// 这就叫做‘尾调用优化’，即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，
// 这将大大节省内存。这就是‘尾调用优化’的意义。

// 尾递归
// 函数调用自身，成为递归。如果尾调用自身，就称为尾递归。
// 递归非常耗费内存，因为需要保存成千上百个调用帧，很容易发生‘栈溢出’错误。但对于尾递归来说，由于只存在一个调用帧，所以永远
// 不会发生‘栈溢出’错误。

function factorial(n) {
    if(n === 1) return 1;
    return n * factorial(n - 1);
}
factorial(5);
// 120
// 阶乘函数，最多需要保存 n 个调用记录，复杂度 O(n)。
// 如果改成尾递归，只保留一个调用记录，复杂度 O(1)。
function factorial(n, total) {
    if(n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5, 1);

//计算 Fibonacci 数列
// 非尾递归的实现
function Fibonacci(n) {
    if(n <= 1) {
        return 1;
    }
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10);
// 89
Fibonacci(100);
// 超时
Fibonacci(500);
// 超时

// 尾递归优化过的 Fibonacci 数列
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
    if(n <= 1) {
        return ac2;
    }
    return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100);
// 573147844013817200000
Fibonacci2(1000)
// 7.0330367711422765e+208
Fibonacci2(10000)
// Infinity

// '尾调用优化' 对递归意义重大。ES6 中只要使用尾递归，就不会发生栈溢出(或者层层递归造成的超时)，相对节省内存

// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。方法就是把所有用到的内部变量改写成函数。

// 在尾递归函数之外，再提供一个正常形式的函数
function tailFactorial(n, total) {
    if(n === 1) {
        return total;
    }
    return tailFactorial(n - 1, n * total);
}
function factorial(n) {
    return tailFactorial(n, 1);
}

factorial(5);
// 120

// 可以使用函数柯里化 将多参数的函数转化成单参数的形式
function currying(fn, n) {
    return function(m) {
        return fn.call(this, m, n);
    };
}
function tailFactorial(n, total) {
    if(n === 1) return total;
    return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1)
factorial(5);
// 120

// 使用ES6 的函数默认值
function factorial(n, total = 1) {
    if(n === 1) return total;
    return factorial(n - 1, n * total )
}






