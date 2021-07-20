<template>
	<view class="vod-container">
		<view class="vod-t">
			<view class="vod-t-l" @click="turnVod()">
				<image :src="vodData.vod_pic" mode="widthFix"></image>
			</view>
			<view class="vod-t-r">
				<view class="vod-name">{{vodData.vod_name}}</view>
				<view class="vod-type-name">{{vodData.type_name}}</view>
				<view class="vod-area">{{vodData.vod_area}}</view>
				
				<view class="vod-director">{{vodData.vod_director}}</view>
				<view class="vod-db-score">豆瓣：{{vodData.vod_douban_score}}</view>
				<view class="vod-pubdate">{{vodData.vod_pubdate}}</view>
				<view class="vod_remarks">{{vodData.vod_remarks}}</view>
			</view>
		</view>
		<view class="vod-actor">主演：{{vodData.vod_actor}}</view>
		<view class="play-url-container">
			<view class="play-url" v-for="(item,index) in vodPlayUrlData" :key="index">
				<view class="play-source-name" v-if="index==0">播放列表</view>
				<view class="play-source-name" v-if="index==1">在线播放2</view>
				<view class="play-url-item" v-for="(vod,key) in item" :key="key" @click="playVideoUrl(vod)"
					:class=" myNowVodData.indexOf(vod[1]) == -1 ? '' : 'active'  ">
					{{vod[0]}}
				</view>

			</view>
		</view>
		
		<view class="vod-content">
			 <rich-text :nodes="vodData.vod_content"></rich-text>
		</view>
	</view>
</template>

<script>
	import vodApi from '@/api/vod.js';
	export default {
		data() {
			return {
				vodData: [],
				vodId: 0,
				page: 1,
				vodPlayUrlData: [],
				videoSrc: '',
				myVodHistoryData: [],
				myNowVodData: [],
				showTest: false
			}
		},
		onLoad(option) {
			this.vodId = option.vod_id;
			this.getVodDetailList(this.page, '', '', option.vod_id, '', '');

			// let myVodHistoryStr = uni.getStorageSync('myVodHistory');
			// if (myVodHistoryStr) {
			// 	this.myVodHistoryData = JSON.parse(myVodHistoryStr);
			// }

		},
		methods: {
			turnVod(){
				uni.navigateTo({
					url:'./vod'
				})
			},
			getVodDetailList(page, t, wd, ids, h, from) {
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
					if (res == '域名未授权') {
						this.showTest = true;
					}
					if (res.code == 1) {
						let vodPlayUrl = res.list[0].vod_play_url;
						this.vodData = res.list[0];
						// console.log(vodPlayUrl)
						let vodData = []
						let a = vodPlayUrl.split('$$$');
						a.forEach((item, index) => {
							let b = item.split('#');
							let bData = []
							b.forEach(bitem => {
								let c = bitem.split('$')
								bData.push(c)
							})
							// console.log(bData)
							vodData.push(bData)

						})
						console.log(vodData)
						this.vodPlayUrlData = vodData;
					} else {
						console.log('vod list error:' + JSON.stringify(res.msg))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			playVideoUrl(vod) {
				let vodUrl = vod[1];
				this.videoSrc = vodUrl;
				let obj ={
					isLei:1,
					url:vodUrl
				}
				console.log(vodUrl)
				uni.setClipboardData({
				    data: JSON.stringify(obj),
				    success: function () {
				        console.log('success');
				    }
				});
			}
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}

	}
</script>

<style>
	page{
		/* background-image: linear-gradient( 135deg, #A0FE65 10%, #FA016D 100%); */
		background-image: linear-gradient( 135deg, #FFF6B7 10%, #F6416C 100%);
	}
	.vod-container {}
	
	.vod-t{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: first baseline;
		padding: 20rpx;
	}
	.vod-t-l{
		width: 40%;
	}
	.vod-t-l image{
		width: 100%;
		border-radius: 20rpx;
	}
	
	.vod-t-r{
		padding: 20rpx;
	}
	.vod-actor{
		margin-top: 10rpx;
		padding: 20rpx;
		
	}
	.vod-video {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		text-align: center;
	}

	.vod-video image {
		width: 100%;
	}

	.play-url-container {
		background-color: rgba(0,0,0,0.5);
	}

	.play-url {
		width: 100%;
		padding: 20rpx;
		margin: 10rpx auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
	}

	.play-source-name {
		width: 100%;
	}

	.play-url-item {
		background-color: #FFFFFF;
		border: 1rpx solid #000000;
		padding: 10rpx 20rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
	}

	.vod-content {
		margin-top: 10rpx;
		background-color: rgba(0,0,0,0.7);
		padding: 20rpx;
		color: #FFFFFF;
	}
	
	.active-history {
		background-color: #EEEEEE;
	}

	.active {
		background-color: #000000;
		color: #FFFFFF;
	}
</style>
