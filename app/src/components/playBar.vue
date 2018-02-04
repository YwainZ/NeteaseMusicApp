<template>
  <div class="footer">
    <div class="play-mini">
      <audio :src="audio.location" @timeupdate="updateTime"  @canplay="playSong" id="audioPlay" @ended="next" @error="loadError"/>
      <div class="cover" @click="showDetail">
        <mu-circular-progress v-show="loading" :size="30"></mu-circular-progress>
        <img class="playLogo" :alt="audio.name" v-show="!isloading" :src="audio.albumPic+'?param=100y100'">
      </div>
      <div class="info">
        <div>{{audio.name}}</div>
        <div>{{audio.singer}}</div>
      </div>
      <div class="control">
        <mu-icon-button class="mini-btn player-list" @click="showList"/>
        <mu-icon-button class="mini-btn player" @click="toggleState" :class="{pause: playing}"/>
        <mu-icon-button class="mini-btn next" @click="next"/>
      </div>
        <div class="pro">
          <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + prBufferedTime +'%)' }"></div>
          <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + prCurrentTime +'%)' }"></div> </div>
    </div>
        <BottomSheet ref="bottomSheet"></BottomSheet>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
  showDetail(){
   this.$router.push({name: 'playerDetail', params: audio.id})
   this.$store.commit('toggleDetail')
  }
  }
}
</script>
<style>

</style>

