// 以下代码虽然没有指定类型，但是会在编译的时候报错
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// Type 'number' is not assignable to type 'string'.

// 等价于
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;

let myFavoriteNumber2;
myFavoriteNumber2 = 'eight';
myFavoriteNumber2 = 8;
