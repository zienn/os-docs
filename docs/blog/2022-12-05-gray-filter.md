# 网页置灰
如何在网页置灰的前提下，保持部分元素彩色

[在线体验](https://shengxinjing.cn/gray.html)

[视频链接]()

最近哀悼日，网页端如何一键变灰已经有很多实现方式了，但是我看到一个twitter很有意思，是一个不错的面试题

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f3254a889e24b52a0b7ab55065ccdd3~tplv-k3u1fbpfcp-watermark.image?)

## 一键变灰

这个大部分同学都写了，直接
```css
html{
    filter: grayscale(100%);
}
```
考虑ie之类的兼容性的话，就直接把兼容性的属性都搞上去
```css
html{
 -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-filter: gray;
  filter: gray;
  -webkit-filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
  filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
```

如果想控制的更动态一些，可以用js控制html的class来实现这个切换过程

```html
<button class="btn" id="set-gray-all">全部置灰</button>
<button class="btn" id="set-gray-first">首屏置灰</button>
<button class="btn" id="set-gray">置灰</button>
```

```javascript
let style = document.createElement('style')
let graySelector = 'gray-filter'
style.setAttribute('type', 'text/css')
style.textContent = `.${graySelector}{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    -webkit-filter: gray;
    filter: gray;
    -webkit-filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
    filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
`
document.head.appendChild(style)

let root = document.querySelector('html')
let btn = document.querySelector('#set-gray')

btn && btn.addEventListener('click', () => {
  toggleClassName(root,graySelector)
}, false)

function toggleClassName(el,name){
  if (el.className.indexOf(name) > -1) {
    el.className = el.className.replace(name, '').trim()
  } else {
    el.className = [el.className, name].join(' ')
  }
}

```
这样可以在后端通过接口的形式决定是不是加载这段js就可以了  


![01.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71936e0bca774644a7eb24af5b4cd84d~tplv-k3u1fbpfcp-watermark.image?)

## 只搞首屏
还有些网页会只搞首屏，毕竟filter还是有点损耗首屏性能的，虽然可以用transform开启硬件优化一些，我们还可以用遮罩的方式挡住首屏也可以的，并且设置`pointer-events: none;`不阻挡用户交互，也是一段css搞定

```css
html {
    position: relative;
    width: 100%;
    height: 100%;
}
html::before {
    content: "";
    position: fixed;
    backdrop-filter: grayscale(100%);
    pointer-events: none;
    inset: 0;
    z-index: 100;
}
```
还可以吧遮罩的position换成absolute, 实现一个只置灰首屏的效果，不过我感觉没啥必要


![02.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf01e0235824086a9f9ad68fe57960c~tplv-k3u1fbpfcp-watermark.image?)

## 部分元素保持彩色
然后就聊一下我感觉挺适合作为面试题的一个要求，如何部分元素保持彩色, 大部分网站没有这个需求，只是作为面试题存在

由于filter直接作用在html上，所以最早我试了一下某个元素重置filter是无效的

```html
<style>
html{
    filter:grayscale(100%);
}
.not-gray{
    filter: none;
    color:red;
}
</style>
<div class="not-gray">123</div>
```

那只能用土办法了，我们设置有一些选择器保持彩色，然后统计出当前这个网页中，需要置灰的元素，网页是一个属性结果，我们先对选中元素的父元素进行遍历标记


![03.jpeg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3d7ca36eabe49338588f48f26345bb1~tplv-k3u1fbpfcp-watermark.image?)

```javascript

let body = document.body
//配置选择器，命中这个列表选择器的不置灰
let selectors = ['#not-gray2', '.not-gray3']
selectors.forEach(selector=>{
    let doms = [...document.querySelectorAll(selector)].forEach(v=>{
      if(!v) return 
      v.colorful = true
      let parent = v.parentNode
      while(parent && !parent.colorful){
        parent.colorful = true
        parent = parent.parentNode
      }
    })
})
```

然后现在需要置灰的元素都已经标记了colorful，然后我们遍历一下，递归每个child，如果没有colorful，直接置灰返回，通过递归就可以把所有元素都置灰了

```js
let graySelector = 'gray-filter'
walk(body)

function walk(node){
    if(node.nodeType!==1) return 
    if(!node.colorful){
      toggleClassName(node,graySelector)
      return
    }
    for (var i = 0; i < node.children.length; i++) {  
      var child = node.children[i]; 
      walk(child)
    }  
}
```


![04.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7a2de7d0ecc45b88000a98c95422af2~tplv-k3u1fbpfcp-watermark.image?)


## 总结
作为面试题来说，考察了面试者的css，js的dom遍历，递归思想，很不错的入门题



