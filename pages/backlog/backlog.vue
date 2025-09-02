<template>
	<view>
		<view v-for="(item, index) in menuList" :key="index" class="dbCard" @click="skipDbPageFun(item)">
			<view>
				<image v-if="item.icon" :src="item.icon" mode="aspectFill"></image>
				<u-icon v-if="item.icon1" :name="item.icon1" size="50" color="#007aff"></u-icon>
				<text>{{item.name}}</text>
			</view>
			<view>
				<text class="dbNum" :class="item.num > 0 ? 'redColor': ''">{{item.num}}</text>
				<u-icon color="#888888" name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	let that = '';
	import {
		crmMyAppUserApi,
		baobiaoApi
	} from '@/utils/api.js'
	import {
		getDayFun, getDayByNumFun
	} from '@/utils/date.js'
	import{
		siteURL
	} from '@/config.js'
	export default {
		data() {
			return {
				menuList: []
			}
		},
		onLoad() {
			that = this;
			that.setMenuList();
		},
		onShow() {
			if(uni.$isLoginFun()) {
			
				
				that.getBacklogFun();
			}
		},
		methods: {
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
						that.setMenuList(res.data)
					})
			},
			// 设置菜单列表
			setMenuList: function(obj) {
				if(!obj) {
					obj = {}
				}
				that.menuList = [
					{
						name: '今日待发货销售单',
						type: 'thread',
						num: obj.thread || 0,
						icon: siteURL+"/crm/shangji.png",
						url: '../../crm/salesorder/salesorder?jrdf=1',
						menu_id:'frmSellOrder'
					},
					{
						name: '今日待收货采购单',
						type: 'client',
						url: '../../crm/purorder/purorder?jrds=1',
						num: obj.client || 0,
						icon: siteURL+"/crm/purchase.png",
						menu_id: 'frmPurOrder'
					},
					{
						name: '延期未发销售单',
						type: 'contacts',
						num: obj.contact || 0,
						icon: siteURL+"/crm/retail.png",
						url: '../../crm/salesorder/salesorder?yqwf=1',
						menu_id:'frmSellOrder'
					},
					{
						name: '延期未收采购单',
						type: 'business',
						num: obj.business || 0,
						icon: siteURL+"/crm/receipt.png",
						url: '../../crm/purorder/purorder?yqws=1',
						menu_id: 'frmPurOrder'
					},
					// {
					// 	name: '今日待收货委外单',
					// 	type: 'quotation',
					// 	num: obj.quotation || 0,
					// 	icon: '../../static/crm/baojiadan.png',
					// 	url: '@/crm/baoJiaDan/baoJiaDan?next_gjDate=-1'
					// },
					// {
					// 	name: '延期未收委外单',
					// 	type: 'contract',
					// 	num: obj.contract || 0,
					// 	icon: '../../static/crm/hetong.png',
					// 	url: '@/crm/hetong/hetong?next_gjDate=-1'
					// },
					{
						name: '未审销售订单',
						type: 'hkjh',
						num: obj.hkjh || 0,
						icon: siteURL+"/crm/orderform.png",
						url: '../../crm/salesorder/salesorder?sh=0',
						menu_id:'frmSellOrder'
					},
					{
						name: '未审采购订单',
						type: 'hkTixing',
						num: obj.hkTixing || 0,
						icon: siteURL+"/crm/purchase.png",
						url: '../../crm/purorder/purorder?sh=0',
						menu_id: 'frmPurOrder'
					},
					{
						name: '未审销售发货单',
						type: 'hkd',
						num: obj.hkd || 0,
						icon: siteURL+"/crm/Warehousing.png",
						url: '../../crm/delivergds/delivergds?sh=0',
						menu_id: 'frmSellFh'
					},
					{
						name: '未审采购收货单',
						type: 'daoqiContract',
						num: obj.daoqiContract || 0,
						icon: siteURL+"/crm/Outbound.png",
						url: '../../crm/purin/purin?sh=0',
						menu_id: 'frmPurIn'
					},
				]
			},
			skipDbPageFun: function(obj) {
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
								console.log('有权限',url)
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
				// if(uni.$isLoginFun()) {
				
				// 	if(!item.num) {
				// 		uni.showModal({
				// 			title: '提示',
				// 			content: '今日暂无' + item.name +'数据！',
				// 			showCancel: false
				// 		})
				// 	} else {
				// 		uni.navigateTo({
				// 			url: item.url
				// 		})
				// 	}
				// }
			},
		}
	}
</script>

<style>
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
		font-size: 16px;
		color: #007AFF;
	}
</style>
