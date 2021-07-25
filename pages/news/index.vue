<template>
	<view class="container">
		
		<view class="art">
			<view class="art-item" v-for="(item,index) in artData" :key="index" @click="turnDetail(item.art_id)">
				<view class="art-pic" v-if="item.art_pic">
					<image :src="item.art_pic" mode="widthFix"></image>
				</view>
				<view class="art-name">
					{{item.art_name}}
				</view>
				<view class="type-name">
					{{item.type_name}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import artApi from '@/api/art.js';
	 
	export default {
		data() {
			return {
				artData:[],
				artTypeData:[],
				page:1
			}
		},
		onLoad() {
			this.getArtList()
		},
		methods: {
			getArtList(page){
				let data = {
					ac:'list',
					pg:page
				}
				artApi.artList(data).then(res=>{
					if(res.code == 1){
						this.artData = this.artData.concat(res.list);
						this.artTypeData = res.class;
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			turnDetail(artId){
				uni.navigateTo({
					url:'./detail?artId='+artId
				})
			}
		},
		onPullDownRefresh() {
			this.page = 1;
			this.artData = [];
			this.getArtList(this.page);
		},
		onReachBottom() {
			this.page++
			this.getArtList(this.page);
		},
		onShareAppMessage() {
			
		},
		onShareTimeline() {
			
		}
	}
</script>

<style>
	page{
		background-color:rgba(0,0,0,0.8);
	}
	.art{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		width: 96%;
		margin: 20rpx auto 0;
		padding: 10rpx;
	}
	.art-item{
		width: 42%;
		background-color: #2B2B2B;
		margin-top: 10rpx;
		margin-left: 10rpx;
		padding: 20rpx;
		
		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255,255,255,0.2);
		border-radius: 10rpx;
	}
	.art-pic{
		width: 90%;
		margin: 0 auto;
	}
	.art-pic image{
		width: 100%;
	}
	.art-name{
		text-align: center;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.type-name{
		text-align: center;
		color: #808080;
		font-size: 24rpx;
	}
</style>
