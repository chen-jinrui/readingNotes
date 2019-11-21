<!-- 原始数据类型包括：布尔值 数值 字符串 null undefined symbol -->
### 1. 布尔值
- 在 TypeScript 中，使用 `boolean` 定义布尔值类型：
- 使用构造函数 `Boolean` 创造的对象 **不是** 布尔值, 事实上 `new Boolean()` 返回的是一个 `Boolean` 对象
- 直接调用 `Boolean` 也可以返回一个 `boolean` 类型

### 2. 数值
- 使用 `number` 定义数值类型
- ES6 中的二进制和八进制表示法表示的数字会被编译为十进制数字

### 3. 字符串
- 使用 `string` 定义字符串类型
- 用 ` 来定义 ES6 中的模板字符串，${exp} 用来在模板字符串中嵌入表达式。

### 4. 空值
- JavaScript 没有空值 (Void) 的概念， 在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数
- 声明一个 void 的变量没有什么用，因为你只能将它赋值为 undefined 和 null

### 5. Null 和 Undefined
- 在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型
- 与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量，而 `void` 类型的变量不能赋值给 `number` 类型的变量