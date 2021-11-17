<template>
	<view class="login">
		<view class="imgbox">
			<image class="img" src="../../static/gaitubao_loginlogo_png.png" mode=""></image>
		</view>
		<view class="main">
			<view class="password">
				<text>昵称 : </text>
				<input type="text" value=""  placeholder="请输入昵称" v-model="name"/>
			</view>
			<view class="password">
				<text>手机 : </text>
				<input type="text" value=""  placeholder="请输入手机" v-model="phone"/>
			</view>
			<view class="password">
				<text>密码 : </text>
				<input type="text" password="true" value="" placeholder="请输入密码" v-model="password"/>
			</view>
			<view class="password">
				<text>密码 : </text>
				<input type="text" password="true" value="" placeholder="请确认密码" v-model="anginpassword"/>
			</view>
		</view>
		<button @click="submit" class="submit" type="default">注册</button>
		<view @click="gologin" class="have">
			{{left}}已有账号,直接登录{{right}}
		</view>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '../../components/xuan-popup/xuan-popup.vue'
	export default {
		data(){
			return{
				left:'>>',
				right:'<<',
				name:'',
				phone:'',
				password:'',
				anginpassword:''
			}
		},
		methods:{
			gologin(){
				uni.navigateTo({
					url:'login'
				})
			},
			submit(){
				if(this.name!==''&&this.phone!==''&&this.password!==''&&this.anginpassword!==''){
					if(this.password == this.anginpassword){
						this.$refs.mpopup.open({
						    type:'loading',
						    content:'注册中',
						    timeout:400,
						})
						uniCloud.callFunction({
							name:'register',
							data:{
								name:this.name,
								phone:this.phone,
								password:this.password
							},
							success:(res)=>{
								this.$refs.mpopup.open({
								    type:'success',
								    content:'注册成功',
								    timeout:1500,
								})
								setTimeout(()=>{
									uni.navigateTo({
										url:"login"
									})
								},1200)
							},
							fail:()=>{
								this.$refs.mpopup.open({
								    type:'err',
								    content:'注册失败，请稍后再试',
								    timeout:1000,
								})
							}
						})
					}else{
						this.$refs.mpopup.open({
						    type:'err',
						    content:'两次密码不一致',
						    timeout:2500,
						})
					}
				}else{
					this.$refs.mpopup.open({
					    type:'err',
					    content:'信息不能为空',
					    timeout:2500,
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
	.login{
		.imgbox{
			height: 400rpx;
			margin-top: 30rpx;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.main{
			width: 100%;
			height: 400rpx;
			//background-color: #F1F1F1;
			margin-top: 20rpx;
			.password{
				width:490rpx;
				height: 110rpx;
				margin: 0 auto;
				margin-top: 8rpx;
				line-height: 110rpx;
				position: relative;
				input{
					padding-left: 10rpx;
					position: absolute;
					top: 16rpx;
					width: 380rpx;
					height:75rpx;
					border: 1rpx solid black;
					border-radius: 10rpx;
					display: inline-block;
					margin-left: 10rpx;
				}
			}
		}
		.submit{
			background-color: #e23023;
			width: 68%;
			margin-top: 90rpx;
		}
		.have{
			font-size:22rpx;
			float: right;
			padding-right: 14%;
			padding-top: 20rpx;
		}
	}
</style>
