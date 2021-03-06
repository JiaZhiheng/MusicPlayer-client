## 项目介绍

本项目采用原生 JavaScript 搭建类似网易云的音乐播放器。应用到的技术包括 ES6 新增的语法糖如解构赋值、箭头函数、展开运算符模板字符串 ，异步处理Promise，ES6模块化，异步网络请求Ajax，单页面应用思想，数据响应式思想。通过上述技术最终完成页面切换，轮播图，音乐播放器等功能。

# 在线示例

# 后端接口

本实验选择项目  [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi/)  来完成后端接口的部署。


# 项目总结
项目各单元逻辑总结
页面切换逻辑

整个项目分为三个页面，页面的切换是通过监听 hashchange 事件触发路由表对应的函数来进行页面加载。具体的逻辑如下：

页面切换发生在点击 a 标签时，a 标签被点击地址栏的 hash 值将发生改变，hash 值改变触发 hashchange 事件
解析 hash 值，得到需要跳转的页面名字，通过路由表比对找到对应页面的执行函数
调用得到的函数来进行页面初始化和该页面的事件绑定
页面切换涉及到的知识点

模块化：每一个页面都相当于一个独立的模块，暴露出执行函数，页面切换时执行引入的函数
Proxy：用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等），每当检测到对象发生改变时触发函数调用
页面加载逻辑

hashchange 事件会触发页面的加载，页面加载就是修改特定元素的 innerHTML 内容，加载过程中的逻辑如下：

向后台发送 Ajax 请求，拿到数据
根据得到的数据利用模板字符串构建需要的 innerHTML 字符串
将得到字符串插入到指定的 DOM 元素内
页面加载涉及到的知识点

Ajax：Ajax 主要用来在不刷新页面的情况下完成对后端接口的访问，拿到需要的数据
Promise：因为 Ajax 请求是异步处理，对于异步处理必须要掌握 Promise 的使用
轮播图逻辑

轮播图一般应用在首页部分，功能主要包括三个部分，各部分的实现逻辑如下：

轮播图的自动播放：方法有两种，一种是在图片数组中首尾添加数据，整个图片容器自动向某一方向移动，移动的距离等于每张图片的宽度，到达首张时，立即切换尾张；另一种方法是改变图片容器不动，每次自动改变数据的排列顺序。
轮播图手动切换：每次点击手动改变序号，注意防抖处理
轮播图指示器：每次 hover 指示器，得到序号跳转到对应的图片。
轮播图涉及到的知识点

防抖处理：在处理一些高频点击事件是通过添加防抖能够降低触发频率
音乐播放逻辑

音乐的播放、暂停功能的实现上都是基于 HTML5 audio API 来控制的，除了控制音乐的播放和暂停外，页面上的逻辑切换主要如下：

底部控制栏：当音乐播放时，图标变为播放状态，歌曲进度条能够实时更新当前进度；当音乐暂停时图标变为暂停状态，同时进度条不变；当歌曲播放完后根据播放模式自动播放下一首
播放器页面：当音乐播放时，歌曲封面进行转动，歌词实时更新；当音乐暂停时歌曲封面不进行旋转，进度条也保持不变
音乐播放暂停涉及到的知识点

localStorage：客户端存储对象，存放着歌曲 Id (musicId) ,播放模式(musicMode),播放列表(songList)的信息
HTML5 audio API：涉及到的音乐的播放、暂停，歌曲的事件监听如：歌曲的完成事件 ended ，歌曲的播放监听 timeupdate，歌曲当前进度 currentTime，歌曲的声音控制 volume ，歌曲的时长 duration
播放列表逻辑

播放列表是用来显示播放器的歌曲列表，其主要包括两个部分：

歌曲添加功能：当将推荐歌曲加入到播放列表后会自动刷新列表的显示，并且能凸出当前播放的音乐
点击歌曲播放功能：当点击选中的歌曲后，播放器会进行歌曲切换
播放列表涉及到的知识点

Map 对象：利用 Map 对象 key 的唯一性完成对象数组的去重

