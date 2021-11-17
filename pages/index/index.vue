<template>
	<view class="content">
		<view class="input">
			<view class="main">
				<uni-search-bar @cancel="value=''" @blur="value = ''" class="sousuo" @input="submit"  clearButton="auto" :radius="100" placeholder="搜索您想要的音乐" v-model="value"></uni-search-bar>
			</view>
		</view>
		<view class="main-0">
			<uni-swiper-dot  :info="bannerList">
				    <swiper class="swiper-box" 
					    autoplay="true" 
					    circular="true" 
					    indicatorDots="true" 
					    indicator-active-color="#fcf6f3" 
					>  
				        <swiper-item v-for="(item, index) in imgList" :key="index">  
				            <view class="swiper-item">  
				                <image :src="item.pic" class="swiper-item_img" mode="aspectFill" @click="swiperClick(item)" />  
				            </view>  
				        </swiper-item>  
				    </swiper>  
				</uni-swiper-dot>
		</view>
		<view class="tablist">
			<text :class="{'red':tab==index}" @click="tabchange(index)" class="tablist-text" v-for="(item,index) in tablist" :key="index">{{item}}</text>
		</view>
		<view v-if="tab == 0">
			<view  class="tab-0" v-for="(item,index) in tabtext" :key='index'>
				<image @click="changetab" :src="item.picUrl" mode=""></image>
				<text>{{item.name}}</text>
			</view>		
		</view>
		<view class="one" v-if="tab==1">
				<view class="main-1">
					<view @click="playmusic(item.id,item.name,item.mvid)" class="main-10" v-for="(item,index) in list" :key="item.id">
						<text class="main-100">{{index+1}} . </text>
						<text class="main-101">{{item.name}}</text>
						<image @click="goplun" class="img" src="../../static/plun.png" mode=""></image>
						<image @click="playmv" v-if="item.mvid!=0" class="img" src="../../static/play.png" mode=""></image>
					</view>
				</view>
				<view v-if="isshow" class="zzclr">
					<image @click="guanbimv" class="img" src="../../static/guanbi.png" mode=""></image>
					<video autoplay=true class="video" :src="mvurl" controls></video>
				</view>
				<view class="play">
					<view class="play-main">
						<image class="img" :src="photourl" mode=""></image>
						<image @click="changeplay" class="playmusic" :src="playsrc" mode=""></image>
						<text class="text">{{name}}</text>
					</view>
				</view>
				<view class="listen">
					<image class="img" @click="voiceBegain" src="@/static/yuyin.png" mode=""></image>
				</view>
				<mpopup ref="mpopup" :isdistance="true"></mpopup>
			</view>
	</view>
