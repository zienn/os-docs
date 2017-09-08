var express = require('express');

var app = express();
var request = require('request');
var cheerio = require("cheerio");

app.get('/zhixing', function(req, res) {
  // 知行首页
  var url = 'http://zhixing.bjtu.edu.cn/portal.php'
  var options = {
    url: url,
    // 模拟浏览器
    header: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
  }
  // 发送请求
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var ret = {
        code: 0,
        top3: [],
        top10: [],
        imgList: []
      }
      var $ = cheerio.load(body)
      var $top3 = $('#portal_block_654 dt')
      var $top10 = $('#portal_block_617 li>a')
      var imgList = $('.slideshow>li')
      var headImg = $('.a_mu img').attr('src')
      ret.headImg = headImg
      // 轮播图数据
      imgList.each(function() {
        var t = $(this).text()
        var img = $(this).find('img').attr('src')
        ret.imgList.push({
          title: t,
          img: img
        })
      })
      // 热点前三
      $top3.each(function() {
        var o = {
            title: $(this).text(),
            sub: $(this).next().text()
          }
        ret.top3.push(o)
      })
      // 十大
      $top10.each(function() {
        var title = $(this).text()
        var user = $(this).prev().text()
          // console.lgo(v)
        ret.top10.push({
          title: title,
          user: user
        })
      })
      return res.json(ret)
    }
  })
})

app.listen(18080, function() {
  console.log('Node app is running');
});