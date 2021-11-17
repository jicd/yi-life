<template>
	<view>
		<view class="main">
			<view class="password">
				<text>昵称 : </text>
				<input type="text" value=""  :placeholder="name" v-model="name"/>
			</view>
			<view class="password">
				<text>手机 : </text>
				<input type="text" value="" :placeholder="phone" v-model="phone"/>
			</view>
		</view>
		<button class="bot" @click="submit" type="default">提交</button>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
		
	</view>
</template>

<script>
	import mpopup from '../../../../components/xuan-popup/xuan-popup.vue'
	export default {
		data() {
			return {
				name:uni.getStorageSync('name'),
				phone:uni.getStorageSync('phone')
			};
		},
		methods:{
			submit(){
				this.$refs.mpopup.open({
					type:'loading',
					content:'修改中...',
					timeout:1000,
				})
				uniCloud.callFunction({
					name:'changenameorphone',
					data:{
						name:uni.getStorageSync('name'),
						phone:uni.getStorageSync('phone'),
						changename:this.name,
						changephone:this.phone
					},
					success:()=>{
						this.$refs.mpopup.open({
							type:'success',
							content:'修改成功',
							timeout:1500,
						})
						uni.setStorageSync('name',this.name)
						uni.setStorageSync('phone',this.phone)
						setTimeout(()=>{
							uni.navigateTo({
								url:"../../alter/alter"
							})
						},1500)
					},
					fail() {
						this.$refs.mpopup.open({
							type:'err',
							content:'修改失败，请稍后再试',
							timeout:1500,
						})
					}
				})
			}
		},
		components:{
			mpopup
		}
	}
</script>

<style lang="scss">
		.main{
			width: 100%;
			height: 290rpx;
			//background-color: #F1F1F1;
			margin-top: 30rpx;
			.password{
				width:530rpx;
				height: 110rpx;
				margin: 0 auto;
				margin-top: 20rpx;
				line-height: 110rpx;
				position: relative;
				input{
					padding-left: 10rpx;
					position: absolute;
					top: 16rpx;
					width: 430rpx;
					height:75rpx;
					border: 1rpx solid black;
					border-radius: 10rpx;
					display: inline-block;
					margin-left: 10rpx;
				}
			}
		}
		.bot{
			width: 82%;
			background-color: #DD524D;
		}
</style>
