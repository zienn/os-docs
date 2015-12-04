# print 
import time
import MySQLdb as mysql
con = mysql.connect(user='root',\
					passwd='',\
					db='log',\
					host='localhost')
con.autocommit(True)
cur = con.cursor()


f = open('../../www_access_20140823.log')
res = {}
for l in f:
	arr = l.split(' ')
	status = arr[8]
	datetime = arr[3][1:]
	timestamp = time.mktime(time.strptime(datetime,'%d/%b/%Y:%H:%M:%S'))
	key = (status,timestamp)
	res[key] = res.get(key,0)+1
print len(res)
res_list = [(k[0],int(k[1]),v) for k,v in res.items()]
for k in sorted(res_list,key=lambda x:x[2],reverse=True):
	sql = 'insert into log_time values (%s,%s,%s)' % k
	print sql
	try:
		cur.execute(sql)
	except Exception, e:
		print 'error'