</template>
<script>
	import mpopup from '../../components/xuan-popup/xuan-popup.vue'
	import carousel from '@/components/vear-carousel/vear-carousel';
	export default {
		data() {
			return {
				imgList:[],
				value:"",
				list:[],
				musicurl:'',
				photourl:'',
				name:'',
				playsrc:'../../static/musicplay.png',
				mvid:'',
				mvurl:'',
				isshow:false,
				num:1,//防抖,
				tab:1,//tabchange
				tablist:["推荐歌单","歌曲列表"],
				tabtext:[],
				musicid:'',
				singer:'',
				xiaoyi:Boolean,//语音助手的连续对话开启与否,
				xiaoyi2:Boolean,//语音助手的连续对话开启与否,
				pageY:0
  			}
		},
		onShow() {
			//this.$refs.mpopup.open({
			//    type:'info',
			//    content:'可通过歌名，歌手，歌词等方式搜索！！！',
			//	timeout:3000
			//}); 
			if(!uni.getStorageSync("singer")){
				uni.setStorageSync("singer","陈奕迅")
			}
			if(!uni.getStorageSync("xiaoyi")){
				uni.setStorageSync("xiaoyi",false)
				this.xiaoyi = false;
				this.xiaoyi2 = false
			}else{
				this.xiaoyi = uni.getStorageSync("xiaoyi");
				this.xiaoyi2 = uni.getStorageSync("xiaoyi")
			}
			uni.request({
				url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/search?keywords="+uni.getStorageSync("singer"),
				success:(res)=>{
					this.list = res.data.result.songs;
				}
			})
			uni.request({
				url:'https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/banner?type=2',
				success: (res) => {
					this.imgList = res.data.banners
					//console.log(res.data.banners);
				}
			})
			uni.request({
				url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/personalized",
				success:(res)=>{
					this.tabtext = res.data.result
					//console.log(res.data.result);
				}
			})
			this.$refs.mpopup.open({
				type:'success',
				content:"小易支持向上、下滑动,搜索和查询天气等功能哦!!!试着跟小易说说话吧!!!",
				timeout:4000,
			})
			this.yuyin()
		},
		methods: {
			yuyin(){
				if(this.xiaoyi===true){
					plus.speech.addEventListener("end",()=>{
						if(this.xiaoyi===true){
							setTimeout(()=>{
								this.voiceBegain()
							},600)
						}
					})
				}
			},
			voiceBegain() {
				this.xiaoyi = this.xiaoyi2;
				let options = {};
				//#ifdef APP-PLUS || APP-PLUS-NVUE
				options.engine = 'baidu';
				options.punctuation = false; // 是否需要标点符号
				plus.speech.startRecognize(options, (res)=>{
					if(res=='回到顶部'){
						this.pageY = 0
						uni.pageScrollTo({
							scrollTop:0,
						})
						this.$refs.mpopup.open({
							type:'success',
							content:res,
							timeout:1000,
						})
					}else if(res.indexOf("下") != -1){
						this.pageY = this.pageY + 150
						uni.pageScrollTo({
							scrollTop:this.pageY,
							success:()=> {
								this.$refs.mpopup.open({
									type:'success',
									content:"向下翻",
									timeout:1200,
								})
							},
						})
					}else if(res.indexOf("上") != -1){
						if(this.page <= 150){
							this.pageY = 0
						}else{
							this.pageY = this.pageY - 150
						}
						uni.pageScrollTo({
							scrollTop:this.pageY,
							success:()=> {
								this.$refs.mpopup.open({
									type:'success',
									content:"向上翻",
									timeout:1200,
								})
							}
						})
					}else if(res.indexOf("搜索") != -1){
						this.value = res.slice(2)
					}else if(res.indexOf("退出") != -1){
						this.xiaoyi = false
					}else if(res.indexOf("播放") != -1){
						this.$refs.mpopup.open({
							type:'warn',
							content:"暂不可直接播放,请您手动点击哦!!!",
							timeout:2500,
						})
					}else if(res.indexOf("退") !=-1){
						this.xiaoyi===false
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
			goplun(){
				uni.navigateTo({
					url:"./plun?id="+this.musicid
				})
			},
			changetab(){
				this.tab = 1
			},
			tabchange(num){
				this.tab = num
			},
			playmv(){
				this.isshow=true
				let music = uni.createInnerAudioContext()
				music.play()
			},
			guanbimv(){
				this.isshow = false
			},
			changeplay(){
				if(this.playsrc == '../../static/musicplay.png'){
					let music = uni.createInnerAudioContext();
					music.url = this.musicurl;
					music.play()
					this.playsrc = '../../static/stop.png'
				}
				else if(this.playsrc == '../../static/stop.png'){
					let music = uni.createInnerAudioContext();
					music.url = this.musicurl
					music.play()
					this.playsrc = '../../static/musicplay.png'
					console.log('stop');
				}
			},
			submit(){
				if(this.num == 1){
					this.$refs.mpopup.open({
					    type:'loading',
					    content:'查找中...',
					    timeout:1000,
					})
					this.num = 0
				}
				setTimeout(()=>{
					this.num = 1
				},5000),
				uni.request({
					url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/search?keywords="+this.value,
					success:(res)=>{
						this.list = res.data.result.songs;
					}
				})
			},
			playmusic(musicid,name,mvid){
				this.musicid = musicid
				let music = uni.createInnerAudioContext({
					loop:true
				});
				music.pause()
				uni.request({
					url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/song/url?id="+musicid,
					success:(res)=>{
						this.name = name,
						this.musicurl = res.data.data[0].url,
						music.src = this.musicurl
						music.play()
					}
				}),
				uni.request({
					url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/song/detail?ids="+musicid,
					success:(res)=>{
						this.photourl = res.data.songs[0].al.picUrl
					}
				})
				uni.request({
					url:"https://cloud-music-api-f494k233x-mgod-monkey.vercel.app/mv/url?id="+mvid,
					success:(res)=>{
						this.mvurl = res.data.data.url
					}
				})
				this.playsrc='../../static/stop.png'
			},
		},
		components:{
			carousel,
			mpopup
		}
	}
</script>

<style lang="scss"> 
	.content{
		position: relative;
		.listen{
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
		.tab-0{
			display: inline-block;
			width: 50%;
			height: 400rpx;
			margin-top: 2%;
			image{
				width: 92%;
				height: 360rpx;
				margin-left: 4%;
				box-shadow: 10rpx 10rpx  #bfbfbf;
			}
			text{
				display: inline-block;
				width: 100%;
				text-align: center;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 26rpx;
				padding-top: 10rpx;
			}
		}
		.red{
			color: #334dc3;
		}
		.tablist{
			font-size: 25rpx;
			width: 92%;
			height: 70rpx;
			margin: 0 auto;
			.tablist-text{
				margin-left: 10rpx;
				border: 1px solid black;
				border-radius: 10rpx;
				display: inline-block;
				width:48%;
				height: 96%;
				line-height: 70rpx;
				text-align: center;
			}
		}
		.main-0{
			width: 750rpx;
			margin-bottom: 15rpx;
			margin-top: 0rpx;
			.swiper-box{
				width: 100%;
				height: 350rpx;
				.swiper-item{
					width: 100%;
					.swiper-item_img{
						width:100%
					}
				}
			}
		}
		.zzclr{
			width: 100%;
			height: 9000rpx;
			background: rgba(0,0,0,0.5);
			position: fixed;
			top: 0;
			left: 0;
			.img{
				position: fixed;
				top: 31%;
				right: 8%;
				width: 50rpx;
				height: 50rpx;
				border: 1rpx solid black;
				border-radius: 20rpx;
			}
			.video{
				position: fixed;
				width: 92%;
				left: 4%;
				top: 35%;
			}
		}
		.input{
			width: 90%;
			margin: 2% auto;
			margin-left: 5%;
			margin-bottom: 1%;
			z-index: 999;
		}
		.main-1{
			font-size: 30rpx;
			margin-top: -4%;
			padding-bottom: 110rpx;
			.main-10{
				width: 92%;
				height: 70rpx;
				margin: 3% auto;
				.main-100{
					width: 58rpx;
					display: inline-block;
					text-align: center;
					padding-left: 18rpx;
					padding-right: 20rpx;
					line-height: 70rpx;
				}
				.main-101{
					display: inline-block;
					width: 220px;
					height: 100%;
					line-height: 110rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.img{
					float: right;
					width: 37rpx;
					height: 40rpx;
					margin-right: 16rpx;
					margin-top: 40rpx;
				}
			}
		}
		.play{
			position: relative;
			.play-main{
				width: 90%;
				height: 95rpx;
				position: fixed;
				bottom: 0rpx;
				left: 5%;
				background-color: #e5e5e0;
				border-radius: 50rpx;
				// #ifdef H5
					bottom: 100rpx;
				// #endif
				.img{
					position: fixed;
					bottom: 0rpx;
					width: 120rpx;
					height: 120rpx;
					margin-left: 6%;
					margin-bottom: 1%;
					border-radius: 30rpx;
				// #ifdef H5
					bottom: 100rpx;
				// #endif
				}
				.playmusic{
					position: fixed;
					right: 9%;
					bottom: 15rpx;
					width: 70rpx;
					height: 70rpx;
					// #ifdef H5
						bottom: 115rpx;
					// #endif
					
				}
				.text{
					position: fixed;
					width: 220rpx;
					height: 100rpx;
					line-height: 100rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					bottom: 0%;
					left: 290rpx;
					font-size: 28rpx;
					// #ifdef H5
						bottom: 100rpx;
					// #endif
					
				}
			}
		}
	}
</style>
