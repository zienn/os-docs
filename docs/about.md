
<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import { useData } from 'vitepress'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
const { site,theme } = useData()
</script>


# 关于我

我是爱代码爱生活的大圣，现在是自由职业的状态，独立开发者 && 讲师，欢迎加我聊天

你可以收获前端学习小秘籍，一起学习`前端进阶`的知识，我会的都可以聊


<!-- <VPTeamMembers size="medium" :members="members" /> -->



<!-- <img :src="theme.me.wechat" width="280"> -->


## 大圣前端私教课

从1V1面试摸底 给你制定学习路线图 + 课程 + 导师辅导  帮你成功进阶前端


## 体系课
私教课的部分模块单独拆分

1. [前端啃算法](https://blc.xet.tech/s/2Ajvex)
   - Leetcode200题，掌握刷题公式，大厂面试必杀技
2. Vue+ Typescript 实战课
3. React+ Typescript 实战课
4. [前端源码漫游记](https://blc.xet.tech/s/3zmqj7)
   - 一次性掌握前端热门框架原理 
   - Vue3 + React + Vite + Rollup 源码手写 ...
   - Typescript + Pnpm + Monorepo + Vitest
5. 工程化体系
6. 性能优化
7. [玩转Vue3文字专栏@极客时间](http://gk.link/a/10BM3)

