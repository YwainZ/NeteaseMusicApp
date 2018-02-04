const base_url = 'https://api.imjad.cn/cloudmusic/'

export default{
  getSong (id) {
    return base_url + '?type=song&id=' + id + '&br=128000'
  },
  getLric (id) {
    return base_url + '?type=lyric&id=' + id + '&br=128000'
  },
  getMv (id) {
    return base_url + '?type=mv&id=' + id + '&br=128000'
  },
  getPlayList (id) {
    return base_url + '?type=playlist&id=' + id + '&br=128000'
  },
  search (words) {
    return base_url + '?type=search&s=' + words
  }
}
