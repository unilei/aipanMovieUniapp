<template>
	<view class="container">
		<view class="tv-item" v-for="(item,index) in tvData" :key="index">
			<view class="tv-name">{{item.name}}</view>
			<view class="tv-play" v-if="item.show==1" @click="turnTvDetail(item.value)">现在播放</view>
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
					name: 'getTvList'
				}).then((res) => {
					console.log(res.result.data);
					let resData = res.result.data;
					this.tvData = resData;
				}).catch((err) => {
					console.error(err)
				})
			},
			turnTvDetail(url){
				console.log(url)
				uni.navigateTo({
					url:'./detail?url='+url
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
