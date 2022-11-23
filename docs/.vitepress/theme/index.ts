import DefaultTheme from 'vitepress/theme'
import BFrame from './BFrame.vue'
import MyLayout from './MyLayout.vue'
import NotFound from './NotFound.vue'
import './theme.css'
console.log(DefaultTheme)
export default {
  ...DefaultTheme,
  NotFound,
  Layout:MyLayout,
  enhanceApp(ctx) {
    ctx.app.component('BFrame',BFrame)
  //   DefaultTheme.enhanceApp(ctx)
  //   // ctx.app.component('VueClickAwayExample', VueClickAwayExample)
  }
}