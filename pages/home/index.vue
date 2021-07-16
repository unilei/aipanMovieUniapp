<template>
	<view>
		<view class="vod-banner-container">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" circular>
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
		
		
		<view v-if="vodDongZuoDyData.length>0">
			<view class="vod-container">
				<view class="vod-title">动作电影推荐</view>
				<view class="vod-item" v-for="(vod,index) in vodDongZuoDyData" :key="index"
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
				vodDongZuoDyData:[],

			}
		},
		onLoad() {
			// 获取最近半个月的动作电影
			this.getVodDongZuoDyList(this.page, 6, '','',24*15);
			this.getVodBannerlList(1)
		},
		methods: {
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			// t=>type_id 类型 | ids=>vod_id | h=>vod_time | wd=>vod_name | from=>vod_play_from
			getVodDongZuoDyList(page, t, wd, ids, h, from) {
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
						let vodDongZuoDyData = this.vodDongZuoDyData;
						this.vodDongZuoDyData = vodDongZuoDyData.concat(res.list);

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
			vodSearch(e) {
				console.log(e)
				this.vodDetailList = [];
				this.page = 1;
				this.getVodDetailList(this.page, '', e.value)
			},
			turnVodDetail(vodId) {
				uni.navigateTo({
					url: '/pages/vod/detail?vod_id=' + vodId
				})
			},
			vodTypeChange(e) {
				console.log(e)
				this.vodDetailList = [];
				this.page = 1;
				this.typeId = e.currentItem.type_id;
				this.getVodDetailList(this.page, e.currentItem.type_id, this.vodName);

			},
			vodTypeListShow(e) {
				console.log(e)
			}
		},
		onPullDownRefresh() {
			this.vodDetailList = [];
			this.page = 1;
			// this.getVodDetailList(this.page, this.typeId, this.vodName);
		},
		onReachBottom() {
			console.log('bottom')
			this.page++;
			// this.getVodDetailList(this.page, this.typeId, this.vodName);
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}
	}
</script>

<style>
	.vod-type-container {
		margin-top: 10rpx;
	}

	.vod-search-container {
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.vod-container {
		width: 98%;
		margin: 20rpx auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}
	.vod-title{
		width: 98%;
		margin: 0 auto;
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		font-weight: 700;
		border-bottom: 1rpx solid #000000;
	}
	.vod-item {
		width: 20%;
		margin: 10rpx auto;
		background-color: #FFFFFF;
		padding: 20rpx 10rpx;
		border-radius: 20rpx;
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
		color: #000000;
		text-align: center;
		font-size: 18rpx;
		text-decoration: underline;
	}

	.vod-name {
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
		font-size: 18rpx;
		color: #808080;
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
	.swiper{
		height: 520rpx;
	}
	.banner-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color:	#004956;
	}
	.banner-l{
		width: 50%;
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
</style>
