<template>
<div>
<div id="slider">
  <swiper  :options="swiperOption">
  <swiper-slide><img src="../assets/drawable/pic1.png" class="banner-item" alt=""></swiper-slide>
  <div class="swiper-pagination" slot="pagination" ></div>
  </swiper>
  </div>
<div class="body-nav">
<ul>
    <li><i class="iconfont icon-FM"></i>
        <span>私人FM</span></li>
        <li><i class="iconfont icon-cd"></i>
        <span>开启每日推荐</span></li>
        <li><i class="iconfont icon-list"></i>
        <span>歌单</span></li>
        <li><i class="iconfont icon-rank"></i>
        <span>排行榜</span></li>
</ul>
</div>
<div class="wrapper">
       <div class="title">推荐MV</div>
  <div class="gridlist-demo-container">
     <mu-grid-list class="gridlist-demo" cols ="3" padding="5" cellHeight="140">
      <mu-grid-tile v-for="(tile, index) in list" :key="index">
        <router-link :to="{name: 'playListDetail', params: {id: tile.id}}" >
          <div @click="storeId(tile.id,tile.image)">
      <img :src="tile.image" >
      <p>{{tile.title}}</p>
      </div>
    </router-link>
    </mu-grid-tile>
  </mu-grid-list>
  </div>
</div>
</div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { api } from "../../api";
export default {
  data() {
    return {
      list: [
        { id:2039081586,
          image:
            "http://upload-images.jianshu.io/upload_images/9381131-127a4e6cfc73d0e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
          title: "2017年度热议单曲top100",
          featured: true
        },
        {
          id:997657157,
          image:
            "http://upload-images.jianshu.io/upload_images/9381131-33f039e3c8c5e03c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
          title: "快递进行曲"
        },
        { id:372713714,
          image:
            "http://upload-images.jianshu.io/upload_images/9381131-7c8b4eb3dd7a17cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
          title: "【儿童向】哄哄你家小宝贝"
        },
        { id:987074242,
          image:
            "http://upload-images.jianshu.io/upload_images/9381131-f2bb901249f55aae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
          title: "[荒野行动]独家报名歌曲"
        },
        { id:501381811,
          image:
            "http://upload-images.jianshu.io/upload_images/9381131-66e659df0e389d55.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
          title: "幼儿园早操及常放歌曲"
        },
        { id:626414234,
          image:
            "http://upload-images.jianshu.io/upload_images/9381131-6d9ec70a2ef01338.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
          title: "视频配乐精选"
        }
      ],
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        observer: true,
        observeParents: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
      }
    };
  },
  methods: {
    storeId(id,img) {
        //解决跨域问题
         withCredentials:  true;
         localStorage.setItem('ID',id);
         localStorage.setItem('img',img);
         console.log(localStorage.getItem('img'))
         console.log('我是id'+localStorage.getItem('ID'));
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.swiper;
    }
  }
};
</script>
<style lang='less'>
@import "../assets/fonts/iconfont.css";
.body-nav {
  overflow: hidden;
}
.body-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.body-nav ul li {
  color: #ce3d3e;
  width: 25%;
  float: left;
}
.iconfont {
  font-size: 50px;
  display: block;
}
.banner-item {
  width: 100%;
}
// 推荐歌单
.wrapper {
  border-top: 1px solid #ebeeee;
  padding-top: 20px;
}
.title {
  text-align: left;
  border-left: 5px solid #ce3d3e;
  padding: 0 5px 0 5px;
}
.gridlist-demo-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.gridlist-demo-container img{
  width: 100%;
  height: 100%;
}
</style>
