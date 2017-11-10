// detail.js
var app = getApp();
Page({
  data: {
    details:""
  },
  onLoad: function (options) {
    app.movieDetailId = options.id;
    this.loadMovieDetails();
  },
  loadMovieDetails(){
    var thisPage = this;
    var movieId = app.movieDetailId;
    var movie_url = "https://api.douban.com//v2/movie/subject/" + movieId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: movie_url,
      method: 'GET',
      header: { 'Content-Type': 'json' },
      success: function (res) {
        wx.hideLoading();
        thisPage.setData({ details: res.data});
      }
    });
  },
  navigateToVideo() {
    wx.navigateTo({ url: '/pages/video/video'});
  }
})