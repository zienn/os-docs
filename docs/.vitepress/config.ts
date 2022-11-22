
export default {
  title: '前端进阶指南',
  description: '前端进阶指南|Vue3|React|Vite|Cli|项目实战',
  head: [
    // ['link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/element3.ico', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png', type: 'image/png', sizes: '16x16' }],
  ],
  // base:"/src/"
  themeConfig: {
    logo: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png',
    nav: [
      // { text: 'Vue3', link: '/vue/' },
      // { text: 'React', link: '/react/' },
      // { text: 'JS', link: '/js/' },
      // { text: 'TS', link: '/ts/' },
      // { text: '设计题', link: '/design/' },
      { text: '前端架构师指南', link: 'https://web-architect.netlify.app/' },
      { text: '前端源码漫游记', link: 'https://source-tour.netlify.app/' },
      { text: '学习路线图', link: 'https://roadmap.shengxinjing.cn/' },
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/V3ZHdnZErY' },
      { icon: 'github', link: 'https://github.com/shengxinjing/fe-advanced-interview' },
      { icon: 'twitter', link: 'https://twitter.com/shengxj1' },
      {icon:{
        svg:`<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
      <g>
          <path d="M128,0 C57.307,0 0,57.307 0,128 L0,128 C0,198.693 57.307,256 128,256 L128,256 C198.693,256 256,198.693 256,128 L256,128 C256,57.307 198.693,0 128,0 L128,0 Z" ></path>
          <path d="M190.2826,73.6308 L167.4206,188.8978 C167.4206,188.8978 164.2236,196.8918 155.4306,193.0548 L102.6726,152.6068 L83.4886,143.3348 L51.1946,132.4628 C51.1946,132.4628 46.2386,130.7048 45.7586,126.8678 C45.2796,123.0308 51.3546,120.9528 51.3546,120.9528 L179.7306,70.5928 C179.7306,70.5928 190.2826,65.9568 190.2826,73.6308" fill="#FFFFFF"></path>
          <path d="M98.6178,187.6035 C98.6178,187.6035 97.0778,187.4595 95.1588,181.3835 C93.2408,175.3085 83.4888,143.3345 83.4888,143.3345 L161.0258,94.0945 C161.0258,94.0945 165.5028,91.3765 165.3428,94.0945 C165.3428,94.0945 166.1418,94.5735 163.7438,96.8115 C161.3458,99.0505 102.8328,151.6475 102.8328,151.6475" fill="#D2E5F1"></path>
          <path d="M122.9015,168.1154 L102.0335,187.1414 C102.0335,187.1414 100.4025,188.3794 98.6175,187.6034 L102.6135,152.2624" fill="#B5CFE4"></path>
      </g>
  </svg>`},link:"https://t.me/+3MgX0yHFR2s5OWQ1"}
    ],
    sidebar: {
      '/': [
        {
          text: '使用指南',
          items: [
            { text: '使用说明', link: '/desc' },
          ],
        },
        {
          text: 'JS挑战',
          items: [
            { text: '开发步骤', link: '/js/' },
          ],
        },
        {
          text: 'Vue挑战',
          items: [
            { text: 'Vue3架构', link: '/vue/' },
            { text: '1・热身', link: '/vue/1-hello-word' },
            { text: '2・ref全家桶', link: '/vue/2-ref-family' },
            { text: '3・响应性丟失', link: '/vue/3-losing-reactivity' },
            { text: '4・可写的计算属性', link: '/vue/4-writable-computed' },
            { text: '5・watch 全家桶', link: '/vue/5-watch-family' },
            { text: '6・浅层 ref', link: '/vue/6-shallow-ref' },
            { text: '7・原始值 API', link: '/vue/7-raw-api' },
            { text: '8・Effect作用域 API', link: '/vue/8-effect-scope' },
            { text: '9・依赖注入', link: '/vue/9-dependency-injection' },
            { text: '10・生命周期钩子', link: '/vue/10-lifecycle' },
            { text: '11・下一次DOM更新', link: '/vue/11-next-dom-update' },
            { text: '12・优化性能的指令', link: '/vue/12-optimize-perf-directive' },
            { text: '13・DOM传送门', link: '/vue/13-dom-portal' },
            { text: '14・动态CSS', link: '/vue/14-dynamic-css-values' },
            { text: '15・切换器', link: '/vue/15-useToggle' },
            { text: '16・until', link: '/vue/16-until' },
            { text: '17・计数器', link: '/vue/17-useCounter' },
            { text: '18・实现本地存储函数', link: '/vue/18-useLocalStorage' },
            { text: '19・切换焦点指令', link: '/vue/19-v-focus' },
            { text: '20・防抖点击指令', link: '/vue/20-v-debounce-click' },
            { text: '21・函数式组件', link: '/vue/21-functional-component' },
            { text: '22・自定义元素', link: '/vue/22-custom-element' },
            { text: '23・自定义ref', link: '/vue/23-custom-ref' },
            { text: '24・激活的样式-指令', link: '/vue/24-v-active-style' },
            { text: '25・鼠标坐标', link: '/vue/25-useMouse' },
            { text: '26・实现简易版`v-model`', link: '/vue/26-v-model' },
            { text: '27・全局CSS', link: '/vue/27-global-css' },
            { text: '208・树组件', link: '/vue/208-tree-component' },
            { text: '218・渲染函数[h()]', link: '/vue/218-h-render-function' },
            { text: '232・按键修饰符', link: '/vue/232-key-modifiers' },
            { text: '243・阻止事件冒泡 ', link: '/vue/243-prevent-event-propagation' },
            { text: '305・大写', link: '/vue/305-capitalize' },
            { text: '323・Prop验证', link: '/vue/323-prop-validation' },
            
          ],
        },
        {
          text: 'TS挑战',
          items: [
            { text: '开发步骤', link: '/ts/' },
          ],
        },

        {
          text: 'React挑战',
          items: [
            { text: 'React架构介绍', link: '/react/' },
          ],
        },
        {
          text: '系统设计挑战',
          items: [
            { text: 'webpack', link: '/design/' },
          ],
        },

      ],
    },
  }
}