let fibonacci: number[] = [1, 1, 2, 3, 5];

let fibonacci2: number[] = [1, '1', 2, 3, 5];
// 不能将类型“string”分配给类型“number”

let fibonacci3: number[] = [1, 2, 3, 4, 5];
fibonacci3.push('6'); //  Argument of type '"6"' is not assignable to parameter of type 'number'.

// 上例中，push 方法只允许传入 number 类型的参数，但是却传了一个 "6" 类型的参数，所以报错了

let fibonacci4: Array<number> = [1, 2, 3, 4];

interface NumberArray {
  [index: number]: number;
}
let fibonacci5: NumberArray = [1, 2, 3];

// NumberArray 表示：只要索引的类型是数字时，那么值得类型必须是数字。

// 类数组
function sum() {
  let args: number[] = arguments;
}

// 已声明“args”，但从未读取其值。ts(6133)
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.ts(2740)

// 上例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

function sum2() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

// 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。

function sum3() {
  let args: IArguments = arguments;
}

// 其中 `IArguments` 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}

let list: any[] = ['string', 25, { website: 'www.baidu.com' }];






















