<template>
	<view>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">

				<view class="infoBox">
					<view class="name">
						<text>{{item.F_fylx || '暂无'}}</text>
					</view>
					<view type="warning" class="bill">
						<text>{{item.F_RestMoney || ''}}</text>
					</view>
				</view>				
				<view v-if="item.F_Date">
					<text class="colorGray">发生日期：</text>
					<text>{{item.F_Date}}</text>
				</view>

				<view v-if="item.F_BalanceType">
					<text class="colorGray">收款方式：</text>
					<text>{{item.F_BalanceType}}</text>
				</view>
				<view v-if="item.F_Remark">
					<text class="colorGray">收款摘要：</text>
					<text>{{item.F_Remark}}</text>
				</view>
				<view v-if="item.F_Debit">
					<text class="colorGray">收入金额：</text>
					<text>{{item.F_Debit}}</text>
				</view>
				<view v-if="item.F_Credit">
					<text class="colorGray">支出金额：</text>
					<text>{{item.F_Credit}}</text>
				</view>
				<view v-if="item.F_AcceptType">
					<text class="colorGray">收款方式：</text>
					<text>{{item.F_AcceptType}}</text>
				</view>
				<view v-if="item.F_Opertor">
					<text class="colorGray">操作员：</text>
					<text>{{item.F_Opertor}}</text>
				</view>

			</view>
			<view class="rowBtn">				
				<!-- <u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="cpsxjFun(item, index)">
					{{item.sh == true ? '反审' : '审核'}}
				</u-button> -->
				<u-button  type="warning" :plain="true" class="cpBtn" size="mini" @click="editJournalFun(item, index)">
					编辑
				</u-button>
				<u-button  type="warning" :plain="true" class="cpBtn"
					size="mini" @click="selprintfileFun">
					打印
				</u-button>
				<u-button type="error" :plain="true" class="cpBtn" size="mini" @click="deleteJournalFun(item, index)">
					删除</u-button>
			</view>
			

		</view>
	</view>
</template>

