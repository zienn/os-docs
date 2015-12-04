import sys
import os
from flask import  Flask,render_template
app = Flask(__name__)

from dbutil.dbutil import DB
# import dbutil.
db = DB(host="localhost", mysql_user="root", mysql_pass="", \
                mysql_db="log")
import table,datatable,chart,chartline,mapregion,mapvalue,mapline,reset

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/next')
def next():
	return render_template('next.html')
@app.route('/code')
def code():
	return render_template('code.html')
