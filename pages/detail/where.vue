<template>
	<view class="where">
		<map class="map" :markers="markers" :latitude="latitude" :longitude="longitude"></map>
	</view>
</template>

<script>
export default {
	data(){
		return{
			latitude:29.999525,
			longitude:106.238792,
			markers:[{
				"id":1,
				"latitude":29.999525,
				"longitude":106.238792,
				"iconPath":"static/map.png",
				"callout":{
					"content":"我在这里！！！"
				}
			}]
		}
	}
}
</script>
<style lang="scss">
	.where{
		height: 1200rpx;
		.map{
			width: 100%;
			height: 95%;
			margin-top: 150rpx;
		}
	}
</style>
