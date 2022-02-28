(() => {
    "use strict";

    function e(e, t) { return new Proxy(e, { get: (e, t) => Reflect.get(e, t), set(e, n, a) { let s = Reflect.set(e, n, a); return t(), s } }) }

    function t(e, t, n = !0) {
      let a, s = null;
      return a = n ? function(...n) {
        s && clearTimeout(s);
        let a = !s;
        s = setTimeout((() => { s = null }), t), a && e.apply(this, n)
      } : function(...n) {
        const a = this;
        s && clearTimeout(s), s = setTimeout((() => { e.apply(a, n) }), t)
      }, a
    }

    function n(e) {
      let t = Math.floor(e / 1e3 % 60);
      t = t < 10 ? `0${t}` : t;
      let n = Math.floor(e / 1e3 / 60);
      return n = n < 10 ? `0${n}` : n, `${n}:${t}`
    }

    function a({ method: e = "GET", url: t, data: n = {} }) {
      return new Promise((a => {
        const s = new XMLHttpRequest;
        s.open(e, "http://101.43.140.74:3000" + t), s.onload = function() { a(JSON.parse(s.response)) }, s.onerror = function() { console.log(s), s.status }, s.send(JSON.stringify(n))
      }))
    }
    async function s(e) { let t; return t = a({ url: `/song/detail?ids=${e}` }), t }
    const i = { data: [], lyric: [] },
      o = e({ musicId: 1813926556 }, (async function() {
            console.log("🚀 ~ file: player.js ~ line 50 ~ initPlayer ~ musicData.data", i.data);
            let e = i.data.songs[0];
            document.querySelector("#app").innerHTML = `\n    <div class="player-background-image">\n        <div class="player-content d-flex">\n            <div class="player-album-cover d-flex">\n                \x3c!-- 歌曲封面 --\x3e\n                <div class="ablum">\n                    <div class="cover running">\n                        <img src="${e.al.picUrl}" alt="">\n                    </div>\n                </div>\n            </div>\n\n            <div class="player-lyric d-flex align-items-start">\n                \x3c!-- 歌曲和歌词信息 --\x3e\n                <h3 class="song-name">\n                ${e.name}\n                </h3>\n                <div class="song-info">\n                    <span class="song-album">专辑：${e.al.name}</span>\n                    <span class="singer">歌手：${e.ar[0].name}</span>\n                    <span class="song-sour">来源：${e.al.name}</span>\n                </div>\n                <div class="lyric-wrap">\n                ${function(e){if(0==e.length)return"";let t="";return e.forEach((e=>{t+=`\n        <p class="song-lyric-item" data-time='${e.time}'>${Object.keys(e).length>0?e.lyric:""}</p>\n        `})),t}(i.lyric)}\n                </div>\n            </div>\n        </div>\n    </div>\n    `,function(){const e=document.querySelector("#myAudio");e.addEventListener("timeupdate",(e=>{const t=document.querySelectorAll(".song-lyric-item");if(!t.length)return;const n=e.target.currentTime;let a=0;Array.from(t).forEach((e=>{const t=e.getAttribute("data-time");n>t&&a++,e.classList.remove("active")})),t[a-1].classList.add("active"),a>5&&function(e,t,n){const a=document.querySelector(".lyric-wrap");{const{height:e}=document.querySelector(`.${t}`).getBoundingClientRect();a.scrollTop=n*e}}(0,"song-lyric-item",a-1-5)})),e.addEventListener("ended",(()=>{const e=document.querySelector(".ablum .cover");e&&(e.style.animationPlayState="paused")})),e.addEventListener("pause",(()=>{const e=document.querySelector(".ablum .cover");e&&(e.style.animationPlayState="paused")})),e.addEventListener("playing",(()=>{const e=document.querySelector(".ablum .cover");e&&(e.style.animationPlayState="running")}))}(),function(e,t){const n=document.createElement("canvas");n.width=100,n.height=100;const a=n.getContext("2d"),s=new Image;s.src=t,s.setAttribute("crossorigin","anonymous"),s.onload=function(){const{width:t,height:i}=n;a.drawImage(s,0,0,s.width,s.height,0,0,t,i);let o=function(e){var t,n,a,s,i,o,l,r,c,d,u=e.data,m=e.width,g=e.height,y=[],p=0,f=10;for(o=1/(5*Math.sqrt(2*Math.PI)),i=-.02,l=0,t=-10;t<=f;t++,l++)s=o*Math.exp(i*t*t),y[l]=s,p+=s;for(l=0,d=y.length;l<d;l++)y[l]/=p;for(n=0;n<g;n++)for(t=0;t<m;t++){for(a=s=i=o=0,p=0,r=-10;r<=f;r++)(c=t+r)>=0&&c<m&&(a+=u[l=4*(n*m+c)]*y[r+f],s+=u[l+1]*y[r+f],i+=u[l+2]*y[r+f],p+=y[r+f]);u[l=4*(n*m+t)]=a/p,u[l+1]=s/p,u[l+2]=i/p}for(t=0;t<m;t++)for(n=0;n<g;n++){for(a=s=i=o=0,p=0,r=-10;r<=f;r++)(c=n+r)>=0&&c<g&&(a+=u[l=4*(c*m+t)]*y[r+f],s+=u[l+1]*y[r+f],i+=u[l+2]*y[r+f],p+=y[r+f]);u[l=4*(n*m+t)]=a/p,u[l+1]=s/p,u[l+2]=i/p}return e}(a.getImageData(0,0,t,i));a.putImageData(o,0,0);let l=n.toDataURL();e.style.backgroundImage="url("+l+")"}}(document.querySelector(".player-background-image"),i.data.songs[0].al.picUrl)}));async function l(e){const t=e,n=await s(t),l=await async function(e){let t;return t=a({url:`/lyric?id=${e}`}),t}(t);i.data=n,i.lyric=function(e){if("string"!=typeof e)return"歌词加载失败";const t=e.split("\n").map(((e,t)=>{let n={};if(/^\[(\w*:\w*.?\w*)\](.*)/g.test(e)){let e=RegExp.$1.split(":").reduce(((e,t)=>60*Number(e)+Number(t))).toFixed(2);n.time=Number(e),n.lyric=RegExp.$2}return n}));return console.log("🚀 ~ file: util.js ~ line 252 ~ formatSongLyric ~ lyric",t),t}(l.lrc.lyric),o.musicId=t}const r=e({isPlay:!1},(function(){const e=document.querySelector("#myAudio"),t=document.querySelector(".player-control-unit #player-control");r.isPlay?e.play():e.pause(),r.isPlay?t.innerHTML='<use xlink:href="#icon-bofangzhong"></use>':t.innerHTML='<use xlink:href="#icon-zanting"></use>'})),c=e({musicId:1813926556},u),d=e({musicMode:0},m);async function u(e=!0){let t=Number(window.localStorage.getItem("musicId")||1813926556);console.log("🚀 ~ file: control.js ~ line 27 ~ initPlayerControl ~ musicId",t),p("player",t);const a=await async function(e){return`https://music.163.com/song/media/outer/url?id=${e}`}(t),i=await s(t);let o;e&&(document.querySelector("#myAudio").src=a,r.isPlay=!0),i&&(o=i.songs[0]),function(e){document.querySelector(".songname").innerText=e.name,document.querySelector(".singer").innerText=e.ar[0].name,document.querySelector(".total-time").innerText=n(e.dt),Array.from(document.querySelectorAll(".player-control-songinfo .img")).forEach((t=>{t.innerHTML=`<img src=${e.al.picUrl} alt='' >`})),document.querySelector(".player-control-unit #player-control").innerHTML='\n    <use xlink:href="#icon-bofangzhong"></use>\n    ',m()}(o),f()}function m(){const e=window.localStorage.getItem("musicMode")||0,t=0==e?'<use xlink:href="#icon-liebiaoxunhuan"></use>':1==e?'<use xlink:href="#icon-suijibofang"></use>':'<use xlink:href="#icon-danquxunhuan"></use>';document.querySelector("#musicMode").innerHTML=t}function g(e="next"){let t=window.localStorage.getItem("musicId")||1813926556;const n=window.localStorage.getItem("musicMode")||0;if(2==n)return t;const a=JSON.parse(window.localStorage.getItem("songList"))||[],s=a.length;let i=a.findIndex((e=>e.id==t));return console.log("🚀 ~ file: control.js ~ line 119 ~ index ~ index",i),1==n?i=Math.floor(Math.random()*s):0==n&&"next"==e?i=++i%s:0==n&&"prev"==e&&(i=--i%s),t=s>0?a[i].id:t,window.localStorage.setItem("musicId",t),t}function y(e,t,n){const a=document.querySelector(e),{left:s,width:i}=a.getBoundingClientRect();let o;return"percentMode"==t?o=n:"positionMode"==t&&(o=(n-s)/i),document.querySelector(`${e} .progress-bar`).style.width=`${(100*o).toFixed(2)}%`,document.querySelector(`${e} .progress-dot`).style.left=Math.round(o*i)-2+"px",o}function p(e,t){"player"==e?(document.querySelector("#playerCover").setAttribute("href",`#/player/:${t}`),document.querySelector("#playerCoverBack").classList.add("display-none"),document.querySelector("#playerCover").classList.remove("display-none")):"recommend"==e&&(document.querySelector("#playerCoverBack").setAttribute("href",`#/recommendList/:${t}`),document.querySelector("#playerCover").classList.add("display-none"),document.querySelector("#playerCoverBack").classList.remove("display-none"))}function f(){const e=document.querySelector(".player-list-ul"),t=JSON.parse(window.localStorage.getItem("songList"))||[],a=window.localStorage.getItem("musicId");if(t.length){const s=t.map((e=>`<li class="player-list-li d-flex justify-content-start pointer " data-id='${e.id}'>\n            <svg class='icon ${a==e.id?"":"opacity"}' aria-hidden="true">\n                <use xlink:href="#icon-bofangzhong"></use>\n            </svg>\n            <div class="song-name single-text-omitted">${e.name}</div>\n            <div class="singer">${e.ar[0].name}</div>\n            <div class="song-time">${n(e.dt)}</div>\n        </li>`)).join("");e.innerHTML=s}else e.innerHTML='\n        <li class="player-list-li d-flex justify-content-start">\n            请添加你喜欢的音乐\n        </li>\n        '}const v={data:[],currentIndex:0,times:2e3,animationTimes:.5,autoCycleTimer:new Set};function h(){const e=document.getElementsByClassName("carousel-item");let t=e.length,n=v.currentIndex=++v.currentIndex%t,a=Array.from(e),s=a.length,{width:i=0}=w(e[0]);0!=n&&(a=[...a.slice(-n,s),...a.slice(0,s-n)]),a.forEach(((e,n)=>{0==n&&(e.style.transform=`translateX(${-i*(t-1)}px)`,e.style.opacity=0),e.style.transform=`translateX(${i*(n-1)}px)`,e.style.opacity=1})),x(n)}function x(e){const t=document.getElementsByClassName("carousel-indicators-li");Array.from(t).forEach(((t,n)=>{e==n?t.setAttribute("class","carousel-indicators-li active"):t.setAttribute("class","carousel-indicators-li")}))}function w(e){try{return e.getBoundingClientRect()}catch(e){return $(),{}}}const S=t((function(){$(),function(){const e=document.getElementsByClassName("carousel-item");let t=e.length;0==v.currentIndex&&(v.currentIndex=t);let n=v.currentIndex=--v.currentIndex%t,a=Array.from(e),{width:s=0}=w(e[0]);a=[...a.slice(n),...a.slice(0,n)],a.forEach(((e,n)=>{0==n&&(e.style.transform=`translateX(${s*(t-1)}px)`,e.style.opacity=0),e.style.transform=`translateX(${s*(n-1)}px)`,e.style.opacity=1})),x(n)}();let e=setInterval(h,v.times);v.autoCycleTimer.add(e)}),500),b=t((function(){$(),h();let e=setInterval(h,v.times);v.autoCycleTimer.add(e)}),500);function $(){for(const e of v.autoCycleTimer)clearInterval(e),v.autoCycleTimer>100&&v.autoCycleTimer.clear()}const L={playlist:[],detail:{},listActive:1813926556},I=e({active:L.listActive},E),q=e({active:L.listActive,isPlay:!1},E);function E(){const e=document.getElementsByClassName("recommend-list-songlist-body")[0];let t="",a="";L.playlist.forEach(((e,s)=>{a=s%2==0?"even":"odd";let i,o=I.active==e.id?"active":"";i=e.id==q.active&&q.isPlay,t+=`\n        <li class="songlist-item pointer ${a} ${o} d-flex justify-content-start" data-index=${e.id}>\n            <div class="songlist-number font-color">\n                <span class="index" style=${i?"display:none":"display:inline-block"}>${s+1}</span>\n                <svg class="icon" style=${i?"display:inline-block":"display:none"} aria-hidden="true">\n                    <use xlink:href="#icon-bofangzhong"></use>\n                </svg>\n                <svg class="icon" aria-hidden="true">\n                    <use xlink:href="#icon-shoucang"></use>\n                </svg>\n                <svg class="icon" aria-hidden="true">\n                    <use xlink:href="#icon-xiazai"></use>\n                </svg>\n            </div>\n            <div class="songlist-songname">\n                ${e.name}\n            </div>\n            <div class="songlist-artist font-color">\n                ${e.ar[0].name}\n            </div>\n            <div class="songlist-album font-color">\n                ${e.al.name}\n            </div>\n            <div class="songlist-time font-color">\n            ${n(e.dt)}\n            </div>\n        </li>\n        `})),e.innerHTML=t}const T=e({hash:""},(()=>function(){let e=function(e){const t={name:"",params:"",query:""};if(e&&"#/home"!=e)try{const n=e.slice(1).split("/");t.name=n[1];const a=n[2].split("?");t.params=a[0].slice(1),t.query=a.slice(1)}catch(e){t.name="404"}else t.name="home";return t}(T.hash);const[{component:t,name:n}]=M.filter((t=>t.name==e.name));t(e),document.querySelector("#header-title").innerHTML=n}())),M=[{name:"home",path:"/home",component:async function(){document.querySelector("#app").innerHTML='\n<div class="w">\n    <div class="carousel-wrapper">\n        <div class="carousel-container ">\n            \x3c!-- 切换箭头 --\x3e\n            \x3c!-- 轮播图图片需要动态生成 --\x3e\n        </div>\n        \x3c!-- 指示器 --\x3e\n        <ul class="carousel-indicators d-flex">\n\n        </ul>\n    </div>\n    <div class="recommend-playlist">\n        <h3 class="recommend-playlist-header">推荐歌单<svg class="icon" aria-hidden="true">\n                <use xlink:href="#icon-arrow-right"></use>\n            </svg>\n        </h3>\n        <ul class="recommend-playlist-container d-flex justify-content-between align-items-start">\n            \x3c!-- 推荐歌单需要动态生成 --\x3e\n        </ul>\n    </div>\n</div>\n';const e=await async function(){let e;return e=a({url:"/homepage/block/page"}),e}();console.log("🚀 ~ file: home.js ~ line 76 ~ homePage ~ result",e),function(e){let t="",n="";const a=document.querySelector(".carousel-wrapper");let{width:s=0}=a.getBoundingClientRect();e.forEach(((e,a)=>{let i=v.currentIndex==a?"active":"";t+=`\n            <div class="carousel-item ${"#"+a}" style='transform:translateX(${s*(a-1)}px);transition-duration:${v.animationTimes}s'>\n                <img src="${e.pic}" alt="">\n            </div>\n            `,n+=`\n                <li data-slide-to="${a}" class="carousel-indicators-li ${i}"></li>\n            `}));const i=`\n        <div class="carousel-container" style="transition:transform ${v.animationTimes}s ">\n            \n<button class="carousel-control carousel-control-left carousel-control-hover">\n<svg class="icon" aria-hidden="true">\n    <use xlink:href="#icon-arrow-left"></use>\n</svg>\n</button>\n<button class="carousel-control carousel-control-right carousel-control-hover">\n<svg class="icon" aria-hidden="true">\n    <use xlink:href="#icon-arrow-right"></use>\n</svg>\n</button>\n \n            <div class="carousel-content">   \n                ${t}\n            </div>\n        </div>\n        `,o=`\n        <ul class="carousel-indicators d-flex">\n            ${n}\n        </ul>\n        `;a.innerHTML=i+o;let l=setInterval(h,v.times);v.autoCycleTimer.add(l)}(e.data.blocks[0].extInfo.banners),function(){const e=document.getElementsByClassName("carousel-control-left"),t=document.getElementsByClassName("carousel-control-right"),n=document.querySelector(".carousel-container"),a=document.querySelector(".carousel-indicators");e[0].addEventListener("click",S),t[0].addEventListener("click",b),n.addEventListener("mouseenter",(()=>{$()})),n.addEventListener("mouseleave",(()=>{let e=setInterval(h,v.times);v.autoCycleTimer.add(e)})),a.addEventListener("mouseenter",(e=>{if("LI"===e.target.tagName){$();const t=e.target.getAttribute("data-slide-to");v.currentIndex=t-1,h();let n=setInterval(h,v.times);v.autoCycleTimer.add(n)}}),!0)}(),function(e){const t=document.querySelector(".recommend-playlist-container");let n="",a=e.length;e.forEach(((e,t)=>{n+=`\n            <li data-index=${t} class="recommend-playlist-item d-flex flex-column }" style="width:${98/a}%">\n                <div class="recommend-playlist-cover">\n                    <a href='#/recommendList/:${e.creativeId}'>\n                        <img src="${e.uiElement.image.imageUrl}"\n                            alt="">\n                        <svg class="recommend-playlist-icon icon" aria-hidden="true">\n                            <use xlink:href="#icon-zanting"></use>\n                        </svg>\n                    </a>\n                </div>\n                <div class="recommend-playlist-title multi-text-omitted">\n                    ${e.uiElement.mainTitle.title}\n                </div>\n            </li>\n            `})),t.innerHTML=n}([...e.data.blocks[1].creatives]),function(){const e=document.querySelector(".recommend-playlist-container");e.addEventListener("mouseenter",(e=>{"LI"===e.target.tagName&&e.target.setAttribute("class","recommend-playlist-item d-flex flex-column hover")}),!0),e.addEventListener("mouseleave",(e=>{"LI"===e.target.tagName&&e.target.setAttribute("class","recommend-playlist-item d-flex flex-column ")}),!0)}()}},{name:"recommendList",path:"/recommendList",component:async({params:e=""})=>{document.querySelector("#app").innerHTML="加载中";const t=await async function(e){let t;return t=a({url:`/playlist/detail?id=${e}`}),t}(e);404==t.code?document.querySelector("#app").innerHTML="未找到资源":(L.detail=t.playlist,L.playlist=t.playlist.tracks,function(){let e="";L.detail.tags.forEach(((t,n)=>{n==L.detail.tags.length-1?e+=`<span class="tag">${t}  </span>`:e+=`<span class="tag">${t} / </span>`}));let t=function(e){let t=new Date(e);return`${t.getFullYear()}-${t.getMonth()}-${t.getDay()}`}(L.detail.createTime);document.querySelector("#app").innerHTML=`            \n<div class="w">\n    <div class="recommend-header">\n        <a href="#/home">首页</a>/\n        <span>推荐歌单页</span>\n    </div>\n    <div class="recommend-wrapper">\n    \x3c!-- 此处为推荐页，内容主要包括两个部分：歌单介绍和歌单列表 --\x3e\n        <div class="recommend-describe d-flex justify-content-start">\n        \x3c!-- 歌单介绍 --\x3e\n            <div class="recommend-describe-left">\n                <img src="${L.detail.coverImgUrl}" alt="">\n            </div>\n            <div class="recommend-describe-right d-flex flex-column align-items-start">\n                <h4 class="recommend-describe-right-title single-text-omitted">\n                    ${L.detail.name}\n                </h4>\n                <div class="recommend-describe-right-creator d-flex">\n                    <img class="avatar"\n                        src="${L.detail.creator.avatarUrl}"\n                        alt="">\n                    <span class="creator">${L.detail.creator.detailDescription}</span>\n                    <span class="create-time">${t}</span>\n                </div>\n                <div class="recommend-describe-right-add d-flex">\n                    <span class="btn">播放全部</span><span class="add">+</span>\n                </div>\n                <div class="recommend-describe-right-info">\n                    <div class="info">\n                        <span class="label">标签：</span>\n                        ${e}\n                    </div>\n                    <div class="info">\n                        <span class="label">歌曲：</span>\n                        <span class="label-info">${L.detail.trackCount}</span>\n                        <span class="label">播放：</span>\n                        <span class="label-info">${L.detail.playCount}</span>\n                    </div>\n                    <div class="info single-text-omitted ">\n                        <span class="label">简介：</span>\n                        <span class="label-info ">${L.detail.description}</span>\n                    </div>\n                </div>\n            </div>\n        </div>  \n        <div class="recommend-list">\n            \x3c!-- 歌单列表  --\x3e\n            <h4 class="recommend-list-title">\n            歌曲列表\n            </h4>\n            <ul class="recommend-list-songlist-header d-flex justify-content-start">\n                <li class="songlist-header-name">歌曲</li>\n                <li class="songlist-header-author">歌手</li>\n                <li class="songlist-header-album">专辑</li>\n                <li class="songlist-header-time">时长</li>\n            </ul>\n            <ul class="recommend-list-songlist-body">\n            </ul>\n        </div> \n    </div> \n</div>\n`}(),E(),function(){const e=document.querySelector(".recommend-list-songlist-body");e.addEventListener("mouseenter",(e=>{if("li"==e.target.nodeName.toLocaleLowerCase()){const t=e.target.getAttribute("data-index");if(I.active==t)return;I.active=t}}),!0),e.addEventListener("dblclick",(async e=>{const t=e.target.nodeName.toLocaleLowerCase();if("li"==t){const t=e.target.getAttribute("data-index");q.active=t,window.localStorage.setItem("musicId",t)}else if("div"==t){const t=e.target.parentNode.getAttribute("data-index");q.active=t,window.localStorage.setItem("musicId",t)}q.isPlay=!0,u()}),!0),document.querySelector(".recommend-describe-right-add").addEventListener("click",(()=>{const e=function(e){let t=JSON.parse(window.localStorage.getItem("songList"))||[];t=[...e.map((e=>({id:e.id,name:e.name,ar:e.ar,dt:e.dt}))),...t];const n=new Map;t.forEach((e=>{!n.has(e.id)&&n.set(e.id,e)}));const a=[...n.values()];return a.length>100&&(a=a.slice(a.length-100)),a}(L.playlist);window.localStorage.setItem("songList",JSON.stringify(e)),f()}))}());const n=window.localStorage.getItem("musicId");window.localStorage.setItem("lastRecommendId",e),p("player",n)}},{name:"player",path:"/player",component:async function({params:e=""}){document.querySelector("#app").innerHTML="playerPage加载中",l(e),p("recommend",window.localStorage.getItem("lastRecommendId"))}}];window.addEventListener("load",(()=>{T.hash=window.location.hash,u(),function(){document.querySelector(".player-control-unit #player-control").addEventListener("click",(()=>{r.isPlay=!r.isPlay}));const e=document.querySelector("#myAudio"),t=y("#volume-bar","percentMode",.5);e.volume=t,e.addEventListener("timeupdate",(e=>{const t=e.target.currentTime;y("#progress-bar","percentMode",t/e.target.duration),document.querySelector(".song-progress .current-time").innerText=n(1e3*t)})),e.addEventListener("ended",(()=>{r.isPlay=!1,c.musicId=g("next"),l(c.musicId)})),document.querySelector("#progress-bar").addEventListener("click",(t=>{const n=y("#progress-bar","positionMode",t.clientX),a=e.duration;e.currentTime=n*a,r.isPlay=!0})),document.querySelector("#volume-bar").addEventListener("click",(t=>{const n=y("#volume-bar","positionMode",t.clientX);e.volume=n,r.isPlay=!0})),document.querySelector("#musicMode").addEventListener("click",(e=>{let t=window.localStorage.getItem("musicMode")||0;t=++t%3,d.musicMode=t,window.localStorage.setItem("musicMode",t)})),document.querySelector("#player-prev").addEventListener("click",(()=>{c.musicId=g("prev"),l(c.musicId)})),document.querySelector("#player-next").addEventListener("click",(()=>{c.musicId=g("next"),l(c.musicId)}));let a=!1;document.querySelector("#playerList").addEventListener("click",(()=>{const e=document.querySelector(".player-list");a=!a,e.classList.remove("display-none"),a&&e.classList.add("display-none")})),document.querySelector(".player-list-ul").addEventListener("click",(e=>{if("LI"!=e.target.parentNode.tagName)return;const t=e.target.parentNode.getAttribute("data-id");console.log("🚀 ~ file: control.js ~ line 1 ~ document.querySelector ~ e.target.getAttribute('data-id')",t),window.localStorage.setItem("musicId",t),c.musicId=t,l(c.musicId)}),!0)}()})),window.addEventListener("hashchange",(()=>{T.hash=window.location.hash}))})();
//# sourceMappingURL=main.js.map