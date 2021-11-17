<template>
	<view class="main">
		<view class="header">
			
		</view>
		<view class="main-0">
			<view class="main-01" @click="love">
				<image class="love" src="../../static/love.png" mode=""></image>
			</view>
			<!-- <view class="main-00" @click="where"> -->
				<!-- <image class="wenhao" src="../../static/wenhao.png" mode=""></image> -->
			<!-- </view> -->
		</view>
		<view @click="login" class="nouser" v-show="user==''">
			<view class="name">
				<text>立即登录</text>
			</view>
		</view>
		<view class="main-1" v-show="user!=''" @click="alter">
			<view class="main-10">
				<image class="img" :src="imgsrc" mode=""></image>
			</view>
			<view class="name">
				<text>{{name}}</text>
			</view>
			<view class="id">
				<text>ID:{{phone}}</text>
			</view>
			<image class="right" src="../../static/right.png" mode=""></image>
		</view>
		<view class="main-list">
			<view class="main-2" @click="about">
				<image class="chatu" src="../../static/about.png" mode=""></image>
				关于本站
				<image class="img" src="../../static/right.png" mode=""></image>
			</view>
			<view class="main-3" @click="mian">
				<image class="chatu" src="../../static/mian.png" mode=""></image>
				免责声明
				<image class="img" src="../../static/right.png" mode=""></image>
			</view>
			<view class="main-4" @click="share">
				<image class="chatu" src="../../static/share.png" mode=""></image>
				分享好友
				<image class="img" src="../../static/right.png" mode=""></image>
			</view>
			<view class="main-6" @click="join">
				<image class="chatu" src="../../static/join.png" mode=""></image>
				加入我们
				<image class="img" src="../../static/right.png" mode=""></image>
			</view>
			<view class="main-6" @click="setting">
				<image class="chatu" src="../../static/setting.png" mode=""></image>
				设置
				<image class="img" src="../../static/right.png" mode=""></image>
			</view>
		</view>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '../../components/xuan-popup/xuan-popup.vue'
	export default {
		onShow() {
			this.user = uni.getStorageSync('user');
			this.name = uni.getStorageSync('name');
			this.phone = uni.getStorageSync('phone');
			if(!uni.getStorageSync('imgsrc')){
				this.imgsrc = '../../static/logo.png'
			}	
			else{
				this.imgsrc = uni.getStorageSync('imgsrc');
			}
		},
		data(){
			return{
				user:'',//show
				name:'',
				phone:'',
				imgsrc:''
			}
		},
		methods:{
			alter(){
				uni.navigateTo({
					url:'alter/alter'
				})
			},
			login(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			where(){
				uni.navigateTo({
					url:"../detail/where"
				})
			},
			about(){
				uni.navigateTo({
					url:"../detail/about"
				})
			},
			love(){
				uni.navigateTo({
					url:"../detail/love"
				})
			},
			share(){
				uni.navigateTo({
					url:"../detail/share"
				})
			},
			mian(){
				uni.navigateTo({
					url:"../detail/mian"
				})
			},
			join(){
				uni.navigateTo({
					url:"../detail/join"
				})
			},
			setting(){
				if(this.user!=''){
					uni.navigateTo({
						url:'setting/setting'
					})
				}else{
					this.$refs.mpopup.open({
						type:'err',
						content:'请先登录！！！',
						timeout:2000,
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../login/login'
						})
					},1500)
				}
			}
		},
		components:{
			mpopup
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		.header{
			width: 750rpx;
			height: 180rpx;
		}
		.main-0{
			.main-01{
				width: 65rpx;
				height: 65rpx;
				border: 1rpx solid #f5ad8e;
				border-radius: 17rpx;
				position: relative;
				float: right;
				margin-right: 25rpx;
				margin-top: -10%;
				.love{
					width: 76%;
					height: 76%;
					position: absolute;
					top: 12%;
					left: 12%;
				}
			}
			.main-00{
				width: 65rpx;
				height: 65rpx;
				border: 1rpx solid #5783fc;
				border-radius: 17rpx;
				position: relative;
				float: right;
				margin-right: 110rpx;
				margin-top: -10%;
				.wenhao{
					width: 76%;
					height: 76%;
					position: absolute;
					top: 16%;
					left: 13%;
				}
			}
		}
		.nouser{
			width: 92%;
			height: 140rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			margin-bottom: 120rpx;
			border-radius: 50rpx;
			background-color: rgba(128,128,128,0.04);
			text{
				display:block;
				line-height: 168rpx;
				text-align: center;
				font-size: 48rpx;
				color: #375070;
			}
		}
		.main-1{
			width: 92%;
			height: 140rpx;
			padding-top: 28rpx;
			background-color: rgba(128,128,128,0.03);
			margin: 0 auto;
			margin-top: 35rpx;
			margin-bottom: 100rpx;
			border-radius: 20rpx;
			box-shadow: 15rpx 10rpx 10rpx rgba(128,128,128,0.01);
			.main-10{
				width: 140rpx;
				height: 140rpx;
				border: 1rpx solid black;
				margin-left: 38rpx;
				border-radius: 25rpx;
				.img{
					width: 100%;
					height: 100%;
					border-radius: 25rpx;
				}
			}
			.name{
				position: relative;
				text{
					position: absolute;
					top: -132rpx;
					left: 235rpx;
					font-size: 38rpx;
				}
			}
			.id{
				position: relative;
				text{
					position: absolute;
					top: -68rpx;
					left: 235rpx;
					font-size: 26rpx;
				}
			}
			.right{
				margin-top: -90rpx;
				margin-right: 28rpx;
				float: right;
				width: 35rpx;
				height: 35rpx;
			}
		}
		.main-2,.main-3,.main-4,.main-5,.main-6{
			height: 90rpx;
			line-height: 90rpx;
			position: relative;
			padding-left:75rpx;
			//background-color: rgba(128,128,128,0.08);
			margin: 8rpx auto;
			margin-top: 26rpx;
			border-bottom: 1rpx solid rgba(128,128,128,0.18);
			border-top: 1rpx solid rgba(128,128,128,0.1);
			box-shadow: 8rpx 8rpx 8rpx rgba(128,128,128,0.12);
			width: 78%;
			.chatu{
				width: 6%;
				height: 45%;
				position: absolute;
				top: 28rpx;
				left: 20rpx;
			}
			.img{
				height: 25rpx;
				width: 25rpx;
				margin-right: 10rpx;
				position: absolute;
				top: 32rpx;
				right: 0rpx;
			}
		}
	}
</style>
