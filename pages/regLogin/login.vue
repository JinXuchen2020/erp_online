<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/img/login/2.png"></image>
		<image class="img-b" src="@/static/img/login/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		
		<view v-if="current == 0" class="cl" style="margin-top: 40rpx;">
			<view class="t-a">
				<image src="@/static/img/login/sj.png"></image>
				<input name="username" placeholder="请输入账号" maxlength="11" v-model="username" />
				<u-icon v-if="username" @click="username = ''" class="uIconR" name="close-circle-fill" color="#8a8a8a"
					size="40"></u-icon>
			</view>			
			<view  class="t-a">
				<image src="@/static/img/login/mm.png"></image>
				<input name="password" :password="isShowP" placeholder="请输入密码" v-model="password" />
				<view v-if="password">
					<u-icon v-if="isShowP" @click="isShowP = false" class="uIconR" name="eye-fill" color="#8a8a8a"
						size="40"></u-icon>
					<u-icon v-else class="uIconR" @click="isShowP = true" name="eye-off" color="#8a8a8a" size="40">
					</u-icon>
				</view>
			</view>
			<u-button class="loginBtn" type="primary" ripple-bg-color="#909399" @click="loginBtn">登 录</u-button>
		</view>
		<view v-else style="margin-top: 40rpx;">
			<!-- <u-button shape="circle" :ripple="true" @click="gotoZcFun(0)">加入已有企业</u-button> -->
			<view style="margin-top: 50rpx;">
				<u-button shape="circle" @click="gotoZcFun(1)">企业用户注册</u-button>
			</view>
			<view style="margin-top: 50rpx;">
				<u-button shape="circle" @click="gotoZcFun(2)">个人用户注册</u-button>
			</view>
		</view>
		<view style="margin-top: 32px;">
			技术支持：0760-86109203 13549871771
		</view>
		
	</view>
</template>
<script>
	let that = ''
	import {
		crmMyAppUserApi
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				title: '博睿(内部运营)APP', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				second: 60, //默认60秒
				username: '', //手机号码				
				password: '', // 密码
				isShowP: true,
				current: 0,				
			};
		},
		onLoad() {
			that = this;
			//uni.clearStorageSync();
		},
		methods: {
			tabChange: function(index) {							
				this.current = index
			},
			//当前登录按钮操作
			loginBtn() {
				
				if (!that.username) {
					uni.showToast({
						title: '请输入账号',
						icon: 'none'
					});
					return;
				}
				
					if (that.password == '') {
						uni.showToast({
							title: '请输入登录密码',
							icon: 'none'
						});
						return;
					}
					that.loginFun()
				 
			},
			// 云函数账号密码登录
			loginFun: function() {
				uni.showLoading({
					title: '登录中...'
				})
				let params= {
						username: that.username,
						password: that.password
					}
				let reqData = {
					action: 'login',
					params: JSON.stringify(params)
				}
				console.log('调用函数login,用户编号：'+that.username+'用户密码：'+that.password)
				crmMyAppUserApi(reqData)
					.then(res => {	
						console.log('系统登录返回的状态值：'+res.data.code)
						if(res.data.code==0) 
						{
							// #ifdef MP-WEIXIN
							const canWenxinLogin = res.data.userInfo[0].F_Weixin;
							if(!canWenxinLogin) {
								uni.showToast({
									title: '该账号没有小程序权限，请重新登录',
									icon: 'none',
									duration: 1688,
								})
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/regLogin/login',
									})
								}, 1000)
								
								return;
							}
							// #endif
							uni.setStorageSync('uni_id_token', res.data.uni_id_token)
							uni.setStorageSync('uni_id_token_expired', res.data.tokenExpired)						
							uni.setStorageSync('uni_id', res.data.id)
							uni.setStorageSync('nickname', res.data.nickname)
							uni.setStorageSync('zhiwei', res.data.zhiwei)					
							uni.setStorageSync('userInfo', res.data.userInfo[0]);
							uni.setStorageSync('userRoles', res.data.userRoles[0]);
							uni.showToast({
								title: '登录成功!',
								icon: 'none',
								duration: 1688,
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '../index/index'
								})
							}, 888)
						}
						else
						{
							uni.showToast({
								title: '登录失败!',
								icon: 'none',
								duration: 1688,
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/regLogin/login',
								})
							}, 888)
							
						}
					})
			},
			
			gotoZcFun: function(i) {
				uni.navigateTo({
					url: 'reg?index=' + i
				})
			},			
			getuserinfoFun: function(t) {
				console.log(t)
				uni.showLoading({
					title: '登录中...'
				})
				let that = this;
				var user = t.detail.userInfo;
				if (user) {
					uni.getSetting({ // 确认是否授权成功
						success(res) {
							if (res.authSetting["scope.userInfo"]) {
								uni.login({ // 获取登录code
									success(obj) {
										console.log(obj)
										user.code = obj.code;
										// that.XCXUserLogin(user);
									}
								})
							} else {
								uni.hideLoading();
								uni.showToast({
									title: '授权失败',
									duration: 1500,
									icon: 0
								})
							}
						}
					});
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '授权失败',
						duration: 1500,
						icon: 'none'
					})
				}
			}
		}
	};
</script>
<style>
	.img-a {
		position: absolute;
		width: 100%;
		top: -280rpx;
		right: -100rpx;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		margin-bottom: -200rpx;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		color: #000;
	}

	.t-login .loginBtn {
		font-size: 30rpx;
		font-weight: bold;
		background-image: linear-gradient(45deg, #007aff, #019eff);
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		/* border-radius: 50rpx; */
		box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
	}

	.t-login input {
		padding: 0 120rpx 0 120rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f8f7fc;
		border: 1px solid #e9e9e9;
		font-size: 32rpx;
		border-radius: 50rpx;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-login .t-a image {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		left: 40rpx;
		top: 28rpx;
		border-right: 2rpx solid #dedede;
		padding-right: 20rpx;
	}

	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 200rpx 0 60rpx 0;
		font-weight: bold;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 200rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #000;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}

	.uTabs {
		/* margin-bottom: 50rpx; */
		width: 260rpx;
	}

	.spaceRow {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 36rpx;
	}

	.uIconR {
		position: absolute;
		right: 16rpx;
		top: 10rpx;
		padding: 20rpx;
	}
</style>
