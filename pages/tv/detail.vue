<template>
	<view class="container">
		<video id="tvVideo" show-loading :src="srcUrl" :controls="true" autoplay></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcUrl: ''
			}
		},
		onLoad(option) {
			this.srcUrl = option.url;
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: rgba(0, 0, 0, 0.8);
	}

	.container {
		padding: 20rpx;
		text-align: center;
	}
	#tvVideo{
		margin: 0 auto;
	}
</style>
