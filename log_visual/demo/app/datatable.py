from . import app,db
from flask import render_template

@app.route('/datatable')
def datatable():
	c = db.execute('select * from log1 where value>5')
	return render_template('datatable.html',data=c.fetchall())