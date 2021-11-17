<template>
	<view class="login">
		<view class="imgbox">
			<image class="img" src="../../static/gaitubao_loginlogo_png.png" mode=""></image>
		</view>
		<view class="main">
			<view class="password">
				<text>手机 : </text>
				<input type="text" value=""  placeholder="请输入手机" v-model="phone"/>
			</view>
			<view class="password">
				<text>密码 : </text>
				<input type="text" password="true" value="" placeholder="请输入密码" v-model="password"/>
			</view>
		</view>
		<button @click="submit" class="submit" type="default">登录</button>
		<view @click="goregister" class="have">
			{{left}}暂无账号,去注册{{right}}
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
				phone:'',
				password:'',
			}
		},
		methods:{
			goregister(){
				uni.navigateTo({
					url:'register'
				})
			},
			submit(){
				if(this.phone!==''&&this.password!==''){
					uniCloud.callFunction({
						name:'login',
						data:{
							phone:this.phone,
							password:this.password
						},
						success:(res)=>{
							//console.log(res);
							if(res.result.results.affectedDocs==0){
								this.$refs.mpopup.open({
								    type:'err',
								    content:'账号或密码输入错误',
								    timeout:1000,
								})
							}else{
								//console.log(res);
								uni.setStorageSync('user',1);
								uni.setStorageSync('name',res.result.results.data[0].name);
								uni.setStorageSync('phone',res.result.results.data[0].phone);
								uni.setStorageSync("password",res.result.results.data[0].password)
								if(res.result.results.data[0].fileID){
									uni.setStorageSync('imgsrc',res.result.results.data[0].fileID);	
								}
								if(res.result.results.data[0].city){
									uni.setStorageSync('city',res.result.results.data[0].city);	
								}
								if(res.result.results.data[0].singer){
									uni.setStorageSync('singer',res.result.results.data[0].singer);	
								}
								this.$refs.mpopup.open({
								    type:'loading',
								    content:'登录中...',
								    timeout:1500,
								})
								setTimeout(()=>{
									uni.switchTab({
										url:"../main/main"
									})
								},1000)
							}
						},
						fail:(err)=>{
							console.log(err);
							this.$refs.mpopup.open({
							    type:'err',
							    content:'登陆失败，请稍后再试',
							    timeout:1500,
							})
						}
					})
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
			height: 290rpx;
			//background-color: #F1F1F1;
			margin-top: 30rpx;
			.password{
				width:490rpx;
				height: 110rpx;
				margin: 0 auto;
				margin-top: 20rpx;
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
		}
		.have{
			font-size:22rpx;
			float: right;
			padding-right: 14%;
			padding-top: 20rpx;
		}
	}
</style>
