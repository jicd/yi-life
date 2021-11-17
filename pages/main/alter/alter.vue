<template>
	<view class="alter">
		<view class="photo">
			<text>头像</text>
			<image class="right" src="../../../static/right.png" mode=""></image>
			<image @click="changeimg" class="img" :src="imgsrc" mode=""></image>
		</view>
		<view class="name" @click="changename">
			<text class="left" >昵称</text>
			<image src="../../../static/right.png" mode=""></image>			
			<text class="right">{{name}}</text>
		</view>
		<view class="phone" @click="changephone">
			<text class="left" >手机</text>
			<image src="../../../static/right.png" mode=""></image>			
			<text class="right">{{phone}}</text>
		</view>
		<view class="city" @click="selectAddress">
			<text class="left">地区</text>
			<image src="../../../static/right.png" mode=""></image>
			<text class="right">{{address}}</text>
		</view>
		<itmister-address-picker ref="addressEl" @confirmChange="confirmChange"></itmister-address-picker>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '../../../components/xuan-popup/xuan-popup.vue'
	import itmisterAddressPicker from '@/components/itmister-address-picker/itmister-address-picker.nvue'
	export default {
		onShow() {
			this.user = uni.getStorageSync('user');
			this.name = uni.getStorageSync('name');
			this.phone = uni.getStorageSync('phone');
			this.address = uni.getStorageSync("city")
			if(!uni.getStorageSync('imgsrc')){
				this.imgsrc = '../../../static/logo.png'
			}else{
				this.imgsrc = uni.getStorageSync('imgsrc');
			}
		},
		data(){
			return{
				user:'',//show
				name:'',
				phone:'',
				imgsrc:'../../../static/logo.png',
				address:''
			}
		},
		methods:{
			// 打开窗口
			selectAddress(){
			    this.$refs.addressEl.show();
			},
			// 确认选中
			confirmChange(address){
				//console.log(address.area);
				this.address = address.area;
				uniCloud.callFunction({
					name:'addcity',
					data:{
						name:uni.getStorageSync("name"),
						phone:uni.getStorageSync("phone"),
						city:address.area
					},
					success:()=>{
						this.$refs.mpopup.open({
							type:'success',
							content:'更新成功',
							timeout:1500,
						})	
						uni.setStorageSync("city",address.area)
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			changeimg(){
				uni.chooseImage({
					count:1,
					success:(res)=>{
						const filepath = res.tempFilePaths[0]
						this.$refs.mpopup.open({
							type:'loading',
							content:'上传中...',
							timeout:3000,
						})
						uniCloud.uploadFile({
							filePath:filepath,
							cloudPath:'userlogo.jpg',
							success:(res)=>{
								this.imgsrc = res.fileID;
								uni.setStorageSync('imgsrc',res.fileID)
								uniCloud.callFunction({
									name:'saveimg',
									data:{
										phone:this.phone,
										password:this.password,
										fileID:this.imgsrc
									},
									success:()=>{
										this.$refs.mpopup.open({
											type:'success',
											content:'上传成功',
											timeout:1500,
										})	
									},
									fail:(err)=>{
										console.log(err);
										this.$refs.mpopup.open({
											type:'err',
											content:'云端更新失败',
											timeout:1500,
										})	
									}
								})
							},
							fail:()=>{
								this.$refs.mpopup.open({
									type:'err',
									content:'上传失败',
									timeout:1500,
								})
							}
						})
					}
				})
			},
			setcity(){
				
			},
			changename(){
				uni.navigateTo({
					url:'../setting/changedate/changedate'
				})
			},
			changephone(){
				uni.navigateTo({
					url:'../setting/changedate/changedate'
				})
			},
		},
		components:{
			mpopup,
			itmisterAddressPicker
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
				width: 65%;
				margin-top: 60rpx;
			}
		}
	}
</style>
