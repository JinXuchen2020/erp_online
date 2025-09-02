<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--盘点单基本信息-->
			<inventoryCard :item="khInfo" :isSelect="true" :djje="djje" :itemList="tabList[0].arr" :index="cardIndex"
				:pagetype="'盘点详情'" :product="tabList[0].arr"></inventoryCard>
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
						<inventoryproduct :item="item" :index="selectIndex" searchLabel1="下单数量" searchPh1="请输入下单数量"
							searchLabel2="产品售价" searchPh2="请输入产品售价"></inventoryproduct>
					</view>
				</view>

				<!--加载更多-->
				<getMore :isMore="tabList[tabIndex].isMore"></getMore>
			</view>
		</z-paging>

		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import {
		inventoryApi,
		printApi
	} from '@/utils/api.js'
	import {
		getDayFun
	} from '@/utils/date.js'
	import inventoryCard from '@/components/inventory/inventory.vue'	
	import inventoryproduct from '@/components/inventory/inventoryproduct.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import {
		callWithErrorHandling
	} from "vue";
	export default {
		components: {
			inventoryCard,		
			inventoryproduct,
			getMore
		},
		data() {
			return {
				selectList: [],
				selectShow: false,
				khInfo: {},
				selectIndex: -1,
				dataList: [],
				tabList: [{
						name: '产品信息',
						arr: [],
						pageIndex: 1,
						isMore: false
					}


				],
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false,
				djje: 0,
			}
		},
		onLoad(options) {

			console.log(options);
			that = this;
			//that.cardIndex = +options.index || -1;
			that.cardIndex = +options.index;
			console.log('cardindex为：' + that.cardIndex);
			if (that.cardIndex == -1) {
				let dArr = getDayFun()
				dArr[1] -= 1;

				that.khInfo = {
					F_BillID: '',
					clientcode: '',
					clientname: '',
					actdate: this.$u.timeFormat(dArr[0], 'yyyy-mm-dd'),
					enddate: this.$u.timeFormat(dArr[0], 'yyyy-mm-dd'),
					fkfs: '',
					ckmc:'',
					postcode: '',
					account: 0,
					bz: ''
				};
				uni.$inventoryInfo = {};
			} else {
				that.khInfo = uni.$inventoryInfo;
			}

			if (uni.$inventoryInfo) {
				that.djje = uni.$inventoryInfo.account;
			}

			uni.setNavigationBarTitle({
				title: '盘点详情'
			})

			uni.$on('delinventorydetailById', that.delinventorydetailById)
			uni.$on('updateItemFun1', that.updateItemFun)
			uni.$on("selectSupplier1", this.selectSupplier)
			uni.$on("selectPayment1", this.selectPayment)
			uni.$on("selectCkmc1", this.selectCkmc)
			uni.$on("selectPrintfile1", this.selectPrintfile)
			uni.$on('inputcountFun', that.inputcountFun)
			uni.$on("itemBind", that.itemBind)
			uni.$on('refreshInventoryFun', that.refreshInventoryFun)
			//if (that.isLoadSelectKhById) {
			//	that.selectKhByIdFun();
			//}
			that.getInventorydetailFun()
		},
		onBackPress(e) {
			uni.$off('delinventorydetailById', that.delinventorydetailById)
			uni.$off('updateItemFun1', that.updateItemFun)
			uni.$off("selectSupplier1", this.selectSupplier)
			uni.$off("selectPayment1", this.selectPayment)
			uni.$off("selectCkmc1", this.selectCkmc)
			uni.$off("selectPrintfile1", this.selectPrintfile)
			uni.$off('inputcountFun', that.inputcountFun)
			uni.$off("itemBind", that.itemBind)
			uni.$off('refreshInventoryFun', that.refreshInventoryFun)
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
			// 通过下标更新list数据
			refreshInventoryFun: function(e) {
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

			},
			selectSupplier(e) {
				this.khInfo.clientcode = e.item.F_ID
				this.khInfo.clientname = e.item.name
			},
			selectPayment(e) {
				this.khInfo.fkfs = e.item.F_Name
			},
			selectCkmc(e) {
				
				this.khInfo.ckmc = e.item.F_Name
			},
			selectPrintfile(e) {
				this.printer =uni.$userInfo.F_Printer;
				if(this.printer.length==0)
				{
					uni.showModal({
						title: '提示',
						content: '没有选择打印机',
						showCancel: false
					})
				}
				else
				{
					let params = {
						F_BillID: this.khInfo.F_BillID,
						usercode: uni.$userInfo.F_ID,
						modelname: 'frmCkpd',
						filename: e.item.F_ReportName,
						printer:this.printer,
						
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
			
			delinventorydetailById: function(e) {
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
			updateItemFun: function() {
				var that = this;
				let hjje = 0;
				let arr = that.tabList[0].arr;
				for (var i = 0; i < arr.length; i++) {
					hjje = +hjje + arr[i].account;
				}
				that.djje = hjje;
				console.log('合计：', hjje);

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
					that.getInventorydetailFun()
				}
			},
			scrollToBottomFun: function(e) {
				let index = that.tabIndex;
				let isMore = that.tabList[index].isMore;
				if (!isMore) {
					return
				}
				if (index == 1) {
					that.getInventorydetailFun()
				}
			},
			// 获取盘点详情记录
			getInventorydetailFun: function() {
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
					action: 'selectInventorydetail',
					params: JSON.stringify(params)
				}
				console.log('传递action' + reqData.action + ' 传递参数：' + reqData.params)
				inventoryApi(reqData)
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
</style>