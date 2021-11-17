<template>
	<view class="weather" :style="'background-image:url('+imgsrc+')'">
		<view class="top">
			易天气
		</view>
		<view class="input">
			<view class="main">
				<uni-search-bar @cancel="value=''" @focus='focus' @blur="blur" class="sousuo" @input="submit"  clearButton="auto" :radius="100" placeholder="寻找您所在的城市" v-model="value"></uni-search-bar>
			</view>				
		</view>
		<view class="maincity">
			<image class="img" src="../../static/weizhi.png" mode=""></image>
			<text class="city">{{city}}</text>
		</view>
		<view class="wendu">
			<text class="num">{{wendu}}
				<text class="sheshidu">℃</text>
			</text>
		</view>
		<view class="yingtian">
			<view class="imgbox" v-show="tomtype=='阴'">
				<image class="img" src="../../static/yin.png" mode=""></image>
			</view>
			<view class="imgbox" v-show="tomtype=='小雨'||tomtype=='大雨'||tomtype=='中雨'">
				<image class="img" src="../../static/yu.png" mode=""></image>
			</view>
			<view class="imgbox" v-show="tomtype=='晴'">
				<image class="img" src="../../static/qingtian.png" mode=""></image>
			</view>
			<view class="imgbox" v-show="tomtype=='多云'">
				<image class="img" src="../../static/duoyun.png" mode=""></image>
			</view>
			<text>{{tomtype}}</text>
		</view>
		<view class="father">
			<view class="buttom" @click="buttomclick1">
				<text class="left">{{tomdata}}</text>
				<view class="imgbox" v-show="tomtype=='阴'">
					<image class="img" src="../../static/yin.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="tomtype=='小雨'||tomtype=='大雨'||tomtype=='中雨'">
					<image class="img" src="../../static/yu.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="tomtype=='晴'">
					<image class="img" src="../../static/qingtian.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="tomtype=='多云'">
					<image class="img" src="../../static/duoyun.png" mode=""></image>
				</view>
				<text class="mollde">{{tomtype}}</text>
				<text class="right">{{tomhigh}}℃/{{tomlow}}℃</text>
			</view>
			<view class="buttom" @click="buttomclick2">
				<text class="left">{{afterdata}}</text>
				<view class="imgbox" v-show="aftertype=='阴'">
					<image class="img" src="../../static/yin.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="aftertype=='小雨'||aftertype=='大雨'||aftertype=='中雨'">
					<image class="img" src="../../static/yu.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="aftertype=='晴'">
					<image class="img" src="../../static/qingtian.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="aftertype=='多云'">
					<image class="img" src="../../static/duoyun.png" mode=""></image>
				</view>
				<text class="mollde">{{aftertype}}</text>
				<text class="right">{{afterhigh}}℃/{{afterlow}}℃</text>
			</view>
			<view class="buttom" @click="buttomclick3">
				<text class="left">{{afterafterdata}}</text>
				<view class="imgbox" v-show="afteraftertype=='阴'">
					<image class="img" src="../../static/yin.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="afteraftertype=='小雨'||afteraftertype=='大雨'||afteraftertype=='中雨'">
					<image class="img" src="../../static/yu.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="afteraftertype=='晴'">
					<image class="img" src="../../static/qingtian.png" mode=""></image>
				</view>
				<view class="imgbox" v-show="afteraftertype=='多云'">
					<image class="img" src="../../static/duoyun.png" mode=""></image>
				</view>
				<text class="mollde">{{afteraftertype}}</text>
				<text class="right">{{afterafterhigh}}℃/{{afterafterlow}}℃</text>
			</view>
		</view>
		<mpopup ref="mpopup" :isdistance="true"></mpopup>
		<myPopup top=670 width=500 height=412 radius=42 class="zzc" ref="pop" @hide='hide'>
		    <view class="zzc-main">
				<view class="zzc-xiangxi">
					<text>详细信息</text>
				</view>
		        <view class="zzc-top">
		        	<text>{{zzcday}}</text>
		        </view>
				<view class="zzc-feng">
					<text>{{zzcfeng}}</text>
				</view>
				<view class="zzc-high">
					<text>最高气温 {{zzchigh}}</text>
				</view>
				<view class="zzc-low">
					<text>最低气温 {{zzclow}}</text>
				</view>
				<view class="zzc-type">
					<text>{{zzctype}}</text>
				</view>
		    </view>
		</myPopup>
		<view class="cityzzc" v-if="cityzzc==true">
			<ss-select-city class="zzc"
				v-model="value"
				:hot-citys="hotCitys"
				@on-select="City"
			/>
		</view>
		<view class="listen">
			<image class="img" @click="voiceBegain" src="@/static/yuyin.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import ssSelectCity from '@/components/ss-select-city/index.vue';
	import myPopup from '@/components/qianxiao-pop/qianxiao-pop.vue';
	import mpopup from '../../components/xuan-popup/xuan-popup.vue';
	export default {
		data(){
			return{
				cityzzc:false,
				value:'',
				city:'',
				wendu : '',
				tomhigh:'',
				tomlow:'',
				tomtype:'',
				tomfeng:'',
				afterhigh:'',
				afterlow:'',
				aftertype:'',
				afterfeng:'',
				afterafterhigh:'',
				afterafterlow:'',
				afteraftertype:'',
				afterafterfeng:'',
				imglist:'',
				tomdata:'',
				afterdata:"",
				afterafterdata:'',
				num:1,//防抖
				zzcday:'',
				zzcfeng:'',
				zzchigh:'',
				zzclow:'',
				zzctype:'',
				imgsrc:'',
				hotCitys: [
				  '杭州',
				  '天津',
				  '北京',
				  '上海',
				  '深圳',
				  '广州',
				  '成都',
				  '重庆',
				  '厦门'
				],
			}
		},
		onShow() {
			if(!uni.getStorageSync("city")){
				uni.setStorageSync("city","合川")
			}
			uni.request({
				url:"http://wthrcdn.etouch.cn/weather_mini?city="+uni.getStorageSync("city"),
				success:(res)=>{
					this.city = res.data.data.city
					this.wendu = res.data.data.wendu.replace(/[^0-9]/ig,"")
					this.tomtype = res.data.data.forecast[0].type
					this.tomhigh = res.data.data.forecast[0].high.replace(/[^0-9]/ig,"")
					this.tomlow = res.data.data.forecast[0].low.replace(/[^0-9]/ig,"")
					this.tomdata = res.data.data.forecast[0].date
					this.tomfeng = res.data.data.forecast[0].fengxiang
					this.aftertype = res.data.data.forecast[1].type
					this.afterhigh = res.data.data.forecast[1].high.replace(/[^0-9]/ig,"")
					this.afterlow = res.data.data.forecast[1].low.replace(/[^0-9]/ig,"")
					this.afterdata = res.data.data.forecast[1].date
					this.afterfeng = res.data.data.forecast[1].fengxiang
					this.afteraftertype = res.data.data.forecast[2].type
					this.afterafterhigh = res.data.data.forecast[2].high.replace(/[^0-9]/ig,"")
					this.afterafterlow = res.data.data.forecast[2].low.replace(/[^0-9]/ig,"")
					this.afterafterdata = res.data.data.forecast[2].date
					this.afterafterfeng = res.data.data.forecast[2].fengxiang
					if(this.tomtype == '晴'){
						this.imgsrc = "../../static/qing.jpg"
					}
					else if(this.tomtype == '阴'){
						this.imgsrc = '../../static/ying.jpg'
					}
					else if(this.tomtype == '多云'){
						this.imgsrc = "../../static/duoyunbcg.jpg"
					}
					else if(this.tomtype == '小雨'||'大雨'||'中雨'){
						this.imgsrc = "../../static/yubcg.jpg"
					}
					//console.log(this.tomtype);
				}
			})
		},
		methods:{
			voiceBegain(e) {
				this.$refs.mpopup.open({
					type:'success',
					content:"小易支持查询天气哦!!!试着跟小易说说话吧!!!",
					timeout:2500,
				})
				let options = {};
				//#ifdef APP-PLUS || APP-PLUS-NVUE
				options.engine = 'baidu';
				options.punctuation = false; // 是否需要标点符号 
				plus.speech.startRecognize(options, (res)=>{
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
							scrollTop:pageY+100,
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
							scrollTop:pageY-200,
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
					}else if(res.indexOf("视频音乐") !=-1){
						uni.switchTab({
							url:'../index/index'
						})
					}else if(res.indexOf("新闻头条") !=-1){
						console.log(11);
						uni.switchTab({
							url:'../news/news',
							success() {
								console.log("chenggong");
							},
							fail(err) {
								console.log(err);
							}
						})
					}else if(res.indexOf("天气查询") !=-1){
						//uni.switchTab({
						//	url:'../weather/weather'
						//})
						this.$refs.mpopup.open({
							type:'warn',
							content:"不可跳转至当前页面哦!!!",
							timeout:2500,
						})
					}else if(res.indexOf("个人中心") !=-1){
						uni.switchTab({
							url:'../main/main'
						})
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
			City(city) {
			  console.log(city)
			},
			//获得焦点
			focus(){
				this.cityzzc = true
			},
			//失去焦点
			blur(){
				this.value = ''
				this.cityzzc = false
			},
			buttomclick1(){
				this.$refs.pop.show()
				this.zzcday = this.tomdata
				this.zzcfeng = this.tomfeng
				this.zzchigh = this.tomhigh
				this.zzclow = this.tomlow
				this.zzctype = this.tomtype
			},
			buttomclick2(){
				this.$refs.pop.show()
				this.zzcday = this.afterdata
				this.zzcfeng = this.afterfeng
				this.zzchigh = this.afterhigh
				this.zzclow = this.afterlow
				this.zzctype = this.aftertype		
			},
			buttomclick3(){
				this.$refs.pop.show()
				this.zzcday = this.afterafterdata
				this.zzcfeng = this.afterafterfeng
				this.zzchigh = this.afterafterhigh
				this.zzclow = this.afterafterlow
				this.zzctype = this.afteraftertype
			},
			submit(){
				if(this.num == 1){
					this.$refs.mpopup.open({
					    type:'loading',
					    content:'加载中...',
					    timeout:1000,
					})
					this.num = 0
				}
				setTimeout(()=>{
					this.num = 1
				},5000),
				uni.request({
					url:"http://wthrcdn.etouch.cn/weather_mini?city="+this.value,
					success:(res)=>{
						this.city = res.data.data.city
						this.weather = res.data.data.forecast[0].type
						this.wendu = res.data.data.wendu.replace(/[^0-9]/ig,"")
						this.tomtype = res.data.data.forecast[0].type
						this.tomhigh = res.data.data.forecast[0].high.replace(/[^0-9]/ig,"")
						this.tomlow = res.data.data.forecast[0].low.replace(/[^0-9]/ig,"")
						this.tomfeng = res.data.data.forecast[0].fengxiang
						this.aftertype = res.data.data.forecast[1].type
						this.afterhigh = res.data.data.forecast[1].high.replace(/[^0-9]/ig,"")
						this.afterlow = res.data.data.forecast[1].low.replace(/[^0-9]/ig,"")
						this.afterfeng = res.data.data.forecast[1].fengxiang
						this.afteraftertype = res.data.data.forecast[2].type
						this.afterafterhigh = res.data.data.forecast[2].high.replace(/[^0-9]/ig,"")
						this.afterafterlow = res.data.data.forecast[2].low.replace(/[^0-9]/ig,"")
						this.afterafterfeng = res.data.data.forecast[2].fengxiang
						if(this.tomtype == '晴'){
							this.imgsrc = "../../static/qing.jpg"
						}
						else if(this.tomtype == '阴'){
							this.imgsrc = '../../static/ying.jpg'
						}
						else if(this.tomtype == '多云'){
							this.imgsrc = "../../static/duoyunbcg.jpg"
						}
						else if(this.tomtype=='小雨'||this.tomtype=='大雨'||this.tomtype=='中雨'){
							this.imgsrc = "../../static/yubcg.jpg"
						}
						//console.log(this.tomtype);
					}
				})
			}
		},
		components:{
			mpopup,
			myPopup,
			ssSelectCity
		}
	}
</script>
<style lang="scss">
	.weather{
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		.listen{
			z-index: 999;
			position: fixed;
			top: 190rpx;
			right: 35rpx;
			width: 80rpx;
			height: 75rpx;
			background-color: white;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.top{
			width: 750rpx;
			height: 76px;
			text-align: center;
			line-height: 110px;
			font-size: 30rpx;
		}
		.zzc{
			opacity: 1.0;
			.zzc-main{
				position: relative;
				.zzc-xiangxi{
					position: absolute;
					width: 100%;
					height: 70rpx;
					top: 0rpx;
					text-align: center;
					line-height: 88rpx;
					font-size: 38rpx;
				}
				.zzc-top{
					position: absolute;
					width: 100%;
					height: 60rpx;
					top: 75rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 30rpx;
				}
				.zzc-feng{
					position: absolute;
					width: 100%;
					height: 70rpx;
					top: 140rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 30rpx;
				}
				.zzc-high{
					position: absolute;
					width: 100%;
					height: 70rpx;
					top: 205rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 30rpx;
				}
				.zzc-low{
					position: absolute;
					width: 100%;
					height: 70rpx;
					top: 270rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 30rpx;
				}
				.zzc-type{
					position: absolute;
					width: 100%;
					height: 70rpx;
					top: 335rpx;
					text-align: center;
					line-height: 70rpx;
					font-size: 30rpx;
				}
			}
		}
		.input{
			margin: 0 auto;
			padding: 4% 0;
			margin-bottom: 7%;
			width: 90%;
		}
		.maincity{
			width: 100%;
			height: 20px;
			display: flex;
			.img{
				padding-left:250rpx ;
				width: 48rpx;
				height: 48rpx;
			}
			.city{
				display: flex;
				padding-left: 36rpx;
				display: inline-block;
				text-align: center;
				font-size: 40rpx;
				font-weight: bold;
				letter-spacing: 12px;
			}
		}
		.wendu{
			.num{
				width: 100%;
				height: 300rpx;
				display: inline-block;
				//background-color: blue;
				margin-top: 8%;
				line-height: 300rpx;
				text-align: center;
				font-size: 200rpx;
				position: relative;
				.sheshidu{
					font-size: 35rpx;
					position: absolute;
					top: -50rpx;
				}
			}
		}
		.yingtian{
			width: 100%;
			height: 20%;
			line-height: 220rpx;
			display: inline-block;
			text-align: center;
			//background-color: red;
			font-size: 40rpx;
			padding-left: 4%;
			.imgbox{
				position: relative;
				.img{
					position: absolute;
					width: 45rpx;
					height: 45rpx;
					top: 90rpx;
					left: 38%;
				}
			}
		}
		.father{
			width: 100%;
			height: 40%;
			margin-top: 14%;
			padding-bottom: 95rpx;
			.buttom{
				width: 90%;
				height: 100rpx;
				margin: 0 auto;
				line-height: 110rpx;
				//background-color: yellow;
				border: 1rpx solid black;
				border-radius: 40rpx;
				margin-top: 3%;
				.imgbox{
					position: relative;
					.img{
						width:40rpx;
						height: 40rpx;
						position: absolute;
						top: 38rpx;
						left: 42%;
					}
				}
				.left{
					float: left;
					padding-left: 5%;
					width: auto;
					text-align: center;
				}
				.mollde{
					padding-left:24% ;
					width: 300rpx;
					text-align: center;
				}
				.right{
					float: right;
					padding-right: 5%;
					width: 150rpx;
					text-align: center;
				}
			}
		}
		.cityzzc{
			width: 100%;
			height: 600rpx;
			position: absolute;
			top: 0;
			overflow: hidden;
			margin-top: 270rpx;
			opacity: 1.0;
			.zzc{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
