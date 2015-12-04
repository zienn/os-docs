# coding=utf-8
from . import app,db
from flask import render_template
import json
import random


@app.route('/map_line')
def map_line():
	return render_template('map_line.html')

@app.route('/linedata')
def linedata():
	sql = 'select * from log_map where status=304 or status=404 and value>10'
	cur = db.execute(sql)
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
	res['bj_line'] = res['bj_line'][::5]
	res['bj_point'] = res['bj_point'][::5]
	return json.dumps(res)
