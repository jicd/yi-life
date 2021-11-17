<template>
	<view>
		<web-view :src="newsrc" :progress="false"></web-view>
		<view class="listen">
			<image class="img"  src="@/static/yuyin.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"webview",
		data() {
			return {
				newsrc : ''
			};
		},
		onLoad(context) {
			this.newsrc = context.id
		},
		methods:{
			back(){
				uni.reLaunch({
					url:"../../pages/news/news",
					success() {
						console.log("cg");
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.listen{
		position: fixed;
		top: 50rpx;
		right: 35rpx;
		width: 80rpx;
		height: 75rpx;
		background-color: white;
		.img{
			width: 100%;
			height: 100%;
		}
	}
</style>
