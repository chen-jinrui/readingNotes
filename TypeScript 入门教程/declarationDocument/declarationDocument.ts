jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.

declare var jQuery: (selector: string) => any;
jQuery('#foo');

// declare var 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。
// 它编译结果是：
jQuery('#foo');

// src/jQuery.d.ts
declare let Jquery: (selector: string) => any;

// src/index.ts

Jquery('#foo');
// 使用 declare let 定义的 Jquery 类型，允许修改这个全局变量
Jquery = function(selector) {
    return document.querySelector(selector);
};

// src/jQuery.d.ts
declare const JQuery: (selector: string) => any;

JQuery('#foo');
// 使用 declare const 定义的 JQuery 类型，禁止修改这个全局变量
JQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: Cannot assign to 'JQuery' because it is a constant.ts(2588)

// 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现
declare const JQ = function(selector) {
  return document.querySelector(selector);
}
// A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.ts(1254)
// 不能在环境上下文中声明实现。ts(1183)



