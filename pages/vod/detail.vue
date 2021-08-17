<template>
	<view class="vod-container">
		<template v-if="!showEmptyStatus">
			<view class="vod-t">
				<view class="vod-t-l" @click="turnVod()">
					<image v-show="vodData.vod_pic" :src="vodData.vod_pic" mode="widthFix"></image>
				</view>
				<view class="vod-t-r">
					<view class="vod-name" v-show="vodData.vod_name">{{vodData.vod_name}}</view>
					<view class="vod-type-name" v-show="vodData.type_name">{{vodData.type_name}}</view>
					<view class="vod-area" v-show="vodData.vod_area">{{vodData.vod_area}}</view>
			
					<view class="vod-director" v-show="vodData.vod_director">{{vodData.vod_director}}</view>
					<view class="vod-db-score" v-show="vodData.vod_douban_score">豆瓣：{{vodData.vod_douban_score}}</view>
					<view class="vod-pubdate" v-show="vodData.vod_pubdate">{{vodData.vod_pubdate}}</view>
					<view class="vod_remarks" v-show="vodData.vod_remarks">{{vodData.vod_remarks}}</view>
				</view>
			</view>
			<view class="vod-actor" v-show="vodData.vod_actor">主演：{{vodData.vod_actor}}</view>
			<view class="play-url-container">
				
				<view class="play-url" v-for="(item,index) in vodPlayUrlData" :key="index">
					<view class="play-source"  @click="showVodPlayList(index)">
						<view class="play-source-name">在线播放： <text>【 播放源 {{item.vod_play_from}} 】</text></view>
						<view class="source-name-icon" >
							<uni-icons type="arrowdown" color="#909090"></uni-icons>
						</view>
					</view>
					<block v-if="showPlayList==index">
						<view class="play-url-item" v-for="(vod,key) in item.data" :key="key" @click="playVideoUrl(vod)">
							{{vod[0]}}
						</view>
					</block>
				</view>
			</view>
			
			<view class="vod-content">
				<rich-text :nodes="vodData.vod_content"></rich-text>
			</view>
		</template>
		
		<template v-if="showEmptyStatus">
			<view class="empty-tips">暂无视频源，请联系我</view>
			<view class="contact">
				<button type="default" open-type="contact">联系我</button>
			</view>
		</template>
	</view>
</template>

