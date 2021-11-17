<template>
	<view class="where">
		<map 
		class="map" 
		:markers="markers" 
		:latitude="latitude" 
		:longitude="longitude"
		scale="17"
		></map>
	</view>
</template>

<script>
export default {
	data(){
		return{
			bool:true,
			latitude:29.999525,
			longitude:106.238792,
			markers:[{
				"id":1,
				"latitude":30.001610917371046,
				"longitude":106.24088412303162,
				"iconPath":"static/map.png",
				"callout":{
					"content":"北2门",
				}
			},{
				"id":2,
				"latitude":29.998549388854467,
				"longitude":106.24082511443329,
				"iconPath":"static/map.png",
				"callout":{
					"content":"东3门"
				}
			},{
				"id":3,
				"latitude":29.99725785077625,
				"longitude":106.24086802977753,
				"iconPath":"static/map.png",
				"callout":{
					"content":"2号门"
				}
			},{
				"id":4,
				"latitude":30.002019733455562,
				"longitude":106.23908167857361,
				"iconPath":"static/map.png",
				"callout":{
					"content":"北1门"
				}
			},{
				"id":3,
				"latitude":29.996379781119625,
				"longitude":106.23887783068848,
				"iconPath":"static/map.png",
				"callout":{
					"content":"3号门"
				}
			},]
		}
	}
}
</script>
<style lang="scss">
	.where{
		height: 1600rpx;
		.map{
			width: 100%;
			height: 95%;
		}
	}
</style>
