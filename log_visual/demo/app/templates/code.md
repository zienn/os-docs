# 代码说明

代码均放在github上

单文件启动和模板启动都有



```

├── README.md 说明文档
├── demo 项目目录
│   ├── app 应用目录
│   │   ├── __init__.py 入口文件
│   │   ├── chart.py 图表
│   │   ├── chartline.py 图表
│   │   ├── datatable.py 图表
│   │   ├── demo.py 单文件启动代码，里面包含所有的python代码逻辑，其他的都是此文件拆的
│   │   ├── mapline.py 地图
│   │   ├── mapregion.py 地图
│   │   ├── mapvalue.py 地图
│   │   ├── static 静态资源，第三方库
│   │   │   ├── bootstrap.min.css
│   │   │   ├── datatable.css
│   │   │   ├── datatable.js
│   │   │   ├── echarts-all.js
│   │   │   └── jquery.min.js
│   │   ├── table.py 表格
│   │   └── templates 模板文件
│   │       ├── chart.html
│   │       ├── chartline.html
│   │       ├── code.html
│   │       ├── code.md
│   │       ├── datatable.html
│   │       ├── index.html
│   │       ├── map01.html
│   │       ├── map_line.html
│   │       ├── map_value.html
│   │       ├── next.html
│   │       └── next.md
│   ├── collect 收集数据的文件
│   │   ├── init.sql sql
│   │   ├── log.py 日志处理
│   │   ├── log_map.py 日志插数据库 有经纬度信息
│   │   ├── log_mysql.py  日志插数据库
│   │   └── log_time.py 时间维度
│   ├── dbutil 操作数据库的工具函数
│   │   ├── __init__.py
│   │   ├── dbutil.py
│   └── flask_web.py 分模块代码的启动文件
├── ppt 展示的ppt文件 源文件就是这个md，其他都是此文件生成的
│   └── log.md
└── www_access_20140823.log log日志文件

```