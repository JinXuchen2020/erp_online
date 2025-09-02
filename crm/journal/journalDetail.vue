<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--日记账基本信息-->
			<journalCard :item="khInfo" :isSelect="true" :djje="djje" :kjje="kjje" 
				:index="cardIndex" :pagetype="'日记账详情'" ></journalCard>
			
			
		</z-paging>

		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import {
		journalApi,
		printApi
	} from '@/utils/api.js'
	import {
		getDayFun
	} from '@/utils/date.js'
	import journalCard from '@/components/journal/journal.vue'
	import getMore from '@/components/getMore/getMore.vue'
	import {
		callWithErrorHandling
	} from "vue";
	export default {
		components: {
			journalCard,
			getMore
		},
		data() {
			return {
				selectList: [],
				selectShow: false,
				khInfo: {},
				selectIndex: -1,
				dataList: [],				
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false,
				djje: 0,
				kjje: 0,
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
					F_ClientID: '',
					F_ClientName: '',
					F_Date: this.$u.timeFormat(dArr[0], 'yyyy-mm-dd'),
					f_bankid: '',
					f_bank: '',
					F_AcceptType: '',
					F_Money: 0,
					F_DisMoney:0,
					F_Remark: ''
				};
				uni.$journalInfo = that.khInfo;
				console.log('注意：是新增')
			} else {
				console.log('注意：是修改')
				that.khInfo = uni.$journalInfo;
			}

			if (uni.$journalInfo) {
				that.djje = uni.$journalInfo.F_Money;
				that.kjje = uni.$journalInfo.F_DisMoney;
			}

			uni.setNavigationBarTitle({
				title: '日记账详情'
			})

			uni.$on('deljournaldetailById', that.deljournaldetailById)
			uni.$on('updateItemFun1', that.updateItemFun)
			uni.$on("selectClient1", this.selectClient)
			uni.$on("selectBank1", this.selectBank)
			uni.$on("selectPrintfile1", this.selectPrintfile)
			uni.$on('inputcountFun', that.inputcountFun)
			uni.$on("itemBind", that.itemBind)
			uni.$on('refreshJournalFun', that.refreshJournalFun)
			//if (that.isLoadSelectKhById) {
			//	that.selectKhByIdFun();
			//}
			
		},
		onBackPress(e) {
			uni.$off('deljournaldetailById', that.deljournaldetailById)
			uni.$off('updateItemFun1', that.updateItemFun)
			uni.$off("selectClient1", this.selectClient)
			uni.$off("selectBank1", this.selectBank)
			uni.$off("selectPrintfile1", this.selectPrintfile)
			uni.$off('inputcountFun', that.inputcountFun)
			uni.$off("itemBind", that.itemBind)
			uni.$off('refreshJournalFun', that.refreshJournalFun)
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
			refreshJournalFun: function(e) {
				that = this;
				that.khInfo = e.obj;
				console.log('传递过去的index：' + this.cardIndex)
				uni.$emit('updateListByIndex', {
					index: this.cardIndex,
					obj: e.obj
				})
			},
			itemBind(e) {

				
			},
			selectClient(e) {

				this.khInfo.F_ClientID = e.item.F_ID
				this.khInfo.F_ClientName = e.item.name
				console.log('赋值客户编号：', this.khInfo.F_ClientID)
			},
			selectBank(e) {
				this.khInfo.f_bankid = e.item.Aid
				this.khInfo.f_bank = e.item.F_Bank
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
						modelname: 'frmBankList',
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
			
			deljournaldetailById: function(e) {
				var that = this;
				let hjje = 0;
				let kjje = 0;
				
				for (var i = 0; i < arr.length; i++) {
					hjje = +hjje + arr[i].F_ThisMoney;
					kjje = +kjje + arr[i].F_DisMoney;
				}
				that.djje = hjje;
				that.kjje = kjje;
			},
			updateItemFun: function() {
				var that = this;
				let hjje = 0;
				let kjje = 0;
				
				that.djje = hjje;
				that.kjje = kjje;
				console.log('合计：', hjje);

			},
			inputcountFun: function() {
				var that = this;
				let hjje = 0;
				let kjje = 0;
				
				that.djje = hjje;
				that.kjje = kjje;
				console.log('合计：', hjje);

			},
			tabChange(index) {
				
			},
			scrollToBottomFun: function(e) {
				
			},
			
			// 卡片点击方法
			cardClick: function(item, index) {
				this.selectIndex = 7
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './cpDetail'
				})
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