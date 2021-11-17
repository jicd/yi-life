# zetank-swiper

>轮播图组件，包含多种样式

###安装
下载组件到项目即可，本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范

###使用
```html
<zetank-swiper :imageList="imageList" type="default" @clickImg="clickImg"></zetank-swiper>

```


###属性

|  属性名	|    类型	| 默认值		| 说明															|
| :-:		| :-:		| :-:			| :-:														|
| 	imageList		| 	Array		| 	-			| 			图片url												|
| 	type		| 	String		| 		default		| 			类型	(default,default-nav,card)										|
| 	showBG		| 	Boolean		| 		false		| 			是否显示背景												|
| 	@clickImg		| 	Fuction		| 	-			| 			点击图片事件												|