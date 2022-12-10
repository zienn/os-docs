import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import taskLists from 'markdown-it-task-lists'

function getDirctSidebar(pathname: string) {
  const p = path.resolve(__dirname, '../', pathname)
  const dirct = fs.readdirSync(p)
                  .filter(v=>v.endsWith('.md'))
                  .sort((a, b) => {
                    if(a==='index.md') return 1
                    return a>b ? -1 : 1
                  })
  return dirct.map(dir=>{
    const file = fs.readFileSync(path.resolve(p,dir)).toString()
    let text = dir
    let lines = file.split('\n')
    const line = lines.shift()
    if(line.startsWith('# ')){
      text = line.replace('# ','')
    }else{
      if(line.startsWith('---')){
        const index = lines.findIndex(v=>v.startsWith('---'))
        lines = lines.slice(index+1).filter(v=>v)
        if(lines[0].startsWith('# ')){
          text = lines[0].replace('# ','')
        }
      }
    }
    return {
      text,
      link: `/${pathname}/${dir.replace('.md','')}`
    }
  })
}

export default defineConfigWithTheme<ThemeConfig>({
  title: '个人博客',
  description: 'Android|Vue3|React|Vite|Cli|项目实战',
  head: [
    // ['link', { rel: 'icon', href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/element3.ico', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png', type: 'image/png', sizes: '16x16' }],
  ],
  // base:"/src/"
  themeConfig: {
    me: {
      // wechat:"https://cdn.jsdelivr.net/gh/shengxinjing/static/wechat.jpg"
      // wechat: "https://cdn.jsdelivr.net/gh/shengxinjing/static/jingu2.png"
      wechat: "/wechat2.png",
      gongzhonghao: "/gongzhonghao.jpeg"
      // wechat:"https://cdn.jsdelivr.net/gh/shengxinjing/static/xiao3.jpg"
    },
    logo: 'https://cdn.jsdelivr.net/gh/shengxinjing/static/woniu.png',
    // navbar: [
    //   '/',
    //   { text: '🔥一起进步', link: '/about' },
    // ],
    nav: [
      // '/',
      { text: '🔥一起进步', link: '/about' },
      {
        text:'常用工具',
        items:[
          {text:'正则可视化',link:"https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24"},
          {text:'时间轴工具',link:"https://time.graphics/editor"},
          {text:'扁平配图unDraw',link:"https://undraw.co/illustrations"},
          {text:"正则表达式",link:"https://any86.github.io/any-rule/"},
          {text:'小徽章',link:"https://shields.io/"},
          {text:'数据结构/算法动态可视化',link:"https://visualgo.net/zh"},
          {text:'Apifox',link:"https://www.apifox.cn/"}
        ]
      },
      { text: '英语', link: '/blog/itwords' },
      { text: '🔥面试题', link: '/interview/' },
      // { text: '玩转Vue3', link: '/vue/' },
      // { text: '玩转React18', link: '/react/' },
      { text: '源码漫游记', link: '/source/' },
      { text: '路线图', link: 'https://roadmap.shengxinjing.cn/' },
    ],
    
    socialLinks: [
      // { icon: 'discord', link: 'https://discord.gg/V3ZHdnZErY' },
      { icon: {svg:`<svg t="1670473404737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3226" width="200" height="200"><path d="M465.981 1001.74a89.578 89.578 0 0 1-89.889-88.955l-0.356-63.666c-176.662 38.422-213.927-74.93-213.927-74.93-28.895-73.372-70.523-92.873-70.523-92.873-57.61-39.446 4.364-38.645 4.364-38.645 63.71 4.452 97.28 65.447 97.28 65.447 56.631 97.058 148.569 69.009 184.765 52.803 5.699-41.049 22.172-69.053 40.337-84.947-141.045-16.028-289.303-70.523-289.303-313.79 0-69.32 24.799-125.952 65.447-170.429-6.589-16.028-28.316-80.584 6.144-168.025 0 0 53.337-17.052 174.659 65.09a609.28 609.28 0 0 1 158.943-21.37c53.915 0.223 108.276 7.257 159.031 21.37C814.186 6.679 867.434 23.73 867.434 23.73c34.549 87.485 12.822 152.042 6.233 168.025 40.693 44.433 65.358 101.109 65.358 170.43 0 243.89-148.57 297.583-289.926 313.299 22.751 19.723 43.053 58.323 43.053 117.582 0 84.992-0.312 119.674-0.312 119.674a89.622 89.622 0 0 1-89.8 89H465.98z" fill="#46B980" p-id="3227"></path></svg>`
        }, link: 'https://github.com/shengxinjing/fe-advanced-interview' },
      // { icon: 'twitter', link: 'https://aad9j731nr.feishu.cn/drive/home/' },
      {
        icon: {
          svg: `<svg t="1670473347397" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2322" width="200" height="200"><path d="M576.8 807.52h57.28l20.8 72.48 100.8-72.48h141.92V229.28H576.8z m67.84-513.92H832v448h-66.24l-85.12 64.96-18.56-64.96h-17.44zM126.4 884.48a149.44 149.44 0 0 0 123.84-10.4c60.96-36 105.92-194.56 105.92-194.56l144 177.44s13.12-84.48-2.24-108.32-99.04-119.84-99.04-119.84l-36.64 32 26.08-104.96H544s0-61.76-30.56-65.28-125.44 0-125.44 0v-192H528s-1.6-64-28.8-64H270.56l35.52-104.64s-57.6 3.36-77.92 39.36-86.4 221.6-86.4 221.6 21.92 10.24 59.2-17.28a147.68 147.68 0 0 0 49.28-75.52l67.84-3.36L320 491.2s-116.96-1.76-140.64 0-37.28 65.28-37.28 65.28H320s-15.2 108.16-60.96 187.2-132.64 140.8-132.64 140.8z" fill="#49C0FB" p-id="2323"></path></svg>`
        }, link: "https://www.zhihu.com/people/mu-guang-40"
      },
      {
        icon: {
          svg: `<svg t="1670473253689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2052" width="200" height="200"><path d="M228.7 643.9c-0.1 0.1-0.2 0.3-0.3 0.4 3.9-4.4 8-9 12-13.5-7.5 8.4-11.7 13.1-11.7 13.1z" fill="#1590E9" p-id="2053"></path><path d="M894 298.1l25.6-15.1c10.4-6.1 9.1-21.5-2.1-25.9l-12.3-4.8c-18-7.1-34.2-18.2-46.7-33-15.7-18.5-44.7-45.1-90.9-60.8-52.7-18-142.9-14.4-193.2-10.5-15.9 1.2-25 18.4-17.4 32.5 42.6 78.6 16.7 114.3-5.7 140.7-34.3 40.4-97.4 112.2-160.7 183.6 21.9-24.5 41.8-46.8 58.1-65.1 36.4-40.8 91.3-61.5 145.1-51.7 171.5 31.3 191 253.4-9.2 385.6 26.1-1.4 52.6-3.3 79.2-6 252.6-26 272.6-232.1 218-333.9-19.4-36.1-22.2-60.5-20.1-83.9 2-21.5 13.8-40.8 32.3-51.7z" fill="#99C236" p-id="2054"></path><path d="M212.8 704.5C241.1 672.9 316 589 390.7 504.7c-54.6 61.2-121.8 136.7-177.9 199.8z" fill="#1590E9" p-id="2055"></path><path d="M216.3 758.6c-19.5-2.5-28.2-25.6-15.5-40.6-51.7 58.3-91.7 103.5-99.1 112.6-24.1 29.5 247.7 97.9 482.6-56.8 0.1-0.1 0.3-0.2 0.4-0.3-156.5 8.2-298.5-5.9-368.4-14.9z" fill="#CAC134" p-id="2056"></path><path d="M593.9 387.9c-53.8-9.8-108.7 10.9-145.1 51.7-16.3 18.2-36.2 40.5-58.1 65.1C316 589 241.1 672.9 212.8 704.5c-4.1 4.6-8.1 9.1-12 13.5-12.7 14.9-4 38 15.5 40.6 69.9 9 211.9 23.1 368.3 15 200.2-132.3 180.8-354.4 9.3-385.7z" fill="#029F40" p-id="2057"></path></svg>`
        }, link: "https://www.yuque.com/fyman7"
      },
  //      {
  //       icon: {
  //         svg: `<svg width="274px" height="274px" viewBox="-9 0 274 274" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
  //     <g>
  //         <path d="M249.874103,164.084793 C246.121107,183.392442 216.260831,204.522765 181.966269,208.61788 C164.083135,210.751705 146.475762,212.712995 127.700462,211.851797 C96.9952088,210.444977 72.7666374,204.522765 72.7666374,204.522765 C72.7666374,207.511889 72.9509692,210.357972 73.3196328,213.019724 C77.3115222,243.322396 103.36719,245.137696 128.048481,245.984147 C152.959817,246.836498 175.141568,239.842212 175.141568,239.842212 L176.164978,262.363134 C176.164978,262.363134 158.740462,271.719816 127.700462,273.440737 C110.584149,274.381567 89.33143,273.010138 64.5778816,266.458249 C10.8916144,252.248479 1.65880329,195.021567 0.246084399,136.955576 C-0.184514679,119.715392 0.080923109,103.458802 0.080923109,89.8624885 C0.080923109,30.4870046 38.9837803,13.0831336 38.9837803,13.0831336 C58.5996328,4.07447005 92.258619,0.286082949 127.250693,0 L128.110416,0 C163.10249,0.286082949 196.783596,4.07447005 216.397974,13.0831336 C216.397974,13.0831336 255.299356,30.4870046 255.299356,89.8624885 C255.299356,89.8624885 255.787467,133.670046 249.874103,164.084793" ></path>
  //         <path d="M209.412536,94.4687189 L209.412536,166.362544 L180.929587,166.362544 L180.929587,96.5818986 C180.929587,81.8722212 174.740462,74.4060461 162.360739,74.4060461 C148.672997,74.4060461 141.812905,83.2628203 141.812905,100.775816 L141.812905,138.970839 L113.498066,138.970839 L113.498066,100.775816 C113.498066,83.2628203 106.636499,74.4060461 92.9487572,74.4060461 C80.5690337,74.4060461 74.3799093,81.8722212 74.3799093,96.5818986 L74.3799093,166.362544 L45.89696,166.362544 L45.89696,94.4687189 C45.89696,79.7752627 49.6381581,68.0989493 57.1529968,59.460424 C64.9023056,50.8218986 75.050877,46.3935115 87.6488494,46.3935115 C102.224333,46.3935115 113.262121,51.9957235 120.560186,63.2016221 L127.654748,75.0947097 L134.750785,63.2016221 C142.047375,51.9957235 153.085163,46.3935115 167.662121,46.3935115 C180.258619,46.3935115 190.40719,50.8218986 198.157974,59.460424 C205.671338,68.0989493 209.412536,79.7752627 209.412536,94.4687189" fill="#FFFFFF"></path>
  //     </g>
  // </svg>
  // `,
  //       }, link: "https://mas.to/@shengxj"
  //     }
    ],
    lastUpdatedText:"更新时间",
    editLink: {
      pattern: 'https://github.com/shengxinjing/fe-advanced-interview/tree/main/docs/:path',
      text: '编辑页面'
    },
    markdown:{
      config(md){
        // md.use(taskLists)
      } 
    },
    sidebar: {
      '/': [
        {
          text:'文章',
          items:getDirctSidebar('blog')
        },
        {
          text:'面试题',
          items:[
            {text:'面试题',link:'/interview/'},
          ]
        },
        {
          text: 'Program Language',
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: 'Vue3学习之路', link: '/vue/'
            },
            {
              text:'C/C++', items:[
                {text:'C++新特性概览',link:'/lang/cpp/morden-c++'}
              ]
            },
            {
              text:'Rust', items:[
                {text:'Rust',link:'/lang/rust/ts'}
              ]
            },
            {
              text:'Python', items:[
                {text:'Python',link:'/lang/python/component'}
              ]
            },
          ],
        },
        {
          text: '前端&Vue',
          // link: "/react/",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: 'Vue3学习之路', link: '/vue/'
            },
            {
              text:'实战入门', items:[
                {text:'Vue入门',link:'/vue/intro'}
              ]
            },
            {
              text:'项目实战', items:[
                {text:'Typescript',link:'/vue/ts'}
              ]
            },
            {
              text:'组件库入门', items:[
                {text:'组件库技术栈',link:'/vue/component'}
              ]
            },
          ],
        },
        {
          text: 'Linux内核',
          // link: "/react/",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: 'React学习之路', link: '/react/'
            },
            {
              text:'实战入门', items:[
                {text:'React入门',link:'/react/intro'}
              ]
            },
            {
              text:'企业级实战', items:[
                {text:'Typescript',link:'/react/ts'}
              ]
            },
            {
              text:'组件库入门', items:[
                {text:'组件库技术栈',link:'/react/component'}
              ]
            },
          ],
        },
        {
          text: '计算机基础',
          // link: "/react/",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: 'React学习之路', link: '/react/'
            },
            {
              text:'计算机网络', items:[
                {text:'React入门',link:'/react/intro'}
              ]
            },
            {
              text:'操作系统', items:[
                {text:'Typescript',link:'/react/ts'}
              ]
            },
            {
              text:'数据库', items:[
                {text:'组件库技术栈',link:'/react/component'}
              ]
            },
          ],
        },
        {
          text:'系统编程实战',
          items:getDirctSidebar('project')
        },
        {
          text:"源码解析",
          collapsible: true,
          items:getDirctSidebar('source')
        }
      ],
    },
    footer: {
      message: '文明其精神，野蛮其体魄',
      copyright: ' Copyright © 京ICP备18000331号-1'
    }
  }
})