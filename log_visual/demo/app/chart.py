from . import app,db
from flask import render_template
import json

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
	cur = db.execute(sql)
	for c in cur.fetchall():
		res['label'].append(str(c[0]))
		res['data'].append({'name':str(c[0]),'value':int(c[1])})
	return json.dumps(res)