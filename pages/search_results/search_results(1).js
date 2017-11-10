// category.js
var app = getApp();
Page({
  data: {
    first_cls: "selectedNav",
    second_cls: "",
    top250: false,
    category_list: "",
    category_title: '',
    movie_count: 20,
    start: 0,
  },
  onLoad: function (options) {
    if (options.id) {
      app.categoryId = options.id;
      this.loadCategoryContent();
    }
    if (options.query) {
      app.query = options.query;
      this.loadSearchContent();
    }
  },
  onReachBottom() {
    if (app.query ){
      return;
    }
    var movie_count = this.data.movie_count;
    var start = this.data.start;
    if (movie_count != 50) {
      movie_count += 10;
      this.setData({ movie_count: movie_count });
    } else if (movie_count == 50) {
      this.setData({ movie_count: 50 });
      wx.showModal({
        title: '提示',
        content: '没有更多的数据了',
      })
      return;
    }
    let thisPage = this;
    var categoryId = app.categoryId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/' + categoryId + '?start=' + start + '&count=' + movie_count,
      method: 'GET',
      header: { 'Content-Type': 'json' },
      success: function (res) {
        let subjects = res.data.subjects;
        thisPage.setData({
          category_list: subjects,
        });
        wx.hideLoading();
      }
    });
  },
  loadCategoryContent() {
    let thisPage = this;
    var categoryId = app.categoryId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/' + categoryId,
      method: 'GET',
      header: { 'Content-Type': 'json' },
      success: function (res) {
        let subjects = res.data.subjects;
        thisPage.setData({
          category_list: subjects,
          category_title: res.data.title,
          top250: true
        });
        wx.hideLoading();
      }
    });
  },
  loadSearchContent() {
    var thisPage = this;
    var search_hot = app.query;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/search?q=' + search_hot,
      method: 'GET',
      header: { 'Content-Type': 'json' },
      success: function (res) {
        wx.hideLoading();
        thisPage.setData({
          category_list: res.data.subjects,
          hot_show: false,
          result_show: true,
          category_title: res.data.title
        });
      }
    })
  },
  requestMovieContent() {
    let thisPage = this;
    thisPage.setData({
      first_cls: 'selectedNav', second_cls: "", third_cls: '', fourth_cls: '', fifth_cls: '',
    });
    thisPage.setData({ start: 0 });
    var categoryId = app.categoryId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/' + categoryId + '?start=0&count=20',
      method: 'GET',
      header: { 'Content-Type': 'json' },
      success: function (res) {
        let subjects = res.data.subjects;
        thisPage.setData({
          category_list: subjects,
          category_title: res.data.title,
          top250: true
        });
        wx.hideLoading();
      }
    });
  },
  requestMovieContent2() {
    let thisPage = this;
    thisPage.setData({
      first_cls: '', second_cls: "selectedNav", third_cls: '', fourth_cls: '', fifth_cls: '',
    });
    thisPage.setData({ start: 50 });
    var categoryId = app.categoryId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/' + categoryId + '?start=50&count=20',
      method: 'GET',
      header: { 'Content-Type': 'json' },
      success: function (res) {
        let subjects = res.data.subjects;
        thisPage.setData({
          category_list: subjects,
          category_title: res.data.title,
          top250: true
        });
        wx.hideLoading();
      }
    });
  },
  navigateToDetails(event) {
    var movieId = event.currentTarget.id;
    wx.navigateTo({ url: '/pages/details/details?id=' + movieId });
  }
})