<template>
	<view class="listen">
		<image @click="voiceBegain" src="@/static/yuyin.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		name:"listen",
		data() {
			return {
				
			};
		},
		methods:{
			// 调用百度语音识别
			voiceBegain() {
				let options = {};
				//#ifdef APP-PLUS || APP-PLUS-NVUE
				options.engine = 'baidu';
				options.punctuation = false; // 是否需要标点符号 
				plus.speech.startRecognize(options, (res)=>{
					
				});
				//#endif
			}
		}
	}
</script>

<style lang="scss">

</style>
