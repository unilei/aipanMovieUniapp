<template>
	<view>
		<view v-if="isShow" class="vod-video">
			<video :src="videoSrc" controls autoplay page-gesture play-btn-position="center"
				enable-play-gesture></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc:'',
				isShow:false
			}
		},
		created() {
			var self = this;
			uni.getClipboardData({
				success(res) {
					console.log(res)
					
					let str = res.data;
					let obj = JSON.parse(str)
					if(obj.isLei==1){
						self.isShow = true;
						self.videoSrc = obj.url;
					}
				}
			})
		},
		onLoad() {
			// var self = this;
			// uni.getClipboardData({
			// 	success(res) {
			// 		console.log(res)
					
			// 		let str = res.data;
			// 		let obj = JSON.parse(str)
			// 		if(obj.isLei==1){
			// 			self.isShow = true;
			// 			self.videoSrc = obj.url;
			// 		}
			// 	}
			// })
		},
		methods: {
			
		}
	}
</script>

<style>
.vod-video{
	width: 100%;
	text-align: center;
}
</style>
