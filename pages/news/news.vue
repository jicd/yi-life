<template>
	<view class="news">
		<view class="tabs">
			<liuyuno-tabs class="tabs-1" :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="" @click="goto">
		</view>
		<view class="main">
			<view class="main-1" v-for="(item,index) in news" @click="goto(item.url)">
				<view class="content">
					<view class="title">
						{{item.title}}
					</view>
					<view class="day">
						{{item.ptime}}
					</view>
					<view class="dizhi">
						<image class="img" src="../../static/source.png" mode=""></image>
						<view class="text">
							{{item.source}}
						</view>
					</view>
					<image class="img" :src="item.imgsrc" mode=""></image>
				</view>
				<!-- <view class="content-2" v-if="flase">
					<view class="title">
						测试
					</view>
					<image class="img" src="../../static/ceshi.jpeg" mode=""></image>
					<image class="img" src="../../static/ceshi.jpeg" mode=""></image>
					<view class="dizhi">
						<image class="img" src="../../static/source.png" mode=""></image>
						人民资讯
					</view>
					<view class="day">
						2021-10-08 18:58:00
					</view>
				</view>
				<view class="content-3" v-if="flase">
					<view class="title">
						测试
					</view>
					<image class="img" src="../../static/ceshi.jpeg" mode=""></image>
					<image class="img" src="../../static/ceshi.jpeg" mode=""></image>
					<image class="img" src="../../static/ceshi.jpeg" mode=""></image>
					<view class="dizhi">
						<image class="img" src="../../static/source.png" mode=""></image>
						人民资讯
					</view>
					<view class="day">
						2021-10-08 18:58:00
					</view>
				</view> -->
				<view class="listen">
					<image class="img" @click.stop="voiceBegain" src="@/static/yuyin.png" mode=""></image>
				</view>
			</view>
		</view>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>
<script>
	import mpopup from '../../components/xuan-popup/xuan-popup.vue'
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	export default {
		data(){
			return{
				news:[],
				tabsrc:["http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html",
				'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html',
				'http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html',
				'http://c.m.163.com/nc/article/headline/T1348649580692/0-40.html',
				'http://c.m.163.com/nc/auto/list/5bmz6aG25bGx/0-20.html',
				'http://c.3g.163.com/nc/article/list/T1348649079062/0-20.html',
				'http://c.3g.163.com/nc/article/local/5bmz6aG25bGx/0-20.html'
				],
				tabs:['推荐','头条','娱乐','科技','汽车','运动','民生'],
				src:'',
				list:''
			}
		},
		onLoad() {
			uni.request({
				url:"http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html",
				success:(res)=> {
					this.news = res.data.T1467284926140.slice(1);
					this.list = 0
				}
			})
		},
		onShow(){
			plus.speech.stopRecognize()
		},
		methods: {
			voiceBegain(e) {
				this.$refs.mpopup.open({
					type:'success',
					content:"小易支持向上、下滑动,搜索和查询天气等功能哦!!!试着跟小易说说话吧!!!",
					timeout:4000,
				})
				let options = {};
				//#ifdef APP-PLUS || APP-PLUS-NVUE
				options.engine = 'baidu';
				options.punctuation = false; // 是否需要标点符号 
				plus.speech.startRecognize(options, (res)=>{
					console.log(res);
					let pageY = e.changedTouches[0].pageY
					//console.log(pageY);
					if(res=='回到顶部'){
						uni.pageScrollTo({
							scrollTop:0
						})
						this.$refs.mpopup.open({
							type:'success',
							content:res,
							timeout:1000,
						})
					}else if(res.indexOf("下") != -1){
						uni.pageScrollTo({
							scrollTop:pageY+150,
							success:()=> {
								this.$refs.mpopup.open({
									type:'success',
									content:"向下翻",
									timeout:1200,
								})
							}
						})
					}else if(res.indexOf("上") != -1){
						uni.pageScrollTo({
							scrollTop:pageY-250,
							success:()=> {
								this.$refs.mpopup.open({
									type:'success',
									content:"向上翻",
									timeout:1200,
								})
							}
						})
					}else if(res.indexOf("左") != -1){
						if(this.list==6){
							this.$refs.mpopup.open({
								type:'warn',
								content:"到底了哦",
								timeout:1200,
							})
						}else{
							this.$refs.mpopup.open({
								type:'success',
								content:"向左翻",
								timeout:1200,
							}),
							this.list=this.list+1,
							this.tabClick(this.list+1)
						}
					}else if(res.indexOf("右") != -1){
						if(this.list==0){
							this.$refs.mpopup.open({
								type:'warn',
								content:"到底了哦",
								timeout:1200,
							})
						}else{
							this.$refs.mpopup.open({
								type:'success',
								content:"向左翻",
								timeout:1200,
							}),
							this.list=this.list-1,
							this.tabClick(this.list-1)
						}
					}else if(res.indexOf("听音乐") != -1){
						console.log(111);
						uni.switchTab({
							url:"/pages/index/index"
						})
					}else if(res.indexOf("视频音乐") !=-1){
						uni.switchTab({
							url:'../index/index'
						})
					}else if(res.indexOf("新闻头条") !=-1){
						this.$refs.mpopup.open({
							type:'warn',
							content:"不可跳转至当前页面哦!!!",
							timeout:2500,
						})
					}else if(res.indexOf("天气查询") !=-1){
						uni.switchTab({
							url:'../weather/weather'
						})
					}else if(res.indexOf("个人中心") !=-1){
						uni.switchTab({
							url:'../main/main'
						})
					}else if(res!=''){
						for(let i=0;i<this.news.length;i++){
							let find = this.news[i].title
							if(find.indexOf(res)!=-1){
								this.goto(this.news[i].url)
							}
						}
					}else{
						this.$refs.mpopup.open({
							type:'warn',
							content:"小易没听清楚哦,请再说一遍!!!",
							timeout:2000,
						})
					}
				},()=>{
					this.$refs.mpopup.open({
					    type:'err',
					    content:'识别失败',
					    timeout:1500,
					})
				});
				//#endif
			},
			tabClick(e){
				this.list = e
				uni.request({
					url:this.tabsrc[e],
					success:(res)=>{
						if(e == 0){
							this.news = res.data.T1467284926140.slice(1);
						}
						else if(e == 1){
							this.news = res.data.T1348647853363.slice(1);
						}
						else if(e == 2){
							this.news = res.data.T1348648517839.slice(1);
						}
						else if(e == 3){
							this.news = res.data.T1348649580692.slice(1);
						}
						else if(e == 4){
							this.news = res.data.list.slice(1);
						}
						else if(e == 5){
							this.news = res.data.T1348649079062.slice(1);
						}
						else{
							this.news = res.data.平顶山.slice(1);
						}
					}
				})
			},
			goto(newsrc){
				if(newsrc == ''){
					this.$refs.mpopup.open({
					    type:'err',
					    content:'找不到原文，请稍后再试',
					    timeout:2000,
					});
				}
				else{
					uni.navigateTo({
						url:'../../components/webview/webview?id='+newsrc
					})
				}
			}
		},
		components:{
			liuyunoTabs,
			mpopup
		}
	}
