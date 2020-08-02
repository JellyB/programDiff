// pages/home/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    images: ['http://file.xiaomutong.com.cn/20200228/img01.jpeg','http://file.xiaomutong.com.cn/20200228/img02.jpeg','http://file.xiaomutong.com.cn/20200228/img03.jpeg'],
    openid:'',
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      type: options.type,
    },()=>{
      this.onQuery();
    })
    
  },
  onQuery: function() {
    const db = wx.cloud.database()
    db.collection('weeks')
    .get({
      success: res => {
        let items = res.data;
        this.setData({
          items
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  toQuestionPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let url = '/pages/question/index?id='+id;
    wx.navigateTo({
      url: url
    })
  },
  toRankPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let date1 = e.currentTarget.dataset.date1;
    let date2 = e.currentTarget.dataset.date2;

    let weekNum = e.currentTarget.dataset.num;
  
    let url = '../rank/rank?date1='+date1+'&date2='+date2+'&weekNum=' + weekNum;
    wx.navigateTo({
      url: url
    })
  }, 

  
  toEntryPage: function(e){
    console.log(e.currentTarget.dataset.code);
    let code = e.currentTarget.dataset.code;
    let url = '/pages/entry/index?code='+code;
    wx.navigateTo({
      url: url
    })
  },  
  toAttendPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    let url;
    url = '/pages/question/index?id='+id +'&title=' +title;
    wx.navigateTo({
      url: url
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 1];
    console.log('开始输出');
    console.log(pages);
    console.log(prevPage);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onQuery();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})