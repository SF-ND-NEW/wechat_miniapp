const app = getApp();
Page({
    data: {
      searchValue: "",
      results: []
    },
    onSearchInput(e) {
      this.setData({ searchValue: e.detail.value });
    },
    onSearch() {
      wx.request({
        url: app.globalData.env.API_BASE_URL+'/api/search',
        data: { query: this.data.searchValue },
        success: res => {
            this.setData({ results: res.data.songs });
            for(let i=0;i<this.data.results.length;i++){
                this.data.results[i].artists=this.data.results[i].artists.join(',')
            }
        }
      })
    },
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
    onRequestSong(e) {
      const song_id = e.currentTarget.dataset.id;
      const song_name = e.currentTarget.dataset.name;
      
      app.globalData.request({
        url: app.globalData.env.API_BASE_URL+'/api/wechat/song/request',
        method: "POST",
        data: { song_id ,song_name},
        success: res => {
            const msg = res.data.msg || (res.data.success ? "成功" : res.data.detail);
            wx.showToast({ title: msg, icon: res.data.success ? 'success' : 'none' });
        },
        fail: () => {
            wx.showToast({ title: '网络错误', icon: 'none' });
        }
      });
    }
})