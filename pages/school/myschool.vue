<template>
	<view class="myschool">
		<view class="school">
			<view class="class" @click="clas">
				<image class="img" src="../../static/class.png" mode=""></image>
				<view class="text">
					个人课表
				</view>
			</view>
			<view class="class" @click="footer">
				<image class="img" src="../../static/footer.png" mode=""></image>
				<view class="text">
					计步器
				</view>
			</view>
			<view class="class" @click="map">
				<image class="img" src="../../static/schoolmap.png" mode=""></image>
				<view class="text">
					校园地图
				</view>
			</view>
		</view>
		<view class="school">
			<view class="class" @click="guanwang">
				<image class="img" src="../../static/guanwang.png" mode=""></image>
				<view class="text">
					学校官网
				</view>
			</view>
			<view class="class" @click="shuang">
				<image class="img" style="width: 50%; height: 45%;" src="../../static/shuang.png" mode=""></image>
				<view class="text" style="padding-top: 3%;">
					双体系
				</view>
			</view>
			<view class="class" @click="wanman">
				<image class="img" src="../../static/wanman.png" mode=""></image>
				<view class="text">
					完满教育
				</view>
			</view>
		</view>
		<view class="school">
			<view class="class" @click="shangke">
				<image class="img" src="../../static/shangke.png" mode=""></image>
				<view class="text">
					商科教育
				</view>
			</view>
			<view class="class" @click="chuangye">
				<image class="img" style="height: 35%; margin-top: 17%;" src="../../static/chuangye.png" mode=""></image>
				<view class="text">
					就创中心
				</view>
			</view>
			<view class="class" @click="tongshi">
				<image class="img" style="height: 35%; margin-top: 17%;" src="../../static/tongshi.png" mode=""></image>
				<view class="text">
					通识教育
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			clas(){
				uni.navigateTo({
					url:"class"
				})
			},
			footer(){
				uni.navigateTo({
					// url:"footer"
				})
			},
			map(){
				uni.navigateTo({
					url:"map"
				})
			},
			guanwang(){
				uni.navigateTo({
					url:'../../components/webview/webview?id='+"http://www.cqyti.com/"
				})
			},
			shuang(){
				uni.navigateTo({
					url:'../../components/webview/webview?id='+"http://www.shuangtixi.com/"
				})
			},
			wanman(){
				uni.navigateTo({
					url:'../../components/webview/webview?id='+"http://wmjywyh.cqyti.com/"
				})
			},
			shangke(){
				uni.navigateTo({
					url:'../../components/webview/webview?id='+"http://www.cqyti.com/swyt/skjy.htm"
				})
			},
			chuangye(){
				uni.navigateTo({
					url:'../../components/webview/webview?id='+"http://jczx.cqyti.com/"
				})
			},
			tongshi(){
				uni.navigateTo({
					url:'../../components/webview/webview?id='+"http://www.cqyti.com/swyt/tsjy.htm"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.school{
		display: flex;
		justify-content: space-around;
		margin-top: 60rpx;
		text-align: center;
		margin-left: 25rpx;
		margin-right: 25rpx;
		font-size: 26rpx;
		.class{
			width: 26%;
			height: 24vw;
			border-radius: 18%;
			box-shadow: #c5c5c5 5rpx 5rpx 5rpx;
			border: 2rpx #c5c5c5 solid;
			.img{
				width: 40%;
				height: 40%;
				margin-top: 12%;
			}
			.text{
				padding-top: 8%;
			}
		}
	}
</style>
