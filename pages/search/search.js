// theaters.js
Page({
  data: {
    movie_class: "selectedNav",
    tv_class: "",
    inputValue:"",
    movie_show:true,
    tv_show:false
  },
  onLoad: function (options) {
    
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  movie(){
    let thisPage = this;
    //设置选中
    thisPage.setData({
      movie_class: 'selectedNav', tv_class: "",movie_show:true,tv_show:false
    });
  },
  tv(){
    let thisPage = this;
    //设置选中
    thisPage.setData({
      tv_class: 'selectedNav', movie_class: "", movie_show: false, tv_show: true
    });
  },
  navigateToSearchResults(event){
    var categoryId = event.currentTarget.id;
    wx.navigateTo({ url: '/pages/search_results/search_results?id=' + categoryId });
  },
  navigateToSearchDetails(){
    wx.navigateTo({ url: '/pages/search_details/search_details' });
  }
 
})