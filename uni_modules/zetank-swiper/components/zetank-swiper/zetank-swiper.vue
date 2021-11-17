<template>
	<view style="text-align: center;">
		<image class="bg-set" v-if="imageList[currentIndex] && showBG" :src="imageList[currentIndex]"></image>
		<uni-swiper-dot  :current="currentIndex" field="content" :info="imageList" :mode="mode" :dotsStyles="dotsStyles">
			<swiper class="default-container"  circular autoplay @change="swiperChange" v-if="type==='default' || type==='default-nav'">
				<swiper-item  v-for="(item, index) in imageList" :key="index" class="default-image">
					<image @click="clickImg(item)"  :src="item" lazy-load  mode="aspectFill" class="default-image"></image>
				</swiper-item>
			</swiper>
			<swiper class="card-container" :previous-margin="previous_next" next-margin="45rpx" circular autoplay @change="swiperChange" v-if="type==='card'">
				<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" v-for="(item, index) in imageList" :key="index">
					<image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'" :src="item" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,		// 当前显示图片
				previous_next: "60rpx",	// 前后边距
				dontFirstAnimation: true,
				mode:"round",
				dotsStyles:{
					bottom:20,
					width:8,
					color:'#fff',
					backgroundColor:'rgba(0, 0, 0, .3)',
					border:'1px rgba(0, 0, 0, .0) solid',
					selectedBackgroundColor:'#ffffff',
					selectedBorder:'1px rgba(0, 0, 0, .0) solid'
				}
			}
		},
		props: {
			imageList: {
				type: Array
			},
			type:{
				type: String,
				default:"default"
			},
			showBG:{
				type: Boolean,
				default:false
			}
			
		},
		created() {
			if(this.type === "default-nav"){
				this.mode="nav"
			}
		},
		methods:{
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
			clickImg(item) {
				this.$emit('clickImg', item, this.currentIndex)
				console.log(this.currentIndex);
			}
		}
	}
</script>

<style scoped>
	
	.bg-set{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		filter: blur(20rpx)
	}
	
	.default-container{
		width: 750rpx;
		height: 350rpx;
	}
	.default-image{
		width: 750rpx;
		height: 350rpx;
		border-radius: 14rpx;
	}

	.card-container {
		width: 750rpx;
		height: 350rpx;
	}
	
	.item-img {
		width: 630rpx;
		height: 300rpx;
		border-radius: 14rpx;
		animation: to-big .3s;
	}
	
	.swiper-item {
		width: 630rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img-side {
		width: 630rpx;
		height: 260rpx;
		border-radius: 14rpx;
		animation: to-mini .3s;
	}
	
	.swiper-item-side {
		width: 630rpx;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@keyframes to-mini
	{
		from {
			height: 300rpx;
		}
		to {
			height: 260rpx;
		}
	}
	@keyframes to-big
	{
		from {
			height: 260rpx;
		}
		to {
			height: 300rpx;
		}
	}
</style>
