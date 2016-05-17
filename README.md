# typescript

### 首先简单聊一下typescript~

刚刚看到typescript就被她那强势犀利的语法吸引了，没想到n年后前端程序猿居然可以用强类型的语言去写js，而这和我之前写C#有什么两样吗，嘿嘿，反正见到就是有一种相见恨晚的感觉；

typescript（后面简称ts）是微软开发的一个开源的编程语言，她是javascript的超集，也就是说用ts编写的代码可以被编译为es6 es5代码以确保浏览器兼容性，语法方面和C#极其相似，这不，微软C#首席架构师 安德斯·海尔斯伯格 也工作与ts的研发，我们只要学习ts就可以涵盖了es5 es6的所有知识点，并且还包含了ts特有的新功能（比如，接口，泛型，类，模块），就单出这点来看就值得去玩下了；

ts支持为已存在的js类库添加类型头文件，比如当下流行的react、backbone、jQuery、MongoDB、Node.js、D3.js等；

目前来看，由于ts还是新生态语言，生态圈还不怎么明显，除了网上找点有限的学习资料，还真不晓得有什么其它更好的途径来学习了，但正因为如此，更加促使我饥渴的欲望；

### 初始化项目

注：默认系统已经安装了node和npm

项目结构本身没有严格的定式，喜欢怎么来就怎么来，因为这里是demo所以结构就是越简单越好，实现生产中还是要看具体项目来规划自己的结构；

新建项目目录

mkdir demo

进入项目目录建立src和dist子目录

cd demo

mkdir src

mkdir dist

项目结构如下：

demo/

   +- src/

   +- dist/

src里面存放ts源码文件，dist存放通过ts编译器和webpack打包出来的js文件

在项目根目录下面执行：npm init 初始化项目，会生成package.json文件，我们所用到的依赖配置都可以在这里配置，ok，她现在就是一个标准的npm包了。

安装所需的依赖

`npm install -g typescript typings webpack`

typescript 废话，我们说的就是ts能不安装嘛，

typings是一个包管理器，它是用来获取定义文件的，可以把它理解为和Bower类似的工具；

webpack这个工具可以将你的所有代码和可选择地将依赖捆绑成一个单独的.js文件

以上都是在全局安装的npm包，如果要在单独的项目中安装去掉-g就行了，但不建议这么做，因为这些工具都是和实际项目无关的，都是公共的；

接下来，我们要添加开发时依赖ts-loader和source-map-loader

`npm install --save-dev ts-loader source-map-loader`

`npm link typescript`

这些依赖会让ts和webpack在一起良好地工作，ts-loader可以让webpack使用ts的标准配置文件tsconfig.json编译TypeScript代码；

source-map-loader使用ts输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps，这就允许你在调试最终生成的文件时就好像在调试ts源码一样。

链接TypeScript，允许ts-loader使用全局安装的TypeScript，而不需要单独的本地拷贝，如果你想要一个本地的拷贝，执行npm install typescript。

因为这里我们用到了backbone，所以我们使用typings工具来获取Backbone的声明文件：

`typings install backbone --ambient --save`

--ambient标记告诉typings从DefinitelyTyped获取声明文件，这是由社区维护的.d.ts文件仓库，这个命令会创建一个名为typings.json的文件和一个typings目录在当前目录下。

之所以用backbone而不是react是因为我觉得bb更加接近与原生js的表诉，而对于初学ts的来讲再合适不过了。

关于更多js类库我们可以到https://github.com/DefinitelyTyped/DefinitelyTyped这里去找，这个我已经star了，你呢？

