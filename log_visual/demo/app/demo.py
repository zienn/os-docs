# coding=utf-8
import json
from flask import Flask,request,render_template
app = Flask(__name__)
import random
import MySQLdb as mysql
con = mysql.connect(user='root',\
					passwd='',\
					db='log',\
					host='localhost')
con.autocommit(True)
cur = con.cursor()

@app.route('/')
def index():
	return render_template('index.html')
@app.route('/next')
def next():
	return render_template('next.html')
@app.route('/code')
def code():
	return render_template('code.html')


@app.route('/table')
def table():
	table = '<table border="1">'
	cur.execute('select * from log where value>5')
	for c in cur.fetchall():
		table += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'%c
	table +='</table>'
	return table

@app.route('/datatable')
def datatable():
	cur.execute('select * from log where value>5')
	return render_template('datatable.html',data=cur.fetchall())

@app.route('/chart')
def chart():
	return render_template('chart.html')
@app.route('/chartdata')
def chartdata():
	sql = 'select status,sum(value) from log group by status '
	res = {
		'label':[],
		'data':[]
	}
	cur.execute(sql)
	for c in cur.fetchall():
		res['label'].append(str(c[0]))
		res['data'].append({'name':str(c[0]),'value':int(c[1])})
	return json.dumps(res)


@app.route('/chartline')
def chartline():
	return render_template('/chartline.html')

@app.route('/chartlinedata')
def chartlinedata():
	sql = 'select * from log_time where value>10 order by time  limit 1000'
	cur.execute(sql)
	res = {
		304:[],
		200:[]
	}
	for c in cur.fetchall():
		if c[0] in res:
			res[c[0]].append([int(c[1])*1000,c[2],1])
	res[200] = res[200][::6]
	return json.dumps(res)



# @app.route('/linedata')
# def linedata():
# 	sql = 'select status,sum(value) from log group by status '
# 	res = {
# 		'label':[],
# 		'data':[]
# 	}
# 	cur.execute(sql)
# 	for c in cur.fetchall():
# 		res['label'].append(str(c[0]))
# 		res['data'].append({'name':str(c[0]),'value':int(c[1])})
# 	return json.dumps(res)


# 亮点图，突出404，200 和304 不关注value
@app.route('/map_region')
def map1():
	return render_template('map01.html')
@app.route('/regiondata')
def mapdata1():
	sql = 'select * from log_map'
	cur.execute(sql)
	res = {
		200:[],
		404:[],
		304:[],
		'label':[200,404,304]
	}
	for c in cur.fetchall():
		o = {
			"geoCoord":[c[2],c[3]],
			'name':c[0],
			'value':c[4]
		}
		if c[1] in res:
			res[c[1]].append(o)
			# arr.append(o)
	# print res
	return json.dumps(res)


@app.route('/map_value')
def map_value():
	return render_template('map_value.html')

@app.route('/valuedata')
def valuedata():
	sql = 'select * from log_map where status=200 or status=404'
	cur.execute(sql)
	res = {
		'top5':[]
	}
	arr = sorted(cur.fetchall(),key=lambda x:x[4],reverse=True)[:200]
	res['max'] = arr[0][4]
	res['min'] = arr[-1][4]
	i = 5
	for c in arr:
		o = {
			"geoCoord":[float(c[2])-0.5+random.random(),float(c[3])-0.5+random.random()],
			'name':c[0],
			'value':c[4]
		}

		res.setdefault(c[1],[])
		res[c[1]].append(o)
		
		if i>=0:
			i -= 1
			res['top5'].append(o)

	return json.dumps(res)

@app.route('/map_line')
def map_line():
	return render_template('map_line.html')

@app.route('/linedata')
def linedata():
	sql = 'select * from log_map where status=304 or status=404 and value>10'
	cur.execute(sql)
	# 假数据 上海和北京
	res = {
		'geoData':{
			'sh': [121.4648,31.2891],
            'bj': [116.4551,40.2539]

		},
		'sh_line':[],
		'sh_point':[],
		'bj_line':[],
		'bj_point':[]
	}
	# arr = cur.fetchall()
	arr = sorted(cur.fetchall(),key=lambda x:x[4],reverse=True)
	res['max'] = arr[0][4]
	res['min'] = arr[-1][4]
	# i = 5
	for c in arr:
		res['geoData'][c[0]] = [float(c[2])-0.5+random.random(),float(c[3])-0.5+random.random()]
		
		if c[1]==304:
			point = {"name":c[0],"value":c[4]}
			res['bj_point'].append(point)
			line = [{"name":'bj'}, point]
			res['bj_line'].append(line)
		elif c[1]==404:
			point = {"name":c[0],"value":c[4]}
			res['sh_point'].append(point)
			line = [{"name":'sh'}, point]
			res['sh_line'].append(line)
		# o = {
		# 	"geoCoord":[float(c[2])-0.5+random.random(),float(c[3])-0.5+random.random()],
		# 	'name':c[0],
		# 	'value':c[4]
	# res['bj_line'] = res['bj_line'][::5]
	# res['bj_point'] = res['bj_point'][::5]
	return json.dumps(res)








if __name__ == '__main__':
	app.run(host='0.0.0.0',port=9092,debug=True)