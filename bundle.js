"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 进入页面后删除原生头部
var tobeRemoved = document.querySelector('body>div:first-child');
tobeRemoved && tobeRemoved.parentNode.removeChild(tobeRemoved); // 设置语言

(function () {
  if (location.search.indexOf('lang=en') !== -1) {
    if (document.querySelector('.switch-lang .en').classList.contains('active')) return;
    document.querySelectorAll('.switch-lang a').forEach(function (element) {
      element.classList.remove('active');
    });
    document.querySelector('.switch-lang .en').classList.add('active');
  }
})(); // 侧栏


var sideTree = document.querySelector('.side-tree');

if (sideTree) {
  sideTree.innerHTML = "<div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031758/\">\u8BBE\u8BA1\u539F\u7406</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125839/\">\u8BBE\u8BA1</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125840/\">\u4EA7\u54C1</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125849/\">\u539F\u578B</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031748/\">\u539F\u578B\u5236\u4F5C</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125577/\">\u5FEB\u901F\u5165\u95E8</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125578/\">\u8BBE\u7F6E\u9875\u9762</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125579/\">\u7F16\u8F91\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125580/\">\u6DFB\u52A0\u8DF3\u8F6C</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125581/\">\u5176\u5B83\u64CD\u4F5C</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031749/\">\u7EC4\u4EF6\u7D20\u6750</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125582/\">\u57FA\u7840\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125583/\">\u5E73\u53F0\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125584/\">\u6211\u7684\u7EC4\u4EF6</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125585/\">\u56FE\u6807</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125586/\">\u6BCD\u7248</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125587/\">\u7D20\u6750\u5E93</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125588/\">\u6A21\u677F\u8D44\u6E90</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031751/\">\u4EA4\u4E92\u6548\u679C</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125593/\">\u72B6\u6001/\u52A8\u6001\u9762\u677F</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125594/\">\u6548\u679C\u6848\u4F8B</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125595/\">\u7F51\u9875\u5D4C\u5165</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125596/\">\u5176\u5B83\u6548\u679C</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031752/\">\u8BBE\u8BA1\u7A3F\u4EA4\u4E92</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125597/\">\u56FE\u7247\u8BBE\u8BA1\u7A3F</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125598/\">sketch\u8BBE\u8BA1\u7A3F</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031753/\">\u6F14\u793A/\u5206\u4EAB/\u4E0B\u8F7D</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125599/\">\u6F14\u793A\u9879\u76EE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125600/\">\u5206\u4EAB\u9879\u76EE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125601/\">\u4E0B\u8F7D\u9879\u76EE</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031754/\">\u5F00\u53D1\u4EA4\u4ED8</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125602/\">\u5BFC\u5165\u5207\u56FE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125603/\">\u6807\u6CE8</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125604/\">\u5DE5\u4F5C\u6D41</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031756/\">\u9879\u76EE\u7BA1\u7406</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125609/\">\u521B\u5EFA/\u5220\u9664</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125610/\">\u8BBE\u7F6E</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125611/\">\u79FB\u52A8</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125612/\">\u7BA1\u7406</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031755/\">\u4F01\u4E1A\u534F\u4F5C</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125605/\">\u7BA1\u7406\u4F01\u4E1A</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125606/\">\u7BA1\u7406\u9879\u76EE\u7EC4</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125607/\">\u7BA1\u7406\u534F\u4F5C\u9879\u76EE</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125608/\">\u534F\u4F5C\u7F16\u8F91</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031757/\">\u5200\u53CB\u5206\u4EAB</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031759/\">\u57FA\u7840\u6559\u7A0B</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031760/\">\u4EA4\u4E92\u6559\u7A0B</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031761/\">\u534F\u4F5C\u6559\u7A0B</a></h3></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031762/\">\u66F4\u65B0\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125618/\">\u66F4\u65B0\u4ECB\u7ECD</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031764/\">\u4ED8\u8D39/\u53D1\u7968\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125620/\">\u7248\u672C\u4ECB\u7ECD</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125621/\">\u8D2D\u4E70/\u4ED8\u8D39</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125622/\">\u7533\u8BF7\u53D1\u7968</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125623/\">\u5F00\u5177\u53D1\u7968</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031765/\">\u5E10\u53F7/\u5BC6\u7801\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125726/\">\u8D26\u53F7</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125727/\">\u5BC6\u7801</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031766/\">\u4F7F\u7528\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125714/\">\u7F16\u8F91\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125715/\">\u9879\u76EE\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125716/\">\u4E0B\u8F7D\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125717/\">\u6F14\u793A\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125718/\">\u534F\u4F5C\u76F8\u5173\u95EE\u9898</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125719/\">\u5176\u5B83\u95EE\u9898</a></li></ul></div><div class=\"cate-wrap\"><h3 class=\"cate-name\"><span class=\"toggle-icon\"></span><a href=\"/hc/kb/category/1031767/\">\u5F02\u5E38\u95EE\u9898</a></h3><ul class=\"section-list\"><li class=\"section-item\"><a href=\"/hc/kb/section/1125624/\">\u6570\u636E\u4E0D\u89C1\u4E86</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125625/\">\u58A8\u5200\u6253\u4E0D\u5F00</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125626/\">\u9879\u76EE\u6253\u4E0D\u5F00</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125627/\">\u4E0B\u8F7D\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125628/\">\u6F14\u793A\u5206\u4EAB\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125629/\">\u5B89\u88C5\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125630/\">\u9879\u76EE\u590D\u5236\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125631/\">\u7F16\u8F91\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125632/\">\u5DE5\u4F5C\u6D41\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125633/\">sketch\u63D2\u4EF6\u5F02\u5E38</a></li><li class=\"section-item\"><a href=\"/hc/kb/section/1125634/\">\u5176\u5B83\u5F02\u5E38</a></li></ul></div>";

  if (location.href.indexOf('/article/') !== -1 || location.href.indexOf('/section/') !== -1) {
    var breadcrumbs = document.querySelector('.sub-nav .breadcrumbs');
    var cate = breadcrumbs.querySelector('li:nth-child(2)').textContent.trim();
    var section = breadcrumbs.querySelector('li:nth-child(3)').textContent.trim();
    sideTree.querySelectorAll('.cate-wrap').forEach(function (item) {
      if (item.querySelector('h3.cate-name').textContent.trim() === cate) {
        item.classList.add('open');
        item.querySelectorAll('ul.section-list>li').forEach(function (item) {
          if (item.textContent.trim() === section) {
            item.classList.add('active');
          }
        });
      } else {
        item.parentNode.removeChild(item);
      }
    });
  }
} // $('.cate-wrap .cate-name').click(function(e) {
//   let target = e.target.parentNode
//   while (!target.classList.contains('cate-wrap')) {
//     target = target.parentNode
//   }
//   target.classList.toggle('open')
// })
// 点击播放视频


