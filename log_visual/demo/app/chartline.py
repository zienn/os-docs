from . import app,db
from flask import render_template
import json

@app.route('/chartline')
def chartline():
	return render_template('/chartline.html')

@app.route('/chartlinedata')
def chartlinedata():
	sql = 'select * from log_time where value>10 order by time  limit 1000'
	cur = db.execute(sql)
	res = {
		304:[],
		200:[]
	}
	for c in cur.fetchall():
		if c[0] in res:
			res[c[0]].append([int(c[1])*1000,c[2],1])
	res[200] = res[200][::6]
	return json.dumps(res)
