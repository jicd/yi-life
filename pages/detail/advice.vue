<template>
	<view class="advice">
		<view class="head">
			
		</view>
		<view class="header">
			<text>共有{{list.length}}条评论</text>
			<view class="add" @click="toggleMask('show')">
				发表评论
			</view>
		</view>
		<!-- <button @click="toggleMask('show')">发布评论</button> -->
		<view class="main" v-for="(item,index) in list">
				<image class="img" :src="item.fileID" mode=""></image>
			<view class="text">
				<text class="name">{{item.name}}</text>
				<text class="plun">{{item.text}}</text>
				<text class="date">{{item.date}}</text>
			</view>
		</view>
		<ygc-comment
			ref="ygcComment" 
		    :placeholder="'发布评论'" 
			@pubComment="pubComment"></ygc-comment>
		<mpopup  ref="mpopup" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import mpopup from '../../components/xuan-popup/xuan-popup.vue';
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	export default {
		data() {
			return {
				text:'',
				name:'',
				date:'',
				imgsrc:'',
				list:[]
			}
		},
		onLoad() {
			this.name = uni.getStorageSync("name")
			if(!uni.getStorageSync("imgsrc")){
				this.imgsrc = uni.setStorageSync("imgsrc","../../static/logo.png")
			}else{
				this.imgsrc = uni.getStorageSync("imgsrc")
			}
		},
		onShow() {
			uniCloud.callFunction({
				name:'searchmessage',
				data:{
					name:'111'
				},
				success:(res)=> {
					this.list = res.result.data.reverse()
				}
			})
		},
		methods: {
			toggleMask(type) {
				this.$refs.ygcComment.toggleMask(type);
			},
			pubComment(res) {
				var date = new Date();
				
				var year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
				var month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
				var day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
				
				var hours = date.getHours();          //小时 ,返回 Date 对象的小时 (0 ~ 23)
				var minutes = date.getMinutes();      //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
				var seconds = date.getSeconds();      //秒 ,返回 Date 对象的秒数 (0 ~ 59)   
				
				//获取当前系统时间  
				var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
				uniCloud.callFunction({
					name:'addmessage',
					data:{
						fileID : this.imgsrc,
						name : this.name,
						text : res,
						date : currentDate
					},
					success:()=> {
						this.$refs.mpopup.open({
							type:'success',
							content:'留言成功',
							timeout:1500,
						})
						uniCloud.callFunction({
							name:'searchmessage',
							data:{
								name:'111'
							},
							success:(res)=> {
								this.list = res.result.data.reverse()
							}
						})
					},
					fail:()=> {
						this.$refs.mpopup.open({
							type:'err',
							content:'留言失败，请稍后再试',
							timeout:1500,
						})
					}
				})
			}
		},
		components: {
			ygcComment,
			mpopup
		}
	}
</script>

<style lang="scss">
	.advice{
		.head{
			width: 100%;
			height: 85rpx;
		}
		.header{
			position: fixed;
			z-index: 999;
			top: 0;
			background-color: white;
			width: 100%;
			height: 80rpx;
			border-bottom: 1rpx solid #e3e3e3;
			text{
				display: inline-block;
				line-height: 80rpx;
				padding-left: 60rpx;
				font-size: 28rpx;
			}
			.add{
				display: inline-block;
				width: 170rpx;
				height: 70rpx;
				background-color:#3b75ed;
				line-height: 70rpx;
				text-align: center;
				font-size: 26rpx;
				float: right;
				border-radius: 18rpx;
				margin-right: 30rpx;
				margin-top: 5rpx;
			}
		}
		.main{
			width: 96%;
			margin-top: 0 auto;
			.img{
				float: left;
				position: relative;
				top: 30rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-top: 0rpx;
				margin-left: 22rpx;
				margin-right: 20rpx;
			}
			.text{
				float: left;
				width: 590rpx;
				display: inline-block;
				//background-color: red;
				.name{
					margin-top: 25rpx;
					display: block;
					color: #5f9bca;
					font-size: 28rpx;
				}
				.date{
					display: block;
					font-size: 22rpx;
					margin-top: 12rpx;
				}
				.plun{
					display: block;
					margin-top: 12rpx;
					font-size: 31rpx;
				}
			}
		}
	}
</style>
