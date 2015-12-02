# coding=utf-8

import MySQLdb as mysql
# 连接数据库
con = mysql.connect(user='root',\
					passwd='',\
					db='log',\
					host='localhost')
con.autocommit(True)
cur = con.cursor()
# 引入相应模块
import time
import urllib2
import json

# 处理log，根据ip和status
f = open('../../www_access_20140823.log')
res = {}
for l in f:
	arr = l.split(' ')
	ip = arr[0]
	status = arr[8]
	res[(ip,status)] = res.get((ip,status),0)+1
# 处理log完毕

# 循环res，调用百度的接口，根据ip获取经纬度
key = 'q5mTrTGzCSVq5QmGpI9y18Bo'
ipurl = 'http://api.map.baidu.com/location/ip?ak='+key+'&coor=bd09ll&ip='

sqlarr = []
# 防止重复发http请求
ip_cache = {}

def getGeo(ip,status):
	r = (ip,status)	
	try:
		if ip in ip_cache:
			point = ip_cache[ip]
			sqlarr.append((ip,status,point['x'],point['y'],res[r]))
		else:
			u = urllib2.urlopen(ipurl+ip)
			page = json.load(u)
			if 'content' in page:
				point = page['content'].get('point')
				ip_cache[ip] = point
				sqlarr.append((ip,status,point['x'],point['y'],res[r]))
		print point
	except:
		print 'error'


# 是否单线程
single = False
import threading

if single:
	# 单线程比较慢，把大于100的做了，过滤一下数据，方便演示
	for r in res:
		if res[r]>100:
			getGeo(r[0],r[1])
else:
	# 多线程
	workers = []
	for r in res:
		t = threading.Thread(target=getGeo,args=(r))
		t.setDaemon(True)
		t.start()
		workers.append(t)
	for w in workers:
		w.join()
# 循环sqlarr，插库
for s in sqlarr:
	sql = 'insert log_map values ("%s","%s","%s","%s",%s)' % s
	cur.execute(sql)

print len(sqlarr)








