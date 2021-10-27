<template>
	<view class="container">
		<view class="tv-item" v-for="(item,index) in tvData" :key="index" @click="turnTvDetail(item.url)">
			<view class="tv-name">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tvData:[]
			}
		},
		onLoad() {
			this.getTvList()
		},
		methods: {
			async getTvList() {
				return await uniCloud.callFunction({
					name: 'getCmsList'
				}).then((res) => {
					console.log(res.result.data);
					let resData = res.result.data;
					this.tvData = resData;
				}).catch((err) => {
					console.error(err)
				})
			},
			turnTvDetail(url){
				uni.setStorageSync('cmsUrl',url)
				uni.reLaunch({
					url:'../home/index'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: rgba(0, 0, 0, 0.8);
	}
	.container{
		padding: 20rpx;
	}
	.tv-item{
		margin-top: 20rpx;
		color: #808080;
		font-size: 30rpx;
		font-weight: 700;
		background-color: #2b2b2b;
		padding: 20rpx;
		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255,255,255,0.2);
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.tv-name{
		
	}
	
	.tv-play{
		color: #2C405A;
	}
	
</style>
