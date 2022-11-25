import DefaultTheme from 'vitepress/theme'
import BFrame from './BFrame.vue'
import MyLayout from './MyLayout.vue'
import NotFound from './NotFound.vue'
import './theme.css'
export default {
  ...DefaultTheme,
  NotFound,
  Layout:MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('BFrame',BFrame)

    // baidutongji
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?ccf55dfd2764cf3ebf43d6b3c9da9b20";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  //   DefaultTheme.enhanceApp(ctx)
  //   // ctx.app.component('VueClickAwayExample', VueClickAwayExample)
  }
}