// 进入页面后删除原生头部
const tobeRemoved = document.querySelector('body>div:first-child')
tobeRemoved && tobeRemoved.parentNode.removeChild(tobeRemoved);
// 设置语言
(function(){
  if (location.search.indexOf('lang=en') !== -1) {
    if(document.querySelector('.switch-lang .en').classList.contains('active')) return
    document.querySelectorAll('.switch-lang a').forEach(function (element)  {
      element.classList.remove('active')
    })
    document.querySelector('.switch-lang .en').classList.add('active')
  }
}())

// 侧栏
const sideTree = document.querySelector('.side-tree')
if (sideTree) {
  sideTree.innerHTML = `<div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031758/">设计原理</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125839/">设计</a></li><li class="section-item"><a href="/hc/kb/section/1125840/">产品</a></li><li class="section-item"><a href="/hc/kb/section/1125849/">原型</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031748/">原型制作</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125577/">快速入门</a></li><li class="section-item"><a href="/hc/kb/section/1125578/">设置页面</a></li><li class="section-item"><a href="/hc/kb/section/1125579/">编辑组件</a></li><li class="section-item"><a href="/hc/kb/section/1125580/">添加跳转</a></li><li class="section-item"><a href="/hc/kb/section/1125581/">其它操作</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031749/">组件素材</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125582/">基础组件</a></li><li class="section-item"><a href="/hc/kb/section/1125583/">平台组件</a></li><li class="section-item"><a href="/hc/kb/section/1125584/">我的组件</a></li><li class="section-item"><a href="/hc/kb/section/1125585/">图标</a></li><li class="section-item"><a href="/hc/kb/section/1125586/">母版</a></li><li class="section-item"><a href="/hc/kb/section/1125587/">素材库</a></li><li class="section-item"><a href="/hc/kb/section/1125588/">模板资源</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031751/">交互效果</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125593/">状态/动态面板</a></li><li class="section-item"><a href="/hc/kb/section/1125594/">效果案例</a></li><li class="section-item"><a href="/hc/kb/section/1125595/">网页嵌入</a></li><li class="section-item"><a href="/hc/kb/section/1125596/">其它效果</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031752/">设计稿交互</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125597/">图片设计稿</a></li><li class="section-item"><a href="/hc/kb/section/1125598/">sketch设计稿</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031753/">演示/分享/下载</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125599/">演示项目</a></li><li class="section-item"><a href="/hc/kb/section/1125600/">分享项目</a></li><li class="section-item"><a href="/hc/kb/section/1125601/">下载项目</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031754/">开发交付</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125602/">导入切图</a></li><li class="section-item"><a href="/hc/kb/section/1125603/">标注</a></li><li class="section-item"><a href="/hc/kb/section/1125604/">工作流</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031756/">项目管理</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125609/">创建/删除</a></li><li class="section-item"><a href="/hc/kb/section/1125610/">设置</a></li><li class="section-item"><a href="/hc/kb/section/1125611/">移动</a></li><li class="section-item"><a href="/hc/kb/section/1125612/">管理</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031755/">企业协作</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125605/">管理企业</a></li><li class="section-item"><a href="/hc/kb/section/1125606/">管理项目组</a></li><li class="section-item"><a href="/hc/kb/section/1125607/">管理协作项目</a></li><li class="section-item"><a href="/hc/kb/section/1125608/">协作编辑</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031757/">刀友分享</a></h3></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031759/">基础教程</a></h3></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031760/">交互教程</a></h3></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031761/">协作教程</a></h3></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031762/">更新问题</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125618/">更新介绍</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031764/">付费/发票问题</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125620/">版本介绍</a></li><li class="section-item"><a href="/hc/kb/section/1125621/">购买/付费</a></li><li class="section-item"><a href="/hc/kb/section/1125622/">申请发票</a></li><li class="section-item"><a href="/hc/kb/section/1125623/">开具发票</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031765/">帐号/密码问题</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125726/">账号</a></li><li class="section-item"><a href="/hc/kb/section/1125727/">密码</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031766/">使用问题</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125714/">编辑相关问题</a></li><li class="section-item"><a href="/hc/kb/section/1125715/">项目相关问题</a></li><li class="section-item"><a href="/hc/kb/section/1125716/">下载相关问题</a></li><li class="section-item"><a href="/hc/kb/section/1125717/">演示相关问题</a></li><li class="section-item"><a href="/hc/kb/section/1125718/">协作相关问题</a></li><li class="section-item"><a href="/hc/kb/section/1125719/">其它问题</a></li></ul></div><div class="cate-wrap"><h3 class="cate-name"><span class="toggle-icon"></span><a href="/hc/kb/category/1031767/">异常问题</a></h3><ul class="section-list"><li class="section-item"><a href="/hc/kb/section/1125624/">数据不见了</a></li><li class="section-item"><a href="/hc/kb/section/1125625/">墨刀打不开</a></li><li class="section-item"><a href="/hc/kb/section/1125626/">项目打不开</a></li><li class="section-item"><a href="/hc/kb/section/1125627/">下载异常</a></li><li class="section-item"><a href="/hc/kb/section/1125628/">演示分享异常</a></li><li class="section-item"><a href="/hc/kb/section/1125629/">安装异常</a></li><li class="section-item"><a href="/hc/kb/section/1125630/">项目复制异常</a></li><li class="section-item"><a href="/hc/kb/section/1125631/">编辑异常</a></li><li class="section-item"><a href="/hc/kb/section/1125632/">工作流异常</a></li><li class="section-item"><a href="/hc/kb/section/1125633/">sketch插件异常</a></li><li class="section-item"><a href="/hc/kb/section/1125634/">其它异常</a></li></ul></div>`
  if (location.href.indexOf('/article/') !== -1 || location.href.indexOf('/section/') !== -1) {
    const breadcrumbs = document.querySelector('.sub-nav .breadcrumbs')
    const cate = breadcrumbs.querySelector('li:nth-child(2)').textContent.trim()
    const section = breadcrumbs.querySelector('li:nth-child(3)').textContent.trim()
    sideTree.querySelectorAll('.cate-wrap').forEach(function(item) {
      if(item.querySelector('h3.cate-name').textContent.trim() === cate) {
        item.classList.add('open')
        item.querySelectorAll('ul.section-list>li').forEach(function(item) {
          if(item.textContent.trim() === section) {
            item.classList.add('active')
          }
        })
      } else {
        item.parentNode.removeChild(item)
      }
    })
  }
}
// $('.cate-wrap .cate-name').click(function(e) {
//   let target = e.target.parentNode
//   while (!target.classList.contains('cate-wrap')) {
//     target = target.parentNode
//   }
//   target.classList.toggle('open')
// })

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

