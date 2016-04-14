# 一个经典的面试题--用python实现tail -f


这篇文章最初是因为reboot的群里，有人去面试，笔试题有这个题，不知道怎么做，什么思路，就发群里大家讨论，后来又有人抛出这个问题，我就简单说一下我的想法吧，希望大家读这篇文章前，对python基础、处理文件和常用模块有一个简单的了解，知道下面几个名词是啥

* open('a.txt')
* f.seek
* f.tell
* time.sleep()

## 关于题目

熟悉linux的运维小伙伴们应该对这个命令很熟悉了，tail -f就是看日志神器啊，能够追踪最新的日志变化，实时看到最新的日志，题目的意思，感觉没啥太多的坑，下面说下python的思路

## 怎么用python实现

其实思路也不难啦

* 打开这个文件，指针移到最后
* 每隔一秒就尝试readline一下，有内容就打印出来，没内容就sleep
* 大概就是这么个意思

咦 等等，tail -f 默认还会打印最后20行，这个好像才是这个题目的难点所在，众所周知，python里读文件指针，只能移动到固定位置，不能判断是哪一行，囧，先实现简单的，逐渐加强吧

## 监听文件
思路如下：

* 用open打开文件
* 用seek文件指针，给大爷把跳到文件最后面
* while True进行循环
    - 持续不停的readline，如果能读到内容，打印出来即可

代码呼之欲出

```python

with open('test.txt') as f:
    f.seek(0,2)
    while True:
        last_pos = f.tell()
        line = f.readline()
        if line:
            print line

```

效果图如下

代码说明

* seek第二个参数2，意思就是从文件结尾处开始seek，更标准的写法使用os模块下面的SEEK_END，可读性更好
* 只写出了简单的逻辑，代码简单粗暴，如果这个题目是10分的话，最多也就拿4分吧,不能再多了

优化点

* print有缺陷，每次都是新的一行，换成sys.stdout.write(line)更和谐
* 文件名传参，不能写死
* 直接打印可以当成默认行为，具体要做什么，可以写成函数处理，这样我们就可以把新行做其他处理，比如展示在浏览器里
* 加上容错处理，比如文件不存在会报错
* while True一直都文件，比较耗性能，每读一次，间隔一秒比较靠谱
    - 调用time.sleep(1)
* 用类来组织代码

实例代码如下

```

# coding=utf-8
import sys
import time

class Tail():
    def __init__(self,file_name,callback=sys.stdout.write):
        self.file_name = file_name
        self.callback = callback
    def follow(self):

        try:
            with open(self.file_name) as f:
                f.seek(0,2)
                while True:
                    line = f.readline()
                    if line:
                        self.callback(line)
                    time.sleep(1)
        except Exception,e:
            print '打开文件失败，囧，看看文件是不是不存在，或者权限有问题'
            print e

```

使用方法:

```

# 使用默认的sys.stdout.write打印到屏幕
py_tail = Tail('test.txt')
py_tail.follow()

# 自己定义处理函数

def test_tail(line):
    print 'xx'+line+'xx'

py_tail1 = Tail('test.txt', test_tail)
py_tail1.follow()

```

## 默认打印最后10行

现在这个代码，大概能拿6分啦，我们还有一个功能没做，那就是打印最后n行，默认是10行，现在把这个功能加上，加一个函数就行啦

### 级别1，文件小的时候

我们知道，readlines可以获取所有内容，并且分行，代码呼之欲出，获取list最后10行很简单有么有,切片妥妥的

```
# 演示代码，说明核心逻辑，完整代码在下面
last_lines = f.readlines()[-10:]
for line in last_lines:
    self.callback(line)


```

此时代码变成这样了

```

import sys
import time

class Tail():
    def __init__(self,file_name,callback=sys.stdout.write):
        self.file_name = file_name
        self.callback = callback
    def follow(self,n=10):
        try:
            with open(self.file_name) as f:
                self._file = f
                self.showLastLine(n)
                self._file.seek(0,2)
                while True:
                    line = self._file.readline()
                    if line:
                        self.callback(line)
        except Exception,e:
            print '打开文件失败，囧，看看文件是不是不存在，或者权限有问题'
            print e
    def showLastLine(self, n):
        last_lines = self._file.readlines()[-10:]
        for line in last_lines:
            self.callback(line)

```


### 更进一步

此时代码有7分时很随意啦，但是如果文件特别大呢，特别是日志文件，很容易几个G，我们只需要最后几行，全部读出来显然不合理，所以我们要继续优化showLastLine函数

大概的思路如下
我估计日志一行大概是100个字符，注意，我只是估计一个大概，多了也没关系，我们只是需要一个初始值，后面会修正

我要读十行，所以一开始就seek到离结尾1000的位置seek(-1000,2)，把最后1000个字符读出来，然后有一个判断

如果这1000个字符长度大于文件长度，不用管了 文件很小，直接split

如果1000个字符里面的换行符大于10，那也好办，直接split

问题就在于 如果小于10怎么处理
    比如1000个里，只有四个换行符，说明一行大概是1000/4=250个字符，我们还缺6行，所以我们再读250*5=1500个再比较即可，如果再度1500个还是少，就继续这么处理










