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
	ip = arr[0]
	url = arr[6]
	status = arr[8]
	res[(ip,url,status)] = res.get((ip,url,status),0)+1
res_list = [(k[0],k[1],k[2],v) for k,v in res.items()]



for s in res_list:
	# if s[3]<5:
		# continue
	sql = 'insert log values ("%s","%s",%s,%s)' % s
	print sql
	try:
		cur.execute(sql)
	except Exception, e:
		pass


# for k in sorted(res_list,key=lambda x:x[3],reverse=True)[:10]:
# 	print k