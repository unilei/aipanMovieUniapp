<template>
	<view class="container">
		<view class="vod-video" v-if="videoSrc">
			<video id="myVideo" :src="videoSrc" controls autoplay page-gesture play-btn-position="center"
			@ended="videoEnd"
				enable-play-gesture></video>
		</view>
		<view class="video-bs">
			<view class="video-bs-title">倍速：</view>
			<view class="video-bs-tags">
				<view class="video-bs-tag" :class="beisuValue == item ? 'bs-tag-active' : ''" v-for="(item,index) in beisuData" 
				 :key="index" @click="beisu(item)">{{item}}</view>
			</view>
		</view>
		
		<view class="play-url-container">
			<view class="play-url" >
				<view class="play-url-item" 
				:class="videoPlayIndex == key ? 'play-item-active' : ''"
				 v-for="(vod,key) in vodPlayList" :key="key" @click="playVideoUrl(vod,key)">
					{{vod[0]}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc: '',
				isShow: false,
				beisuData:[0.5,0.8,1.0,1.25,1.5,2.0],
				beisuValue:1.0
			}
		},
		computed:{
			vodPlayList(){
				return this.$store.state.videoPlayList;
			},
			videoPlayIndex(){
				return this.$store.state.videoPlayIndex;
			},
			prevVod(){
				return this.$store.getters.prevVod;
			},
			nextVod(){
				return this.$store.getters.nextVod
			}
		},
		onLoad(option) {
			this.videoSrc = option.source;
		},
		methods: {
			downloadVideo(src) {
				const downloadTask = uni.downloadFile({
					url: src, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
					}
				});

				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

					// 测试条件，取消下载任务。
					if (res.progress > 50) {
						downloadTask.abort();
					}
				});
			},
			beisu(value){
				console.log(value)
				this.beisuValue = value;
				this.videoContext.playbackRate(value);
			},
			playVideoUrl(vod,key){
				// console.log(vod)
				this.videoSrc = vod[1];
				this.$store.commit('setVideoPlayIndex',key)
				// console.log(this.nextVod)
			},
			videoEnd(e){
				// console.log(e)
				let vod = this.nextVod;
				this.$store.commit('setVideoPlayIndex',vod.index)
				if(vod.data){
					this.videoSrc = vod.data[1]
				}
				
			}
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
	}
</script>

<style>
	page {
		background-color: rgba(0,0,0,0.8);
	}
	.container{
		width: 100%;
	}
	.vod-video {
		width: 100%;
		text-align: center;
	}
	.vod-video video{
		width: 100%;
	}
	
	.video-bs{
		background-color: rgba(0,0,0,0.8);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 10rpx 20rpx;
	}
	
	.video-bs-title{
		color: #808080;
		font-size: 24rpx;
		font-weight: 700;
	}
	.video-bs-tags{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.video-bs-tag{
		width:14%;
		color: #808080;
		background-color: rgba(0,0,0,0.9);
		margin-left: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
		border-radius: 8rpx;
	}
	
	.bs-tag-active{
		background-color: #000000;
		color: #FFFFFF;
		border: 1rpx solid #EEEEEE;
	}
	
	.play-url-container {
		background-color: rgba(0, 0, 0, 0.9);
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
	
	.play-url-item {
		background-color: #3d3d3d;
		border: 1rpx solid #000000;
		padding: 10rpx 20rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #E0E0E0;
	}
	
	.play-item-active{
		background-color: #000000;
		color: #FFFFFF;
		border: 1rpx solid #EEEEEE;
	}
	
</style>
