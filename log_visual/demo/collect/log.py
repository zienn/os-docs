f = open('../www_access_20140823.log')
res = {}
for l in f:
	arr = l.split(' ')
	ip = arr[0]
	url = arr[6]
	status = arr[8]
	res[(ip,url,status)] = res.get((ip,url,status),0)+1
	break
res_list = [(k[0],k[1],k[2],v) for k,v in res.items()]

for k in sorted(res_list,key=lambda x:x[3],reverse=True)[:10]:
	print k