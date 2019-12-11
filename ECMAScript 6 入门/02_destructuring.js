// 一 数组结构赋值
let [a, b, c] = [1, 2, 3];

// 模式匹配
let [a, [b, [c]]] = [1, [2, [3]]];
a // 1
b // 2
c // 

let [ , , third] = [1, 2, 3];
third //3

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, z] = ['1'];
x // '1'
y // undefined
z // []

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d //4

// 对于 Set 结构 也可以使用数组的解构赋值
let [x, y, z] = new Set(['a', 'b', 'c']);
x // 'a'

// 只要某种数据结构具有 Iterator 接口，都可以采用数组的解构赋值
function* fibs() {
    let a = 0;
    let b = 1;
    while(true) {
        yield a;
        [a, b] = [b, a+b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
// fibs 是一个Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。


// 默认值
// 解构赋值允许指定默认值
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a', undefined]
x // 'a'
y // 'b'

// ES6 内部用 '===' 判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效

let [x = 1] = [null]
x // null 因为 null 不严格等于 undefined

let [x = 1] = [undefined]
x // 1

let [x = 1, y = x] = [];
x // 1
y // 1

let [x = 1, y = x] = [2];
x // 2
y // 2

let [x = 1, y = x] = [1, 2]
x // 1
y // 2

let [x = y, y = 1] = []
// ReferenceError: y is not defined


// 二 对象的解构赋值

let { foo, bar } = { foo: 'aaa', bar: 'bbb'};
foo // 'aaa'
bar // 'bbb'

// 变量必须与属性同名，才能取到正确的值

let { baz } = { foo: 'aaa', bar: 'bbb' }
baz // undefined

let { log, sin, cos } = Math;

const { log } = console;
log('hello'); // hello

// 变量名与属性值不一致
var obj = { first: 'first', second: 'second' };
let { first: f, second: s } = obj;
f // first
s // second

// 实际上对象的解构赋值是下面形式的简写
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };

// 对象的解构赋值的内部机制，是先找到同名属性，再赋值给对应的变量。整整被赋值的是后者，而不是前者
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // 'aaa'
foo // error: foo is not defined

// 上面代码中，foo 是匹配模式，baz 才是变量。真正被赋值的是变量 baz, 而不是模式 foo。

let obj =  {
    p: [
        'hello',
        { y: 'world' }
    ]
};
let { 
    p: [
        x,
        { y }
    ] 
} = obj;

x // 'hello'
y // 'world'

// 这时，p 是模式，不是变量，不会被赋值，如果 p 也要赋值
let { p, p: [x, { y }] } = obj;
x // 'hello'
y // 'world'
p // ['hello', { y: 'world' }]

const node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};

let {
    loc,
    loc: {
        start
    },
    loc: {
        start: {
            line
        }
    }
} = node;

line // 1
loc //Object {start: Object}
start // Object {line: 1, column: 5}

// 上面代码有三次解构赋值

// 嵌套赋值
let obj = {}
let arr = []
(
    {
        foo: obj.prop,
        bar: arr[0]
    } = {
        foo: 123,
        bar: true
    }
)
obj // {prop: 123}
arr // [true]

// 对象的解构赋值可以可以取到继承的属性
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);
let { foo } = obj1;
foo // 'bar'

// 对象的解构赋值也可以指定默认值
var {x: y = 3} = {}
y // 3
var {x: y = 3} = {x: 5}
y // 5
var {message: msg = 'Something went wrong'} = {}
msg // 'Something ...'

// 默认值生效的条件是，对象的属性值严格等于 undefined
var { x = 3 } = { x: undefined }
x // 3
var { x = 3 } = { x: null }
x // null

// 数组本质是特殊的对象，可以对数组进行对象属性的解构
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first // 1
last // 3


// 三  字符串的解构赋值
// 字符串被转换成了一个类似数组的对象
const [a, b, c, d, e] = 'hello';
a // 'h'

// 类似数组的对象都有一个 length 属性
let { length: len } = 'hello';
len // 5

// 四 数值和布尔值的解构赋值

// 五 函数参数的解构赋值
function add ([x, y]) {
    return x + y;
}
add([1,2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [3, 7]

// 函数参数的解构也可以使用默认值
function move({ x = 0, y = 0 } = {}) {
    retun [x, y];
}

move({ x: 3, y: 4 }); // [3, 4]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 下面的写法会得到不一样的结果
function move({x, y} = {x: 0, y: 0}) {
    return [x, y];
}

move({x: 3, y: 4}); // [3, 4]
move({x: 3}); // [x, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

// 上面的代码为 move 的参数指定默认值，而不是为变量 x 和 y 指定默认值

// undefined 就会触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x);
// [1, 'yes', 3]


// 解构赋值的用途

// 1. 交换变量的值

let x = 1;
let y = 2;
[x, y] = [y, x]

// 2. 从函数返回多个值

function retunArr() {
    return [1, 2, 3];
}
let [a, b, c] = retunArr();

function returnObj() {
    return {
        foo: 1,
        bar: 2
    }
}
let { foo, bar } = returnObj();

// 3. 函数参数的定义

// 函数参数是一组有次序的值
function f([x, y, z]) {...}
f([1, 2, 3])

// 函数参数是一组无序的值
function f({x, y, z}) {...}
f({z: 3, y: 2, z: 1});

// 4. 提取 JSON 数据

let jsonData = {
    id: 42,
    status: 'ok',
    data: [12, 345]
}
let { id, status, data: number } = jsonData;

// 5. 函数参数的默认值
jQuery.ajax = function(url, {
    async = true,
    cache = true,
    beforeSend = function() {},
    crossDomain = false,
    complete = function() {},
    // ... more config
} = {}) {
    // ... 
}

// 指定参数的默认值，就避免了再在函数体内部再写 var foo = config.foo || 'default foo';

// 6. 遍历 Map 结构

// 任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口, 配合变量的解构赋值
// 获取键名和健值就非常方便

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for(let [key, value] of map) {
    // ...
}

for (let [key] of map ) {}
for (let [,value] of map) {}

// 7. 输入模块的指定方法

const { SourceMapConsumer, SourceNode } = require('source-map');

