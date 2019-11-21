function getLength1(something: string | number): number {
  if (something.length) {
      return something.length;
  } else {
      return something.toString().length;
  }
}

// error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

// 此时可以使用类型断言，将 `something` 断言成 `string`
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的
function toBoolean(something: string | number): boolean {
  return <boolean>something;
}

// Conversion of type 'string | number' to type 'boolean' may be a mistake because neither type sufficiently overlaps with the other. 
// If this was intentional, convert the expression to 'unknown' first.
//   类型“number”不可与类型“boolean”进行比较。ts(2352)


