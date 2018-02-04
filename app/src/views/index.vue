<template>
<div class="container">
  <div  class="header">
  <span><i class="iconfont icon-msnui-mic-inverse"></i></span>
  <input type="text" placeholder="搜索">
  <span><i class="iconfont icon-rank2"></i></span>
</div>
<div >
  <mu-tabs :value="activeTab" @change="handleTabChange" class="body-tab">
    <mu-tab value="tab1" title="音乐"/>
    <mu-tab value="tab2" title="视频"/>
    <mu-tab value="tab3"  title="电台"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
    <indexMusic></indexMusic>
  </div>
  <div v-if="activeTab === 'tab2'">
    <h2>Tab Two</h2>
    <p>
      这是第二个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab3'">
    <h2>Tab Three</h2>
    <p>
      这是第三个 tab
    </p>

  </div>
</div>
<div>
 <mu-tabs :value="activeTab" @change="handleTabChange" class="footer">
  <mu-tab value="tab4" icon="phone" title="发现音乐"/>
  <mu-tab value="tab5" icon="favorite" title="我的音乐"/>
  <mu-tab value="tab6" icon="person_pin" title="朋友"/>
   <mu-tab value="tab7" icon="person_pin" title="账号"/>
</mu-tabs>
<div v-if="activeTab== 'tab4'">
  <indexMusic></indexMusic>
</div>
<div v-if="activeTab=='tab5'">
   这是tab5
</div>
</div>
</div>

</template>

<style lang="less" scoped>
@import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
@import '../assets/fonts/iconfont.css';
@import "../assets/theme.less";
.container{
  margin-top: 0%;
}
.header{
  display: flex;
  justify-content: space-around;
  background: #cd3d3e;
  width: 100%;
  height: 62px;
  line-height: 62px;
}
.header  input{
  height: 30px;
  border-radius: 10px;
  width: 80%;
  border:0;
  text-align: center;
  margin-top: 14px

}
.header .iconfont{
  color: #fff;
  font-size: 25px

}
.body-tab{
  background-color: #fff;
  color: #000;
  >.mu-tab-link{
    color: #000;
  }
  >.mu-tab-active{
    color: @primaryColor;
  }
}
.footer{
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: rgba(56, 54, 50, 0.7);
  color:#fff;
}
.footer-nav{
   background-color: rgba(56, 54, 50, 0.7);
   color:#fff;
}
</style>


<script>
export default {
  data() {
    return {
      activeTab: "tab1",
      activeTab:"tab4",
      bottomNav: 'recents'
    };
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
    },
    handleChange (val) {
      this.bottomNav = val
    }
  }
};
</script>
