<template>
	<view class="content">
		<!--金刚区-->
		<view class="tilte">常用功能</view>
		<view class="swiper-item">
			<view v-for="(item, index) in cardList" :key="index" @click="skipPageFun(item)" class="kongKimCard">
				<view :style="{backgroundImage: item.bgColor}">
					<image :src="item.src" mode="aspectFill"></image>
				</view>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="gray32"></view>
		<view class="tilte">数据报表</view>
		
		<view class="dateSelectRow">
			<view>
				<text>开始日期: </text>
				<picker mode="date" :value="startDate" start="1999-02-15" end="2100-02-15" @change="bindsDateChange">
					<text class="dateText">{{startDate}}</text>
				</picker>
			</view>
			<view>
				<text>结束日期: </text>
				<picker mode="date" :value="endDate" start="1999-02-15" end="2100-02-15" @change="bindeDateChange">
					<text class="dateText">{{endDate}}</text>
				</picker>
			</view>
		</view>
		<!--销售简报-->
		<salesJianBaoBoard v-if="baoBiaoShow" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></salesJianBaoBoard>
		<!--采购简报-->
		<purchaseJianBaoBoard v-if="baoBiaoShow" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></purchaseJianBaoBoard>	
		<!--生产简报-->
		<produceJianBaoBoard v-if="false" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></produceJianBaoBoard>
		<!--委外简报-->
		<wwJianBaoBoard v-if="false" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></wwJianBaoBoard>
		<!--财务简报-->
		<!-- <financeJianBaoBoard v-if="baoBiaoShow" :startDateTime="startDateTime" :endDateTime="endDateTime"
			:userInfo="userInfo" :depId="depId" :fuZeRenId="fuZeRenId"></financeJianBaoBoard>
		 -->
		
		<view class="textCenter">暂无更多~</view>
		<view class="h200"></view>

		<!--无网络提示-->
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	let that;
	import salesJianBaoBoard from '@/components/dashBoard/salesJianBaoBoard/salesJianBaoBoard.vue';
	import SalesCustomerFunnel from '@/components/dashBoard/SalesCustomerFunnel/SalesCustomerFunnel.vue';
	import businessFunnel from '@/components/dashBoard/businessFunnel/businessFunnel.vue';
	import purchaseJianBaoBoard from '@/components/dashBoard/purchaseJianBaoBoard/purchaseJianBaoBoard.vue';
	import produceJianBaoBoard from '@/components/dashBoard/produceJianBaoBoard/produceJianBaoBoard.vue';
	import wwJianBaoBoard from '@/components/dashBoard/wwJianBaoBoard/wwJianBaoBoard.vue';
	import financeJianBaoBoard from '@/components/dashBoard/financeJianBaoBoard/financeJianBaoBoard.vue';
	import {
		crmMyAppUserApi,
		nameCardApi,
		baobiaoApi
	} from '@/utils/api.js'	
	import {
		getDayByNumFun,
		getDayFun,
		getMonthFun
	} from '@/utils/date.js'
	export default {
		components: {
			salesJianBaoBoard,
			purchaseJianBaoBoard,
			produceJianBaoBoard,
			wwJianBaoBoard,
			financeJianBaoBoard
		},
		data() {
			return {
				
				tabActve: 0,
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, #10a5e3)'
				},
				keyword: '',
				startDate: '',
				endDate: '',
				startDateTime: 0,
				endDateTime: 0,
				userInfo: {},
				depId: '',
				depName: '',
				department_id: '',
				fuZeRenId: '',
				fuZeRenName: '',
				bmSelectShow: false,
				userSelectShow: false,
				baoBiaoShow: false, //报表是否展示
				cardList: [
					{
						bgColor: 'linear-gradient(45deg, #007aff, #00aaff)',
						src: '/static/icon/client.png',
						name: '客户资料',
						url: '../../crm/client/client',
						menu_id: 'frmClient'
					},
					{
						bgColor: 'linear-gradient(45deg, #55aaff, #62dbff)',
						src: '/static/icon/genjin.png',
						name: '供方资料',
						url: '../../crm/supplier/supplier',
						menu_id: 'frmSupplier'
					},
					{
						bgColor: 'linear-gradient(45deg, #62dbff, #ff5aaa)',
						src: '/static/icon/business.png',
						name: '产品资料',
						url: '/chanpin/view/chanpin',
						menu_id: 'frmProduct'
					},
					{
						bgColor: 'linear-gradient(45deg, #00d6d6, #a0efef)',
						src: '/static/icon/baojiadan.png',
						name: '销售订单',
						url: '../../crm/salesorder/salesorder',
						menu_id: 'frmSellOrder'
					},
					{
						bgColor: 'linear-gradient(45deg, #ffaa00, #ffaa7f)',
						src: '/static/icon/contract.png',
						name: '采购订单',
						url: '../../crm/purorder/purorder',
						menu_id: 'frmPurOrder'
					}
				],
				depList: [],
				xsUserList: []
			}
		},
		onLoad() {
			that = this;
			uni.$userInfo = uni.getStorageSync('userInfo') || '';
			console.log('首页获取用户信息:'+uni.$userInfo.F_ID+uni.$userInfo.F_Name);
			let dArr = getMonthFun()			
			dArr[1] -= 1;
			that.startDateTime = dArr[0];
			that.endDateTime = dArr[1];
			that.startDate = this.$u.timeFormat(dArr[0], 'yyyy-mm-dd');
			that.endDate = this.$u.timeFormat(dArr[1], 'yyyy-mm-dd');
			if (!uni.$userInfo || !uni.$userInfo.F_ID) {
				console.log('判断用户信息:'+uni.$userInfo.F_ID+uni.$userInfo.F_Name+' 没有，退出');
				return
			}
			
			that.baoBiaoShow = true;
		},
		onShow() {		
			
			if (uni.$isLoginFun()) {
				that.getBacklogFun();
			}
		},
		methods: {
			swiperChange: function(e) {
				that.tabActve = e.detail.current;
			},
			skipPageFun: function (obj) {
				let url = obj.url;
				if(uni.$isLoginFun()) {
				
					let F_ID = uni.$userInfo.F_ID;
					let isHave = false;
					let reqObj = {
						
						F_ID: uni.$userInfo.F_ID,					
						menu_id: obj.menu_id,
						right_name: '可用'
					}
					let reqData = {
						action: 'testright',
						params: JSON.stringify(reqObj)
					}
					console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
					crmMyAppUserApi(reqData)
						.then(res => {
							
							let data = res.data.rows;
							let tag=res.data.tag;
							this.isHave=res.data.ishave;
							console.log(res.data.ishave)	
							console.log('isHave'+this.isHave)
							if(this.isHave) {
								
								uni.navigateTo({
									url
								})
							} else {
								uni.showModal({
									title: '提示',
									content: '暂无权限！',
									showCancel: false
								})
							}
						})
					
					
				}
			},
			skipDbPageFun: function(item) {
				if (uni.$isLoginFun()) {
				
					if (!item.num) {
						uni.showModal({
							title: '提示',
							content: '暂无待办数据哦！',
							showCancel: false
						})
					} else {
						uni.navigateTo({
							url: item.url
						})
					}
				}
			},
			bindsDateChange: function(e) {
				let data = e.detail.value;
				that.startDate = data;
				that.startDateTime = new Date(data + ' 00:00:00').getTime()
			},
			bindeDateChange: function(e) {
				let data = e.detail.value;
				that.endDate = data;
				that.endDateTime = new Date(data + ' 23:59:59').getTime()
			},
			getBacklogFun: function() {
												
				let dArr = getDayFun();
				let dArr1 = getDayByNumFun(-7);
				let dArr2 = getDayByNumFun(-30);
				let params={
						usercode:uni.$userInfo.F_ID,
						sTime: dArr[0],
						eTime: dArr[1],
						sTime1: dArr1[1],
						eTime1: dArr1[0],
						sTime2: dArr2[1],
						eTime2: dArr2[0]
					}
				let reqData = {
					action: 'getBacklogNum',
					params: JSON.stringify(params)
				}
				uni.showLoading({
					title: '刷新中...',
					mask: true
				})
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				baobiaoApi(reqData)
					.then(res => {
						let obj = res.data;
						console.log(res.data)
						console.log(res.data.hkTixing);
						let total = obj.thread + obj.client + obj.contact + obj.business + obj.quotation + obj.contract+ obj.hkjh
							+ obj.hkd + obj.daoqiContract + obj.hkTixing;
						if(total > 0) {
							if(total > 99) {
								total = '99+'
							}
							uni.setTabBarBadge({
								index: 1,
								text: total + ''
							})
						} else {
							uni.hideTabBarRedDot({
								index: 1
							})
						}
						// that.setMenuList(res.data)
					})
			},
		}
	}
