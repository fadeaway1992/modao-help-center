// // 进入页面后删除原生头部
// $('body>div:first-child').remove()

// // 设置语言
// (function(){
//   if (location.search.indexOf('lang=en') !== -1) {
//     if(document.querySelector('.switch-lang .en').classList.contains('active')) return
//     document.querySelectorAll('.switch-lang a').forEach(function (element)  {
//       element.classList.remove('active')
//     })
//     document.querySelector('.switch-lang .en').classList.add('active')
//   }
// })()


$('.cate-wrap .toggle-icon').click(function(e) {
  e.target.parentNode.parentNode.classList.toggle('open')
})

// 点击播放视频
function playVideo (e) {
  const selector = e.target.dataset.play
  const videoCover = document.querySelector(`#${selector}`)
  videoCover.style.display = 'flex'
  videoCover.querySelector('video').play()
}

// 停止视频播放
function closeVideo(e) {
  const videoBox = e.target.parentNode.parentNode
  const video = videoBox.querySelector('video')
  video.pause()
  e.target.parentNode.parentNode.style.display = 'none'
}