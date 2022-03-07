<template>
	<view class="container">

		<view class="art">
			<u-parse :content="artDetailData.art_content"  @preview="preview" @navigate="navigate"></u-parse>
		</view>

	</view>
</template>

<script>
	import artApi from '@/api/art.js';
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				artDetailData: {}
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.getArtList(option.artId)
		},
		methods: {
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},
			getArtList(artId) {
				let data = {
					ids: artId,
					ac: 'detail',
					pg: 1
				}
				artApi.artList(data).then(res => {
					if (res.code == 1) {
						let list = res.list;
						this.artDetailData = list[0];
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onShareAppMessage() {

		},
		onShareTimeline() {

		}
	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css");
	page {
		/* background-color: rgba(0, 0, 0, 0.8); */
	}

	.art {
		width: 90%;
		margin: 0 auto;
	}

	image {
		width: 100%;
	}

	.art-item {
		width: 42%;
		background-color: #000000;
		margin-top: 10rpx;
		margin-left: 10rpx;
		padding: 20rpx;

		border: 1rpx solid #808080;
		box-shadow: 0 0 10rpx 0rpx rgba(255, 255, 255, 0.2);
		border-radius: 10rpx;
	}

	.art-pic {
		width: 90%;
		margin: 0 auto;
	}

	.art-pic image {
		width: 100%;
	}

	.art-name {
		text-align: center;
		color: #FFFFFF;
		font-size: 24rpx;
	}

	.type-name {
		text-align: center;
		color: #808080;
		font-size: 24rpx;
	}
</style>
