<template>
	<view class="container">
		<web-view :src="srcUrl" ></web-view>  
		<!-- <view class="top-item" v-for="(item,index) in doubanTopData" :key="index" @click="turnDoubanVodDetail(item.id)">
			<view class="top-item-l">
				<image :src="item.cover" mode="widthFix"></image>
			</view>
			<view class="top-item-r">
				<view class="top-title">{{item.title}}</view>
				<view class="top-star">
					<uni-icons type="star" color="#eed939"></uni-icons>
					<text>{{item.star}}</text>
				</view>
				<view class="comment">
					{{item.oneSentenceComment}}
				</view>
			</view>
			
			<view class="top-tips">
				{{index+1}}
			</view>
		</view> -->
	</view>
</template>

<script>
	import doubanTop from '@/common/doubanTop.js';
	
	export default {
		data() {
			return {
				srcUrl:'https://pan.laycode.cn',
				doubanTopData:doubanTop.doubanTop
			}
		},
		onLoad() {
			console.log(this.doubanTopData)
		
		},
		methods: {
			turnDoubanVodDetail(doubanId){
				uni.navigateTo({
					url: '/pages/vod/detail?douban_id=' + doubanId
				})
			}
		}
	}
</script>

<style>
	page{
		background-color:rgba(0,0,0,0.8);
	}
	.top-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		background-color: #2B2B2B;
		padding: 20rpx;
		
		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255,255,255,0.2);
		border-radius: 10rpx;
		position: relative;
	}
	.top-item-l{
		width: 20%;
		
	}
	.top-item-l image{
		width: 100%;
		border-radius: 14rpx;
	}
	
	.top-item-r{
		width: 70%;
		font-size: 30rpx;
	}
	.top-title{
		font-size: 30rpx;
		font-weight: 700;
		color: #FFFFFF;
	}
	
	.top-star{
		color: #EEEEEE;
	}
	
	.top-star text{
		margin-left: 14rpx;
		color: #EEEEEE;
		font-size: 28rpx;
	}
	.comment{
		color: #888888;
		font-size: 28rpx;
	}
	
	.top-tips{
		position: absolute;
		right: 10rpx;
		top: 20rpx;
		font-weight: 700;
		color: #F0F0F0;
		background-color: rgba(0,0,0,0.7);
		
		font-size: 30rpx;
		text-align: center;
		line-height: 50rpx;
		padding: 4rpx 10rpx;
		border-radius: 10rpx;
	}
</style>
