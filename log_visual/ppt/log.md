title: 日志可视化
speaker: Woniuppp
url: https://github.com/ksky521/nodePPT
transition: glue
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: colors



[slide]

# 日志可视化
<small>演讲者：woniuppp</small>


[slide]
## 原材料
----
* 一个标准的access_log日志 大概6W行
* 老板想要这个日志的分析结果，每个url,ip,status分别访问多少次，把前几名统计出来看看
* 分析出统计数据 展现结果


[slide]

## 级别1
----

* 数据处理，命令行展现
* 打开文件，处理完数据后排序
* 打印前10

[slide]
## python代码

```python

f = open('../www_access_20140823.log')
res = {}
for l in f:
    arr = l.split(' ')
    ip = arr[0]
    url = arr[6]
    status = arr[8]
    res[(ip,url,status)] = res.get((ip,url,status),0)+1
res_list = [(k[0],k[1],k[2],v) for k,v in res.items()]

for k in sorted(res_list,key=lambda x:x[3],reverse=True)[:10]:
    print k
```

[slide]
## 处理结果
```
('118.112.143.148', '/images/cursor_zoom.cur', '404', 674)
('118.112.143.148', '/images/cursor_minify.cur', '404', 662)
('221.12.76.53', '/images/cursor_zoom.cur', '404', 220)
('221.12.76.53', '/images/cursor_minify.cur', '404', 218)
('123.174.51.164', '/public/js/weibo.js?20110824', '200', 116)
('123.174.51.164', '/public/js/tbox/box.css?20110820', '200', 116)
('123.174.51.164', '/public/themes/adreambox/main.css?20110820', '200', 116)
('123.174.51.164', '/public/themes/adreambox/link.css', '200', 116)
('123.174.51.164', '/public/js/jquery.jgrow.min.js', '200', 116)
('123.174.51.164', '/public/themes/adreambox/images/btn_top.gif', '200', 116)
```

[slide]
## 任务完成

* 下一步粘到邮件里，或者生成一个csv文件发出去
* 然而这是一个看脸的社会

[slide]

## 级别2
### 存数据库，浏览器端展现
生成list之后，拼接sql，存入数据库

[slide]
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
    if s[3]<5:
        continue
    sql = 'insert log1 values ("%s","%s",%s,%s)' % s
    try:
        cur.execute(sql)
    except Exception, e:
        pass
```

[slide]
## 前端展现

```
from flask import Flask,request,render_template
app = Flask(__name__)

import MySQLdb as mysql
con = mysql.connect(user='root',\
                    passwd='',\
                    db='log',\
                    host='localhost')
con.autocommit(True)
cur = con.cursor()

@app.route('/')
def index():
    table = '<table border="1">'
    cur.execute('select * from log1')
    for c in cur.fetchall():
        table += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'%c
    table +='</table>'
    return table

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9092)
```

[slide]

![表格](/00.png)


[slide]
## 前端展现上做一些优化

* 分页
* 表格排序
* 搜索
* 控制每页显示数量

[slide]

![表格](/01.png)

[slide]

![表格](/datatable.png)

[slide]

## python代码

```

@app.route('/table')
def table():
    table = '<table border="1">'
    c = db.execute('select * from log1 where value>5')
    for l in c.fetchall():
        table += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'%l
    table +='</table>'
    return table

```


[slide]

```
{% if data %}
<table class="table table-striped table-bordered table-hover" id="dataTables-example">
    <thead>
        <tr>
            <th>IP</th>
            ...
        </tr>
    </thead>
    <tbody>
        {% for d in data %}
        <tr>
            <td>{{d[0]}}</td>
            <td class='wd100'>{{d[1]}}</td>
            ...
        </tr>
        {% endfor %}
    </tbody>
</table>
{% endif %}

```

[slide]

```
$('#dataTables-example').DataTable({
    responsive: true,
});
```

[slide]

## 汇总信息可视化
### 根据https状态汇总

![](/chart01.png)

[slide]

## 并不仅限于此
### 拖拽重计算：304和404一起的比例肿么办

![](/chart02.png)

[slide]

## 其他功能

* 图例开关
* 图表转换
* 数据视图
* 直接导出图片


[slide]

## 访问图


[slide]

## 区域图
### 根据ip更友好和直观地显示数据

![](/map01.png)



















