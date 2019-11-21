let myFavoriteNumber: number | string;
myFavoriteNumber = 'eight';
myFavoriteNumber = 8;

let myFavoriteNumber2: string | number;
myFavoriteNumber2 = true;
// Type 'boolean' is not assignable to type 'string | number'.

function getLength(something: string | number): number {
  return something.length;
}
// Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.

// length 不是 string 和 number 的共有属性，所以会报错。

// 访问 string 和 number 的共有属性是没问题的：
function getString(something: string | number): string {
  return something.toString();
}

let myFavoriteNumber3: string | number;
myFavoriteNumber3 = 'seven';
console.log(myFavoriteNumber3.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber3.length); // 编译时报错

// 上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。
// 而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。