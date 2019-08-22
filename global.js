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