<script>
	import vodApi from '@/api/vod.js';
	export default {
		data() {
			return {
				vodData: [],
				vodId: 0,
				page: 1,
				vodPlayUrlData: [],
				videoSrc: '',
				myVodHistoryData: [],
				myNowVodData: [],
				showTest: false,
				showPlayList: -1,
				vodPlayType: 0,
				showEmptyStatus:false
			}
		},
		onLoad(option) {
			this.vodId = option.vod_id;
			if(option.vod_id){
				this.getVodDetailList(this.page, '', '', option.vod_id, '', '','');
			}
			if(option.douban_id){
				this.getVodDetailList(this.page, '', '', '', '', '',option.douban_id);
			}

			// let myVodHistoryStr = uni.getStorageSync('myVodHistory');
			// if (myVodHistoryStr) {
			// 	this.myVodHistoryData = JSON.parse(myVodHistoryStr);
			// }
			this.get()
		},
		methods: {
			async get() {
				return await uniCloud.callFunction({
					name: 'getPlayType'
				}).then((res) => {
					// console.log(res.result.data);
					let resData = res.result.data;
					let type = resData[0].type;
					this.vodPlayType = type;
				}).catch((err) => {
					console.error(err)
				})
			},
			showVodPlayList(index) {
				this.showPlayList = index;
			},
			turnVod() {
				uni.navigateTo({
					url: './vod'
				})
			},
			getVodDetailList(page, t, wd, ids, h, from,doubanids) {
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
				if(doubanids){
					data.doubanids = doubanids
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
					if (res == '域名未授权') {
						this.showTest = true;
					}
					if (res.code == 1) {
						let vData = res.list;
						console.log(vData)
						if(vData.length==0){
							console.log('aaa')
							this.showEmptyStatus = true;
							return false;
						}
						
						let vodPlayUrl = res.list[0].vod_play_url;
						let vodPlayFrom = res.list[0].vod_play_from;

						this.vodData = res.list[0];
						
						// console.log(vodPlayUrl)

						let vodData = []
						let a = vodPlayUrl.split('$$$');
						let fromData = vodPlayFrom.split('$$$');

						a.forEach((item, index) => {
							let vodObj = {};
							vodObj.vod_play_from = fromData[index];
							let b = item.split('#');
							let bData = []
							b.forEach(bitem => {
								let c = bitem.split('$')
								bData.push(c)
							})
							vodObj.data = bData;
							// console.log(bData)
							vodData.push(vodObj);
						})

						console.log(vodData)
						this.vodPlayUrlData = vodData;
					} else {
						console.log('vod list error:' + JSON.stringify(res.msg))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			playVideoUrl(vod) {
				let vodUrl = vod[1];
				this.videoSrc = vodUrl;
				// console.log(this.vodData);
				let vodData = this.vodData;
				let obj = {
					vod_id:vodData.vod_id,
					vod_name:vodData.vod_name,
					vod_pic:vodData.vod_pic
				}
				let historyVodData = uni.getStorageSync('historyVodData') ? uni.getStorageSync('historyVodData') : [];
				
				let inx = historyVodData.findIndex(item=>item.vod_id == vodData.vod_id);
				if(inx == -1){
					historyVodData.unshift(obj)
				}
				uni.setStorageSync('historyVodData',historyVodData);
				
				if (this.vodPlayType == 1) {
					uni.navigateTo({
						url: './apVod?source=' + vodUrl
					})
				} else {
					let obj = {
						isLei: 1,
						url: vodUrl
					}
					uni.setClipboardData({
						data: JSON.stringify(obj),
						success: function() {
							console.log('success');
						}
					});
				}

			}
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}

	}
</script>

<style>
	page {
		background-color: rgba(0, 0, 0, 0.8);
	}

	.vod-container {}

	.vod-t {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: first baseline;
		padding: 20rpx;
		background-color: #000000;
		color: #FFFFFF;
		margin-top: 10rpx;
	}

	.vod-t-l {
		width: 40%;
	}

	.vod-t-l image {
		width: 100%;
		border-radius: 20rpx;
	}

	.vod-t-r {
		padding: 20rpx;
	}

	.vod-actor {
		margin-top: 10rpx;
		padding: 20rpx;
		background-color: #000000;
		color: #888888;
		font-size: 24rpx;
	}

	.vod-video {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		text-align: center;
	}

	.vod-video image {
		width: 100%;
	}

	.play-url-container {
		background-color: rgba(0, 0, 0, 0.9);
	}

	.play-url {
		width: 100%;
		padding: 20rpx;
		margin: 10rpx auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
	}
	.play-source{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #EEEEEE;
		padding: 20rpx;
	}
	.play-source-name {
		width: 85%;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: 700;
	}
	.source-name-icon{
		width: 15%;
		text-align: center;
	}
	.play-source-name text{
		color: #808080;
		font-size: 24rpx;
	}

	.play-url-item {
		background-color: #FFFFFF;
		border: 1rpx solid #000000;
		padding: 10rpx 20rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
	}

	.vod-content {
		margin-top: 10rpx;
		background-color: rgba(0, 0, 0, 0.9);
		padding: 20rpx;
		color: #777777;
		font-size: 24rpx;
	}

	.active-history {
		background-color: #EEEEEE;
	}

	.active {
		background-color: #000000;
		color: #FFFFFF;
	}
	
	.empty-tips{
		margin-top: 100rpx;
		font-size: 30rpx;
		color: #808080;
		text-align: center;
	}
	.contact{
		width: 60%;
		margin: 40rpx  auto;
	}
	.contact button{
		background-color: rgba(0,0,0,0.6);
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>
