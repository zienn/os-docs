//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    loading:false,
    userInfo: {},
    // books:['1','2','3']
  },
  // 图片轮播 文字同步
  changeImg:function(e){
    let i = e.detail.current
    this.setData({
      imgTitle:this.data.imgList[i].title
    })
  },
  // 获取知行数据
  getData(){
    if (this.data.imgTitle) {
      return false
    }
    wx.showLoading({mask:true})
    wx.request({
      url: 'https://your.domain.com/zhixing',
      fail: () => {
        wx.showModal({
          title: '失败',
          content: '请刷新重试'
        })
      },
      success: (res) => {
        if (res.data.code == 0) {
          var data = res.data
          this.setData(data)
          this.setData({
            imgTitle:data.imgList[0].title
          })
        }
      },
      complete:()=>{
        wx.hideLoading()
      }
    })
  },
  // 点击头像，重新加载
  reload(){
    this.getData()
  },
  onLoad: function() {
    this.getData()
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo)=>{
      //更新数据
      this.setData({
        userInfo: userInfo
      })
    })
  }
})