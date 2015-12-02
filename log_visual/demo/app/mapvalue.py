from . import app,db
from flask import render_template
import json
import random

@app.route('/map_value')
def map_value():
	return render_template('map_value.html')

@app.route('/valuedata')
def valuedata():
	sql = 'select * from log_map where status=200 or status=404'
	cur = db.execute(sql)
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