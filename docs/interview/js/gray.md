# 网页部分置灰


最近有很多网站都实现了全体置灰，都用到了filter: grayscale属性来实现，我们直接在网页html上加上这些属性就可以

<button class="btn" id="set-gray">置灰</button>
```javascript
let style = document.createElement('style')
let graySelector = 'gray-filter'
style.setAttribute('type', 'text/css')
// style.setAttribute('data-vite-dev-id', id)
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
}`
document.head.appendChild(style)

let root = document.querySelector('html')
let btn = document.querySelector('#set-gray')
btn && btn.addEventListener('click',()=>{
  console.log(root.className)
  if(root.className.indexOf(graySelector)>-1){
    root.className = root.className.replace(graySelector,'')
  }else{
    root.className += ' '+graySelector
  }
},false)


function setGray(){
let filter = ['#not-gray2','.not-gray3']

let doms = filter.reduce((acc,cur)=>{
  let dom = [...document.querySelectorAll(cur)].forEach(d=>{
    d.isGary = false
    while(d.parentNode){
      if(d.parentNode.isGary){
        d.isGary = true
        break
      }
      d = d.parentNode
    }
  })
},[])

setTimeout(()=>{
  setGray()
},1000)
```



## 首屏灰色，滚动的时候第二屏彩色

## 某个特定selector不灰色

这个属于特殊需求，比如某个logo是彩色，或者某几个区域，这时候就不能无脑的全局置灰了，这时候就需要配置选择器



<div>
  <div>
    <button style="color:blue;">按钮1</button>
  </div>
  <button style="color:blue;" class="not-gray3">按钮3</button>
  <div>
    <div>
      <div>
         <button style="color:blue;" id="not-gray2">按钮2</button>
      </div>
    </div>
    <p>
      <div>
          <button style="color:blue;" class="not-gray3">按钮3</button>
      </div>
    </p>
  </div>
</div>