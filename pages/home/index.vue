<template>
	<view>
		<view class="vod-banner-container" v-if="vodBannerData.length>0">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" circular
				previous-margin="20" next-margin="20">
				<swiper-item>
					<view class="swiper-item banner-item" @click="turnWebview()">
						<view class="banner-l">
							<image src="https://www.unilei.cn/wp-content/uploads/2021/08/gh_2a42be62ab69_860.jpg" mode="widthFix"></image>
						</view>
						<view class="banner-r">
							<view class="banner-r-1">爱盼影视</view>
							<view class="banner-r-2">点击查看详情</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item v-for="(item,index) in vodBannerData" :key="index">
					<view class="swiper-item banner-item" @click="turnVodDetail(item.vod_id)">
						<view class="banner-l">
							<image :src="item.vod_pic" mode="widthFix"></image>
						</view>
						<view class="banner-r">
							<view class="banner-r-1">{{item.vod_name}}</view>
							<view class="banner-r-2">{{item.vod_remarks}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view v-else class="vod-banner-container">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" circular
				previous-margin="20" next-margin="20">
				<swiper-item v-for="(item,index) in vodDetailTestList" :key="index">
					<view class="swiper-item banner-item" @click="turnVodDetail(item.vod_id)">
						<view class="banner-l">
							<image :src="item.vod_pic" mode="widthFix"></image>
						</view>
						<view class="banner-r">
							<view class="banner-r-1">{{item.vod_name}}</view>
							<view class="banner-r-2">{{item.vod_remarks}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="vod-notice-bar">
			<uni-notice-bar v-if="vodBannerData.length>0" showIcon="true" scrollable="true" single="true" :speed="50"
				backgroundColor="#141414" color="#d5d5d5"
				text="本站资源均网络搜集，如有关视频侵犯了你的权益，请联系邮箱：1983766950#qq.com(#改为@)，本站将于24小时内删除"></uni-notice-bar>
			<uni-notice-bar v-else showIcon="true" scrollable="true" single="true" :speed="50" backgroundColor="#141414"
				color="#d5d5d5" text="爱盼影视"></uni-notice-bar>
		</view>

		<!-- <view class="vod-type-container" v-if="!showDoubanStatus">
			<vgt-tab :list="vodTypeList" :itemStyleDefault="itemStyleDefault" :itemStyleActive="itemStyleActive"
				@onValueChange="vodTypeChange" @onListShow="vodTypeListShow"></vgt-tab>
		</view> -->
		<view v-if="showDoubanStatus">
			<view class="vod-container">
				<view class="vod-item" v-for="(vod,index) in doubanData" :key="index"
					@click="turnDoubanVodDetail(vod.id)">
					<view class="vod-img">
						<image :src="vod.image" mode="widthFix"></image>
					</view>
					<view class="vod-remarks">
						<uni-icons type="star" size="6" color="#c3d83c"></uni-icons>
						{{vod.rating}}
					</view>
					<view class="vod-name">
						{{vod.name}}
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="!showDoubanStatus">
			<view class="vod-container">
				<view class="vod-t">
					<view class="vod-title">最近更新</view>
					<view class="vod-more" @click="turnMoreVod()">更多</view>
				</view>
				<view class="vod-item" v-for="(vod,index) in vodIndexData" :key="index"
					@click="turnVodDetail(vod.vod_id)">
					<view class="vod-img">
						<image :src="vod.vod_pic" mode="widthFix"></image>
					</view>
					<view class="vod-remarks">{{vod.vod_remarks}}</view>
					<view class="vod-name">
						{{vod.vod_name}}
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="vod-container">
				<view class="vod-item" v-for="(vod,index) in vodDetailTestList" :key="index"
					@click="turnVodDetail(vod.vod_id)">
					<view class="vod-img">
						<image :src="vod.vod_pic" mode="widthFix"></image>
					</view>
					<view class="vod-remarks">{{vod.vod_remarks}}</view>
					<view class="vod-name">
						{{vod.vod_name}}
					</view>
				</view>
			</view>
		</view>

		<view>
			<image class="totop" @click="toTop" src="@/static/totop.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import vodApi from '@/api/vod.js';
	import vodData from '@/common/vodData.js';
	import doubanApi from '@/api/douban.js';

	export default {
		components: {

		},
		data() {
			return {
				list: [],
				vodList: [],
				vodDetailList: [],
				page: 1,
				lastPage: 0,
				typeId: 0,
				vodName: '',
				vodDetailTestList: vodData.data,

				vodBannerData: [],
				vodIndexData: [],
				vodTypeList: [
					{
						type_id: 'U',
						type_name: '近期热门'
					},
					{
						type_id: 'R',
						type_name: '最新上映'
					},
					{
						type_id: 'S',
						type_name: '评分最高'
					},
					{
						type_id: 'top250',
						type_name: 'TOP250'
					},
					{
						type_id: 'T',
						type_name: '标记最多'
					}
				],
				itemStyleDefault: {
					color: '#000000',
					background: '#cccccc'
				},
				itemStyleActive: {
					color: '#ffffff',
					'border': '1rpx solid #0aa0a8;'
				},
				doubanSortValue:'U',
				doubanPage:0,
				doubanData:[],
				doubanType:'tag',
				showDoubanStatus:false,

			}
		},
		onLoad() {

			this.getVodBannerlList(1)
			// 获取最新一天的视频
			this.getIndexVodList(this.page, '', '', '', 24 * 1);
			// this.getDoubanTags(this.doubanType, this.doubanPage,this.doubanSortValue);
		},
		methods: {
			vodTypeChange(e) {
				console.log(e)
				let sortValue = e.currentItem.type_id;
				this.doubanSortValue = sortValue;
				this.doubanData = [];
				this.doubanPage = 0;
				if(sortValue == 'top250'){
					this.doubanType = 'top250';
				}else{
					this.doubanType = 'tag'
				}
				this.getDoubanTags(this.doubanType,this.doubanPage,sortValue)
			
			},
			vodTypeListShow(e) {
				console.log(e)
			},
			getDoubanTags(type,page,sortValue) {
				let data = {
					type: type,
					page: page,
					sort: sortValue
				}
				doubanApi.douban(data).then(res => {
					console.log(res)
					let douban_data = res.data;
					if(douban_data){
						let doubanData = Object.keys(douban_data).map(function(i){return douban_data[i]});
						// console.log(Object.keys(douban_data).map(function(i){return douban_data[i]}));
						if(doubanData.length>0){
							this.showDoubanStatus=true;
						}
						this.doubanData = this.doubanData.concat(doubanData);
					}else{
						
					}
					
				}).catch(err => {
					console.log(err)
				})
			},
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			turnMoreVod() {
				uni.switchTab({
					url: '/pages/vod/list'
				})
			},
			// t=>type_id 类型 | ids=>vod_id | h=>vod_time | wd=>vod_name | from=>vod_play_from
			getIndexVodList(page, t, wd, ids, h, from) {
				var data = {
					ac: 'detail',
					pg: page
				}
				if (t) {
					data.t = t
				}
				if (ids) {
					data.ids = ids
				}
				if (h) {
					data.h = h
				}
				if (wd) {
					data.wd = wd
				}
				if (from) {
					data.from = from
				}
				vodApi.vodList(data).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lastPage = res.pagecount;
						let vodIndexData = this.vodIndexData;
						this.vodIndexData = vodIndexData.concat(res.list);

					} else {
						console.log('vod list error:' + JSON.stringify(res.msg))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getVodBannerlList(level) {
				var data = {
					ac: 'detail',
					pg: 1,
					level: level
				}
				vodApi.vodList(data).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.vodBannerData = res.list;
					} else {
						console.log('vod list error:' + JSON.stringify(res.msg))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			turnVodDetail(vodId) {
				uni.navigateTo({
					url: '/pages/vod/detail?vod_id=' + vodId
				})
			},
			turnDoubanVodDetail(doubanId){
				uni.navigateTo({
					url: '/pages/vod/detail?douban_id=' + doubanId
				})
			},
			turnWebview(){
				uni.navigateTo({
					url:'../webview/index/index?url=https://h5.unilei.cn'
				})
			}
		},
		onPullDownRefresh() {
			this.vodIndexData = [];
			this.page = 1;
			this.getIndexVodList(this.page, '', '', '', 24 * 1);
			
			this.doubanData = [];
			this.doubanPage =0;
			this.getDoubanTags(this.doubanType,this.doubanPage,this.doubanSortValue);
			
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1500)
		},
		onReachBottom() {
			// console.log('bottom')
			this.page++;
			this.getIndexVodList(this.page, '', '', '', 24 * 1);
			
			this.doubanPage ++;
			this.getDoubanTags(this.doubanType,this.doubanPage,this.doubanSortValue);
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}
	}
</script>

<style>
	page {
		background-color: rgba(0, 0, 0, 0.8);
	}

	.vod-type-container {
		margin-top: 10rpx;
	}

	.vod-search-container {
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.vod-container {
		width: 100%;
		margin: 20rpx auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.vod-t {
		width: 98%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		border-bottom: 1rpx solid #808080;
		background-color: #141414;
	}

	.vod-title {
		font-size: 24rpx;
		color: #D5D5D5;
	}

	.vod-more {
		font-size: 30rpx;
		color: #D5D5D5;
	}

	.vod-item {
		width: 20%;
		margin: 10rpx auto;
		background-color: #2b2b2b;
		padding: 20rpx 10rpx;
		border-radius: 20rpx;
		border: 1rpx solid #808080;
	}

	.vod-img {
		width: 100%;
		height: 140rpx;
		overflow: hidden;
	}

	.vod-img image {
		width: 100%;

		border-radius: 20rpx;
	}

	.vod-remarks {
		color: #d5d5d5;
		text-align: center;
		font-size: 18rpx;
		text-decoration: underline;
	}

	.vod-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 18rpx;
		color: #D5D5D5;
		font-weight: 700;
		width: 100%;
		text-align: center;
	}

	.totop {
		position: fixed;
		z-index: 999999;
		color: #fff;
		width: 100rpx;
		height: 100rpx;
		bottom: calc(var(--window-bottom) + 20px);
		right: 40rpx;
	}

	.vod-banner-container {
		margin-top: 20rpx;
	}

	.swiper {
		height: 380rpx;
	}

	.banner-item {
		width: 98%;
		height: 380rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #141414;
	}

	.banner-l {
		width: 40%;
	}

	.banner-l image {
		width: 100%;
	}

	.banner-r {
		width: 50%;
	}

	.banner-r-1 {
		font-size: 40rpx;
		color: #D5D5D5;
		text-align: center;
		font-weight: 700;
	}

	.banner-r-2 {
		font-size: 34rpx;
		color: #D5D5D5;
		text-align: center;
		font-weight: 700;
		text-decoration: underline;
	}

	.vod-notice-bar {
		margin-top: 20rpx;
	}
</style>
