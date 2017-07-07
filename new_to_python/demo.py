# coding=utf-8


# name='woniu'
# if name=='woniu':
#     print 'hello'
# def printToOne(n):
#     while n>0:
#         print n
#         n -=1
# printToOne(10)
# 
# 


# s = '''hello thank you !thank you very much
# how are you  Indian mi fans,do you like mi 4i?
# ok Indian mi fans do you like mi band?
# '''
# rs = {}
# for l in s:
# 	if l==' ':
# 		continue
# 	rs[l] = rs.get(l,0)+1
# print sorted(rs.items(),key=lambda x:x[1],reverse=True)[:3]


# from flask import Flask,render_template
# app = Flask(__name__)

# @app.route('/')
# def index():
# 	return 'hello world'


# @app.route('/list')
# def list():
# 	return render_template('xx.html')
# if __name__ == '__main__':
# 	app.run(port=9092)
# 	

# import requests
# url = 'http://51reboot.com/images/erweima.jpg'
# r = requests.get(url)
# with open(url.split('/')[-1],'w') as f:
# 	f.write(r.content)

# import requests
# token = 'QspXzwz6rO3IviR33HDf8Czv05pR7XoT'
# url_pre = 'http://api.map.baidu.com/location/ip'
# ip = raw_input('please input your IP: ')
# #ip = '123.118.119.18' # '58.66.240.0'

# url = '%s?ip=%s&ak=%s&coor=bd09ll'%(url_pre,ip,token)

# res = requests.get(url).json()
# print res['content']['address']


# from pyquery import PyQuery as pq
# import requests
# url = 'https://movie.douban.com/top250'
# content = requests.get(url).text

# for movie in pq(content).find('.info'):
# 	mov = pq(movie)
# 	title = mov.find('.title').html()
# 	score = mov.find('.rating_num').text()
# 	comment = mov.find('.quote').text()
# 	print title
# 	print '  '+score+comment






