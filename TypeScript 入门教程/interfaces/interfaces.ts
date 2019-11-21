interface IPerson {
  name: string;
  age: number;
}

let tom: IPerson = {
  name: 'Tom',
  age: 25
}

interface IPerson2 {
  name: string;
  age?: number;
}

let susan: IPerson2 = {
  name: 'susan'
}

let jerry: IPerson2 = {
  name: 'jerry',
  age: 20,
  gender: 'male'
}

// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.

interface IPerson3 {
  name: string;
  age?: number;
  [propName: string]: string;
}

// Property 'age' of type 'number' is not assignable to string index type 'string'.
// 上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了

let jack: IPerson3 = {
  name: 'jack',
  age: 20,
  gender: 'male'
}

// 报错: 不能将类型“{ name: string; age: number; gender: string; }”分配给类型“IPerson3”。
  // 属性“age”与索引签名不兼容。
  // 不能将类型“number”分配给类型“string”。
// 这是联合类型和接口的结合: 

interface IPerson4 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any
}

let mary: IPerson4 = {
  id: 89340,
  name: 'mary',
  gender: 'male'
}

mary.id = 9527;
// Cannot assign to 'id' because it is a read-only property

interface IPerson5 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: number | string;
}

let rose: IPerson5 = {
  name: 'rose',
  gender: 'male'
}
// Error: Property 'id' is missing in type '{ name: string; gender: string; }' but required in type 'IPerson5'.ts(2741)
// interfaces.ts(66, 12): 'id' is declared here.

rose.id = 89756;
// Cannot assign to 'id' because it is a read-only property.ts(2540)

// 上例中，报错信息有两处，第一处是在对 rose 进行赋值的时候，没有给 id 赋值。
// 第二处是在给 rose.id 赋值的时候，由于它是只读属性，所以报错了。


 