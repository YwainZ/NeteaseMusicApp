<template>
<div class="container">
      <div class="header">
        <span @click="back"><i class="iconfont icon-return"></i></span>
        <div class="header-name"><span>{{songName}}</span>
        <span id="singer">{{singer}}</span></div>
        <span><i class="iconfont icon-share"></i></span>
      </div>
      <div class="bg-blur" :style="`background-image:url(${albumUrl})`"></div>
      <div class="body-cd" >
                          <div v-show="show" @click="showLyric" ><img src="../assets/drawable/timg2.png" class="cd">
                           <img :src="this.albumUrl" class="pic" id="pic"></div>
                           <div id="lrc-box">
                           <div v-show="!show" v-for="(item, index) in this.lyric" :key="index" @click="showImg">
                             <p class="lyric" >{{item.txt}}</p>
                             </div></div></div>
      <div class="body-icon">
        <span><i class="iconfont icon-love"></i></span>
        <span><i class="iconfont icon-download"></i></span>
        <span><i class="iconfont icon-pinglun"></i></span>
        <span><i class="iconfont icon-gengduo1"></i></span>
      </div>
      <div class="footer">
       <span >{{startTime}}</span><input type="range" :value="value"><span>{{endTime}}</span>
      </div>
      <audio :src="this.songurl" autoplay  id="myAudio"  @ended="next" @canplay="filer"></audio>
      <div class="play">
        <span><i class="iconfont icon-back" @click="playPre"></i></span>
        <span @click="end" v-show="isShow"><i class="iconfont icon-play" ></i></span>
        <span v-show="!isShow" @click="start"><i class="iconfont icon-bofang1"></i></span>
        <span><i class="iconfont icon-forward" @click="next"></i></span></div>
    </div>
