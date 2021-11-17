<template>
	<view>
		<view class="main">
			<view class="password">
				<text>原密码 : </text>
				<input type="text" password="true" value=""  placeholder="请输入原密码" v-model="oldpassword"/>
			</view>
			<view class="password">
				<text>新密码 : </text>
				<input type="text" password="true" value="" placeholder="请输入新密码" v-model="newpassword"/>
			</view>
			<view class="password">
				<text>新密码 : </text>
				<input type="text" password="true" value="" placeholder="再次输入确认" v-model="agpassword"/>
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
				oldpassword:'',
				newpassword:'',
				agpassword:''
			};
		},
		methods:{
			submit(){
				if(this.oldpassword!==''&&this.newpassword!==''&&this.agpassword!==''){
					if(this.newpassword==this.agpassword){
						if(this.oldpassword == uni.getStorageSync("password")){
							this.$refs.mpopup.open({
								type:'loading',
								content:'修改中...',
								timeout:900,
							})
							uniCloud.callFunction({
								name:'changepassword',
								data:{
									name:uni.getStorageSync("name"),
									phone:uni.getStorageSync("phone"),
									oldpassword:this.oldpassword,
									newpassword:this.newpassword
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
									uni.setStorageSync("password",this.newpassword)
								},
								fail:()=>{
									this.$refs.mpopup.open({
										type:'warn',
										content:'修改失败，请稍后再试',
										timeout:1500,
									})
								}
							})
						}else{
							this.$refs.mpopup.open({
								type:'err',
								content:'原密码输入错误',
								timeout:1000,
							})
						}
					}else{
						this.$refs.mpopup.open({
							type:'err',
							content:'两次密码输入不一致!!!',
							timeout:1000,
						})
					}
				}else{
					this.$refs.mpopup.open({
						type:'warn',
						content:'信息不能为空',
						timeout:1500,
					})
				}
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
