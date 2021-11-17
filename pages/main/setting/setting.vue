<template>
	<view class="alter">
		<view class="name" @click="changepassword">
			<text class="left" >账号与安全</text>
			<image src="../../../static/right.png" mode=""></image>			
		</view>
		<view class="like" @click="like">
			<text class="left">偏好设置</text>
			<image src="../../../static/right.png" mode=""></image>
		</view>
		<view class="like" @click="about">
			<text class="left">关于作者</text>
			<image src="../../../static/right.png" mode=""></image>
		</view>
		<view class="like" @click="advice">
			<text class="left">帮助与反馈</text>
			<image src="../../../static/right.png" mode=""></image>
		</view>
		<view class="like" @click="cancelled">
			<text class="left">注销账号</text>
			<image src="../../../static/right.png" mode=""></image>
		</view>
		<view class="back">
			<button class="blue" @click="change" type="default">切换账号</button>
		</view>
		<view class="back">
			<button class="red" @click="open" type="default">退出登录</button>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="error" mode="base" message="成功消息" :duration="2000" :before-close="true" content="确定退出？？？" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '../../../components/xuan-popup/xuan-popup.vue'
	
	export default {
		onShow() {
			
		},
		data(){
			return{

			}
		},
		methods:{
			cancelled(){
				uni.showModal({
					title: '确定注销???',
					content: '注销成功后您将需要重新注册!!!',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						//console.log(res);
						if(res.confirm){
							uniCloud.callFunction({
								name:"cancelled",
								data:{
									name:uni.getStorageSync('name'),
									phone:uni.getStorageSync('phone')
								},
								success:()=>{
									this.$refs.mpopup.open({
										type:'success',
										content:'注销成功',
										timeout:1500,
									})
									uni.removeStorageSync('user')
									uni.removeStorageSync('name')
									uni.removeStorageSync('phone')
									uni.removeStorageSync('imgsrc')
									uni.removeStorageSync("city")
									uni.removeStorageSync("singer")
									setTimeout(()=>{
									uni.reLaunch({
										url:'../../login/register',
									})
									},1000)
								},
								fail:()=>{
									this.$refs.mpopup.open({
										type:'err',
										content:'注销失败',
										timeout:1500,
									})
								}
							})
						}else if(res.concel){
							this.$refs.mpopup.open({
								type:'err',
								content:'注销失败',
								timeout:1500,
							})
						}
					},
				})
			},
			about(){
				uni.navigateTo({
					url:"../../../components/webview/webview?id=http://jcde.site/"
				})
			},
			advice(){
				uni.navigateTo({
					url:'../../detail/advice'
				})
			},
			like(){
				uni.navigateTo({
					url:'style/style'
				})
			},
			changepassword(){
				uni.navigateTo({
					url:'changepassword/changepassword'
				})
			},
			change(){
				uni.navigateTo({
					url:'../../login/login'
				})
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				//点取消触发
				this.$refs.popup.close()
			},
			confirm() {
				uni.removeStorageSync('user')
				uni.removeStorageSync('name')
				uni.removeStorageSync('phone')
				uni.removeStorageSync('imgsrc')
				uni.removeStorageSync("city")
				uni.removeStorageSync("singer")
				uni.navigateTo({
					url:'../../login/login',
				})
				this.$refs.popup.close()
			},
		},
		components:{
			mpopup
		}
	}
</script>

<style lang="scss">
	.alter{
		.photo{
			width: 92%;
			height: 175rpx;
			border-bottom: 1rpx solid rgba(153,153,153,0.5);
			margin:  0 auto;
			margin-top: 20rpx;
			text{
				line-height: 160rpx;
				padding-left: 15rpx;
			}
			.img{
				width: 140rpx;
				height: 140rpx;
				margin-top: 10rpx;
				float: right;
				margin-right: 20rpx;
				border: 1rpx solid #3d3d3d;
				border-radius: 28rpx;
			}
			.right{
				float: right;
				width: 35rpx;
				height: 35rpx;
				margin-top: 70rpx;
				margin-right: 10rpx;
			}
		}
		.name,.phone,.city,.like{
			width: 92%;
			height: 90rpx;
			margin: 0 auto;
			margin-top: 15rpx;
			//background-color: red;
			border-bottom: 1rpx solid rgba(153,153,153,0.5);
			text{
				line-height: 90rpx;
			}
			.right{
				font-size: 28rpx;
				float:right;
				margin-right: 20rpx;
				color: #2C405A;
			}
			.left{
				float: left;
				margin-left: 15rpx;
			}
			image{
				width: 32rpx;
				height: 32rpx;
				float: right;
				margin-top: 29rpx;
				margin-right: 10rpx;
			}
		}
		.back{
			button{
				width: 80%;
				margin-top: 40rpx;
			}
			.blue{
				background-color:#106cff;
			}
			.red{
				background-color: #DD524D;
			}
		}
	}
</style>
