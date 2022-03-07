<template>
	<view>
		<view class="detail-container" v-if="actorDetailData">
			<view class="actor-image" @click="turnRandom()">
				<image :src="actorDetailData.actor_pic" mode="widthFix"></image>
			</view>
			<view class="actor-tags">
				<view class="actor-tag">{{actorDetailData.actor_area}}</view>
				<view class="actor-tag">{{actorDetailData.actor_birtharea}}</view>
				<view class="actor-tag">{{actorDetailData.actor_birthday}}</view>
				<view class="actor-tag">{{actorDetailData.actor_blood}}</view>
				<view class="actor-tag">{{actorDetailData.actor_height}}</view>
				<view class="actor-tag">{{actorDetailData.actor_sex}}</view>
				<view class="actor-tag">{{actorDetailData.actor_starsign}}</view>
				<view class="actor-tag">{{actorDetailData.type_name}}</view>
			</view>

			<view class="actor-content">
				<rich-text :nodes="actorDetailData.actor_content"></rich-text>
			</view>
		</view>
		<!-- <view class="random-btn">
			S
		</view> -->
	</view>
</template>

<script>
	import actorApi from '@/api/actor.js';
	export default {
		data() {
			return {
				actorDetailData: {}
			}
		},
		onLoad(option) {
			this.getActorDetailList(option.id);
		},
		methods: {
			getActorDetailList(id) {
				let data = {
					ac: 'detail',
					pg: 1,
					ids: id
				}
				actorApi.actorList(data).then(res => {
					if (res.code == 1) {
						let actorData = res.list;
						this.actorDetailData = actorData[0];
					}
				}).catch(err => {
					console.log(err)
				})
			},
			turnRandom(){
				uni.navigateTo({
					url:'../random/random'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: rgba(0, 0, 0, 0.8);
	}

	.detail-container {
		padding: 20rpx;

	}

	.actor-image {
		width: 80%;
		margin: 0 auto;
	}

	.actor-image image {
		width: 100%;
		border-radius: 20rpx;
	}

	.actor-tags {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: first baseline;
		padding: 20rpx 10rpx;
		flex-wrap: wrap;
	}

	.actor-tag {
		background-color: #000000;
		color: #808080;
		font-size: 28rpx;
		padding: 10rpx 20rpx;
		margin: 10rpx;
		border-radius: 10rpx;
	}

	.actor-content {
		background-color: #000000;
		color: #808080;
		border-radius: 20rpx;
		padding: 20rpx;
	}
		
	.random-btn{
		position: fixed;
		z-index: 1000;
		right: 10rpx;
		bottom: 40rpx;
	}
</style>
