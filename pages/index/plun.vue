<template>
	<view class="advice">
		<view class="head">
			
		</view>
		<!-- <button @click="toggleMask('show')">发布评论</button> -->
		<view class="main" v-for="(item,index) in list" :key="index">
				<image class="img" :src="item.user.avatarUrl" mode=""></image>
			<view class="text">
				<text class="name">{{item.user.nickname}}</text>
				<text class="plun">{{item.content}}</text>
			</view>
		</view>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '../../components/xuan-popup/xuan-popup.vue'
	export default {
		data(){
			return{
				list:[]
			}
		},
		onLoad(params) {
			uni.request({
				url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/comment/hot?type=0&id="+params.id,
				success:(res)=>{
					console.log(res);
					this.list = res.data.hotComments
				}
			})
		},
		components:{
			mpopup
		}
	}
</script>
<style lang="scss">
	.advice{
		.head{
			width: 100%;
			height: 15rpx;
		}
		.header{
			position: fixed;
			top: 0;
			background-color: white;
			width: 90%;
			height: 80rpx;
			border-bottom: 1rpx solid #e3e3e3;
			left: 5%;
			text{
				display: inline-block;
				line-height: 80rpx;
				padding-left: 20rpx;
				font-size: 28rpx;
			}
			.add{
				display: inline-block;
				width: 170rpx;
				height: 70rpx;
				background-color:#3b75ed;
				line-height: 70rpx;
				text-align: center;
				font-size: 26rpx;
				float: right;
				border-radius: 18rpx;
				margin-right: 5rpx;
				margin-top: 5rpx;
			}
		}
		.main{
			width: 96%;
			margin-top: 0 auto;
			.img{
				float: left;
				position: relative;
				top: 30rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-top: 0rpx;
				margin-left: 22rpx;
				margin-right: 20rpx;
			}
			.text{
				float: left;
				width: 590rpx;
				display: inline-block;
				//background-color: red;
				.name{
					margin-top: 25rpx;
					display: block;
					color: #5f9bca;
					font-size: 28rpx;
				}
				.date{
					display: block;
					font-size: 22rpx;
					margin-top: 12rpx;
				}
				.plun{
					display: block;
					margin-top: 12rpx;
					font-size: 31rpx;
				}
			}
		}
	}
</style>
