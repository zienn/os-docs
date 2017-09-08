#coding=utf-8
from flask import Flask
from pyquery import PyQuery as pq
import json
import requests

app = Flask(__name__)

@app.route('/zhixing')
def zhixing():
    url = 'http://zhixing.bjtu.edu.cn/portal.php'
    headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
    zx= requests.get(url,headers=headers)
    zx_page = pq(zx.text)
    res = {
        'top3':[],
        'top10':[],
        'imgList':[],
        'headImg':zx_page.find('.a_mu img').attr('src')
    }
    for image in zx_page.find('.slideshow>li'):
        t = pq(image).text()
        img = pq(image).find('img').attr('src')
        res['imgList'].append({
            'title':t,
            'img':img
        })
    for top3 in zx_page.find('#portal_block_654 dt'):
        t = pq(top3).text()
        sub = pq(top3).next().text()
        res['top3'].append({
            'title':t,
            'sub':sub
        })

    for top10 in zx_page.find('#portal_block_617 li>a'):
        t = pq(top10).text()
        user = pq(top10).prev().text()
        res['top10'].append({
            'title':t,
            'user':user
        })

    return json.dumps(res)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=9092,debug=True)