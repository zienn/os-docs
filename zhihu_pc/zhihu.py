# coding='utf-8'
import requests
from pyquery import PyQuery as pq
import os,sys

reload(sys)
sys.setdefaultencoding("utf-8")
url = 'http://zhuanlan.zhihu.com/api/columns/weekly/posts?limit=100'

r = requests.get(url)
res = '<html><meta charset="utf-8"><link rel="stylesheet" href="http://z1.zhimg.com/styles/5a8458ed.main.css"><body>'

res += '<div style="width:1000px" class="main receptacle post-view">'
for obj in r.json()[::-1]:
	res+='<div class="entry-content">'

	res += '<h1 style="font-size:25px">'+obj['title']+'</h1><hr>'
	res += obj['publishedTime']
	res += obj['content']
	res+='</div>'
res +="</div>"
res+='</body></html>'
with open('res.html','w') as f:

	f.write(res)
