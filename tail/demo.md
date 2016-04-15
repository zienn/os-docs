# python10min系列之面试题解析：python实现tail -f功能

![](http://pythonbook.applinzi.com/img/pytail/01.jpg)

这篇文章最初是因为reboot的群里，有人去面试，笔试题有这个题，不知道怎么做，什么思路，就发群里大家讨论

我想了一下，简单说一下我的想法吧，当然，也有很好用的pyinotify模块专门监听文件变化，不过我更想介绍的，是解决的思路，毕竟作为面试官，还是想看到一下解决问题的思路,而且我觉得这一题的难点不在于监控文件增量，而在于怎么打印最后面10行

希望大家读这篇文章前，对python基础、处理文件和常用模块有一个简单的了解，知道下面几个名词是啥

```python

open('a.txt')
file.seek
file.tell
time.sleep()

```

下面思路限于我个人知识，免不了有错误和考虑不周的，希望大家有更好的方法提出来，我随时优化代码,题目的感觉没啥太多的坑，下面让天真烂漫的蜗牛教大家用python实现

## 怎么用python实现

其实思路也不难啦

* 打开这个文件，指针移到最后
* 每隔一秒就尝试readline一下，有内容就打印出来，没内容就sleep
* 大概就是这么个意思

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

![](http://pythonbook.applinzi.com/img/pytail/02.gif)

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

```python

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

```python

# 使用默认的sys.stdout.write打印到屏幕
py_tail = Tail('test.txt')
py_tail.follow()

# 自己定义处理函数

def test_tail(line):
    print 'xx'+line+'xx'

py_tail1 = Tail('test.txt', test_tail)
py_tail1.follow()

```


咦 等等，tail -f 默认还会打印最后10行，这个好像才是这个题目的难点所在，众所周知，python里读文件指针，只能移动到固定位置，不能判断是哪一行，囧，先实现简单的，逐渐加强吧

## 默认打印最后10行

现在这个代码，大概能拿6分啦，我们还有一个功能没做，那就是打印最后n行，默认是10行，现在把这个功能加上，加一个函数就行啦

### 文件小的时候

我们知道，readlines可以获取所有内容，并且分行，代码呼之欲出，获取list最后10行很简单有么有,切片妥妥的

```python
# 演示代码，说明核心逻辑，完整代码在下面
last_lines = f.readlines()[-10:]
for line in last_lines:
    self.callback(line)


```

此时代码变成这样了

```python

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


### 更进一步：大的日志怎么办

但是如果文件特别大呢，特别是日志文件，很容易几个G，我们只需要最后几行，全部读出来内存受不了，所以我们要继续优化showLastLine函数，我觉得这才是这题的难点所在

大概的思路如下

* 我先估计日志一行大概是100个字符，注意，我只是估计一个大概，多了也没关系，我们只是需要一个初始值，后面会修正

* 我要读十行，所以一开始就seek到离结尾1000的位置seek(-1000,2)，把最后1000个字符读出来，然后有一个判断

* 如果这1000个字符长度大于文件长度，不用管了 属于级别1的情况，直接read然后split

* 如果1000个字符里面的换行符大于10，说明1000个字符里，大于10行，那也好办，处理思路类似级别1，直接split取后面十个

* 问题就在于 如果小于10怎么处理
    - 比如1000个里，只有四个换行符，说明一行大概是1000/4=250个字符，我们还缺6行，所以我们再读250*5=1500，一共有2500的大概比较靠谱，然后在对2500个字符进行相同的逻辑判断，直到读出的字符里，换行符大于10，读取结束

逻辑清晰以后，代码就呼之欲出啦

```python
# coding=utf-8
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
                self._file.seek(0,2)
                self.file_length = self._file.tell()
                self.showLastLine(n)
                while True:
                    line = self._file.readline()
                    if line:
                        self.callback(line)
                    time.sleep(1)
        except Exception,e:
            print '打开文件失败，囧，看看文件是不是不存在，或者权限有问题'
            print e
    def showLastLine(self, n):
        len_line = 100
        read_len = len_line*n
        while True:
            if read_len>self.file_length:
                self._file.seek(0)
                last_lines = self._file.read().split('\n')[-n:]
                break
            self._file.seek(-read_len, 2)
            last_words = self._file.read(read_len)
            count = last_words.count('\n')          
            if count>=n:
                last_lines = last_words.split('\n')[-n:]
                break
            else:
                if count==0:
                    len_perline = read_len
                else:
                    len_perline = read_len/count
                read_len = len_perline * n
        for line in last_lines:
            self.callback(line+'\n')
if __name__ == '__main__':
    py_tail = Tail('test.txt')
    py_tail.follow()

```

加上注释的版本


```python
# coding=utf-8
import sys
import time

class Tail():
    def __init__(self,file_name,callback=sys.stdout.write):
        self.file_name = file_name
        self.callback = callback
    def follow(self,n=10):
        try:
            # 打开文件
            with open(self.file_name) as f:
                self._file = f
                self._file.seek(0,2)
                # 存储文件的字符长度
                self.file_length = self._file.tell()
                # 打印最后10行
                self.showLastLine(n)
                # 持续读文件 打印增量
                while True:
                    line = self._file.readline()
                    if line:
                        self.callback(line)
                    time.sleep(1)
        except Exception,e:
            print '打开文件失败，囧，看看文件是不是不存在，或者权限有问题'
            print e
    def showLastLine(self, n):
        # 一行大概100个吧 这个数改成1或者1000都行
        len_line = 100
        # n默认是10，也可以follow的参数传进来
        read_len = len_line*n
        # 用last_lines存储最后要处理的内容
        while True:
            # 如果要读取的1000个字符，大于之前存储的文件长度
            # 读完文件，直接break
            if read_len>self.file_length:
                self._file.seek(0)
                last_lines = self._file.read().split('\n')[-n:]
                break
            # 先读1000个 然后判断1000个字符里换行符的数量
            self._file.seek(-read_len, 2)
            last_words = self._file.read(read_len)
            # count是换行符的数量
            count = last_words.count('\n')
            
            if count>=n:
                # 换行符数量大于10 很好处理，直接读取
                last_lines = last_words.split('\n')[-n:]
                break
            # 换行符不够10个
            else:
                # break
                #不够十行
                # 如果一个换行符也没有，那么我们就认为一行大概是100个
                if count==0:

                    len_perline = read_len
                # 如果有4个换行符，我们认为每行大概有250个字符
                else:
                    len_perline = read_len/count
                # 要读取的长度变为2500，继续重新判断
                read_len = len_perline * n
        for line in last_lines:
            self.callback(line+'\n')
if __name__ == '__main__':
    py_tail = Tail('test.txt')
    py_tail.follow(20)


```


效果如下，终于可以打印最后几行了，大家可以试一下，无论日志每行只有1个，还是每行有300个字符，都是可以打印最后10行的
![](http://pythonbook.applinzi.com/img/pytail/03.gif)


能做到这个地步，一般的面试官就直接被你搞定了，这个代码大概8分吧，如果还想再进一步，还有一些可以优化的地方，代码放[github](https://github.com/shengxinjing/pytail/blob/master/tail.py)上了，有兴趣的可以拿去研究

待优化：留给大家作为扩展

* 如果你tail -f的过程中，日志被备份清空或者切割了，怎么处理
    * 其实很简单，你维护一个指针位置，如果下次循环发现文件指针位置变了，从最新的指针位置开始读就行
* 具体每种错误的类型
    * 我这里只是简单的try 可以写个函数，把文件不存在，文件没权限这些报错信息分开
* 性能小优化，比如我第一次读了1000，只有4行，我大概估计每行250个字符，总体需要2500行，下次没必要直接读2500个，而是读1500行和之前1000行拼起来即可

最后大杀器 如果写出来这个，基本面试官会直接

```python

import os
def tail(file_name):
    os.system('tail -f '+file_name)

tail('log.log')

```

打死你
![](http://7xjoq9.com1.z0.glb.clouddn.com/chatuchatu1.png)

以上就是我对这个题的想法，实际开发中想监控文件变化，其实还是pyinotify好用，跪求大家star

最后做个小广告，欢迎大家关注公共号,高品质运维开发，我们每周五晚上还会做线上公开课，加QQ368573673报名即可，都是关于linux，运维，python和前端的相关内容

![](http://pythonbook.applinzi.com/img/erweima.jpg)

如果您觉得有我写的东西对你帮助，可以打赏点钱给我支付宝支付宝316783812@qq.com或者扫二维码


![](http://pythonbook.applinzi.com/img/zhifubao.png)

