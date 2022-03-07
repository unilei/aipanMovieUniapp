<template>
	<view>
		<web-view :src="srcUrl" ></web-view>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcUrl:''
			}
		},
		onLoad(option) {
			this.srcUrl = option.url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
