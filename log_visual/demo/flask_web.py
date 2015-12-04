from app import app
# sys.path.insert(1, os.path.join(sys.path[0], '.'))


if __name__=="__main__":
	app.run(host='0.0.0.0',port=9092,debug=True)
