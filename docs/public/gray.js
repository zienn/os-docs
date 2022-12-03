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
btn.addEventlistener('click',()=>{
  if(root.className.indexOf(graySelector)>-1){
    root.className = root.className.replace(graySelector,'')
  }else{
    root.className += ' '+graySelector
  }
},false)