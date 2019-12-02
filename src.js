// 进入页面后删除原生头部
const tobeRemoved = document.querySelector('body>div:first-child')
tobeRemoved && tobeRemoved.parentNode.removeChild(tobeRemoved);
// 设置字体
document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Pingfang SC", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif';
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
const fetchGet = async (url) => {
  const response = await fetch(url,{headers:{Authorization: 'Basic ' + btoa('support@mockingbot.com/token:6de1061373150e1b4646a7e309a90c')}})
  return response.json()
}
const addrPrifix = 'https://qiniu-test.modao.cc/'
const cateIconAdress = {
  '设计原理': addrPrifix + 'sjyl.svg',
  '原型制作': addrPrifix + 'yxzz1.svg',
  '组件素材': addrPrifix + 'zjsc.svg',
  '交互效果': addrPrifix + 'jhxg1.svg',
  '设计稿交互': addrPrifix + 'sjgjh.svg',
  '演示分享': addrPrifix + 'ysfx.svg',
  '开发交付': addrPrifix + 'kfjf1.svg',
  '企业协作': addrPrifix + 'qyxz.svg',
  '项目管理': addrPrifix + 'khd1.svg',
}
const sideTree = document.querySelector('.side-tree')
if (sideTree) {
  const tree = document.createElement('div')
  const breadcrumbs = document.querySelector('.sub-nav .breadcrumbs')
  const postIdCurrent = location.pathname.match(/article\/(\d+)/)[1]
  const cate = {
    id: breadcrumbs.querySelector('li:nth-child(2)>a').href.match(/category\/(\d+)/)[1],
    title: breadcrumbs.querySelector('li:nth-child(2)').textContent.trim()
  }
  const sec = {
    id: breadcrumbs.querySelector('li:nth-child(3)>a').href.match(/section\/(\d+)/)[1],
    title: breadcrumbs.querySelector('li:nth-child(3)').textContent.trim()
  }
  fetchGet(`/apiv2/categories/${cate.id}/posts.json`).then(res => {
    const cateAllPosts = res.posts.map(({id, title, forum_id: sectionId, forum_name: sectionTitle}) => {
      return {id, title, sectionId, sectionTitle}
    })
    console.log(cateAllPosts, 'cateAllPosts')
    let sections = []
    cateAllPosts.forEach(post => {
      const matchedSection = sections.find(section => section.id === post.sectionId)
      if (matchedSection) {
        matchedSection.posts.push(post)
      } else {
        sections.push({id: post.sectionId, title: post.sectionTitle, posts: [post]})
      }
    })
    console.log(sections, 'sections')
    const sectionsHTMLArray = sections.map(section => {
      let postListHTML = ''
      section.posts.forEach(post => {
        const postHTML = `<li class="post-item${post.id == postIdCurrent ? ' active' : ''}"><a href="/hc/kb/article/${post.id}">${post.title}</a></li>`
        postListHTML += postHTML
      })
      const sectionHTML = `<li class="section-item${section.id == sec.id ? ' open' : ''}"><h3><img class="toggle-icon" src="https://cdn.modao.cc/helpcentertoggletriangle.svg" />${section.title}</h3><ul class="post-list">${postListHTML}</ul></li>`
      return sectionHTML
    })
    sectionsHTML = sectionsHTMLArray.reduce((acc, cur) => acc + cur)
    sideTree.innerHTML = `<div class="cate-wrap"><h3 class="cate-name">${cateIconAdress[cate.title] ? `<img class="cate-title-icon" src=${cateIconAdress[cate.title]}></img>` : ''}${cate.title}</h3><ul class="section-list">${sectionsHTML}</ul></div>`
    $('.side-tree .section-item h3').on('click', (e) => {
      e.currentTarget.parentNode.classList.toggle('open')
    })
  })
  const breadcrumbThird = breadcrumbs.querySelector('li:nth-child(3)')
  breadcrumbThird && breadcrumbThird.remove()
}

// 点击播放视频
function playVideo (e) {
  let target = e.target
  while(!target.classList.contains('img-wrap')) {
    target = target.parentNode
  }
  const selector = target.dataset.play
  const videoCover = document.querySelector(`#${selector}`)
  videoCover.style.display = 'flex'
  videoCover.querySelector('video').play()
}
const videos = document.querySelectorAll('.video-item .img-wrap')
videos.length && videos.forEach(function(video) {
  video.addEventListener('click', playVideo)
})

// 停止视频播放
function closeVideo(e) {
  const videoBox = e.target.parentNode.parentNode
  const video = videoBox.querySelector('video')
  video.pause()
  e.target.parentNode.parentNode.style.display = 'none'
}
const videoCloseIcons = document.querySelectorAll('.video-box .close-icon')
videoCloseIcons.length && videoCloseIcons.forEach(function(button) {
  button.addEventListener('click', closeVideo)
})

/* 搜索结果页面 */
if(location.href.indexOf('/search/results') !== -1) {
  const searchResultText = document.querySelector('.search-btitle').textContent
  const regexp = /搜索到\s+(\d+)\s+条\s+"(.+)"/
  // const [match, searchResultCount, keywords] = regexp.exec(searchResultText)
  const result = regexp.exec(searchResultText)
  const match = result[0]
  const searchResultCount = result[1]
  const keywords = result[2]
  document.querySelector('input[name=keyword]').value = keywords
  if(searchResultCount === '0') {
    const footer = document.querySelector('.footer')
    footer.parentNode.removeChild(footer)
    const searchResultsList = document.querySelector('ul.search-results-list')
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
const toTop = document.getElementById('toTop')
toTop && toTop.addEventListener('click', scrollToTop)

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

/* 首页 head bar 背景色 */
const headBar = document.querySelector('#nav')
if(location.pathname === '/hc/' || location.pathname === '/hc' || location.pathname === '/') {
  headBar.style.backgroundColor = '#FAFAFC'
} else {
  headBar.style.backgroundColor = '#FFFFFF'
}

/* 侦听页面滚动 */
function onScroll() {
  const clientHeight = window.innerHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const toTop = document.getElementById('toTop')
  const headBar = document.querySelector('#nav')
  if(scrollTop === 0) {
    if(location.pathname === '/hc/' || location.pathname === '/hc' || location.pathname === '/') {
      headBar.style.backgroundColor = '#FAFAFC'
    } else {
      headBar.style.backgroundColor = '#FFFFFF'
    }
    headBar.style.boxShadow = 'none'
  } else {
    headBar.style.backgroundColor = '#FFFFFF'
    headBar.style.boxShadow = 'rgba(0,0,0,0.06) 0 6px 10px'
  }
  if (scrollTop < clientHeight) {
    toTop.style.display = 'none'
  } else {
    toTop.style.display = 'block'
  }
}
window.addEventListener('scroll', throttle(onScroll, 300, {leading: true, trailing: true}))

/* 上一篇/下一篇 位置 */
const nextPrevWrap = document.querySelectorAll('.next_prev_wrap')
if (nextPrevWrap && nextPrevWrap.length === 1) {
  const articleLink = nextPrevWrap[0].querySelector('a')
  switch(articleLink.className) {
    case 'prev':
      nextPrevWrap[0].style.float = 'left'
      break
    case 'next':
      nextPrevWrap[0].style.float = 'right'
      break
    default:
      break
  }
}