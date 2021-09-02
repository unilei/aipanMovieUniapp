<template>
	<view class="container">
		<!-- actor_alias: ""
		actor_area: "韩国"
		actor_en: "puzhimei"
		actor_id: 3270
		actor_name: "朴智美"
		actor_pic: "https://img.52swat.cn/upload/actor/20210109-4/a1b98d84b6ae0845c07a839fffab155a.jpg"
		actor_sex: "女"
		actor_time: "2021-07-22 21:31:48"
		type_id: 53
		type_name: "日韩明星" -->
		<view class="actor">
			<view class="actor-item" v-for="(item,index) in actorData" :key="index" @click="turnActorDetail(item.actor_id)">
				<view class="actor-pic">
					<image :src="item.actor_pic" mode="widthFix"></image>
				</view>
				<view class="actor-name">
					{{item.actor_name}} {{item.actor_sex}}
				</view>
				<view class="type-name">
					{{item.actor_area}}
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import actorApi from '@/api/actor.js';
	 
	export default {
		data() {
			return {
				actorData:[],
				actorTypeData:[],
				page:1
			}
		},
		onLoad() {
			this.getActorList(this.page)
		},
		methods: {
			getActorList(page){
				let data = {
					ac:'list',
					pg:page
				}
				actorApi.actorList(data).then(res=>{
					if(res.code == 1){
						this.actorData = this.actorData.concat(res.list);
						this.actorTypeData = res.class;
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			turnActorDetail(id){
				uni.navigateTo({
					url:'./detail?id='+id
				})
			}
		},
		onReachBottom() {
			this.page ++ ;
			this.getActorList(this.page);
		},
		onPullDownRefresh() {
			this.page = 1;
			this.actorData = [];
			this.getActorList(this.page);
		},
		onShareAppMessage() {
			
		},
		onShareTimeline() {
			
		}
	}
</script>

<style>
	page{
		background-color:rgba(0,0,0,0.9);
	}
	.actor{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		width: 96%;
		margin: 20rpx auto 0;
	}
	.actor-item{
		width: 44%;
		border-radius: 10rpx;
		background-color: #2B2B2B;
		padding: 10rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255,255,255,0.2);
	}
	.actor-pic{
		width: 200rpx;
		height:200rpx;
		border-radius: 200rpx;
		overflow: hidden;
		margin: 0 auto;
		text-align: center;
	}
	.actor-pic image{
		width: 100%;
	}
	.actor-name{
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