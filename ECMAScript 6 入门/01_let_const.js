// let命令声明的变量，只在 let 命令所在的代码块内有效
// var a = [];
// for(var i = 0; i < 10; i++) {
//     a[i] = function() {
//         console.log(i);
//     }
// }
// a[6]();

// var a = [];
// for(let i = 0; i < 10; i++) {
//     a[i] = function() {
//         console.log(i);
//     }
// }
// a[6]();

// 每一轮循环的变量 i 都是重新声明的, JavaScript引擎内部会记住上一轮循环的值，初始化本轮的变量 i 时，
// 就在上一轮循环的基础上进行计算

// for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

// for(let i = 0; i < 3; i++) {
//     let i = 'abc';
//     console.log(i);
// }
// 代码运行正确，输出3次'abc'表明函数内部的变量 i 与循环变量 i 在不同的作用域；


// 不存在变量提升 在声明前使用会报错 ReferenceError

// 暂时性死区 TDZ 在块级作用域内存在 let 命令，它所声明的变量就绑定在这个区域，不再受外部的影响

// function bar(x = y, y = 2) {
//     return [x, y];
// }
// bar();  // 报错

// function bar(x = 2, y = x) {
//     return [x, y];
// }
// bar(); // 正确

// 不允许重复声明

// function func(arg) {
//     let arg;
// }
// func(); // 报错

// ES6的块级作用域
// let 实际上为 JavaScript 新增了块级作用域

// if(true) {
//     let x = 1;
// }

// const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

// 如果真的想将对象冻结，使用 Object.freeze方法;
// const foo = Object.freeze({});
// 除了将对象本身冻结， 对象的属性也应该冻结。
// var constantize = (obj) => {
//     Object.freeze(obj);
//     obj.keys().forEach(key => {
//         if (typeof obj[key] === 'object') {
//             constantize(obj[key]);
//         }
//     });
// }

// ES6 声明变量的方法 有 6 种
// var function let const import class

// 顶层对象的属性
// 为了保持兼容性, var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定 let命令、const命令、class声明的
// 全局变量，不属于顶层对象的属性，从ES6开始，全局变量将逐步与顶层对象的属性脱钩

var a = 1;
this.a; // 1
let b = 2;
this.b; // undefined