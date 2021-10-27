<template>
	<view class="container">
		<view class="me-item" @click="turnCmsList()">
			我的播放源
			<uni-icons type="forward" color="#808080"></uni-icons>
		</view>
		<!-- <view class="me-item" @click="turnActorList()">
			演员列表
			<uni-icons type="forward" color="#808080"></uni-icons>
		</view> -->
		<view class="me-item" @click="turnHistoryList()">
			我的播放记录
			<uni-icons type="forward" color="#808080"></uni-icons>
		</view>
		
		<view class="me-item" @click="turnTvList()">
			我的电视直播
			<uni-icons type="forward" color="#808080"></uni-icons>
		</view>
		
		<view class="contact">
			<button type="default" open-type="contact">联系我</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {
			
		},
		computed: {
			
		},
		methods: {
			turnActorList(){
				uni.navigateTo({
					url:'../actor/index'
				})
			},
			turnHistoryList(){
				uni.navigateTo({
					url:'../vod/history'
				})
			},
			turnTvList(){
				uni.navigateTo({
					url:'../tv/index'
				})
			},
			turnCmsList(){
				uni.navigateTo({
					url:'../cms/list'
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
	.me-item{
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
	
	.contact{
		position: fixed;
		z-index: 1000;
		bottom: 200rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 60%;
	}
	.contact button{
		background-color: rgba(0,0,0,0.6);
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>
