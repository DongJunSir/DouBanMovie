//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    movie: null,
    showing_class:"selectedNav",
    comming_class:""
  },
  onLoad: function () {
    this.loadMovie();
  },
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  loadMovie() {
    let thisPage = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      method: 'GET',
      header: {'Content-Type': 'json'},
      success: function (res) {
        let subjects = res.data.subjects;
        thisPage.setData({ movie: subjects });
        wx.hideLoading();
        wx.setStorage({
          key: "movie_in_theaters",
          data: subjects
        });
      }
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/coming_soon',
      method: 'GET',
      header: {'Content-Type': 'json'},
      success: function (res) {
        let subjects = res.data.subjects;
        wx.setStorage({
          key: "movie_coming_soon",
          data: subjects
        });
      }
    });
  },
  movieIntheaters() {
    let thisPage = this;
    // wx.showLoading({
    //   title: '加载中',
    // });
    //设置选中
    thisPage.setData({ 
      showing_class: 'selectedNav', comming_class: "" 
    });
   
    var movie_value = wx.getStorageSync('movie_in_theaters');
    if(movie_value.length!=0){
      thisPage.setData({ movie: movie_value });
    }
    // wx.hideLoading();
  },
  movieComingSoon() {
    let thisPage = this;
    // wx.showLoading({
    //   title: '加载中',
    // });
    thisPage.setData({
      comming_class: 'selectedNav', showing_class: ""
    });
    var movie_value = wx.getStorageSync('movie_coming_soon');
    if(movie_value.length != 0){
      thisPage.setData({ movie: movie_value });
    }
    // wx.hideLoading();
  },
  navigateToDetails(event) {
    var movieId = event.currentTarget.id;
    wx.navigateTo({ url: '/pages/details/details?id=' + movieId });
  }
})
