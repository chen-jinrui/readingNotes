// 实例方法: includes() startsWith() endsWith()
let s = 'Hello World';
s.includes('o'); // true
s.startsWith('Hello'); // true
s.endsWith('World'); // true

// 这三个方法都支持第二个参数，表示开始搜索的位置
let  s = 'Hello World';
s.includes('W', 6); // true
s.startsWith('World', 6); // true
s.endsWith('Hello', 5); // true

// 实例方法： repeaat() 返回一个新的字符串，表示将原字符串重复 n 次
'x'.repeat(3); // "xxx"
'na'.repeat(0); // ""

// 实例方法 padStart(), padEnd() 字符串补全长度
'x'.padStart(4, 'ab'); // 'abax'
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padEnd(4, 'ab'); // 'xaba'
'x'.padEnd(5, 'ab'); // 'xabab'

//省略第二个参数 用空格补全
'x'.padStart(4) // "   x"
'x'.padEnd(5); // "x    "

// padStart() 的常见用途是为数值补全指定的位数
'1'.padStart(10, '0');  // "0000000001"
// 另一个用途是提示字符串格式
'09-12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-09-12"

// trim() trimLeft() trimStart() trimRight() trimEnd()


