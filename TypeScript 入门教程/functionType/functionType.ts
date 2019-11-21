// 函数声明
function sum(x, y) {
  return x + y;
}

// 函数表达式
let mySum = function(x, y) {
  return x + y;
}

function sum1(x: number, y: number): number {
  return x + y;
}

sum1(1, 2, 3); // 应有 2 个参数，但获得 3 个
sum1(1); // 应有 2 个参数，但获得 1 个。ts(2554)
// functionType.ts(11, 26): An argument for 'y' was not provided.

let mySum2 = function(x: number, y: number): number {
  return x + y;
}

// 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，
// 而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：

let mySum3: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
}


// 使用接口的方式来定义一个函数需要符合的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
  return source.search(subString) !== -1;
}

// 可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

// 注意可选参数的位置
function buildName2(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + ' ' + lastName;
  } else {
    return lastName;
  }
}
// 必选参数不能位于可选参数后。ts(1016)

let tomCat = buildName2('Tom', 'Cat');
let toM = buildName2(undefined, 'Cat');

// 参数默认值
function buildName3(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let toMcat = buildName3('Tom', 'Cat');
let Tom = buildName3('Tom');

// 此时不受「可选参数必须接在必需参数后面」的限制了
function buildName4(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
let tomcat1 = buildName4('Tom', 'Cat');
let cat = buildName4(undefined, 'Cat');

// 剩余参数
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  })
}
let a = [];
push(a, 1, 2, 3);

// 事实上 items 是一个数组。所以我们可以用数组的类型来定义它：

function push2(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  })
}
let a2 = [];
push(a2, 1, 2, 3);

// 利用联合类型来实现 reverse 函数
function reverse1(x: number | string ): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

// 这时，我们可以使用重载定义多个 reverse 的函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// 上例中，我们重复定义了多次函数 reverse, 前几次都是函数定义，最后一次是函数实现。




