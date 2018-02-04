<template>
<div>
  <div class="header">
  <mu-appbar title="歌单">
  <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
  <mu-icon-button icon="expand_more" slot="right"/>
</mu-appbar>
  </div>
  <div></div>
  <div class="body-title">
    <div class="list-info">
        <img :src="this.img" alt="">
      <div class="list-title">
        <p class="name">{{name}}</p>
        <p class="author">
                <img src="../assets/drawable/gdpic1.png" id="netease">
                        <span style="padding-left:5px;padding-top:5px;">{{creator.nickname}}</span>

        </p>
      </div>
    </div>
    <div class="mask"></div>
    <div class="bgImg"></div>
    <div class="playlist-container">
       <div class="add-all">
                <mu-flat-button label="播放全部" class="demo-flat-button" icon="add_circle_outline" @click="playAll" style="float:left"/>
                <mu-flat-button label="多选" class="demo-flat-button" icon="menu" style="float:right"/>
                <mu-divider/>
            </div>

            <div style="text-align:left">

                <mu-list :value="value" @change="change">
                 <div v-for="(item, index) in list"  @click="playAuto(item,index)" :key="index">
                       <mu-list-item  :disableRipple="true" :title="item.name" :value="item.id" :describeText="item.ar[0].name" >
                        <span slot="left" class="indexStyle">{{index + 1}}</span>
                        <mu-flat-button slot="right" class="demo-flat-button" icon="play" ></mu-flat-button>
                    </mu-list-item>
                     <mu-divider inset/>
                 </div>

                </mu-list>
            </div>
    </div>
  </div>
</div>
</template>
<script>
import api from "../../api";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      mes: localStorage.getItem("ID"),
      list: [],
      id: 0,
      value: 0,
      name: "2017年度热议单曲TOP100",
      creator: {
        nickname: "网易云音乐"
      },
      img: localStorage.getItem("img"),

    };
  },
  created() {
    this.get();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    get() {
      console.log("进入get");
      axios.get(api.getPlayList(localStorage.getItem("ID"))).then(res => {
        this.list = res.data.playlist.tracks;
        this.pic = res.data.playlist;
        console.log("接收成功");
        console.log(res.data.playlist.tracks);
        withCredentails: true;
      });
    },
    playAuto(song,key) {
      /* document.getElementById("audioPlay").pause()
      this.$store.commit('pause')
      var audio={}
      audio.id = song.id
      audio.singer = song.ar[0].name
      audio.albumPic = song.al.picUrl
      audio.name = song.name
      this.$store.commit('addToList', audio)
      this.$store.dispatch('getSong', audio.id)
      */
      console.log(song.al.picUrl);
      localStorage.setItem('index', key);
      localStorage.setItem("songId", song.id);
      localStorage.setItem("songName", song.name);
      localStorage.setItem("singer", song.ar[0].name);
      localStorage.setItem("album",song.al.picUrl);
      this.$router.push({
        name: "playerDetail"
      });
    },
    change(val) {
      this.value = val;
    },
    playAll() {}
  }
};
</script>
<style lang="less" scoped>
@import '//fonts.useso.com/css?family=Roboto:300, 400, 500, 700, 400italic';
@import "http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";
@import "../assets/theme.less";
.list-info img {
  width: 30%;
  height: 30%;
}
.list-info {
  display: flex;
  justify-content: space-around;
}
#netease{
  width: 10%;
  height: 10%;
  border-radius: 50%
}
</style>
