## 声明文件

- 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

### 1. 新语法索引

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明枚举类型
- `declare namespace` 声明（含有子属性的）全局对象
- `interface` 和 `type` 声明全局类型
- `export` 导出变量
- `export namespace` 导出（含有子属性的）全局对象
- `export default` ES6默认导出
- `export =` commonjs 导出模块
- `export as namespace` UMD库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块
- `/// <reference />` 三斜线指令

### 2. 什么是声明语句

### 3. 什么是声明文件
- 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件

- 声明文件必须以 `.d.ts` 为后缀

- 一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件，

  #### 3.1 第三方声明的文件

    + 当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了

    + 我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件

    + @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可

    ```bash
      npm install @types/jquery --save-dev
    ```

### 4. 书写声明文件

+ 当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了

+ 在不同的场景下，声明文件的内容和使用方式会有所区别

+ 库的使用场景主要有以下几种： 
  + 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
  + npm包： 通过 `import foo from 'foo'` 导入，符合ES6模块规范
  + UMD库： 既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
  + 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
  + 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
  + 模块插件：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

### 5. 全局变量
  使用全局变量的声明文件时，如果是以 `npm install @types/xxx --save-dev` 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）：
  ```bash
  /path/to/project
  ├── src
  |  ├── index.ts
  |  └── jQuery.d.ts
  └── tsconfig.json
  ```

  全局变量的声明文件主要有以下几种语法：

  + `declare var`:  声明全局变量
  + `declare function`:  声明全局方法
  + `declare class`:  声明全局类
  + `declare enum`:  声明全局枚举类型
  + `declare namespace`:  声明（含有子属性的）全局对象
  + `interface` 和 `type`:  声明全局类型

    #### 5.1 declare var 

    - 在所有的声明语句中，`declare var` 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 `declare let` 和 `declare const`，使用 `let` 与使用 `var` 没有什么区别

    - 而当我们使用 `const` 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了

    - 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 `const` 而不是 `var` 或 `let`

    - 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现