</script>

<style>
	uni-page-body {
		height: 100%;
	}

	page {
		height: 100%;
	}

	.slot-wrap-left {
		height: 50px;
		line-height: 50px;
		padding: 0 26rpx;
		color: #FFFFFF;
		font-size: 18px;
		display: flex;
		align-items: center;
	}

	.slot-wrap-left>view {
		padding: 0 6rpx;
		margin-right: 26rpx;
		position: relative;
	}

	.activeTab {
		border-bottom: 3px solid #FFFFFF;
		font-weight: bold;
		font-size: 20px
	}

	.content {
		height: 100%;
		/* padding-bottom: 60rpx; */
	}

	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.swiperIndex {
		height: calc(100% - 50px);
	}

	.scroll-swiper {
		padding-bottom: 60rpx;
		height: 100%;
	}

	.scroll-collapes {
		background-color: #f5f5f5;
		padding: 0 26rpx;
		box-sizing: border-box;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 26rpx 26rpx 0;
	}

	.kongKimCard {
		width: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 26rpx;
	}

	.kongKimCard>view:first-child {
		width: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
	}

	.kongKimCard>view:first-child>image {
		width: 64rpx;
		height: 64rpx;
		margin: 18rpx;
	}

	.kongKimCard>view:last-child {
		text-align: center;
		font-size: 13px;
		font-weight: bold;
		margin-top: 8rpx;
	}

	.shoufengqin {
		width: 100%;
		padding: 0 26rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.shoufengqinIcon {
		width: 56rpx;
		height: 56rpx;
	}

	.tilte {
		font-size: 32rpx;
		font-weight: bold;
		margin: 32rpx 0 0 32rpx;
	}

	.dbCard {
		width: 686rpx;
		margin: 26rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26rpx 16rpx;
		border: 1rpx solid #DDDDDD;
		border-radius: 26rpx;
	}

	.dbCard:active {
		background-color: #DDDDDD;
	}

	.dbCard image {
		width: 50rpx;
		height: 50rpx;
	}

	.dbCard>view {
		display: flex;
		align-items: center;
	}

	.dbCard>view>text {
		margin: 0 16rpx;
	}

	.dbNum {
		font-size: 15px;
		color: #007AFF;
	}

	.dateSelectRow {
		margin: 0 32rpx;
		font-size: 15px;
		display: flex;
		justify-content: space-between;
	}

	.dateSelectRow>view {
		display: flex;
		align-items: center;
		padding: 26rpx 0 16rpx;
	}

	.dateText {
		font-weight: bold;
		padding-left: 10rpx;
	}
</style>
