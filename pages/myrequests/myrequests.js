// pages/myrequests/myrequests.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    app.globalData.request({
        url: app.globalData.env.API_BASE_URL+"/api/wechat/song/getrequests",
        success:res=>{
          this.setData({content:res.data.requests})
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    app.globalData.request({
        url: app.globalData.env.API_BASE_URL+'/api/wechat/isbound',
        success: res => {
            if (!res.data.is_bound) {
                wx.redirectTo({ url: '/pages/bind/bind' });
            }
        }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    app.globalData.request({
        url: app.globalData.env.API_BASE_URL+"/api/wechat/song/getrequests",
        success:res=>{
          this.setData({content:res.data.requests})
        }
      })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})