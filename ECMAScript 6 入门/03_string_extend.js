// 模板字符串
let name = 'Bob';
let time = 'today';
`Hello ${name}, how are you ${time}`

// 模板字符串中嵌入变量，需要将变量名写在{}内
function authorize(user, action) {
    if(!user.hasPrivilege(action)) {
        throw new Error(
            `User ${user.name} is not authorized to do ${action}.`
        )
    }
}

// {}内可以放任意的JavaScript表达式，可以进行运算，以及引用对象属性
let x = 1;
let y = 2;
`${x} + ${y} = ${x+y}`
// '1 + 2 = 3'

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// '3'

// 模板字符串中还可以调用函数
function fn() {
    return 'Hello'
}
`${fn()} World`
// "Hello World"

// 模板字符串可以嵌套

// 如果需要引用模板字符串本身，在需要时执行，可以写成函数
let func = (name) => `Hello ${name}`;
func('Jack')
// "Hello Jack"

// 标签模板

// TODO