function playVideo(e) {
  var selector = e.target.dataset.play;
  var videoCover = document.querySelector("#".concat(selector));
  videoCover.style.display = 'flex';
  videoCover.querySelector('video').play();
} // 停止视频播放


function closeVideo(e) {
  var videoBox = e.target.parentNode.parentNode;
  var video = videoBox.querySelector('video');
  video.pause();
  e.target.parentNode.parentNode.style.display = 'none';
}
/* 搜索结果页面 */


if (location.href.indexOf('/search/results') !== -1) {
  var searchResultText = document.querySelector('.search-btitle').textContent;
  var regexp = /搜索到\s+(\d+)\s+条\s+"(.+)"/;

  var _regexp$exec = regexp.exec(searchResultText),
      _regexp$exec2 = _slicedToArray(_regexp$exec, 3),
      match = _regexp$exec2[0],
      searchResultCount = _regexp$exec2[1],
      keywords = _regexp$exec2[2];

  document.querySelector('input[name=keyword]').value = keywords;

  if (searchResultCount === '0') {
    searchResultsList = document.querySelector('ul.search-results-list');
    searchResultsList.parentNode.removeChild(searchResultsList);
    var tobeInserted = "<h2 class=\"no-result-title\">\u62B1\u6B49,\u6CA1\u6709\u627E\u5230\u201C<span class=\"search-keyword\"></span>\u201D\u7684\u76F8\u5173\u7ED3\u679C</h2><p class=\"no-result-subtitle\">\u5C1D\u8BD5\u4FEE\u6539\u5173\u952E\u8BCD\u6216\u5C06\u60A8\u9700\u8981\u7684\u6559\u7A0B\u5177\u4F53\u5185\u5BB9<a href=\"https://jinshuju.net/f/rCYg0T\">\u544A\u8BC9\u6211\u4EEC</a>\uFF0C\u6211\u4EEC\u4F1A\u5B9A\u671F\u4F18\u5316</p><div class=\"tips-container\"><h3><img src=\"https://cdn.modao.cc/tips_icon.svg\" alt=\"\u641C\u7D22\u6280\u5DE7\" class=\"tips-icon\">\u641C\u7D22\u6280\u5DE7</h3><ul class=\"tips-list\"><li class=\"tips-items\"><span></span>\u4F7F\u7528\u66F4\u52A0\u7CBE\u7B80\u7684\u5173\u952E\u8BCD\u3002\u6BD4\u5982\u4F7F\u7528\u201C\u8F6C\u79FB\u201D\uFF0C\u800C\u4E0D\u662F\u201C\u600E\u4E48\u8F6C\u79FB\u9879\u76EE\u201D</li><li class=\"tips-items\"><span></span>\u68C0\u67E5\u662F\u5426\u6709\u9519\u522B\u5B57\u548C\u7279\u6B8A\u7B26\u53F7</li><li class=\"tips-items\"><span></span>\u5C1D\u8BD5\u6362\u4E00\u4E2A\u5173\u952E\u8BCD\u641C\u7D22\u3002\u6BD4\u5982\u641C\u7D22\u201C\u65F6\u95F4\u7EC4\u4EF6\u201D\u641C\u5230\u7684\u4E0D\u662F\u60F3\u8981\u7684\u5185\u5BB9\uFF0C\u6362\u6210\u201C\u65E5\u671F\u7EC4\u4EF6\u201D</li></ul></div>";
    var searchResultContainer = document.querySelector('section.no-result');
    searchResultContainer.innerHTML = tobeInserted;
    searchResultContainer.style.display = 'block';
    searchResultContainer.querySelector('.search-keyword').innerHTML = keywords;
  }
}
/* 返回顶部 */


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
/* 简单节流函数 */


function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
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
}

;
/* 侦听页面滚动 */

function onScroll() {
  var clientHeight = window.innerHeight;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var toTop = document.getElementById('toTop');

  if (scrollTop < clientHeight) {
    toTop.style.display = 'none';
  } else {
    toTop.style.display = 'block';
  }
}

window.onscroll = throttle(onScroll, 300, {
  leading: true,
  trailing: true
});
