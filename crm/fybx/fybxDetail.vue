<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--付款基本信息-->
			<fybxCard :item="khInfo" :isSelect="true" :djje="djje" :kjje="kjje" :F_Tax="F_Tax" :F_Total="F_Total" 
				:index="cardIndex" :pagetype="'付款详情'" ></fybxCard>
			
			
			
		</z-paging>

		<!--搜索弹窗-->
		<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
			<view class="searchBox">
				<view class="searchTitle">输入付款信息</view>
				<view class="dateBox">
					付款日期
					<picker mode="date" :value="khInfo.actdate" start="1999-02-15" end="2100-02-15"
						@change="bindsDateChange">
						<text class="dateText">{{actdate}}</text>
					</picker>
				</view>
				<view class="infoBox">
					<u-field v-model="khInfo.gfmc" :label="'供方名称'" :placeholder="'请输入供应商'" clear-size="40"
						class="clientBox"></u-field>
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="selclientFun(khInfo)">选择供方</u-button>
				</view>
				<view class="infoBox">
					<u-field v-model="khInfo.dykh" :label="'对应客户'" :placeholder="'请输入对应客户'" clear-size="40"
						class="clientBox"></u-field>
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="seldykhFun(khInfo)">选择客户</u-button>
				</view>
				<view @click="pickerSelectFun('费用类型')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">费用类型</text>
					<view :class="khInfo.F_KindName ? '' : 'cBlack'">
						{{khInfo.F_KindName ? khInfo.F_KindName : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				<u-field v-model="khInfo.skr" :label="'收款人'" :placeholder="'请输入收款人'" clear-size="40"></u-field>
				<view class="infoBox">
					<u-field v-model="khInfo.ysid" :label="'出货单号'" :placeholder="'请输入对应客户'" clear-size="40"
						class="clientBox"></u-field>
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="selysidFun(khInfo)">选择出货单</u-button>
				</view>
				<view @click="pickerSelectFun('收款账户')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">付款账户</text>
					<view :class="khInfo.fkzh ? '' : 'cBlack'">
						{{khInfo.fkzh ? khInfo.fkzh : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				<u-field v-model="khInfo.skzy" :label="'费用摘要'" :placeholder="'请输入摘要'" clear-size="40"></u-field>
				<view @click="pickerSelectFun('业务经手人')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">业务经手人</text>
					<view :class="khInfo.satrap ? '' : 'cBlack'">
						{{khInfo.satrap ? khInfo.satrap : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				<view @click="pickerSelectFun('结算货币')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">结算货币</text>
					<view :class="khInfo.currency ? '' : 'cBlack'">
						{{khInfo.currency ? khInfo.currency : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				
				<view @click="pickerSelectFun('付款方式')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">付款方式</text>
					<view :class="khInfo.fkfs ? '' : 'cBlack'">
						{{khInfo.fkfs ? khInfo.fkfs : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				
				<view @click="pickerSelectFun('现金流量项目')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">现金流量项目</text>
					<view :class="khInfo.F_Xjll ? '' : 'cBlack'">
						{{khInfo.F_Xjll ? khInfo.F_Xjll : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>				
				
				<u-field v-model="khInfo.hl" :label="'汇率'" :placeholder="'请输入汇率'" clear-size="40"></u-field>
				<u-field v-model="khInfo.account" :label="'应付金额'" :placeholder="'请输入应付金额'" clear-size="40"></u-field>
				<u-field v-model="khInfo.ssje" :label="'扣减金额'" :placeholder="'请输入扣减金额'" clear-size="40"></u-field>
				<u-field v-model="khInfo.F_Bank1" :label="'银行账号1'" :placeholder="'请输入银行账号'" clear-size="40"></u-field>
				<u-field v-model="khInfo.F_Bank2" :label="'银行账号2'" :placeholder="'请输入银行账号'" clear-size="40"></u-field>
                <!-- <u-field v-model="khInfo.postcode" :label="'送货地址'" :placeholder="'请选择送货地址'" clear-size="40"></u-field> -->
				<u-field v-model="khInfo.bz" :label="'付款备注'" :placeholder="'请输入订单备注'" clear-size="40"></u-field>
				<view class="searchBtnRow">
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="searchShow = false">取消</u-button>
					<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="updateItemFun">确认</u-button>
				</view>
			</view>
			<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		</u-popup>
	</view>
</template>

<script>
	let that = '';
	import {
		fybxApi,
		printApi,
		clientApi
	} from '@/utils/api.js'
	import {
		getDayFun
	} from '@/utils/date.js'
	import fybxCard from '@/components/fybx/fybx.vue'	
	import getMore from '@/components/getMore/getMore.vue'
	import {
		callWithErrorHandling
	} from "vue";
	export default {
		components: {
			fybxCard,			
			getMore
		},
		data() {
			return {
				selectList: [],
				selectShow: false,
				searchShow: false,
				khInfo: {},
				selectIndex: -1,
				dataList: [],
				
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false,
				djje: 0,
				kjje: 0,
				F_Tax:0,
				F_Total:0,
				actdate: '',
				currencyid: [],
				simpleid: [],
				tradeid: [],
				fzrid: [],
				postcodeid: [],
				kindid: [],
				dykhid: [],
				kindid: [],
				satrapid:[]
			}
		},
		onLoad(options) {

			console.log(options);
			that = this;
			
			that.cardIndex = +options.index;
			console.log('cardindex为：' + that.cardIndex);
			if (that.cardIndex == -1) {
				let dArr = getDayFun()
				dArr[1] -= 1;

				that.khInfo = {
					F_BillID: '',
					clientcode: '',
					clientname:'',
					dykh:'',
					gfmc: '',
					ysid:'',
					satrap:'',
					F_KindName: '',
					skr:'',
					fszh:'',
					fkzh:'',
					skzy:'',
					currency:'',
					fkfs:'',
					F_Xjll:'',					
					bz:'',
					actdate: dArr[0],
					account:0,
					ssje1:0,
					ssje:0,
					hl:1,
					rmb:0,
					F_Bank1:'',
					F_Bank2:''
				};
				that.actdate = this.$u.timeFormat(this.khInfo.actdate, 'yyyy-mm-dd hh:MM:ss'),
					uni.$fybxInfo = that.khInfo;
				console.log('注意：是新增')
			} else {
				console.log('注意：是修改')
				that.khInfo = uni.$fybxInfo;
				that.khInfo.actdate = new Date(that.khInfo.actdate).getTime();
				that.actdate = this.$u.timeFormat(that.khInfo.actdate, 'yyyy-mm-dd hh:MM:ss');
			}
console.log('注意：继续load')
			if (uni.$fybxInfo) {
				that.djje = uni.$fybxInfo.F_Money;
				that.kjje = uni.$fybxInfo.F_DisMoney;
				that.F_Tax = uni.$fybxInfo.F_Tax;
				that.F_Total = uni.$fybxInfo.F_Total;
			}

			uni.setNavigationBarTitle({
				title: '付款详情'
			})

			
			uni.$on('updateItemFun1', that.updateItemFun)
			uni.$on("selectClient1", this.selectClient)
			uni.$on("selectDykh", this.selectDykh)
			uni.$on("selectYsid", this.selectYsid)			
			uni.$on("showSelect", this.showSelect)
			uni.$on("selectPrintfile1", this.selectPrintfile)			
			
			uni.$on('refreshFybxFun', that.refreshFybxFun)
			//if (that.isLoadSelectKhById) {
			//	that.selectKhByIdFun();
			//}
			
			that.getCurrencyFun();
			that.getSimpleFun();
			that.getYhzhFun();
			that.getXjllFun();			
			that.getKindFun();
			that.getSatrapFun();
			
		},
		onBackPress(e) {
			
			uni.$off('updateItemFun1', that.updateItemFun)
			uni.$off("selectClient1", this.selectClient)
			uni.$off("selectDykh", this.selectDykh)
			uni.$off("selectYsid", this.selectYsid)			
			uni.$off("showSelect", this.showSelect)
			uni.$off("selectPrintfile1", this.selectPrintfile)	
			uni.$off('refreshFybxFun', that.refreshFybxFun)
			if (e.from == 'backbutton' && this.cardIndex != -1) {
				uni.$emit('updateListByIndex', {
					index: this.cardIndex,
					obj: this.khInfo
				})
			}
		},
		onShow() {

		},
		methods: {
			bindsDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.actdate = data;
				this.khInfo.actdate = new Date(data + ' 00:00:00').getTime()
			},

			updateItemFun: function() {
				this.searchShow = false;
				this.khInfo = {
					...this.khInfo,
					rmb: this.khInfo.ssje1 * (this.khInfo.hl || 1)
				}

			},
			// 选择客户函数
			selclientFun: function(e) {
				var that = this;
				uni.navigateTo({
					url: './fybxselClient'
				})
			},
			// 选择对应客户函数
			seldykhFun: function(e) {
				var that = this;
				uni.navigateTo({
					url: './fybxselDykh'
				})
			},
			// 选择出货单函数
			selysidFun: function(e) {
				var that = this;
				uni.navigateTo({
					url: './fybxselYsid'
				})
			},
			// 查询结算货币方法
			getCurrencyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					matchObj: {
						isShow: true
					}
				}
				let reqData = {
					action: 'getCurrency',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.currency = data[0].F_Name;
							}
							that.currencyid = data;
						}

						uni.hideLoading();
					})
			},
			getSimpleFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					matchObj: {
						isShow: true
					}
				}
				let reqData = {
					action: 'getSimple',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.simple = data[0].F_Name;
							}
							that.simpleid = data;
						}
					})
			},
			// 查询收款账户方法
			getYhzhFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					matchObj: {
						isShow: true
					}
				}
				let reqData = {
					action: 'getYhzh',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.trade = data[0].F_Name;
							}
							that.tradeid = data;
						}
					})
			},
			getXjllFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					matchObj: {
						isShow: true
					}
				}
				let reqData = {
					action: 'getXjll',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.F_Xjll = data[0].F_Name;
							}
							that.postcodeid = data;
						}
					})
			},
			getDykhFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					matchObj: {
						isShow: true
					},
					gys:this.khInfo.clientcode,
				}
				let reqData = {
					action: 'getDykh',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				fybxApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.dykh = data[0].F_Name;
							}
							that.dykhid = data;
						}
					})
			},
			
			getKindFun: function() {
							uni.showLoading({
								title: '加载中...',
								mask: true
							})
							let params = {
								matchObj: {
									isShow: true
								},
								gys:this.khInfo.clientcode,
							}
							let reqData = {
								action: 'getKind',
								params: JSON.stringify(params)
							}
							console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
							fybxApi(reqData)
								.then(res => {
									let data = res.data.rows;
									if (data && data.length > 0) {
										if (that.pageType != 'update') {
											that.F_KindName = data[0].F_Name;
										}
										that.kindid = data;
									}
								})
						},
			getSatrapFun: function() {
							uni.showLoading({
								title: '加载中...',
								mask: true
							})
							let params = {
								matchObj: {
									isShow: true
								},
								gys:this.khInfo.clientcode,
							}
							let reqData = {
								action: 'getSatrap',
								params: JSON.stringify(params)
							}
							console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
							fybxApi(reqData)
								.then(res => {
									let data = res.data.rows;
									if (data && data.length > 0) {
										if (that.pageType != 'update') {
											that.satrap = data[0].F_Name;
										}
										that.satrapid = data;
									}
								})
						},
			pickerSelectFun: function(str) {
				if (str == '结算货币') {
					let currencyid = that.currencyid;
					let arr = [];
					for (var i = 0; i < currencyid.length; i++) {
						arr.push({
							value: currencyid[i].F_ID,
							id: currencyid[i].F_ID,
							label: currencyid[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '付款方式') {
					let simpleid = that.simpleid;
					let arr = [];
					for (var i = 0; i < simpleid.length; i++) {
						arr.push({
							value: simpleid[i].F_ID,
							id: simpleid[i].F_ID,
							label: simpleid[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '收款账户') {
					let tradeid = that.tradeid;
					let arr = [];
					for (var i = 0; i < tradeid.length; i++) {
						arr.push({
							value: tradeid[i].F_ID,
							id: tradeid[i].F_ID,
							label: tradeid[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '现金流量项目') {
					let postcodeid = that.postcodeid;
					let arr = [];
					for (var i = 0; i < postcodeid.length; i++) {
						arr.push({
							value: postcodeid[i].F_ID,
							id: postcodeid[i].F_ID,
							label: postcodeid[i].F_Name
						})
					}
					that.selectList = arr;
				}				
				if (str == '费用类型') {
					let kindid = that.kindid;
					let arr = [];
					for (var i = 0; i < kindid.length; i++) {
						arr.push({
							value: kindid[i].F_ID,
							id: kindid[i].F_ID,
							label: kindid[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '业务经手人') {
					let satrapid = that.satrapid;
					let arr = [];
					for (var i = 0; i < satrapid.length; i++) {
						arr.push({
							value: satrapid[i].F_ID,
							id: satrapid[i].F_ID,
							label: satrapid[i].F_Name
						})
					}
					that.selectList = arr;
				}
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				if (that.selectType == '结算货币') {
					that.khInfo.currency = e[0].label;
				}
				if (that.selectType == '付款方式') {
					that.khInfo.fkfs = e[0].label;
				}
				if (that.selectType == '收款账户') {
					that.khInfo.fkzh = e[0].label;
				}
				if (that.selectType == '现金流量项目') {
					that.khInfo.F_Xjll = e[0].label;
				}				
				
				if (that.selectType == '业务经手人') {
					that.khInfo.satrap = e[0].label;
				}
				if (that.selectType == '费用类型') {
					that.khInfo.F_KindName = e[0].label;
				}
			},
			showSelect: function() {
				that.searchShow = true;
			},
			// 通过下标更新list数据
			refreshFybxFun: function(e) {
				that = this;
				that.khInfo = e.obj;
				console.log('传递过去的index：' + this.cardIndex)
				uni.$emit('updateListByIndex', {
					index: this.cardIndex,
					obj: e.obj
				})
			},
			
			selectClient(e) {

				this.khInfo.clientcode = e.item.F_ID
				this.khInfo.gfmc = e.item.name
				this.khInfo.currency = e.item.currency		
				
			},
			selectDykh(e) {
			
				this.khInfo.clientname = e.item.F_ID
				this.khInfo.dykh = e.item.name
				
			},
			selectYsid(e) {
			
				this.khInfo.ysid = e.item.F_BillID
				
			},			
			selectPrintfile(e) {
				this.printer = uni.$userInfo.F_Printer;
				if (this.printer.length == 0) {
					uni.showModal({
						title: '提示',
						content: '没有选择打印机',
						showCancel: false
					})
				} else {
					let params = {
						F_BillID: this.khInfo.F_BillID,
						usercode: uni.$userInfo.F_ID,
						modelname: 'frmSellBx',
						filename: e.item.F_ReportName,
						printer: this.printer,

					}
					let reqData = {
						action: 'previewreport',
						params: JSON.stringify(params)
					}
					printApi(reqData)
						.then(res => {
							console.log('查看结果' + res.data.msg)
							let code = res.data.code;
							let that = this;
							let showTitle = res.data.tag
							uni.showModal({
								title: '提示',
								content: showTitle,
								showCancel: false
							})

						})
				}
			},

			
			
			
			
			
			
			

			cxPGetDataFun: function(e) {
				uni.showToast({
					title: e + 'i',
					duration: 1000,
					icon: 'none',
					mask: true
				})
				uni.$emit('cxGetDataFun');
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
			}
		}
	}
</script>

<style>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */

	/*如果有scoped，page的css设置建议放在App.vue中 */
	page {
		height: 100%;
		background-color: #F8F8F8;
	}

	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
	}

	.uTabsView {
		border-bottom: 1rpx solid #DDDDDD;
		z-index: 100;
		position: sticky;
		top: 0;
	}

	.contentView {
		/* background-color: #FFFFFF; */
		min-height: calc(100vh - 45px);
	}

	.flexRow {
		display: flex;
		font-size: 30rpx;
		margin-bottom: 8rpx;
	}

	.flexRow>view {
		width: 50%;
		display: flex;
	}

	.flexRow>view>text:first-child {
		width: 166rpx;
	}

	.item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}

	.uTabsView {
		top: -2px !important;
	}

	.width100 {
		width: 100%;
		margin: 26rpx 0;
	}

	.u-steps__item,
	.u-steps__item--row {
		width: 200px !important;
	}
	.rowBtn {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 26rpx 16rpx 16rpx 0;
		justify-content: space-between;
	}
	
	.card {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
	}
	
	.genjinBtn {
		position: absolute;
		right: 26rpx;
		top: 26rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding: 6rpx 16rpx;
		border-radius: 6rpx;
		font-size: 14px;
	}
	
	.genjinBtn:active {
		background-color: #13B8FF;
	}
	
	.topRow1 {
		margin-bottom: 16rpx;
		font-size: 15px;
		color: #000;
		position: relative;
	}
	
	.name {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}
	
	.bottomRow {
		width: 100%;
		padding-top: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #f0f0f0;
		font-size: 15px;
		color: #007AFF;
	}
	
	.lxRow {
		display: flex;
		align-items: center;
	}
	
	.lxRow>image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 26rpx;
	}
	
	.bqRow {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	
	.bqRow>text {
		font-size: 14px;
		color: #888888;
	}
	
	.bqRow>view {
		padding: 6rpx 16rpx;
		font-size: 14px;
		background-color: rgba(255, 85, 127, 0.1);
		color: #ff5500;
		border-radius: 10rpx;
		margin: 6rpx 26rpx 20rpx 0;
	}
	
	.khJieDuan {
		position: absolute;
		right: 0;
		top: 50rpx;
		font-weight: bold;
	}
	
	.khType {
		position: absolute;
		right: 0;
		top: 72rpx;
		font-weight: bold;
	}
	
	.searchBox {
		padding: 16rpx 26rpx;
	}
	
	.searchTitle {
		width: 100%;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		padding-bottom: 16rpx;
	}
	
	.searchBtnRow {
		margin: 26rpx 0 16rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.searchBtn {
		width: 200rpx;
		height: 66rpx;
	}
	
	.dateText {
		display: block;
		width: 450rpx;
		/* font-weight: bold; */
		padding-left: 26rpx;
	}
	
	.dateBox {
		padding-left: 26rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		height: 86rpx;
	}
	
	.infoBox {
	
		// padding-left: 26rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		height: 86rpx;
		justify-content: space-between;
		
	}
</style>