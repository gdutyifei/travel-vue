# vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```
banke vue 开发指引
1. 在/src/common目录下 api.js 封装了与native交互的方法，使用时引入js后调用init()方法初始化。
2. 开发时，在src/view目录下新建对应功能名称文件夹即可开发。可嵌套多文件夹多页面。
3. 若有引入资源文件（如图片，js等），在相应文件夹下新建assets文件夹后放入其中。
4. npm run build 生成的文件在dist目录下
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
