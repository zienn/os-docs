
# python10min系列之多线程下载器

![](http://51reboot.com/src/blogimg/downloader/01.png)

今天群里看到有人问关于python多线程写文件的问题，联想到这是reboot的架构师班的入学题，我想了一下，感觉坑和考察的点还挺多，可以当成一个面试题来问，简单说一下我的想法和思路吧，涉及的代码和注释在[github](https://github.com/shengxinjing/my_blog/blob/master/downloader/downloader.py) 跪求star

本文需要一定的python基础，希望大家对下面几个知识点有所了解

```
python文件处理，open write
简单了解http协议头信息
os，sys模块
threading模块多进程
requests模块发请求
```


题目既然是多线程下载，首先要解决的就是下载问题，为了方便测试，我们先不用QQ安装包这么大的，直接用pc大大英明神武又很内涵的头像举例，大概是这个样子(http://51reboot.com/src/blogimg/pc.jpg)

![](http://51reboot.com/src/blogimg/pc.jpg)


## 下载

python的requests模块很好的封装了http请求，我们选择用它来发送http的get请求，然后写入本地文件即可（关于requests和http，以及python处理文件的具体介绍，可以百度或者持续关注，后面我会写），思路既然清楚了，代码就呼之欲出了


```python
# 简单粗暴的下载
import requests

res=requests.get('http://51reboot.com/src/blogimg/pc.jpg')
with open('pc.jpg','w') as f:
    f.write(res.content)

```

运行完上面的代码，文件夹下面多了个pc.jpg 就是你想要的图片了

上面代码功能太少了，注意 ，我们的要求是多线程下载，这种简单粗暴的下载完全不符合要求，所谓多线程，你可以理解为仓库里有很多很多袋奥利奥饼干，老板让我去都搬到公司来放好，而且要按照原顺序放好

上面的代码，大概就是我一个人去仓库，把所有奥利奥一次性拿回来，大概流程如下（图不清戳大）

![](http://51reboot.com/src/blogimg/downloader/02.png)

我们如果要完成题目多线程的要求，首先就要把任务拆解，拆成几个子任务，子任务之间可以并行执行，并且执行结果可以汇总成最终结果


## 拆解任务

为了完成这个任务，我们首先要知道数据到底有多大，然后把数据分块去取就OK啦，我们要对http协议有一个很好的了解

* 用head方法请求数据，返回只有http头信息，没有主题部分
    - 我们从头信息Content-length的值，知道资源的大小，比如有50字节
* 比如我们要分四个线程，每个线程去取大概1/4即可
    - 50/4=12，所以前几个线程每人取12个字节，最后一个现成取剩下的即可
* 每个线程取到相应的内容，文件中seek到相应的位置再写入即可
    - file.seek
* 为了方便理解，一开始我们先用单线程的跑通 流程图大概如下（图不清戳大）

![](http://51reboot.com/src/blogimg/downloader/033.png)

思路清晰了，代码也就呼之欲出了，我们先测试一下range头信息

> http头信息中的Range信息，用于请求头中，指定第一个字节的位置和最后一个字节的位置，如1-12，如果省略第二个数，就认为取到最后，比如36-


```python

# range测试代码
import requests
# http头信息，指定获取前15000个字节
headers={'Range':'Bytes=0-15000','Accept-Encoding':'*'}
res=requests.get('http://51reboot.com/src/blogimg/pc.jpg',headers=headers)

with open('pc.jpg','w') as f:
    f.write(res.content)

```

我们得到了头像的前15000个字节，如下图，目测range是对的

![](http://51reboot.com/src/blogimg/downloader/04.png)

继续丰富我们的代码

* 要先用requests.head方法去获取数据的长度
* 确认开几个线程后，给每个线程确认要获取的数据区间，即Range字段的值
* seek写文件
* 功能比较复杂了，我们需要用面向对象来组织一下代码
* 先写单线程，逐步优化
* 代码呼之欲出了

```python
import requests
# 下载器的类
class downloader:
    # 构造函数
    def __init__(self):
        # 要下载的数据连接
        self.url='http://51reboot.com/src/blogimg/pc.jpg'
        # 要开的线程数
        self.num=8
        # 存储文件的名字，从url最后面取
        self.name=self.url.split('/')[-1]
        # head方法去请求url
        r = requests.head(self.url)
        # headers中取出数据的长度
        self.total = int(r.headers['Content-Length'])
        print type('total is %s' % (self.total))
    def get_range(self):
        ranges=[]
        # 比如total是50,线程数是4个。offset就是12
        offset = int(self.total/self.num)
        for i in  range(self.num):
            if i==self.num-1:
                # 最后一个线程，不指定结束位置，取到最后
                ranges.append((i*offset,''))
            else:
                # 没个线程取得区间
                ranges.append((i*offset,(i+1)*offset))
        # range大概是[(0,12),(12,24),(25,36),(36,'')]
        return ranges
    def run(self):

        f = open(self.name,'w')
        for ran in self.get_range():
            # 拼出Range参数 获取分片数据
            r = requests.get(self.url,headers={'Range':'Bytes=%s-%s' % ran,'Accept-Encoding':'*'})
            # seek到相应位置
            f.seek(ran[0])
            # 写数据
            f.write(r.content)
        f.close()

if __name__=='__main__':
    down = downloader()
    down.run()


```


## 多线程

多线程和多进程是啥在这就不多说了，要说明白还得专门写个文章，大家知道threading模块是专门解决多线程的问题就OK了，大概的使用方法如下，更详细的请百度或者关注后续文章

* threading.Thread创建线程，设置处理函数
* start启动
* setDaemon 设置守护进程
* join设置线程等待
* 代码如下


```python
import requests
import threading

class downloader:
    def __init__(self):
        self.url='http://51reboot.com/src/blogimg/pc.jpg'
        self.num=8
        self.name=self.url.split('/')[-1]
        r = requests.head(self.url)
        self.total = int(r.headers['Content-Length'])
        print 'total is %s' % (self.total)
    def get_range(self):
        ranges=[]
        offset = int(self.total/self.num)
        for i in  range(self.num):
            if i==self.num-1:
                ranges.append((i*offset,''))
            else:
                ranges.append((i*offset,(i+1)*offset))
        return ranges
    def download(self,start,end):
        headers={'Range':'Bytes=%s-%s' % (start,end),'Accept-Encoding':'*'}
        res = requests.get(self.url,headers=headers)
        print '%s:%s download success'%(start,end)
        self.fd.seek(start)
        self.fd.write(res.content)
    def run(self):
        self.fd =  open(self.name,'w')
        thread_list = []
        n = 0
        for ran in self.get_range():
            start,end = ran
            print 'thread %d start:%s,end:%s'%(n,start,end)
            n+=1
            thread = threading.Thread(target=self.download,args=(start,end))
            thread.start()
            thread_list.append(thread)
        for i in thread_list:
            i.join()
        print 'download %s load success'%(self.name)
        self.fd.close()
if __name__=='__main__':
    down = downloader()
    down.run()


```

执行python downloader效果如下

```

total is 21520
thread 0 start:0,end:2690
thread 1 start:2690,end:5380
thread 2 start:5380,end:8070
thread 3 start:8070,end:10760
thread 4 start:10760,end:13450
thread 5 start:13450,end:16140
thread 6 start:16140,end:18830
thread 7 start:18830,end:
0:2690 is end
2690:5380 is end
13450:16140 is end
10760:13450 is end
5380:8070 is end
8070:10760 is end
18830: is end
16140:18830 is end
download pc.jpg load success

```


run函数做了修改，加了多线程的东西，加了一个download函数专门用来下载数据块，这俩函数详细解释如下

```python

def download(self,start,end):
    #拼接Range字段,accept字段支持所有编码
    headers={'Range':'Bytes=%s-%s' % (start,end),'Accept-Encoding':'*'}
    res = requests.get(self.url,headers=headers)
    print '%s:%s download success'%(start,end)
    #seek到start位置
    self.fd.seek(start)
    self.fd.write(res.content)
def run(self):
    # 保存文件打开对象
    self.fd =  open(self.name,'w')
    thread_list = []
    #一个数字,用来标记打印每个线程
    n = 0
    for ran in self.get_range():
        start,end = ran
        #打印信息
        print 'thread %d start:%s,end:%s'%(n,start,end)
        n+=1
        #创建线程 传参,处理函数为download
        thread = threading.Thread(target=self.download,args=(start,end))
        #启动
        thread.start()
        thread_list.append(thread)
    for i in thread_list:
        # 设置等待
        i.join()
    print 'download %s load success'%(self.name)
    #关闭文件
    self.fd.close()

```

持续可以优化的点

* 一个文件描述符多个进程用会出问题
    - 建议用os.dup复制文件描述符和os.fdopen来打开处理文件
* 要下载的资源地址和线程数,应该做成命令行传进来的
    - 用sys.argv获取命令行参数
    - 支持python downloader.py url num这种写法
    - 参数数量不对或者格式不对时报错
* 各种容错处理
* 正所谓女人的迪奥，男人的奥利奥，这篇文章，你值得拥有

大概就是这样了，我也是正在学习python，文章代表我个人看法，有错误不可避免，欢迎大家指正，共同学习，本文完整代码在[github](https://github.com/shengxinjing/my_blog/blob/master/downloader/downloader.py),跪求大家star

最后做个小广告，欢迎大家关注公共号,高品质运维开发，我们每周五晚上还会做线上公开课，加QQ群368573673报名即可，都是关于linux，运维，python和前端的相关内容

![](http://51reboot.com/src/blogimg/erweima.jpg)

