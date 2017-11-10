// search_details.js
Page({
  data: {
    search_hot:[
      "变形金刚5:最后的战士",
      "变形金刚4:绝迹重生",
      "异形:契约",
      "嫌疑人X的现身",
      "生化危机:复仇"
    ],
    inputValue:"",
  },
  onLoad: function (options) {
    
  },
  setInputValue(event){
    var thisPage = this;
    thisPage.setData({inputValue:event.detail.value});
  }, 
  searchInputValue(){
    var searchingVal = this.data.inputValue;
    wx.navigateTo({ url: '/pages/search_results/search_results?query=' + searchingVal });
  },
  searchhotval(event){
    var thisPage = this;
    var search_hot = this.data.search_hot;
    var _val = search_hot[event.currentTarget.id];
    wx.navigateTo({ url: '/pages/search_results/search_results?query=' + _val });
  }
})