</template>
<script>
import axios from "axios";
import api from "../../api";
import { mapMutations, mapGetters } from "vuex";
var index = localStorage.getItem("index");
export default {
  data() {
    return {
      mes: localStorage.getItem("songId"),
      songurl: "",
      albumUrl: localStorage.getItem("album"),
      songName: localStorage.getItem("songName"),
      singer: localStorage.getItem("singer"),
      value: 0,
      isShow: true,
      timer: 0,
      startTime: 0,
      endTime: 0,
      lyric: "",
      show: true,
      list: [],
      url: "",
      isClick: false
    };
  },

  created() {
    this.get();
  },
  mounted () {
    this.moveProgress();
  },
  methods: {
    get() {
      axios.get(api.getSong(localStorage.getItem("songId"))).then(res => {
        this.songurl = res.data.data[0].url;
        console.log(res.data.data[0].url);
        console.log("歌曲接收成功");
        withCredentails: true;
      });
      axios.get(api.getLric(localStorage.getItem("songId"))).then(res => {
        this.lyric = res.data.lrc.lyric;
        console.log(this.lyric);
      });
    },
    ...mapMutations(["play", "pause", "playNext"]),
    back() {
      this.$router.go(-1);
    },
    end() {
      this.$store.commit("pause");
      document.getElementById("myAudio").pause();
      this.isShow = false;
      document.getElementById("pic").style.animationPlayState = "paused";
      this.updateTime();
    },
    start() {
      this.$store.commit("play");
      document.getElementById("myAudio").play();
      this.isShow = true;
      document.getElementById("pic").style.animationPlayState = "running";
    },
    next() {
      var len = 0;
      this.$store.commit("pause");
      document.getElementById("myAudio").pause();
      //vuex存储歌单列表中的数据
      axios.get(api.getPlayList(localStorage.getItem("ID"))).then(res => {
        this.list = res.data.playlist.tracks;
        len = this.list.length;
        console.log(len);
        var id = this.list[index].id;
        console.log(id);
        index++;
        if (index > len) {
          index = 1;
        }
        this.albumUrl = this.list[index].al.picUrl;
        this.songName = this.list[index].name;
        this.singer = this.list[index].ar[0].name;
        axios
          .get(api.getSong(this.list[index].id))
          .then(res => {
            this.songurl = res.data.data[0].url;
            withCredentails: true;
          })
          .catch(e => {
            alert("歌曲有权限无法播放");
          });
        axios.get(api.getLric(this.list[index].id)).then(res => {
          this.lyric = res.data.lrc.lyric;
        });
        document.getElementById("myAudio").play();
      });
      if(this.isClick ==false){
      this.isClick = true;
      this.updateTime();
  }
      if (this.isShow == false) {
        this.isShow = true;
        document.getElementById("pic").style.animationPlayState = "running";
      }
      this.value = 0;

    },
    playPre() {
      var len = 0;
      this.$store.commit("pause");
      document.getElementById("myAudio").pause();
      //vuex存储歌单列表中的数据
      axios.get(api.getPlayList(localStorage.getItem("ID"))).then(res => {
        this.list = res.data.playlist.tracks;
        len = this.list.length;
        console.log(len);
        var id = this.list[index].id;
        console.log(id);
        index--;
        this.albumUrl = this.list[index].al.picUrl;
        this.songName = this.list[index].name;
        this.singer = this.list[index].ar[0].name;
        axios
          .get(api.getSong(this.list[index].id))
          .then(res => {
            this.songurl = res.data.data[0].url;
            withCredentails: true;
          })
          .catch(e => {
            console.log(e);
          });
        axios.get(api.getLric(this.list[index].id)).then(res => {
          this.lyric = res.data.lrc.lyric;
        });
        document.getElementById("myAudio").play();
      });
    },
    showLyric() {
      this.show = false;
    },
    showImg(){
     this.show = true
    },
    filer() {
      var lyrics = this.lyric.split("\n");
      var lrcObj = [];
      /*eslint-disable */
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      /*eslint-enable */
      // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
      // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
      for (var i = 0; i < lyrics.length; i++) {
        var timeRegExpArr = lyrics[i].match(timeReg);
        if (!timeRegExpArr) continue;
        var txt = lyrics[i].replace(timeReg, "");
        // 处理时间
        for (var k = 0; k < timeRegExpArr.length; k++) {
          var array = {};
          var t = timeRegExpArr[k];
          /*eslint-disable */
          var min = Number(String(t.match(/\[\d*/i)).slice(1));
          var sec = Number(String(t.match(/\:\d*/i)).slice(1));
          /*eslint-enable */
          var time = min * 60 + sec;
          array.time = time;
          array.txt = txt;
          lrcObj.push(array);
        }
      }
      this.lyric = lrcObj;
     this.updateTime();
    },
    //时间格式化
    formatTime(value) {
      var length = Math.floor(parseInt(value));
      var minute = Math.floor(value / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }
      var second = length % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    //进度条
    moveProgress(){
   var time = parseInt(document.getElementById("myAudio").duration);
     this.timer = setInterval(() => {
      this.value += 0.1;
      if (this.value > time) {
        this.value = 0;
      }
    }, 1000);
    },
    //更新进度条时间
    updateTime() {
     var currentTime = document.getElementById('myAudio').currentTime;
     var length = document.getElementById('myAudio').duration;
      if(currentTime>=length||this.isClick == true){
        clearInterval();
        currentTime = 0;
        this.startTime = this.formatTime(currentTime);
        this.isClick = false;

      }

     var timer = setInterval(()=>{
       clearInterval();
      currentTime = currentTime+1;
      this.startTime = this.formatTime(currentTime);
     },1000)
     this.endTime = this.formatTime(length);

    },
    lrcMove() {
      var box = document.getElementById("lrc-box");
      var lrclist = box.getElementsByTagName("p");
      var m = parseInt(box.style.marginTop.split("-")[1] || 0);
      var index, i, s, timer;
      for (var i = 0; i < this.lyric.length; i++) {
        var dateTime = parseInt(this.lyric[i].time);

        if (
          dateTime > 0 &&
          dateTime === parseInt(document.getElementById("myAudio").currentTime)
        ) {
          index = i;
          if (s != i) {
            s = i;
          }
          //设置滚动
           clearInterval(timer);
          timer = setInterval(function() {
            m += 1;
            if (m >= index * 30) {
              clearInterval(timer);
            } else {
              box.style.marginTop = '-'+m+'px'
            }
          }, 10);


        }
      }
    }
  },
  computed: {
    ...mapGetters(["audio", "playing", "songList"])
  }
};
</script>
<style>
@import "../assets/fonts/iconfont.css";
.header {
  display: flex;
  justify-content: space-around;
  height: 60px;
  line-height: 60px;
  margin-top: -20px;
}
.header-name {
  width: 75%;
}
.header span {
  font-size: 15px;
  color: #fff;
}
.iconfont {
  font-size: 25px;
  color: #fff;
}
#singer {
  display: block;
  font-size: 8px;
  margin-top: -40px;
}
/*实现图片背景虚化*/
.bg-blur {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
  z-index: -1;
}
.cd {
  width: 70%;
  height: 70%;
}

.body-cd .pic {
  position: absolute;
  top: 218px;
  left: 115px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  /*让cd旋转 circle为关键禎的名称 infinite为循环 linear匀速*/
  -webkit-animation: circle 15s infinite linear;
}
/*让cd旋转*/
@-webkit-keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.body-cd {
  margin: 60px 0 60px 0;
}
.body-icon {
  display: flex;
  justify-content: space-around;
  color: #fff;
}
/*进度条*/
input[type="range"] {
  -webkit-appearance: none;
  width: 80%;
  height: 1px;
  border-radius: 10px;
  background-color: #fff;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 20px;
}
input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: -3px;
  height: 14px;
  width: 14px;
  background: #eb7470;
  border-radius: 50%;
  border: solid 3px #fff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
}

.play {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.play .iconfont {
  font-size: 40px;
}
.lyric {
  color: #fff;
}
.box{
  margin-top: -10px
}
.footer span{
  color: #fff;
}
</style>
