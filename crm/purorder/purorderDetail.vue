<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--订单基本信息-->
			<purorderCard :item="khInfo" :isSelect="true" :djje="djje" :itemList="tabList[0].arr" :index="cardIndex" :priceRight="priceRight"
				:pagetype="'订单详情'" :product="tabList[0].arr"></purorderCard>
			<!--tab-->
			<view class="uTabsView">
				<u-tabs :list="tabList" :is-scroll="true" duration="0.08" :current="tabIndex" :show-bar="false"
					font-size="32" @change="tabChange"></u-tabs>
			</view>
			<!-- 自定义下拉刷新view -->
			<!-- <custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher> -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="contentView">

				<!--产品信息-->
				<view v-if="tabIndex == 0">
					<view v-for="(item, index) in tabList[0].arr" :key="index" @click="cardClick(item,index)">
						<purorderproduct :item="item" :index="selectIndex" :priceRight="priceRight" searchLabel1="下单数量" searchPh1="请输入下单数量"
							searchLabel2="产品售价" searchPh2="请输入产品售价"></purorderproduct>
					</view>
				</view>

				<!--加载更多-->
				<getMore :isMore="tabList[tabIndex].isMore"></getMore>
			</view>
		</z-paging>
		<!--搜索弹窗-->
		<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
			<view class="searchBox">
				<view class="searchTitle">输入订单信息</view>
				<view class="infoBox">
					<u-field v-model="khInfo.clientname" :label="'供方名称'" :placeholder="'请输入下单供方'" clear-size="40"
						class="clientBox"></u-field>
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
						:plain="true" size="medium" @click="selclientFun(khInfo)">选择供方</u-button>
				</view>
				<view class="dateBox">
					下单日期
					<picker mode="date" :value="khInfo.actdate" start="1999-02-15" end="2100-02-15"
						@change="bindsDateChange">
						<text class="dateText">{{actdate}}</text>
					</picker>
				</view>
				<view class="dateBox">
					交货日期
					<picker mode="date" :z-index="99999" :value="khInfo.enddate" start="1999-02-15" end="2100-02-15"
						@change="bindeDateChange">
						<text class="dateText">{{enddate}}</text>
					</picker>
				</view>
				
				<!-- <view @click="pickerSelectFun('结算货币')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">结算货币</text>
					<view  :class="khInfo.currency ? '' : 'cBlack'">
						{{khInfo.currency ? khInfo.currency : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view> -->
				<view @click="pickerSelectFun('付款方式')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">付款方式</text>
					<view  :class="khInfo.fkfs ? '' : 'cBlack'">
						{{khInfo.fkfs ? khInfo.fkfs : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				<view @click="pickerSelectFun('预计仓库')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">预计仓库</text>
					<view  :class="khInfo.ckmc ? '' : 'cBlack'">
						{{khInfo.ckmc ? khInfo.ckmc : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				<view @click="pickerSelectFun('运输方式')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">运输方式</text>
					<view  :class="khInfo.postcode ? '' : 'cBlack'">
						{{khInfo.postcode ? khInfo.postcode : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				<!-- <view @click="pickerSelectFun('业务员')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">业务员</text>
					<view  :class="khInfo.satrap ? '' : 'cBlack'">
						{{khInfo.satrap ? khInfo.satrap : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view> -->
				<view @click="pickerSelectFun('对应客户')" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">对应客户</text>
					<view  :class="khInfo.dykh ? '' : 'cBlack'">
						{{khInfo.dykh ? khInfo.dykh : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
				
				<!-- <u-field v-model="khInfo.hl" :label="'汇率'" :placeholder="'请输入汇率'" clear-size="40"></u-field>
				 -->
				<!-- <u-field v-model="khInfo.postcode" :label="'送货地址'" :placeholder="'请选择送货地址'" clear-size="40"></u-field> -->
				<u-field v-model="khInfo.bz" :label="'订单备注'" :placeholder="'请输入订单备注'" clear-size="40"></u-field>
				<view class="searchBtnRow">
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
						:plain="true" size="medium" @click="searchShow = false">取消</u-button>
					<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
						:plain="true" size="medium" @click="updateItemFun">确认</u-button>
				</view>
			</view>			
			<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		</u-popup>
	</view>
</template>

<script>
	let that = '';
	import {
		purorderApi,
		printApi,
		clientApi
	} from '@/utils/api.js'
	import {
		getDayFun
	} from '@/utils/date.js'
	import purorderCard from '@/components/purorder/purorder.vue'
	import purorderproduct from '@/components/purorder/purorderproduct.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import {
		callWithErrorHandling
	} from "vue";
	export default {
		components: {
			purorderCard,
			purorderproduct,
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
				tabList: [{
					name: '产品信息',
					arr: [],
					pageIndex: 1,
					isMore: false
				}, ],
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false,
				djje: 0,
				printer: '',
				actdate: '',
				enddate: '',
				currencyid: [],
				simpleid:[],
				ckmcid:[],
				fzrid:[],
				postcodeid:[],
				clientid:[],
				priceRight: false,
			}
		},
		onLoad(options) {

			console.log(options);
			that = this;
			
			that.cardIndex = +options.index;			
			if (that.cardIndex == -1) {
				let dArr = getDayFun()
				dArr[1] -= 1;

				that.khInfo = {
					F_BillID: '',
					clientcode: '',
					clientname: '',
					actdate: dArr[0],
					enddate: dArr[0],
					fkfs: '',
					postcode: '',
					account: 0,
					bz: '',
					hl: '',
				};
				that.actdate=this.$u.timeFormat(this.khInfo.actdate, 'yyyy-mm-dd hh:MM:ss'),
				that.enddate=this.$u.timeFormat(this.khInfo.enddate, 'yyyy-mm-dd hh:MM:ss'),
				uni.$purorderInfo = {};
			} else {
				that.khInfo = uni.$purorderInfo;
				that.khInfo.actdate = new Date(that.khInfo.actdate).getTime();
				that.khInfo.enddate = new Date(that.khInfo.enddate).getTime();
				that.actdate=this.$u.timeFormat(that.khInfo.actdate, 'yyyy-mm-dd hh:MM:ss');
				that.enddate=this.$u.timeFormat(that.khInfo.enddate, 'yyyy-mm-dd hh:MM:ss');
			}
			console.log(uni.$purorderInfo)

			if (uni.$purorderInfo) {
				that.djje = uni.$purorderInfo.account;
			}

			uni.setNavigationBarTitle({
				title: '订单详情'
			})

			uni.$on('delpurorderdetailById', that.delpurorderdetailById)
			uni.$on('updateItemFun1', that.updateItemFun)
			uni.$on("selectClient1", this.selectClient)
			uni.$on("selectPayment1", this.selectPayment)
			uni.$on("showSelect", this.showSelect)

			uni.$on("selectPrintfile1", this.selectPrintfile)
			uni.$on('inputcountFun', that.inputcountFun)
			uni.$on("itemBind", that.itemBind)
			uni.$on('refreshPurorderFun', that.refreshPurorderFun)
			
			that.getPurorderdetailFun();
			that.getCurrencyFun();
			that.getSimpleFun();
			that.getCkmcFun();
			that.getPostcodeFun();
			that.getFzrFun();
			that.getClientFun();
			that.getRightFun();
		},
		onBackPress(e) {
			uni.$off('delpurorderdetailById', that.delpurorderdetailById)
			uni.$off('updateItemFun1', that.updateItemFun)
			uni.$off("selectClient1", this.selectClient)
			uni.$off("selectPayment1", this.selectPayment)
			uni.$off("showSelect", this.showSelect)
			

			uni.$off("selectPrintfile1", this.selectPrintfile)
			uni.$off('inputcountFun', that.inputcountFun)
			uni.$off("itemBind", that.itemBind)
			uni.$off('refreshPurorderFun', that.refreshPurorderFun)
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
			getRightFun: function() {
				let reqObj = {
					model: 'frmPurOrder',
					usercode: uni.$userInfo.F_ID,
					name: '价格'
				}
				let reqData = {
					action: 'testRight',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				purorderApi(reqData)
					.then(res => {
						that.priceRight = res.data.right;
					})
			},
			bindsDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.actdate = data;
				this.khInfo.actdate = new Date(data + ' 00:00:00').getTime()
			
				//that.item.actdate =data;
			
			},
			bindeDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.enddate = data;
				that.khInfo.enddate = new Date(data + ' 23:59:59').getTime()
			
			},
			updateItemFun: function() {
				this.searchShow = false;
				this.khInfo = {
					...this.khInfo,
					rmb: this.khInfo.account * (this.khInfo.hl || 1)
				}
				console.log('bbb', JSON.stringify(that.khInfo));
			},
			// 选择客户函数
			selclientFun: function(e) {
				var that = this;			
				uni.navigateTo({
					url: './purorderselSupplier'
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
			// 查询贸易条款方法
			getCkmcFun: function() {
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
					action: 'getCkmc',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.ckmc = data[0].F_Name;								
							}
							that.ckmcid = data;
						} 
					})
			},
			getPostcodeFun: function() {
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
					action: 'getPostcode',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.postcode = data[0].F_Name;								
							}
							that.postcodeid = data;
						} 
					})
			},
			getFzrFun: function() {
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
					action: 'getFzr',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.fzr = data[0].F_Name;								
							}
							that.fzrid = data;
						} 
					})
			},
			getClientFun: function() {
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
					action: 'getClient',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.dykh = data[0].F_Name;								
							}
							that.clientid = data;
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
				if (str == '预计仓库') {
					let ckmcid = that.ckmcid;
					let arr = [];
					for (var i = 0; i < ckmcid.length; i++) {
						arr.push({
							value: ckmcid[i].F_ID,
							id: ckmcid[i].F_ID,
							label: ckmcid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '运输方式') {
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
				if (str == '业务员') {
					let fzrid = that.fzrid;
					let arr = [];
					for (var i = 0; i < fzrid.length; i++) {
						arr.push({
							value: fzrid[i].F_ID,
							id: fzrid[i].F_ID,
							label: fzrid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '对应客户') {
					let clientid = that.clientid;
					let arr = [];
					for (var i = 0; i < clientid.length; i++) {
						arr.push({
							value: clientid[i].F_ID,
							id: clientid[i].F_ID,
							label: clientid[i].F_Name
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
				if (that.selectType == '预计仓库') {
					that.khInfo.ckmc = e[0].label;					
				}
				if (that.selectType == '运输方式') {
					that.khInfo.postcode = e[0].label;					
				}
				if (that.selectType == '业务员') {
					that.khInfo.satrap = e[0].label;
				}
				if (that.selectType == '对应客户') {
					that.khInfo.dykh = e[0].label;
				}
			},
			showSelect: function() {
				that.searchShow = true;
			},
			// 通过下标更新list数据
			refreshPurorderFun: function(e) {
				that = this;
				that.khInfo = e.obj;
				console.log('传递过去的index：' + this.cardIndex)
				uni.$emit('updateListByIndex', {
					index: this.cardIndex,
					obj: e.obj
				})
			},
			itemBind(e) {

				this.tabList[0].arr = e.itemList
				this.djje = e.total
				this.khInfo.account = e.total
				this.khInfo.rmb = e.total * (this.khInfo.hl || 1)

			},
			selectClient(e) {
				this.khInfo.clientcode = e.item.F_ID
				this.khInfo.clientname = e.item.name
				this.khInfo.address = e.item.address
				this.khInfo.tel = e.item.tel
				this.khInfo.contactman = e.item.contactman
				this.khInfo.fax = e.item.fax
				this.khInfo.city = e.item.city
				this.khInfo.standard = e.item.standard
				this.khInfo.packing = e.item.packing
				this.khInfo.fkfs = e.item.simple
				this.khInfo.postcode = e.item.postcode
				this.khInfo.bz = e.item.bz				
				this.khInfo.satrap = e.item.fzr	
				this.khInfo.currency = e.item.currency	
			},
			selectPayment(e) {
				this.khInfo.fkfs = e.item.F_Name
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
						modelname: 'frmPurOrder',
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
			delpurorderdetailById: function(e) {
				var that = this;
				let hjje = 0;
				let arr = that.tabList[0].arr;
				arr.splice(e.index, 1);
				that.tabList[0].arr = arr;
				for (var i = 0; i < arr.length; i++) {
					hjje = +hjje + arr[i].account;
				}
				that.djje = hjje;
			},
			
			inputcountFun: function() {
				var that = this;
				let hjje = 0;
				let arr = that.tabList[0].arr;
				for (var i = 0; i < arr.length; i++) {
					hjje = +hjje + arr[i].account;
				}
				that.djje = hjje;
				console.log('合计：', hjje);

			},
			tabChange(index) {
				this.tabIndex = +index;
				let item = that.tabList[index];
				console.log(item)
				if (item.arr && item.arr.length > 0) {
					return
				}
				if (index == 0) {
					that.getPurorderdetailFun()
				}
			},
			scrollToBottomFun: function(e) {
				let index = that.tabIndex;
				let isMore = that.tabList[index].isMore;
				if (!isMore) {
					return
				}
				if (index == 1) {
					that.getPurorderdetailFun()
				}
			},
			// 获取订单详情记录
			getPurorderdetailFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let item = that.tabList[that.tabIndex];
				let params = {

					F_BillID: that.khInfo.F_BillID,
					pageIndex: item.pageIndex,
					pageSize: 20
				}
				let reqData = {
					action: 'selectPurorderdetail',
					params: JSON.stringify(params)
				}
				console.log('传递action' + reqData.action + ' 传递参数：' + reqData.params)
				purorderApi(reqData)
					.then(res => {
						that.setTabArrFun(res.data.rows, item)
					})
			},
			// 卡片点击方法
			cardClick: function(item, index) {
				this.selectIndex = 7
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './cpDetail'
				})
			},
			// 给tabList中的arr赋值
			setTabArrFun: function(data, item) {
				if (item.pageIndex == 1) {
					item.arr = [];
				}
				if (data.length >= 10) {
					item.pageIndex += 1;
					item.isMore = true;
				} else {
					item.isMore = false;
				}
				item.arr = item.arr.concat(data);
				that.$set(that.tabList, that.tabIndex, item)
			},


			recoverTabListFun: function() {
				that.isLoadSelectKhById = true;
				that.tabIndex = 0;
				that.tabList = [{
						name: '详细信息',
						isMore: false
					},
					{
						name: '产品信息',
						arr: [],
						pageIndex: 1,
						isMore: true
					},
				]
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