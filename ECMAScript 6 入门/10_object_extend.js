// 1. 属性的简洁表示法
// ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};

function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

// 除了属性简写，方法也可以简写。
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于
const o = {
  method: function() {
    return "Hello!";
  }
};

// 下面是一个实际的例子
let birth = '2000/01/01';
const Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};

// 这种写法用于函数的返回值，将会非常方便
function getPoint() {
  const x = 1;
  const y = 10;
  return {x, y}
}
getPoint()
// {x: 1, y: 10}

// CommonJS 模块输出一组变量，就非常合适使用简洁写法。

let ms = {}

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {}
}

module.exports = { getItem, setItem, clear }
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};

// 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
const cart = {
  _wheels: 4,
  get wheels () {
    return this._wheels;
  },
  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小啦！')
    }
    this._wheels = value;
  }
}

// 简洁写法在打印对象时也很有用
let user = {
  name: 'test'
}

let foo = {
  bar: 'baz'
}

console.log(user, foo)
// {name: "test"} {bar: "baz"}
console.log({user, foo})
// {user: {name: "test"}, foo: {bar: "baz"}}

// 上面代码中，console.log直接输出user和foo两个对象时，就是两组键值对，可能会混淆。
// 把它们放在大括号里面输出，就变成了对象的简洁表示法，每组键值对前面会打印对象名，这样就比较清晰了。

// 2. 属性名表达式
// JavaScript 定义对象的属性，有两种方法。
// 方法一
obj.foo = true;
// 方法二
obj['a' + 'bc'] = 123;

// 上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。
// 但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123
};

// ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

let propKey = 'foo'

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
}

// 下面是另一个例子。
let lastWord = 'last world';

const a = {
  'first world': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

// 表达式还可以用于定义方法名
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
}
obj.hello()
// 'hi'

// 注意，属性名表达式与简洁表示法，不能同时使用，会报错。
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };
// Uncaught SyntaxError: Unexpected token '}'

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};

// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};
myObject // {[object Object]: "valueB"}

// 上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。

// 3. 方法的 name 属性
const person = {
  sayName() {
    console.log('hello!')
  }
};
person.sayName.namen  // "sayName"
// 上面代码中，方法的name属性返回函数名（即方法名）。

// 如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，
// 而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {
  get foo() {},
  set foo(x) {}
};
obj.foo.name
// VM68169:5 Uncaught TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo')
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

// 有两种特殊情况：
// bind方法创造的函数，name属性返回bound加上原函数的名字；
// Function构造函数创造的函数，name属性返回anonymous。

(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSome"
// 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description')
const key2 = Symbol()
let obj = {
  [key1]() {},
  [key2]() {},
}
obj[key1].name // "[description]"
obj[key2].name // ""
// 上面代码中，key1对应的 Symbol 值有描述，key2没有。

// 4. 属性的可枚举性和遍历
// 4.1 可枚举性
// 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
// Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象

let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
// {value: 123, writable: true, enumerable: true, configurable: true}

// 描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。

// 目前，有四个操作会忽略enumerable为false的属性。
// for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

// 这四个操作之中，前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增的。
// 其中，只有for...in会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。
// 实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉for...in操作，不然所有内部属性和方法都会被遍历到。
// 比如，对象原型的toString方法，以及数组的length属性，就通过“可枚举性”，从而避免被for...in遍历到。
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false

// 上面代码中，toString 和 length 属性的 enumerable 都是 false，因此 for...in 不会遍历到这两个继承自原型的属性。

// 另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false

// 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。
// 所以，尽量不要用for...in循环，而用Object.keys()代替。

// 4.2 属性的遍历
// ES6 一共有 5 种方法可以遍历对象的属性。
//（1）for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
//（2）Object.keys(obj) 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
// (3) Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
// (4）Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
// (5）Reflect.ownKeys(obj) 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

// 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
// 首先遍历所有数值键，按照数值升序排列。
// 其次遍历所有字符串键，按照加入时间升序排列。
// 最后遍历所有 Symbol 键，按照加入时间升序排列。
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2' '10' 'b' 'a' Symbol()]
// 上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。
// 这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

// 5. supper 关键字
// this 关键字总是指向函数所在的当前对象，ES6又新增了关键字 supper, 指向当前对象的原型对象
const proto = {
  foo: 'hello'
}
const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
}
Object.setPrototypeOf(obj, proto)
obj.find() // 'hello'

// 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}

// 上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。
// 第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。
// 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

// JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
}
const obj = {
  x: 'world',
  foo() {
    super.foo()
  }
}
Object.setPrototypeOf(obj, proto)
obj.foo() // 'world'

// 上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world

// 6. 对象的扩展运算符
// 6.1 解构赋值
// 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，
// 分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

let { x, y, ...ret } = { x: 1, y: 2, a: 3, b: 4 }
x; // 1
y; // 2
ret; // { a: 3, b: 4}
// 上面代码中，变量ret是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。

// 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。

let { ...z } = null; // 运行时错误
// Uncaught TypeError: Cannot destructure 'null' as it is null.
let { ...z } = undefined; // 运行时错误
// Uncaught TypeError: Cannot destructure 'undefined' as it is undefined

// 解构赋值必须是最后一个参数，否则会报错。
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误

// 注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

// 上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。

// 另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
let o1 = { a: 1 }
let o2 = { b: 2 }
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
// 上面代码中，对象o3复制了o2，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

const o = Object.create({ x: 1, y: 2 })
o.z = 3;

let { x, ...newObj } = o
let { y, z } = newObj

x // 1
y // undefined
z // 3

// 上面代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
// 变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值。
// ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，
// 如果写成下面这样会报错。
let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts

// 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  baseFunction(restConfig)
}
// 上面代码中，原始函数baseFunction接受a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。

// 6.2 扩展运算符
// 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c', 'd'] }
// {0: "a", 1: "b", 2: "c", 3: "d"}

// 如果扩展运算符后面是一个空对象，则没有任何效果。
{...{}, a: 1}
// { a: 1 }

// 如果扩展运算符后面不是对象，则会自动将其转为对象。
{...1} // {}

// 上面代码中，扩展运算符后面是整数1，会自动转为数值的包装对象Number{1}。由于该对象没有自身属性，所以返回一个空对象。

// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}

// 但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象
{ ...'hello' }
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

// 对象的扩展运算符等同于使用Object.assign()方法。

let aClone = { ...a }
// 等同于
let aClone = Object.assign({}, a)

// 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)