/* 搜索结果页面 */
if(location.href.indexOf('/search/results') !== -1) {
  const searchResultText = document.querySelector('.search-btitle').textContent
  const regexp = /搜索到\s+(\d+)\s+条\s+"(.+)"/
  const [match, searchResultCount, keywords] = regexp.exec(searchResultText)
  document.querySelector('input[name=keyword]').value = keywords
  if(searchResultCount === '0') {
    searchResultsList = document.querySelector('ul.search-results-list')
    searchResultsList.parentNode.removeChild(searchResultsList)
    const tobeInserted = `<h2 class="no-result-title">抱歉,没有找到“<span class="search-keyword"></span>”的相关结果</h2><p class="no-result-subtitle">尝试修改关键词或将您需要的教程具体内容<a href="https://jinshuju.net/f/rCYg0T">告诉我们</a>，我们会定期优化</p><div class="tips-container"><h3><img src="https://cdn.modao.cc/tips_icon.svg" alt="搜索技巧" class="tips-icon">搜索技巧</h3><ul class="tips-list"><li class="tips-items"><span></span>使用更加精简的关键词。比如使用“转移”，而不是“怎么转移项目”</li><li class="tips-items"><span></span>检查是否有错别字和特殊符号</li><li class="tips-items"><span></span>尝试换一个关键词搜索。比如搜索“时间组件”搜到的不是想要的内容，换成“日期组件”</li></ul></div>`
    const searchResultContainer = document.querySelector('section.no-result')
    searchResultContainer.innerHTML = tobeInserted
    searchResultContainer.style.display = 'block'
    searchResultContainer.querySelector('.search-keyword').innerHTML = keywords
  }
}

/* 返回顶部 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/* 简单节流函数 */
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

/* 侦听页面滚动 */
function onScroll() {
  const clientHeight = window.innerHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const toTop = document.getElementById('toTop')
  const headBar = document.querySelector('#nav')
  if(scrollTop === 0) {
    headBar.style.backgroundColor = '#FAFAFC'
  } else {
    headBar.style.backgroundColor = '#FFFFFF'
  }
  if (scrollTop < clientHeight) {
    toTop.style.display = 'none'
  } else {
    toTop.style.display = 'block'
  }
}

window.onscroll = throttle(onScroll, 300, {leading: true, trailing: true})