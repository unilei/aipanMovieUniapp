<template>
	<view>
		<view class="vod-search-container">
			<uni-search-bar :radius="100" @confirm="vodSearch" v-model="searchVodValue"></uni-search-bar>
		</view>
		
		<view class="vod-type-container">
			<vgt-tab :list="list" :itemStyleDefault="itemStyleDefault" :itemStyleActive="itemStyleActive"
				@onValueChange="vodTypeChange" @onListShow="vodTypeListShow"></vgt-tab>
		</view>
		
		<view v-if="vodDetailList.length>0">
			<view class="vod-container">
				<view class="vod-item" v-for="(vod,index) in vodDetailList" :key="index"
					@click="turnVodDetail(vod.vod_id)">
					<view class="vod-img">
						<image :src="vod.vod_pic" mode="widthFix"></image>
					</view>
					<view class="vod-remarks">{{vod.vod_remarks}}</view>
					<view class="vod-name">
						{{vod.vod_name}}
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="vod-container">
				<view class="vod-item" v-for="(vod,index) in vodDetailTestList" :key="index" @click="turnVodDetail(vod.vod_id)">
					<view class="vod-img">
						<image :src="vod.vod_pic" mode="widthFix"></image>
					</view>
					<view class="vod-remarks">{{vod.vod_remarks}}</view>
					<view class="vod-name">
						{{vod.vod_name}}
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<image class="totop" @click="toTop" src="@/static/totop.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import vodApi from '@/api/vod.js';
	import vgtTab from '@/components/vgt-tab/vgt-tab.vue';
	import vodData from '@/common/vodData.js';

	export default {
		components: {
			'vgt-tab': vgtTab
		},
		data() {
			return {
				itemStyleDefault: {
					color: '#808080',
					background: '#f4f5f6'
				},
				itemStyleActive: {
					color: '#000000',
					'border': '1rpx solid #000000;'
				},
				list: [],
				vodList: [],
				vodDetailList: [],
				page: 1,
				lastPage: 0,
				typeId: 0,
				vodName: '',
				vodDetailTestList:vodData.data,
				searchVodValue:''

			}
		},
		onLoad() {
			
			this.getVodList(this.page);
			this.getVodDetailList(this.page, this.typeId, this.vodName);
		},
		methods: {
			toTop(){
				uni.pageScrollTo({
					scrollTop:0
				})
			},
			// t=>type_id 类型 | ids=>vod_id | h=>vod_time | wd=>vod_name | from=>vod_play_from
			getVodList(page, t, ids, h, wd, from) {
				var data = {
					ac: 'list',
					pg: page
				}
				if (t) {
					data.t = t
				}
				if (ids) {
					data.ids = ids
				}
				if (h) {
					data.h = h
				}
				if (wd) {
					data.wd = wd
				}
				if (from) {
					data.from = from
				}

				vodApi.vodList(data).then(res => {
					console.log(res)
					if (res.code == 1) {
						let page = res.page;
						let limit = res.limit;
						let pageCount = res.pagecount;
						let classData = res.class;
						classData.unshift({
							type_id: 0,
							type_name: '全部'
						})
						this.list = classData;

					} else {
						console.log('vod list error:' + JSON.stringify(res.msg))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getVodDetailList(page, t, wd, ids, h, from) {
				var data = {
					ac: 'detail',
					pg: page
				}
				if (t) {
					data.t = t
				}
				if (ids) {
					data.ids = ids
				}
				if (h) {
					data.h = h
				}
				if (wd) {
					data.wd = wd
				}
				if (from) {
					data.from = from
				}
				vodApi.vodList(data).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lastPage = res.pagecount;
						let vodDetailData = this.vodDetailList;
						this.vodDetailList = vodDetailData.concat(res.list);

					} else {
						console.log('vod list error:' + JSON.stringify(res.msg))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			vodSearch(e){
				console.log(e)
				this.vodDetailList = [];
				this.getVodDetailList(this.page, this.typeId, e.value)
			},
			turnVodDetail(vodId) {
				uni.navigateTo({
					url: '/pages/vod/detail?vod_id=' + vodId
				})
			},
			vodTypeChange(e) {
				console.log(e)
				this.vodDetailList = [];
				this.typeId = e.currentItem.type_id;
				this.getVodDetailList(this.page, e.currentItem.type_id, this.vodName);

			},
			vodTypeListShow(e) {
				console.log(e)
			}
		},
		onReachBottom() {
			console.log('bottom')
			this.page++;
			this.getVodDetailList(this.page, this.typeId, this.vodName);
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}
	}
</script>

<style>
	.vod-type-container {
		margin-top: 10rpx;
	}
	.vod-search-container{
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.vod-container {
		width: 98%;
		margin: 20rpx auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.vod-item {
		width: 45%;
		margin: 10rpx auto;
		background-color: #FFFFFF;
		padding: 20rpx 10rpx;
		border-radius: 20rpx;
	}

	.vod-img {
		width: 100%;
	}

	.vod-img image {
		width: 100%;
		border-radius: 20rpx;
	}

	.vod-remarks {
		color: #000000;
		text-align: center;
		font-size: 24rpx;
		text-decoration: underline;
	}

	.vod-name {
		font-size: 24rpx;
		color: #808080;
		font-weight: 700;
		width: 100%;
		text-align: center;
	}
	
	.totop {
		position: fixed;
		z-index: 999999;
		color: #fff;
		width: 100rpx;
		height: 100rpx;
		bottom:calc(var(--window-bottom) + 20px);
		right: 40rpx;
	}
</style>
