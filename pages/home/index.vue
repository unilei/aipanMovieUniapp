<template>
	<view>
		<view class="vod-banner-container" v-if="vodBannerData.length>0">
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" circular previous-margin="20" next-margin="20">
				<swiper-item v-for="(item,index) in vodBannerData" :key="index">
					<view class="swiper-item banner-item" @click="turnVodDetail(item.vod_id)">
						<view class="banner-l"><image :src="item.vod_pic" mode="widthFix"></image></view>
						<view class="banner-r">
							<view class="banner-r-1">{{item.vod_name}}</view>
							<view class="banner-r-2">{{item.vod_remarks}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view v-else class="vod-banner-container" >
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" circular previous-margin="20" next-margin="20">
				<swiper-item v-for="(item,index) in vodDetailTestList" :key="index">
					<view class="swiper-item banner-item" @click="turnVodDetail(item.vod_id)">
						<view class="banner-l"><image :src="item.vod_pic" mode="widthFix"></image></view>
						<view class="banner-r">
							<view class="banner-r-1">{{item.vod_name}}</view>
							<view class="banner-r-2">{{item.vod_remarks}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="vod-notice-bar">
			<uni-notice-bar v-if="vodBannerData.length>0" showIcon="true" scrollable="true" single="true" :speed="50" backgroundColor="#000000" color="#ffffff" text="爱盼影视,资源全部来源于网络,所有资源完全免费,如有问题请联系:xuliulei666@163.com !!!"></uni-notice-bar>
			<uni-notice-bar v-else showIcon="true" scrollable="true" single="true" :speed="50" backgroundColor="#000000" color="#ffffff" text="爱盼影视"></uni-notice-bar>
		</view>
		
		<view v-if="vodIndexData.length>0">
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
				vodIndexData:[],

			}
		},
		onLoad() {
			
			this.getVodBannerlList(1)
			// 获取最新一天的视频
			this.getIndexVodList(this.page, '', '','',24*1);
			
		},
		methods: {
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			turnMoreVod(){
				uni.switchTab({
					url:'/pages/vod/list'
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
			vodTypeListShow(e) {
				console.log(e)
			}
		},
		onPullDownRefresh() {
			this.vodIndexData = [];
			this.page = 1;
			this.getIndexVodList(this.page, '', '','',24*1);
		},
		onReachBottom() {
			console.log('bottom')
			this.page++;
			this.getIndexVodList(this.page, '', '','',24*1);
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}
	}
</script>

<style>
	page{
		background-color: rgba(0,0,0,0.8);
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
		background-color: rgba(0,0,0,0.2);
	}
	
	.vod-t{
		width: 98%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		border-bottom: 1rpx solid #808080;
		
	}
	.vod-title{
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.vod-more{
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.vod-item {
		width: 20%;
		margin: 10rpx auto;
		background-color: #000000;
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
		color: #FFFFFF;
		text-align: center;
		font-size: 18rpx;
		text-decoration: underline;
	}

	.vod-name {
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
		font-size: 18rpx;
		color: #FFFFFF;
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
	.vod-banner-container{
		margin-top: 20rpx;
	}
	.swiper{
		height:380rpx;
	}
	.banner-item{
		width: 98%;
		height:380rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #000000;
	}
	.banner-l{
		width: 40%;
	}
	.banner-l image{
		width: 100%;
	}
	.banner-r{
		width: 50%;
	}
	.banner-r-1{
		font-size: 40rpx;
		color: #FFFFFF;
		text-align: center;
		font-weight: 700;
	}
	.banner-r-2{
		font-size: 34rpx;
		color: #FFFFFF;
		text-align: center;
		font-weight: 700;
		text-decoration:underline;
	}
	
	.vod-notice-bar{
		margin-top: 20rpx;
	}
</style>
