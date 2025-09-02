<template>
	<view>
		<view class="box" v-for="(item, index) in list" :key="index">
			<view class="tilte">{{item.name}}</view>
			<view class="cardList">
				<view class="card" v-for="(obj, iii) in item.arr" :key="iii" @click="skipPageFun(obj)">
					<image v-if="obj.img" :src="obj.img" mode="aspectFill"></image>
					<u-icon v-else :name="obj.icon" color="#007aff" size="68" class="iconClass"></u-icon>
					<view>{{obj.name}}</view>
				</view>
			</view>
		</view>
		<!--无网络提示-->
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import {
		crmMyAppUserApi,
		baobiaoApi
	} from '@/utils/api.js'
	import {
		getDayByNumFun,
		getDayFun,
		getMonthFun
	} from '@/utils/date.js'
	import{
		siteURL
	} from '@/config.js'
	export default {
		data() {
			return {
				list: [{
						name: '基础资料',
						arr: [{
								name: '客户资料',
								img: siteURL+"/crm/kehu.png",
								url: '../../crm/client/client',
								menu_id: 'frmClient'
							},
							{
								name: '供方资料',
								img: siteURL+"/crm/kehu1.png",
								url: '../../crm/supplier/supplier',
								menu_id: 'frmSupplier'
							},
							{
								name: '产品资料',
								img: siteURL+"/crm/chanpin1.png",
								url: '../../chanpin/view/chanpin',
								menu_id: 'frmProduct'
							},
							{
								name: '员工档案',
								img: siteURL+"/crm/employee.png",
								url: '../../crm/employee/employee',
								menu_id: 'frmEmp'
							},
						]
					},
					{
						name: '销售管理',
						arr: [
							{
								name: '客户PI',
								img: siteURL+"/crm/Production.png",
								url: '../../crm/PI/PI',
								menu_id: 'frmSellPI'
							},{
								name: '销售订单',
								img: siteURL+"/crm/shangji.png",
								url: '../../crm/salesorder/salesorder',
								menu_id: 'frmSellOrder'
							},
							{
								name: '样品销售',
								img: siteURL+"/crm/retail.png",
								url: '../../crm/spotsales/spotsales',
								menu_id: 'frmSellOrderYp'
							},
							{
								name: '销售发货',
								img: siteURL+"/crm/orderform.png",
								url: '../../crm/delivergds/delivergds',
								menu_id: 'frmSellFh'
							},
							{
								name: '现货销售',
								img: siteURL+"/crm/worksheet.png",
								url: '../../crm/xhxs/xhxs',
								menu_id: 'frmSellXh'
							},
							
							{
								name: '销售退货',
								img: siteURL+"/crm/salesreturns.png",
								url: '../../crm/salesreturn/salesreturn',
								menu_id: 'frmSellTh'
							},
						]
					},
					{
						name: '采购管理',
						arr: [{
								name: '量产采购',
								img: siteURL+"/crm/purchase.png",
								url: '../../crm/purorder/purorder',
								menu_id: 'frmPurOrder'
							},{
								name: '样品采购',
								img: siteURL+"/crm/finished.png",
								url: '../../crm/ypcg/ypcg',
								menu_id: 'frmPurOrderYp'
							},
							{
								name: '量产质检',
								img: siteURL+"/crm/Outsourced.png",
								url: '../../crm/cgzj/cgzj',
								menu_id: 'frmPurQc'
							},
							{
								name: '样品质检',
								img: siteURL+"/crm/rtnmt.png",
								url: '../../crm/ypzj/ypzj',
								menu_id: 'frmPurQcYp'
							},
							{
								name: '采购收货',
								img: siteURL+"/crm/receipt.png",
								url: '../../crm/cgsh/cgsh',
								menu_id: 'frmPurIn'
							},
							{
								name: '现货采购',
								img: siteURL+"/crm/cashpurchase.png",
								url: '../../crm/xhcg/xhcg',
								menu_id: 'frmPurXh'
							},
							{
								name: '采购退货',
								img: siteURL+"/crm/purchasereturn.png",
								url: '../../crm/cgth/cgth',
								menu_id: 'frmPurTh'
							},
						]
					},
					{
						name: '仓库管理',
						arr: [{
								name: '仓库盘点',
								img: siteURL+"/crm/Inventory.png",
								url: '../../crm/inventory/inventory',
								menu_id: 'frmCkpd'
							},
							{
								name: '物资入库',
								img: siteURL+"/crm/Warehousing.png",
								url: '../../crm/warehs/warehs',
								menu_id: 'frmWzrk'
							},
							{
								name: '物资出库',
								img: siteURL+"/crm/Outbound.png",
								url: '../../crm/outbound/outbound',
								menu_id: 'frmWzck'
							},
							{
								name: '仓库调拨',
								img: siteURL+"/crm/allocate.png",
								url: '../../crm/allocation/allocation',
								menu_id: 'frmCkdb'
							},
							{
								name: '库存查看',
								img: siteURL+"/crm/warehouse.png",
								url: '../../crm/merchandise/merchandise',
								menu_id: 'warehouse'
							},
						]
					},
					// {
					// 	name: '生产管理',
					// 	arr: [{
					// 			name: '物料清单',
					// 			img: siteURL+"/crm/BOM.png",
					// 			url: '../../crm/bom/bom',
					// 			menu_id: 'frmBom'
					// 		},
					// 		{
					// 			name: '生产计划',
					// 			img: siteURL+"/crm/Production.png",
					// 			url: '../../crm/prdplan/prdplan',
					// 			menu_id: 'frmScjh'
					// 		},
					// 		{
					// 			name: '生产领料',
					// 			img: siteURL+"/crm/worksheet.png",
					// 			url: '../../crm/prdmr/prdmr',
					// 			menu_id: 'frmScll'
					// 		},
					// 		{
					// 			name: '生产任务',
					// 			img: siteURL+"/crm/Production.png",
					// 			url: '../../crm/prdtask/prdtask',
					// 			menu_id: 'frmScrw'
					// 		},
					// 		{
					// 			name: '完工登记',
					// 			img: siteURL+"/crm/Production.png",
					// 			url: '../../crm/prdfin/prdfin',
					// 			menu_id: 'frmScrwWgdj'
					// 		},
					// 		{
					// 			name: '生产入库',
					// 			img: siteURL+"/crm/finished.png",
					// 			url: '../../crm/prdwh/prdwh',
					// 			menu_id: 'frmCprk'
					// 		},
					// 	]
					// },
					// {
					// 	name: '委外管理',
					// 	arr: [{
					// 			name: '委外下单',
					// 			img: siteURL+"/crm/subcontract.png",
					// 			url: '../../crm/subcontract/subcontract',
					// 			menu_id: 'frmWwxd'
					// 		},
					// 		{
					// 			name: '委外入库',
					// 			img: siteURL+"/crm/Outsourced.png",
					// 			url: '../../crm/otswh/otswh',
					// 			menu_id: 'frmWwsh'
					// 		},
					// 		{
					// 			name: '委外退货',
					// 			img: siteURL+"/crm/rework.png",
					// 			url: '../../crm/otsrt/otsrt',
					// 			menu_id: 'frmWwth'
					// 		},
					// 		{
					// 			name: '委外退料',
					// 			img: siteURL+"/crm/rtnmt.png",
					// 			url: '../../crm/otsrm/otsrm',
					// 			menu_id: 'frmWwth'
					// 		},
					// 	]
					// },
					{
						name: '财务管理',
						arr: [{
								name: '银行期初',
								img: siteURL+"/crm/bank.png",
								url: '../../crm/bank/bank',
								menu_id: 'frmIniBank'
							},
							{
								name: '销售收款',
								img: siteURL+"/crm/Collection.png",
								url: '../../crm/accept/accept',
								menu_id: 'frmSellAcceptList'
							},
							{
								name: '采购付款',
								img: siteURL+"/crm/payment.png",
								url: '../../crm/pay/pay',
								menu_id: 'frmStockPayList'
							},
							{ name: '费用支付', img: siteURL+"/crm/Journal.png", url: '../../crm/fybx/fybx', menu_id: 'frmSellBx' },
							{ name: '应收款账簿', img: siteURL+"/crm/receivables.png", url: '../../crm/receivables/receivables', menu_id: 'receivables' },
							{ name: '应付款账簿', img: siteURL+"/crm/payable.png", url: '../../crm/payable/payable', menu_id: 'payable' },
						]
					},
					{
						name: '报表管理',
						arr: [{
								name: '客户销售报表',
								img: siteURL+"/crm/khxsbb.png",
								url: '../../crm/clientsreport/clientsreport',
								menu_id: 'frmClientReport1'
							},
							{
								name: '产品销售报表',
								img: siteURL+"/crm/cpxsbb.png",
								url: '../../crm/prdsreport/prdsreport',
								menu_id: 'frmItemSellReport1'
							},
							{
								name: '客户发货报表',
								img: siteURL+"/crm/khfhbb.png",
								url: '../../crm/clientdreport/clientdreport',
								menu_id: 'frmClientReport'
							},
							{ name: '产品发货报表', img: siteURL+"/crm/cpfhbb.png", url: '../../crm/prddreport/prddreport', menu_id: 'frmItemSellReport' },
							{ name: '供方采购报表', img: siteURL+"/crm/gfcgbb.png", url: '../../crm/supsreport/supsreport', menu_id: 'frmSupplierReport1' },
							{ name: '产品采购报表', img: siteURL+"/crm/cpcgbb.png", url: '../../crm/prdpreport/prdpreport', menu_id: 'frmItemStockReport1' },
							{ name: '供方收货报表', img: siteURL+"/crm/gfshbb.png", url: '../../crm/supdreport/supdreport', menu_id: 'frmSupplierReport' },
							{ name: '产品收货报表', img: siteURL+"/crm/cpshbb.png", url: '../../crm/prdrreport/prdrreport', menu_id: 'frmItemStockReport' },
						]
					},
				]
			}
		},
		onShow() {
			if (uni.$isLoginFun()) {

				this.getBacklogFun();
			}
		},
		methods: {
			skipPageFun: function(obj) {
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
			// 获取待办数据
			getBacklogFun: function() {
				let that = this;
				let user = uni.$userInfo || null;
				let obj = {}
				if (user.isDepManager == 1) {
					obj.depId = user.depId;
				} else {
					obj.fuZeRenId = user.id;
				}
				let dArr = getDayFun();
				let dArr1 = getDayByNumFun(-7);
				let dArr2 = getDayByNumFun(-30);
				let params = {
					fuZeRenId: obj.fuZeRenId,
					depId: obj.depId,
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
				baobiaoApi(reqData)
					.then(res => {
						let obj = res.data;
						let total = obj.thread + obj.client + obj.contact + obj.business + obj.quotation + obj
							.contract + obj.hkjh +
							obj.hkd + obj.daoqiContract + obj.hkTixing;
						if (total > 0) {
							if (total > 99) {
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
					})
			},
		}
	}
</script>

<style>
	page {
		padding-bottom: 100rpx;
	}

	.box {
		box-sizing: border-box;
		border-radius: 16rpx;
		width: 686rpx;
		margin: 32rpx;
		padding: 26rpx;
		box-shadow: #dddddd 0px 0px 32rpx;
	}

	.tilte {
		font-size: 32rpx;
		font-weight: bold;
	}

	.cardList {
		margin-top: 26rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.card {
		font-size: 28rpx;
		width: 159rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 32rpx;
	}

	.card>image {
		width: 68rpx;
		height: 68rpx;
		margin-bottom: 6rpx;
	}

	.iconClass {
		margin-bottom: 6rpx;
	}
</style>