// 二进制和八进制表示法 0b 0o
Number('0b111') // 7
Number('0o11') // 9

// Number.isFinite(), Number.isNaN() 
Number.isFinite(8); // true
Number.isFinite(Infinity); // false
Number.isFinite(NaN); // false
Number.isFinite('foo'); // false
// 参数类型不是数值，Number.isFinite一律返回false
Number.isNaN(NaN); // true
Number.isNaN(true); //false
// 参数类型不是NaN,Number.isNaN一律返回false

// 和isFinite()和isNaN()的区别在于，传统的方法先调用Number()将非数值转为数值，再进行判断，而这两个新方法只对数值有效
isFinite('25'); // true
Number.isFinite('25'); // false

isNaN('NaN'); // true
Number.isNaN('NaN'); // false

// Number.parseInt(), Number.parseFloat()
// ES6将全局方法parseInt()和parseFloat()移植到Number对象上面，行为完全保持不变。
// 这样做的目的是逐步减少全局性方法，使得语言逐步模块化
Number.parseFloat('12.34#'); // 12.34
Number.parseInt('12.34'); // 12

// Number.isInteger() 判断一个数值是否为整数
Number.isInteger(12); // true
Number.isInteger(12.0); // true // JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 12 和 12.0 被视为是同一个值

// 如果参数不是一个数值 Number.isInteger()返回false
Number.isInteger('15'); // false

// 由于精度问题 或者 一个数值的绝对值小于 Number.MIN_VALUE(5E-324)会被自动转化为0 Number.isInteger会误判
Number.isInteger(3.0000000000000000000000002) // true
Number.isInteger(5E-324) //false
Number.isInteger(5E-325) // true


// Number.EPSILON
// 极小的常量 Number.EPSILON 根据规格它表示 1 与 大于 1 的最小浮点数之间的差
// 实际上是JavaScript 能够表示的最小的精度
Math.pow(2, -52) === Number.EPSILON; // true

// Number.EPSILON 可以用来设置‘能够接受的误差范围’
function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
withinErrorMargin(0.1 + 0.2, 0.3); // true


//  安全整数和 Number.isSafeInteger()
// JavaSc能够准确表示的整数范围在-2^53到2^53之间，超过这个范围，无法准确表示这个值
Math.pow(2, 53) === Math.pow(2, 53) + 1; // true
// ES6 引入 Number.MAX_SAFE_INTEGER和 Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限
Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1; // true
Number.MIN_SAFE_INTEGER // -9007199254740991
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER; // true

// Number.isSafeInteger()用来判断一个整数是否落在这个范围之内
Number.isSafeInteger(NaN)
// false
Number.isSafeInteger(Infinity)
// false
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)
// false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)
// false

Number.isSafeInteger = function(n) {
    return (typeof n === 'number' &&
        Math.round(n) === n &&
        n <= Number.MAX_SAFE_INTEGER &&
        n >= Number.MIN_SAFE_INTEGER
    );
}

// 实际使用这个函数时，需要注意，不仅要验证运算结果，而要同时验证参与运算的每个值
Number.isSafeInteger(9007199254740993 - 990); // true
9007199254740993 - 990;
// 9007199254740002
// 正确结果应该是 9007199254740003
// 这是因为 9007199254740993 这个数超出了精度范围，导致在计算机内部，以 9007199254740002 的形式存储

9007199254740993 === 9007199254740992
// true

// 所以只验证运算结果是否为安全数，很可能得到错误结果。

function trusty(left, right, result) {
    if(
        Number.isSafeInteger(left) && 
        Number.isSafeInteger(right) &&
        Number.isSafeInteger(result)
    ) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// VM89:9 Uncaught RangeError: Operation cannot be trusted


// ES6 在 Math 对象上新增了 17 个与数学相关的方法。只能在 Math 对象上调用

// Math.trunc() 去除一个数的小数部分，返回整数部分
Math.trunc(4.1);
// 4
Math.trunc(4.9);
// 4
Math.trunc(-4.1);
// -4
Math.trunc(-4.9);
// -4
Math.trunc(-0.1234);
// -0
Math.trunc('1.23');
// 1
Math.trunc('foo');
// NaN
Math.trunc(undefined);
// NaN
Math.trunc(null);
// 0
// 下面的代码可以模拟
Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}

Math.sign() // 用于判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值
// 会返回五种值
Math.sign(-5); // -1
Math.sign(5); // 1
Math.sign(+0); // 0
Math.sign(-0); // -0
Math.sign(NaN); // NaN

Math.sign = Math.sign || function(x) {
    x = +x;
    if(x === 0 || isNaN(x)) {
        return x;
    }
    return x < 0 ? -1 : 1;
}

Math.cbrt() // 计算一个数的立方根
Math.cbrt(8); // 2
Math.cbrt('8'); // 2
Math.cbrt('foo'); // NaN

Math.cbrt = Math.cbrt || function(x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}



// 指数运算符
2 ** 2
// 4
2 ** 3
// 8
// 这个运算符的特点是右结合 多个指数运算符连用时，是从最右边开始计算的
2 ** 3 ** 2
// 512 相当于 2 ** (3**2)

// 新的赋值运算符 **=
let a = 3;
a **= 2;
// 9 相当于 a = a * a;
a **= 3;
// 729 相当于 a = a * a * a






