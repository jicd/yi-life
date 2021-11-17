<template>
	<view>
		<view class="main">
			<view class="password">
				<text>姓名 : </text>
				<input type="text"  value=""  :placeholder="oldsinger" v-model="singer"/>
			</view>
		</view>
		<button class="bot" @click="submit" type="default">提交</button>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '@/components/xuan-popup/xuan-popup.vue'
	export default {
		onShow() {
			this.oldsinger = uni.getStorageSync('singer')
		},
		data() {
			return {
				name:uni.getStorageSync("name"),
				phone:uni.getStorageSync("phone"),
				singer:"",
				oldsinger:''
			};
		},
		methods:{
			submit(){
				uniCloud.callFunction({
					name:'changesinger',
					data:{
						name:this.name,
						phone:this.phone,
						singer:this.singer
					},
					success:()=>{
						this.$refs.mpopup.open({
							type:'success',
							content:'修改成功',
							timeout:1600,
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'../setting'
							})
						}, 1400);
						uni.setStorageSync("singer",this.singer)
					},
					fail:()=>{
						this.$refs.mpopup.open({
							type:'warn',
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
			height: 400rpx;
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
					width: 400rpx;
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
