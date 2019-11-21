let myFavoriteNumber: string = 'two';
// myFavoriteNumber = 2;
// Type 'number' is not assignable to type 'string'

let myLikeNumber: any = 'six';
myLikeNumber = 6;

let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

let anyThings: any = 'Tom';
anyThings.setName('Jerry');
anyThings.setName('Jerry').sayHello();
anyThings.myName.setFirstName('Cat');

let something;
something = 'six';
something = 6;

something.setName('Tom');

// 等价于

// let something: any;
// something = 'six';
// something = 6;

// something.setName('Tom');