</script>

<style lang="scss">
	.news{
		.listen{
			z-index: 999;
			position: fixed;
			top: 50rpx;
			right: 35rpx;
			width: 80rpx;
			height: 75rpx;
			background-color: white;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.tabs{
			.tabs-1{
				position: fixed;
				top: 0rpx;
				z-index: 900;
				background-color: white;
				width: 100%;
			}
		}
		.main{
			margin-top: 80rpx;
			.content{
				width: 100%;
				height: 210rpx;
				background-color: #F8F8F8;
				position: relative;
				margin-top: 5rpx;
				.title{
						width:460rpx;
						height:100rpx;
						position: absolute;
						right: 20rpx;
						top: 20rpx;
						font-size: 32rpx;
					}
					.day{
						position: absolute;
						right: 10rpx;
						bottom: 10rpx;
						font-size: 26rpx;
					}
					.dizhi{
						position: absolute;
						bottom: 12rpx;
						right: 360rpx;
						font-size: 22rpx;
						.img{
							width: 38rpx;
							height: 38rpx;
							position: absolute;
							bottom:-5rpx ;
							right: 85rpx;
						}
						.text{
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
							width: 200rpx;
							height: 30rpx;
							position: absolute;
							bottom: 4rpx;
							left:-80rpx;
						}
					}
					.img{
						position: absolute;
						width: 230rpx;
						height: 180rpx;
						display: inline-block;
						padding-top: 15rpx;
						padding-left: 25rpx;
					}
				
			}
			.content-2{
				margin-top: 10rpx;
				width: 100%;
				height: 325rpx;
				background-color:#F8F8F8;
				.title{
					width: 92%;
					margin: 0 auto;
					font-size: 32rpx;
				}
				.img{
					padding-left:2.5% ;
					width: 46%;
					height: 60%;
				}
				.dizhi{
					position: relative;
					width: 200rpx;
					float: left;
					padding-left: 45rpx;
					font-size: 26rpx;
					.img{
						width: 38rpx;
						height: 38rpx;
						position: absolute;
						left: 5rpx;
					}
				}
				.day{
					float: right;
					font-size: 26rpx;
					padding-right: 10rpx;
				}
			}
			.content-3{
				width: 100%;
				height: 300rpx;
				background-color: #F1F1F1;
				margin-top: 10rpx;
				.title{
					padding-top: 15rpx;
					width: 94%;
					margin: 0 auto;
				}
				.img{
					margin-top: 15rpx;
					width: 33.33%;
					height: 145rpx;
				}
				.dizhi{
					position: relative;
					width: 200rpx;
					float: left;
					padding-left: 48rpx;
					font-size: 26rpx;
					.img{
						width: 38rpx;
						height: 38rpx;
						position: absolute;
						top: -15rpx;
						left: 12rpx;
					}
				}
				.day{
					float: right;
					font-size: 26rpx;
					padding-right: 15rpx;
				}
			}
		}
	}
</style>
