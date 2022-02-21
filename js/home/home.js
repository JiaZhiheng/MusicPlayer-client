const homePageTemplate = `
<div class="w">
    <div class="carousel-wrapper">
        <div class="carousel-container ">
            <!-- 切换箭头 -->
            <!-- 轮播图图片需要动态生成 -->
        </div>
        <!-- 指示器 -->
        <ul class="carousel-indicators d-flex">

        </ul>
    </div>
    <div class="recommend-playlist">
        <h3 class="recommend-playlist-header">推荐歌单<svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-arrow-right"></use>
            </svg>
        </h3>
        <ul class="recommend-playlist-container d-flex justify-content-between align-items-start">
            <!-- 推荐歌单需要动态生成 -->
        </ul>
    </div>
</div>
`;
//首页初始化
document.querySelector("#app").innerHTML = homePageTemplate;

import { getBannerList } from "../service/ajax.js";

const result = await getBannerList();
const carouselData = result.data.blocks[0].extInfo.banners;

import { carouselRender, initCarouselEvent } from "./carousel.js";

//首次渲染轮播图
carouselRender(carouselData);
//轮播图事件绑定
initCarouselEvent();