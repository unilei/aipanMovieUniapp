<template>
	<view class="container">
		<view class="history-vod-container">
			<view class="history-vod-title">我的播放记录</view>
			<view class="history-vod-list" v-if="historyVodData.length>0">
				<view class="history-vod-item" v-for="(item,index) in historyVodData" :key="index" @click="turnVodDetail(item.vod_id)">
					<view class="history-vod-item-l">
						<image :src="item.vod_pic" mode="widthFix"></image>
					</view>
					<view class="history-vod-item-r">
						{{item.vod_name}}
					</view>
					<view class="history-vod-forward">
						<uni-icons type="forward" color="#808080"></uni-icons>
					</view>
				</view>
			</view>
			<view class="history-vod-empty" v-else>
				暂时没有播放记录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyVodData:[]
			}
		},
		onShow() {
			let historyVodData = uni.getStorageSync('historyVodData');
			this.historyVodData =  historyVodData ? historyVodData : []
		},
		computed: {
			
		},
		methods: {
			turnActorList(){
				uni.navigateTo({
					url:'../actor/index'
				})
			},
			turnVodDetail(vodId){
				uni.navigateTo({
					url:'/pages/vod/detail?vod_id='+vodId
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
	.actor-list{
		color: #808080;
		font-size: 30rpx;
		font-weight: 700;
		background-color: #2b2b2b;
		padding: 20rpx;
		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255,255,255,0.2);
		border-radius: 20rpx;
	}
	.history-vod-container{
		/* padding: 20rpx; */
		margin-top: 20rpx;
	}
	.history-vod-title{
		color: #808080;
		font-size: 30rpx;
		font-weight: 700;
		background-color: #2b2b2b;
		padding: 20rpx;
		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255,255,255,0.2);
		border-radius: 20rpx;
	}
	.history-vod-list{
		
	}
	.history-vod-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: first baseline;
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		background-color: #2b2b2b;
		border: 1rpx solid #808080;
		border-radius: 20rpx;
	}
	
	.history-vod-item-l{
		width: 10%;
		
	}
	.history-vod-item-l image{
		width: 100%;
	}
	.history-vod-item-r{
		width: 80%;
		color: #808080;
		font-size: 28rpx;
		padding-left: 20rpx;
	}
	.history-vod-forward{
		width: 10%;
	}
	
	.history-vod-empty{
		text-align: center;
		margin-top: 40rpx;
		color: #808080;
		font-size: 30rpx;
	}
</style>
