# 简易的内存监控系统

本文的目的在于，尽可能用简单的代码，让大家了解内存监控的原理
主题思路
* 获取内存信息
* 存储信息
    - mysql
    - 新建数据库 新建表格（内存 时间）
    - 内存数据入库
    - done
* 展现
    - web选页面
    - 图表展现
        + 假数据先把图画出来
        + python提供真实数据
        + 实时展现
            * Python端能提供增量数据
                - 通过时间戳
            * 前端轮训，动态添加增量数据
* 扩展
    - 加主机名,moitor部署在多台机器，不直接插数据库
    - 通过http请求的方式，一台机器起flask专门存数据monitor

## 第一步，我们需要获取内存信息

其实所有的监控项，包括内存数据，都是从文件中读取的，大家执行以下 cat /proc/meminfo就可以看到关于内存的信息，我们关注的是前四行，总内存，空闲内存，缓冲和缓存大小

计算内存占用量公式：
> (总内存-空闲内存-缓冲-缓存)Mb

代码呼之欲出 monitor.py

```python

def getMem():
    f = open('/proc/meminfo')
    total = int(f.readline().split()[1])
    free = int(f.readline().split()[1])
    buffers = int(f.readline().split()[1])
    cache = int(f.readline().split()[1])
    mem_use = total-free-buffers-cache
    print mem_use/1024
while True:
    time.sleep(1)
    getMem()

```

执行文件 python monitor.py，每一秒打印一条内存信息

```
[woniu@teach memory]$ python mointor.py 
2920
2919
2919
2919
2919

```


获取内存数据done!

## 存储数据库

###我们选用mysql 

新建表格,我们需要两个字段，内存和时间 sql呼之欲出

```sql
create memory(memory int,time int)
```

