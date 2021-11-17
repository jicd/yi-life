<template>
	<view class="join">
		<view class="main-1">
			<text>您可以选择添加以下信息中的任意一个(可长按复制！！)</text>
		</view>
		<view class="main-2">
			<text user-select='true' selectable="true">QQ:2505605712</text>
		</view>
		<view class="main-3">
			<text user-select='true' selectable="true">微信:ReachIess</text>
		</view>
		<view class="main-4">
			<text>我们期待您的加入</text>
		</view>
		<view class="main-5">
			<image class="img" src="../../static/need1.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.join{
		text-align: center;
		margin-top: 10%;
		.main-1,.main-2,.main-3,.main-4{
			margin-top: 5%;
		}
		.main-5{
			margin: 10% auto;
			width: 65%;
			height: 300px;
			.img{
				width: 100%;
			}
		}
	}
</style>
