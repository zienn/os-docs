from . import app,db
from flask import render_template
import json

@app.route('/map_region')
def map1():
	return render_template('map01.html')
@app.route('/regiondata')
def mapdata1():
	sql = 'select * from log_map'
	cur = db.execute(sql)
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