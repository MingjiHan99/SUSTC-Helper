var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
let that = this;
Page({
  data: {
    tabs: ["GPA","设置"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0, 
    gpa:0,
    periods: ['全部学期', '2018-2019-2', '2018-2019-1', '2017-2018-3', '2017-2018-2', '2017-2018-1', '2016-2017-3', '2016-2017-2', '2016-2017-1', '2015-2016-3', '2015-2016-2', '2015-2016-1', '2014-2015-3', '2014-2015-2', '2014-2015-1', '2013-2014-2', '2013-2014-1', '2012-2013-2', '2012-2013-1', '2011-2012-2', '2011-2012-1', '2010-2011-2', '2010-2011-1'],
    periodIndex:0,
    checkboxItems: getApp().globalData.defaultItems 
  },
  onReady:function(){
    let that = this;
    that.setData({ checkboxItems: getApp().globalData.defaultItems });
    that.setData({gpa:that.calculateGPA().toFixed(2)});
  },
  onLoad: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }


    });
  
  
    
   

   
  },
  tabClick: function (e) {
    console.log(this.checkboxItems);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

  },
  bindPeriodChange: function(e){
  //  let that = this;
    this.setData({
          periodIndex:e.detail.value
    })
    var items = [];
    var size = 0;
      if(this.data.periods[this.data.periodIndex] != "全部学期"){
          for (var key in app.globalData.grade[this.data.periods[this.data.periodIndex]]) {
            if (typeof (key) != undefined) {
              var temp_str = app.globalData.grade[this.data.periods[this.data.periodIndex]][key][0] + " " + app.globalData.grade[this.data.periods[this.data.periodIndex]][key][1];
              console.log(temp_str);
              items.push({ name: key, num: app.globalData.grade[this.data.periods[this.data.periodIndex]][key][1], grade: temp_str, credit: app.globalData.grade[this.data.periods[this.data.periodIndex]][key][2], value: String(size), checked: true });
              size = size + 1;
            }

          }
    }
    else{
        for (var i = 0; i < app.globalData.periods.length; i++) {
          //     console.log(app.globalData.periods[i]);

          for (var key in app.globalData.grade[app.globalData.periods[i]]) {
            if (typeof (key) != undefined) {
              //    console.log(key);
              // console.log(app.globalData.grade[app.globalData.periods[i]][key][1]);
              items.push({ name: key, num: app.globalData.grade[app.globalData.periods[i]][key][1], grade: app.globalData.grade[app.globalData.periods[i]][key][0] + " " + app.globalData.grade[app.globalData.periods[i]][key][1], credit: app.globalData.grade[app.globalData.periods[i]][key][2], value: String(size), checked: true });
              size = size + 1;
            }

          }
        }
    }
    console.log(items);
    console.log(this.data.periodIndex);
    this.setData({checkboxItems:items});
    console.log(this.data.checkboxItems);
    this.setData({ gpa: this.calculateGPA().toFixed(2)});
    this.onLoad();
  },
  checkboxChange: function (e) {
 //   console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
    this.setData(
      {gpa: this.calculateGPA().toFixed(2)}
    );
  },
  calculateGPA:function(){
      var res = 0.0;
      var count = 0;
      var totalCredit = 0;
      for(var i = 0 ; i < this.data.checkboxItems.length; i ++){
          var temp = parseFloat(this.data.checkboxItems[i]['num']);
          console.log(temp);
          if(!isNaN(temp) &&  this.data.checkboxItems[i].checked == true){
            if(temp > 60){
              count++;
              if (temp >= 97) {
                res += 4.00 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 93) {
                res += 3.94 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 90) {
                res += 3.85 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 87) {
                res += 3.73 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 83) {
                res += 3.55 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 80) {
                res += 3.32 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 77) {
                res += 3.09 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 73) {
                res += 2.78 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 70){
                res += 2.42 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 67) {
                res += 2.42 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else if (temp >= 63) {
                res += 1.63 * parseFloat(this.data.checkboxItems[i].credit);
              }
              else {
                res += 1.15 * parseFloat(this.data.checkboxItems[i].credit);
              }
              
              totalCredit += parseFloat(this.data.checkboxItems[i].credit);
            }
          
          }
      }
      if(count == 0){
          return 0.00;
      }
      else{
          console.log(res / totalCredit);
      return res / totalCredit;
      }
  }

});