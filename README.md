# FAST API

Fast API is a browser tool for testing APIs and code. [https://arthuryung.github.io/fast-api/](https://arthuryung.github.io/fast-api/)

- Generating test code through specific expressions.
- You can also customize the API code to be tested.
- And coding your test Cases, you kan see how each function performs.
- wo shi zai bian bu xia qu le ...
   

# API 测试
   

> Fast API 支持 3 种 API 测试模式，测试代码分成两部分：`initCode` 和 `baseCode`。<br>
> 其中`initCode`为进行测试前执行的代码块，用来声明变量等工作。我们最终得到的结果为`baseCode`代码块执行的时间。<br>
> 预定义的`baseCode`是由一个循环嵌套一段代码组成的，通过大量循环调用`api`达到对`api`性能的评估和对比。支持的循环：
   

- `<for>`for 循环
- `<for_less>`变量自减的 for 循环
- `<while>`while 循环
- `<while_less>`变量自减的 while 循环
- `<forEach>`forEach 循环
- `<map>` map 循环
- `<reduce>` reduce 循环，不推荐使用
   

## `API`模式
   

`API`测试模式就是首页出现的第一种测试模式。使用起来非常简便，只需要选择左侧菜单栏的`API`名称，点击测试按钮就可以得到测试的反馈。
   

## `Expression`模式   
   

在使用这种方式测试之前我们先看下`API`测试模式中国生成`isArray`测试的配置代码：

```js
const Array = {
  __root__: "Array",
  isArray: "let test = []|<for>api(test)"
};
```

在这里`__root__: 'Array'`指定了 rootName，`isArray`为 apiName(key)，右边的就是我们的表达式，这段表达式最终会转换成如下代码：

```js
/** initCode Start **/

var test = [];

/** baseCode start **/

for (let i = 0; i < $n; i++) {
  Array.isArray(test);
}
```

如果不配置`rootName`和`apiName`的话，表达式就是这个样子的:

```base
let test = []|<for>@Array.isArray:(test)
```

从上面的例子不难看出，表达式的规则是`initCode|<loopName>@root:api(params)`

- `initCode|` - 提取`|`之前的代码块为`initCode`:
- `<loopName>` - 根据 loopName 插入不同的循环规则
- `@root:` - 如果没有设置 root 名称，强制替换的 root。
- `api` - 在设置了 apiName 后有效，会将`api`字符串替换成 apiName
- `(params)` - 传入 api 的参数   
   

## `Custom`模式   
   
  
在 Custom 模式下你可以自由编辑你想测试的代码，自定义循环规则。为了方便测试，我们依然提供了`$n`循环次数变量。   
   

# Code Test
   

除了进行各种 api 性能测试以外，Fast API 还支持函数性能分析的测试。如果你想知道究竟是哪段代码拖累了你的节奏，点击顶部标签按钮切换至`Code Test`，可以将测试代码中所有函数以及运行总时长。
   

# 功能
   
## 测试结果
   

每次测试都会在右侧弹出一个新的卡片，包含了代码运行结果以及内部函数的时长。（黄色为同步函数，红色为异步执行的函数）。<br>
点击右上角按钮可以对当前测试结果进行收藏操作，它会将测试代码和结果储存在 IndexDB。
![alpha](http://cdn.toofook.com/blog/images/pic1.png)   
   

## 收藏夹   


点击页面右上角的`Open Collector`按钮可以展开收藏夹面板，你可以点击左侧按钮对某条记录进行标记，标记后的记录的展示顺序会发生变化。你还可以随意的重播以及删除。   
![alpha](http://cdn.toofook.com/blog/images/pic2.png)   
   

## License

[MIT](LICENSE)
