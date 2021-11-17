
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/constellation/constellation","pages/main/main","pages/detail/advice","pages/main/alter/alter","pages/login/login","pages/login/register","pages/news/news","pages/weather/weather","pages/detail/about","pages/detail/love","pages/detail/share","pages/detail/where","pages/detail/mian","pages/detail/join","components/webview/webview","pages/index/plun","pages/main/setting/setting","pages/main/setting/changedate/changedate","pages/main/setting/changepassword/changepassword","pages/main/setting/style/style","pages/main/setting/style/changesinger/changesinger"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"易生活","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333333","selectedColor":"#007AFF","list":[{"pagePath":"pages/index/index","text":"视频音乐","iconPath":"static/index.png","selectedIconPath":"static/indexbefore.png"},{"pagePath":"pages/news/news","text":"新闻头条","iconPath":"static/news.png","selectedIconPath":"static/newsbefore.png"},{"pagePath":"pages/weather/weather","text":"天气查询","iconPath":"static/weatherbefore.png","selectedIconPath":"static/weather.png"},{"pagePath":"pages/main/main","text":"个人中心","iconPath":"static/main.png","selectedIconPath":"static/mainbegore.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"易生活","compilerVersion":"3.2.12","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"易音乐"}},{"path":"/pages/constellation/constellation","meta":{},"window":{"navigationBarTitleText":"星座运势"}},{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","navigationStyle":"custom"}},{"path":"/pages/detail/advice","meta":{},"window":{"navigationBarTitleText":"留言"}},{"path":"/pages/main/alter/alter","meta":{},"window":{"navigationBarTitleText":"个人信息"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"易新闻"}},{"path":"/pages/weather/weather","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"天气预报","navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","webviewBGTransparent":true,"mask":"none","popGesture":"none"}},{"path":"/pages/detail/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/detail/love","meta":{},"window":{"navigationBarTitleText":"赞助我们"}},{"path":"/pages/detail/share","meta":{},"window":{"navigationBarTitleText":"分享好友"}},{"path":"/pages/detail/where","meta":{},"window":{"navigationBarTitleText":"我们在哪？？？"}},{"path":"/pages/detail/mian","meta":{},"window":{"navigationBarTitleText":"免责声明"}},{"path":"/pages/detail/join","meta":{},"window":{"navigationBarTitleText":"加入我们"}},{"path":"/components/webview/webview","meta":{},"window":{"navigationBarTitleText":"文章详情"}},{"path":"/pages/index/plun","meta":{},"window":{"navigationBarTitleText":"热门评论"}},{"path":"/pages/main/setting/setting","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/main/setting/changedate/changedate","meta":{},"window":{"navigationBarTitleText":"信息修改"}},{"path":"/pages/main/setting/changepassword/changepassword","meta":{},"window":{"navigationBarTitleText":"账号与安全"}},{"path":"/pages/main/setting/style/style","meta":{},"window":{"navigationBarTitleText":"偏好设置"}},{"path":"/pages/main/setting/style/changesinger/changesinger","meta":{},"window":{"navigationBarTitleText":"修改默认歌手"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});