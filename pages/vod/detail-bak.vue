<template>
	<view class="vod-container">

		<view v-if="!showTest">
			<!-- <view class="vod-video">
				<video :src="videoSrc" controls autoplay page-gesture play-btn-position="center"
					enable-play-gesture></video>
			</view> -->
			<view class="vod-intro-tags">
				<view class="vod-intro-tag">{{vodData.vod_name}}</view>
				<view class="vod-intro-tag">{{vodData.type_name}}</view>
				<view class="vod-intro-tag">{{vodData.vod_area}}</view>
			</view>
			<view class="play-url-container">
				<view class="play-url" v-for="(item,index) in vodPlayUrlData" :key="index">
					<view class="play-source-name" v-if="index==0">在线播放1</view>
					<view class="play-source-name" v-if="index==1">在线播放2</view>
					<view class="play-url-item" v-for="(vod,key) in item" :key="key" @click="playVideoUrl(vod)"
						:class=" myNowVodData.indexOf(vod[1]) == -1 ? '' : 'active'  ">
						{{vod[0]}}
					</view>

				</view>
			</view>
			<view class="vod-intro">
				<view class="vod-intro-blurb">
					<text>{{vodData.vod_blurb}}</text>
				</view>
			</view>
		</view>
		<view v-if="showTest">
			<view class="vod-video">
				<image src="../../static/2973.jpg" mode="widthFix"></image>
			</view>
			<view class="vod-intro-tags">
				<view class="vod-intro-tag">出塞</view>
				<view class="vod-intro-tag">王昌龄</view>
				<view class="vod-intro-tag">[唐]</view>
			</view>
			<view class="vod-intro">
				<view class="vod-intro-blurb">
					<text>
						秦时明月汉时关，万里长征人未还
						但使龙城飞将在，不教胡马度阴山
					</text>
				</view>
			</view>
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
				showTest:false
			}
		},
		onLoad(option) {
			this.vodId = option.vod_id;
			this.getVodDetailList(this.page, '', '', option.vod_id, '', '');

			let myVodHistoryStr = uni.getStorageSync('myVodHistory');
			if (myVodHistoryStr) {
				this.myVodHistoryData = JSON.parse(myVodHistoryStr);
			}

		},
		methods: {
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
					if(res=='域名未授权'){
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
				let myVodHistory = JSON.parse(uni.getStorageSync('myVodHistory'));
				let data = myVodHistory ? myVodHistory : [];
				data.push(vodUrl);

				let myNowVodData = this.myNowVodData;
				let myNowVodIndex = myNowVodData.indexOf(vodUrl)

				if (myNowVodIndex == -1) {
					this.myNowVodData.push(vodUrl);
				} else {
					this.myNowVodData.splice(myNowVodIndex, 1);
				}
				// console.log(this.myNowVodData)
				uni.setStorageSync('myVodHistory', JSON.stringify(data))

			}
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}

	}
</script>

<style>
	.vod-container {}

	.vod-video {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		text-align: center;
	}
	.vod-video image{
		width: 100%;
	}
	.play-url-container {
		background-color: #FFFFFF;
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

	.vod-intro {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.vod-intro-tags {
		width: 100%;
		margin-top: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.vod-intro-tag {
		background-color: #000000;
		color: #FFFFFF;
		margin: 10rpx;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
	}

	.vod-intro-blurb {
		color: #808080;
		font-size: 24rpx;
		word-wrap: break-word;
		word-break: break-all;
	}

	.active-history {
		background-color: #EEEEEE;
	}

	.active {
		background-color: #000000;
		color: #FFFFFF;
	}
</style>