<script>
	import {
		journalApi,
		testrightApi
	} from '../../utils/api.js'

	export default {
		props: {
			
			item: {
				type: Object,
				default: {}
			},
			isSelect: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			},
			djje: {
				type: Number,
				default: 0
			},
			pagetype: {
				type: String,
				default: ''
			},
			searchLabel1: '',
			searchLabel2: '',
			searchPh1: '',
			searchPh2: '',

		},
		data() {
			return {

				allotShow: false,
				userList: [],
				searchShow: false,
				F_ClientID: this.item.F_ClientID,
				F_ClientName: this.item.F_ClientName,
				F_Date: this.$u.timeFormat(this.item.F_Date, 'yyyy-mm-dd'),

				f_bank: this.item.f_bank,
				F_AcceptType: this.item.F_AcceptType,
				F_Money: this.item.F_Money,
				ddbz: this.item.bz,
				newBill: false,
				editBill: false,
				printBill: false,
				delBill: false,
				checkBill: false,
				uncheckBill: false,
			}
		},
		methods: {

			// 修改单据处理函数
			updateItemFun: function() {
				this.searchShow = false;
				console.log('bbb', this.item.clientname);
			},
			
			// 选择打印文件
			selprintfileFun: function() {

				var that = this;
				console.log('默认打印机', uni.$userInfo.F_Printer)
				that.printer = uni.$userInfo.F_Printer || '';
				if (that.printer.length == 0) {
					uni.showModal({
						title: '提示',
						content: '没有默认打印机，是否选择打印机？',
						success(rrr) {
							if (rrr.confirm) {
								uni.navigateTo({
									url: '/pages/crm/selPrinter'

								})
							}
						}
					})

				} else {
					let reqObj = {
						model: 'frmBankList',
						usercode: uni.$userInfo.F_ID
					}
					let reqData = {
						action: 'testRightByModel',
						params: JSON.stringify(reqObj)
					}
					console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
					testrightApi(reqData)
						.then(res => {
							let showTitle = res.data.tag
							console.log(showTitle)
							console.log(res.data.printBill)
							that.newBill = res.data.newBill
							that.editBill = res.data.editBill
							that.delBill = res.data.delBill
							that.printBill = res.data.printBill
							that.checkBill = res.data.checkBill
							console.log('获得打印权限：' + this.printBill)
							if (this.printBill == true) {
								uni.navigateTo({
									url: './journalselPrintfile'
								})
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有打印权限',
									showCancel: false
								})

							}

						})
				}



			},
			// 选择产品函数
			selproductFun: function(e) {
				var that = this;

				let reqObj = {
					model: 'frmBankList',
					usercode: uni.$userInfo.F_ID
				}
				let reqData = {
					action: 'testRightByModel',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				testrightApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						that.newBill = res.data.newBill
						that.editBill = res.data.editBill
						that.delBill = res.data.delBill
						that.printBill = res.data.printBill
						that.checkBill = res.data.checkBill
						console.log('得到收款单号：', this.item.F_BillID)
						if (this.item.F_BillID == '') {
							if (this.newBill == true) {
								console.log('clientId', this.item.F_ClientID)
								if (this.item.F_ClientID == '') {
									uni.showModal({
										title: '提示',
										content: '请选择收款客户',
										showCancel: false
									})
								} else {
									var itemList = this.itemList
									uni.setStorageSync("journaldetail", this.itemList)
									console.log('新增单据传递过去的itemlist', this.itemList)
									uni.navigateTo({
										url: './journalselProduct?F_ClientID=' + this.item.F_ClientID,

									})
								}

							} else {
								uni.showModal({
									title: '提示',
									content: '你没有新增单据权限',
									showCancel: false
								})

							}
						} else {
							if (this.editBill == true) {
								if (this.item.F_ClientID == '') {
									uni.showModal({
										title: '提示',
										content: '请选择客户',
										showCancel: false
									})
								} else {
									var itemList = this.itemList
									console.log(itemList);
									uni.setStorageSync("journaldetail", this.itemList)
									console.log('修改单据传递过去的itemlist', this.itemList)
									uni.navigateTo({
										url: './journalselProduct?F_ClientID=' + this.item.F_ClientID,

									})
								}

							} else {
								uni.showModal({
									title: '提示',
									content: '你没有修改单据权限',
									showCancel: false
								})

							}

						}
					})



			},
			// 保存日记账单函数
			saveorderFun: function(e) {

				var that = this;
				//检测权限
				let reqObj = {
					model: 'frmBankList',
					usercode: uni.$userInfo.F_ID
				}
				let reqData = {
					action: 'testRightByModel',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				testrightApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						that.newBill = res.data.newBill
						that.editBill = res.data.editBill
						that.delBill = res.data.delBill
						that.printBill = res.data.printBill
						that.checkBill = res.data.checkBill
						let saveright = false;
						if (this.item.F_BillID == '') {
							if (this.newBill == true) {
								saveright = true;
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有新增单据权限',
									showCancel: false
								})

							}
						} else {
							if (this.editBill == true) {
								saveright = true;
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有修改单据权限',
									showCancel: false
								})

							}

						}
						if (saveright == true) {
							let reqObj = {
								F_BillID: this.item.F_BillID,
								usercode: uni.$userInfo.F_Name,
								F_ClientID: this.item.F_ClientID,
								F_ClientName: this.item.F_ClientName,
								f_bankid: this.item.f_bankid,
								f_bank: this.item.f_bank,
								F_AcceptType: this.item.F_AcceptType,
								F_Money: this.item.F_Money,
								F_DisMoney: this.item.F_DisMoney,
								F_Date: this.item.F_Date,
								F_Remark: this.item.F_Remark,
								t_acceptdetail: this.itemList,
							}
							uni.showLoading({
								title: '正在保存单据',
								mask: true,
								duration: 2000
							})
							let reqData = {
								action: 'saveorderformById',
								params: JSON.stringify(reqObj),
							}

							acceptApi(reqData)
								.then(res => {
									let showTitle = res.data.tag
									uni.showToast({
										title: showTitle,
										icon: 'none',
										duration: 2000
									})

									if (this.item.F_BillID == '') {
										console.log('当前状态：新增单据 单据编号:' + res.data.rows[0].F_BillID)
										uni.$addAccept = res.data.rows[0];
										uni.$emit('addItemInListFun')
									} else {

										uni.$emit('updateListByIndex', {
											index: this.cardIndex,
											obj: res.data.rows[0]
										})
										uni.$emit('refreshAcceptFun', {
											index: this.cardIndex,
											obj: res.data.rows[0]
										})
									}

									setTimeout(() => {
										uni.navigateBack()
									}, 666)


								})
						}
					})
				//检测权限完成

			},
			gotoDetailFun: function() {
				if (this.isSelect) {
					return
				}
				uni.$journalInfo = this.item;
				uni.navigateTo({
					url: './journalDetail?index=' + this.index
				})
			},
			bindsDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.F_Date = data;
				this.item.F_Date = data;


			},

			// 单据审核
			testrightFun: function() {
				var that = this;

				let reqObj = {
					model: 'frmBankList',
					usercode: uni.$userInfo.F_ID
				}
				let reqData = {
					action: 'testRightByModel',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				testrightApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						that.newBill = res.data.newBill
						that.editBill = res.data.editBill
						that.delBill = res.data.delBill
						that.printBill = res.data.printBill
						that.checkBill = res.data.checkBill
						if (this.item.F_BillID == '') {
							if (this.newBill == true) {
								this.searchShow = true
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有新增单据权限',
									showCancel: false
								})

							}
						} else {
							if (this.editBill == true) {
								this.searchShow = true
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有修改单据权限',
									showCancel: false
								})

							}

						}
					})

			},

			// 单据审核
			cpsxjFun: function(item, index) {

				var that = this;
				let str = '审核中...';
				let sxj = true
				if (item.isSxJ) {
					sxj = false;
					str = '反审中...'
				}
				let checkright = false;
				//测试权限
				let reqObjright = {
					model: 'frmBankList',
					usercode: uni.$userInfo.F_ID
				}
				let reqDataright = {
					action: 'testRightByModel',
					params: JSON.stringify(reqObjright)
				}

				testrightApi(reqDataright)
					.then(res => {
						let showTitle = res.data.tag
						that.newBill = res.data.newBill
						that.editBill = res.data.editBill
						that.delBill = res.data.delBill
						that.printBill = res.data.printBill
						that.checkBill = res.data.checkBill
						that.uncheckBill = res.data.uncheckBill
						if (this.item.F_BillID == '') {

							uni.showModal({
								title: '提示',
								content: '单据未保存，不能审核',
								showCancel: false
							})


						} else {
							if ((sxj) && (that.checkBill == true)) {
								checkright = true;
							}
							if ((!sxj) && (that.uncheckBill == true)) {
								checkright = true;
							}
							if (checkright == false) {
								uni.showModal({
									title: '提示',
									content: '你没有权限',
									showCancel: false
								})

							} else {
								//审核单据
								uni.showLoading({
									title: str,
									mask: true,
									duration: 2000
								})
								let reqObj = {
									F_BillID: item.F_BillID,

									isSxJ: item.sh

								}
								let reqData = {
									action: 'checkAcceptById',
									params: JSON.stringify(reqObj)
								}
								console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
								acceptApi(reqData)
									.then(res => {
										let showTitle = res.data.tag
										item.sh = res.data.bResult

										uni.showToast({
											title: showTitle,
											icon: 'none',
											duration: 2000
										})
										that.list.splice(index, 1);
									})
								//审核单据完成
							}

						}
					})
				//测试权限完成

			},
			// 打印审核
			printform: function(item, index) {
				var that = this;
				let str = '审核中...';
				let sxj = true
				if (item.isSxJ) {
					sxj = false;
					str = '反审中...'
				}
				uni.showLoading({
					title: str,
					mask: true,
					duration: 2000
				})
				let reqObj = {
					F_BillID: item.F_BillID,

					isSxJ: item.sh

				}
				let reqData = {
					action: 'checkAcceptById',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				acceptApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						item.sh = res.data.bResult

						uni.showToast({
							title: showTitle,
							icon: 'none',
							duration: 2000
						})
						that.list.splice(index, 1);
					})
			},


			// 删除日记账单
			deleteAcceptFun: function(item, index) {
				var that = this;
				let delright = false;
				//确认权限
				let reqObjright = {
					model: 'frmBankList',
					usercode: uni.$userInfo.F_ID
				}
				let reqDataright = {
					action: 'testRightByModel',
					params: JSON.stringify(reqObjright)
				}

				testrightApi(reqDataright)
					.then(res => {
						let showTitle = res.data.tag
						that.delBill = res.data.delBill
						if (this.item.F_BillID == '') {

							uni.showModal({
								title: '提示',
								content: '单据还没有保存',
								showCancel: false
							})


						} else {
							if (this.delBill == true) {
								delright = true
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有删除单据权限',
									showCancel: false
								})

							}

						}
						if (delright) {
							uni.showModal({
								title: '提示',
								content: '是否确认删除日记账单：' + item.F_BillID,
								success(rrr) {
									if (rrr.confirm) {
										uni.showLoading({
											title: '删除中...'
										})

										let params = {
											F_BillID: item.F_BillID
										}
										let reqData = {
											action: 'delAcceptById',
											params: JSON.stringify(params)
										}
										console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
										acceptApi(reqData)
											.then(res => {
												uni.showToast({
													title: '删除成功!',
													icon: 'none',
													duration: 1000
												})
												uni.$emit('deleteAcceptFun', {
													index,
												})

												if (that.pagetype == "日记账详情") {
													setTimeout(() => {
														uni.navigateBack()
													}, 666)
												}
											})
									}
								}
							})
						}
					})
				//确认权限完成

			},
			// 编辑客户
			editJournalFun: function(item, index) {
				var that = this;
				uni.$addJournal = this.item;
				
				uni.navigateTo({					
					url: './addjournal?type=update&&isAdd=0&&index='+this.index
				})
			},

		}
	}
</script>

<style lang="scss">
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

		.name {

			width: 450rpx;
		}

		.bill {
			// margin-left: 90rpx;
			// width: 100rpx;
			height: 86rpx;
			line-height: 86rpx;
			font-size: 35rpx;
			color: red;
			font-weight: 800;

		}
	}
</style>