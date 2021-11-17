<template>
	<view class="style">
		<view class="singer" @click="setsinger">
			<text class="left" >喜爱的歌手</text>
			<image src="@/static/right.png" mode=""></image>			
			<text class="right">{{singer}}</text>
		</view>
		<view class="singer" @click="selectAddress">
			<text class="left" >我的常住地</text>
			<image src="@/static/right.png" mode=""></image>			
			<text class="right">{{address}}</text>
		</view>
		<view class="singer">
			<text class="left" >小易连续对话</text>
			<switch :checked="bool" class="swich"  @change="xiaoyi" />
		</view>
		<itmister-address-picker ref="addressEl" @confirmChange="confirmChange"></itmister-address-picker>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '@/components/xuan-popup/xuan-popup.vue'
	import itmisterAddressPicker from '@/components/itmister-address-picker/itmister-address-picker.nvue'
	export default {
		onShow() {
			this.address = uni.getStorageSync("city"),
			this.singer = uni.getStorageSync("singer"),
			this.bool = uni.getStorageSync("xiaoyi")
		},
		data(){
			return{
				address:'',
				singer:'',
				bool:Boolean
			}
		},
		methods:{
			xiaoyi(e){
				console.log(e.detail.value);
				if(e.detail.value==true){
					uni.setStorageSync("xiaoyi",true)
				}else if(e.detail.value==false){
					uni.setStorageSync("xiaoyi",false)
				}
			},
			setsinger(){
				uni.navigateTo({
					url:'changesinger/changesinger'
				})
			},
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
		},
		components:{
			mpopup,
			itmisterAddressPicker
		}
	}
</script>

<style lang="scss">
	.style{
		.singer,.city,{
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
			.swich{
				font-size: 20rpx;
				float:right;
				margin-right: 0rpx;
				color: #2C405A;
				margin-top: 18rpx;
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
	}
</style>
