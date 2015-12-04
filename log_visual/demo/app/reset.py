from . import app,db
from flask import render_template
import os
# import json

@app.route('/reset')
def reset():
	sql1 = 'delete from log_map'
	sql2 = 'delete from log'
	sql3 = 'delete from log_time'
	db.execute(sql1)
	db.execute(sql2)
	db.execute(sql3)
	return 'ok'
	# return render_template('chart.html')
# @app.route('/chartdata')
# def chartdata():
# 	sql = 'select status,sum(value) from log group by status '
# 	res = {
# 		'label':[],
# 		'data':[]
# 	}