<template>
	<view>
		<view class="vod-video" v-if="videoSrc">
			<video id="video" :src="videoSrc" controls autoplay page-gesture play-btn-position="center"
				enable-play-gesture></video>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc: '',
				isShow: false
			}
		},
		onLoad(option) {
			this.videoSrc = option.source;
		},
		methods: {
			downloadVideo(src){
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
			}
		}
	}
</script>

<style>
	page{
		background-color: #000000;
	}
	.vod-video {
		width: 100%;
		height: 100%;
		text-align: center;
		position: fixed;
		z-index: 100;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
	}
	#video{
		width: 100%;
		height: 100%;
		/* height: 800rpx; */
	}
</style>
