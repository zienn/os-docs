title: 日志可视化
speaker: Woniuppp

transition: slide
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: colors



[slide]

# 日志可视化
## 演讲者：woniuppp
基于python，前端基于echarts
<br>
<a style='color:#fff' href="https://github.com/shengxinjing" target="_blank">Github</a> 求星星
[slide]

## 背景

### 老板要看日志数据汇总
* 本文重点：如何做可视化
* 目标：如何用友好的方式去展现沉闷繁冗的数据
* 为了说明可视化的方式，用一个简单的log举例子

[slide]
![](http://photos.tuchong.com/30843/l/540941.jpg)



[slide]
## 原材料
----
* 一个标准的access_log日志 大概2W行
* 老板想要这个日志的分析结果，每个url,ip,status分别访问多少次，把前几名统计出来看看
* 分析出统计数据 展现结果
[slide]
## 很普通的日志，大概长这样
### 为了方便展示，切割了一下，大概2W行

```
61.159.140.123 - - [23/Aug/2014:00:01:42 +0800] "GET /favicon.ico HTTP/1.1" 404 \ "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER" "-"
61.159.140.123 - - [23/Aug/2014:00:01:42 +0800] "GET /favicon.ico HTTP/1.1" 404 \ "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER" "-"
61.159.140.123 - - [23/Aug/2014:00:01:42 +0800] "GET /favicon.ico HTTP/1.1" 404 \ "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER" "-"
61.159.140.123 - - [23/Aug/2014:00:01:42 +0800] "GET /favicon.ico HTTP/1.1" 404 \ "-" "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER" "-"
66.249.64.5 - - [23/Aug/2014:00:02:16 +0800] "GET /data/uploads/2013/0519/09/small_51982ba18e012.jpg HTTP/1.1" 200 \ "-" "Googlebot-Image/1.0" "-"
66.249.64.10 - - [23/Aug/2014:00:02:54 +0800] "GET /data/uploads/2013/0319/08/middle_5147b116e93b4.jpg HTTP/1.1" 200 \ "-" "Googlebot-Image/1.0" "-"
```


[slide]
## 目标

* 初级展现
* 友好交互
* 饼图汇总
* 更进一步
* 后续展望

[slide]

## 级别1
----

* 数据处理，命令行展现
* 打开文件，处理完数据后排序
* 打印前10

[slide]
## talk is cheap, show me the <del>money</del> code!


```python
# coding=utf-8
f = open('www_access_20140823.log')
res = {}
for l in f:
    arr = l.split(' ')
    # 获取ip url 和status
    ip = arr[0]
    url = arr[6]
    status = arr[8]
    # ip url 和status当key，每次统计+1
    res[(ip,url,status)] = res.get((ip,url,status),0)+1
# 生成一个临时的list
res_list = [(k[0],k[1],k[2],v) for k,v in res.items()]
# 按照统计数量排序，打印前10
for k in sorted(res_list,key=lambda x:x[3],reverse=True)[:10]:
    print k
```

[slide]
## 处理结果
```
('222.86.153.12', '/images/cursor_minify.cur', '404', 60)
('222.86.153.12', '/images/cursor_zoom.cur', '404', 32)
('58.253.6.133', '/images/cursor_minify.cur', '404', 32)
('111.85.34.165', '/%3Ca%20href=', '404', 28)
('58.253.6.133', '/images/cursor_zoom.cur', '404', 27)
('218.29.111.117', '/images/cursor_zoom.cur', '404', 27)
('218.29.111.117', '/images/cursor_minify.cur', '404', 26)
('117.63.146.40', '/public/js/common.js?20110824', '200', 19)
('117.63.146.40', '/favicon.ico', '404', 18)
('117.63.146.40', '/public/js/weibo.js?20110824', '200', 16)
```

[slide]
## 任务完成

* 下一步粘到邮件里，或者生成一个csv文件发出去
* 然而这是一个看脸的社会,运维也逃脱不了这个魔咒

[slide]

## 级别2
### 浏览器端展现
生成list之后，拼接sql，存入数据库

[slide]
## talk is cheap, show me the <del>money</del> code!

```python
import MySQLdb as mysql
con = mysql.connect(user='root',\
                    passwd='',\
                    db='log',\
                    host='localhost')
con.autocommit(True)
cur = con.cursor()
# 处理文件省略
for s in res_list:
    sql = 'insert log values ("%s","%s",%s,%s)' % s
    try:
        # 入库
        cur.execute(sql)
    except Exception, e:
        pass
```


[slide]
## 前端展现
### 读库 展现页面
### talk is cheap, show me the <del>money</del> code!

```
from flask import Flask,request,render_template
app = Flask(__name__)
import MySQLdb as mysql
con = mysql.connect(user='xx',\
                    passwd='xx',\
                    db='xx')
cur = con.cursor()
@app.route('/')
def index():
    table = '<table border="1">'
    cur.execute('select * from log order by value desc limit 20; ')
    for c in cur.fetchall():
        table += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'%c
    table +='</table>'
    return table

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9092)
```

[slide]
## 给老板一个url即可，老板想看随时能看
![表格](http://7xjoq9.com1.z0.glb.clouddn.com/log00.png)

[slide]
## 但是老板表示有点丑

![老板](http://7xjoq9.com1.z0.glb.clouddn.com/chatuchatu1.png)

[slide]

![表格](/datatable.png)

[slide]
### 前端展现上做一些优化

* 分页
* 表格排序
* 搜索
* 控制每页显示数量
* 数据多了之后，前端交互和后端数据的接口配合

[slide]
### 不动戳大
![表格](http://7xjoq9.com1.z0.glb.clouddn.com/log1.gif)

[slide]

## 我们的console页面，提供几个汇总信息，那就更好啦
### 比如根据http的status来个汇总

![老板](http://7xjoq9.com1.z0.glb.clouddn.com/chatuchatu1.png)

[slide]

![](http://7xjoq9.com1.z0.glb.clouddn.com/chatutiaozhan.png)

[slide]
## 难不倒我
### 一句sql搞定

```sql
select status,sum(value) from log group by status
+--------+------------+
| status | sum(value) |
+--------+------------+
|    200 |      15529 |
|    206 |          6 |
|    301 |          2 |
|    304 |       3549 |
|    403 |          1 |
|    404 |        847 |
+--------+------------+
6 rows in set (0.02 sec)
```

[slide]

## 汇总信息可视化
### 根据https状态汇总

![](http://7xjoq9.com1.z0.glb.clouddn.com/logchart01.png)

[slide]

## 其他功能

* 图例开关
* 图表转换
* 数据视图
* 直接导出图片

[slide]

## 可视化并不仅限于此
<!-- ### 拖拽重计算：304和404一起的比例肿么办 -->

![](http://7xjoq9.com1.z0.glb.clouddn.com/log2.gif)



[slide]

## 上面只是举得小栗子
### 如果你对时间更感兴趣，我们的log里也是有时间信息的,可以像下面这样
### 统计量，时间轴拖动，保存图片，etc

![](http://7xjoq9.com1.z0.glb.clouddn.com/log3.gif)


[slide]

## 更进一步
### 如何让日志数据更加一目了然，让老板觉得你很有逼格呢
![](http://7xjoq9.com1.z0.glb.clouddn.com/chatu1.png)

[slide]

### IP都是有地址位置的，定位每个ip的位置，画个地图出来汇总

![](http://7xjoq9.com1.z0.glb.clouddn.com/logkaixin.png)

[slide]
### 经纬度坐标系统
* 地球坐标(WGS84)
    - 国际标准，从 GPS 设备中取出的数据的坐标系
    - 国际地图提供商使用的坐标系
* 火星坐标(GCJ-02)
    - 中国标准，从国行移动设备中定位获取的坐标数据使用这个坐标系
* 百度坐标(BD-09)
    - 百度标准，百度 SDK，百度地图，Geocoding 使用


[slide]
### 应用场景

* WGS84坐标系：
    - 国际标准，谷歌国外地图、osm地图等国外的地图一般都是这个
* 火星坐标系：
    - iOS 地图
    - Gogole地图
    - 搜搜、阿里云、高德地图
* 百度坐标系：
    - 当然只有百度地图


[slide]
## 地图是需要经纬度的，用第三方的ip库转换一下
### http://developer.baidu.com/map/index.php?title=webapi/ip-api

![](http://7xjoq9.com1.z0.glb.clouddn.com/loglog01.png)

[slide]
## talk is cheap, show me the <del>money</del> code!

```python
import urllib2
import json
key = 'q5mTrTGzCSVq5QmGpI9y18Bo'
ipurl = 'http://api.map.baidu.com/location/ip?ak='+key+'&coor=bd09ll&ip='
sqlarr = []
def getGeo(ip):
    try:
        u = urllib2.urlopen(ipurl+ip)
        page = json.load(u)
        if 'content' in page:
            point = page['content'].get('point')
            print 'ip %s has geoX %s and geoY %s' % (ip,point['x'],point['y']) 
    except:
        print 'error'
getGeo('202.198.16.3')
# ip 202.198.16.3 has geoX 125.31364243 and geoY 43.89833761
```

[slide]
![](http://www.ldshj.com/bbs/attachments/forumid_10/110509135947cfdb54caa5302d.jpg)

[slide]
## 就想玩网游时候，坐标可以定位一个人，经纬度可以再地图上定位一个点，画图展现

![](http://7xjoq9.com1.z0.glb.clouddn.com/log4.gif)

[slide]
## 刚才那个图仅关注区域，进阶一下，还要关注访问量
### 可以根据value筛选

![](http://7xjoq9.com1.z0.glb.clouddn.com/log5.gif)

[slide]
## 进阶:多台机器的日志

* 获取每个机器的hostname和ip，和日志数据一起存在数据库里
* 一个表存日志，带上一个机器的id
* 机器的id=>ip和经纬度
* 最终统计访问量

[slide]

![](http://7xjoq9.com1.z0.glb.clouddn.com/log6.gif)

[slide]
## 后续扩展

* 日志数据
* 前端展现场景

[slide]
### 怎么实践 

* 这次分享的主题关注与可视化
* 我们用了一个很小的静态日志，目的是说明可视化的思路
* 实际工作中日志数据应该怎么处理

[slide]
## elk
### Logstash+ElasticSearch+Kibana4
* logstash
    - 日志进行收集、分析，并将其存储供使用
* ElasticSearch
    - 开源分布式搜索引擎，
* Kibana4
    - 日志分析友好的 Web 界面 
* 其他
    - Kafka scribe等
[slide]

### 常见日志处理架构

* ELK
* logstash+Hadoop
* scribe+hadoop
* 线上数据->Flume->Kafka->Hdfs->Map/Reduce
* 线上数据->flume->kafka->storm
* 在上面的基础上定制化二次开发，比如MR平台上写代码，我们的代码就可以直接拿来用
* 日志的数据处理架构详情，请见下回分解

[slide]
## 前端展现场景

* 展现逼格更高一些，数据一样，效果更好
* 运维人员权限树
* 流量图
* 年终数据统计
* 区域点击统计图
* 3D机房


[slide]
## 大家具体需要哪个，可以继续扩展,给大家展现几个假数据的demo
### 高逼格饼图展示状态汇总（假数据，可以替换为http_status）
![](http://7xjoq9.com1.z0.glb.clouddn.com/log90.gif)

[slide]
## 人员权限树(假数据,可以作为运维人员权限展示)
![](http://7xjoq9.com1.z0.glb.clouddn.com/log91.gif)

[slide]
## 流量图(假数据，可以作为机房之间，或者网卡的流量)
![](http://7xjoq9.com1.z0.glb.clouddn.com/log92.gif)

[slide]
## 日志统计汇总（假数据，可以用来展示年日志数据汇总）

![](http://7xjoq9.com1.z0.glb.clouddn.com/log93.gif)

[slide]
## 区域数据汇总饼图展示（假数据，可选择省份，生成饼图）
![](http://7xjoq9.com1.z0.glb.clouddn.com/log94.gif)

[slide]

## 3D展示机房（网上盗图，后续会做一个类似的开源）
### json生成，实时查看机器状态，点击时间

![](http://7xjoq9.com1.z0.glb.clouddn.com/chatu74183cdd15be4002cc193d783b5911a7.png)

[slide]
### 3D展示不止于此 有图有XX
![](http://7xjoq9.com1.z0.glb.clouddn.com/log95.gif)

[slide]

![](http://7xjoq9.com1.z0.glb.clouddn.com/log96.gif)
[slide]



![](http://7xjoq9.com1.z0.glb.clouddn.com/log97.gif)


[slide]

![](http://7xjoq9.com1.z0.glb.clouddn.com/log98.gif)


[slide]

# 谢谢！

![](http://7xjoq9.com1.z0.glb.clouddn.com/erweima.jpg)

















