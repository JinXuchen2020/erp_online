<template>
	<view>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">

				<view class="infoBox">
					<view class="name">
						<text>{{item.F_BillID || '暂无'}}</text>
					</view>
				</view>

				<view v-if="item.actdate">
					<text class="colorGray">领料日期：</text>
					<text>{{item.actdate}}</text>
				</view>
				<view v-if="item.enddate">
					<text class="colorGray">完工日期：</text>
					<text>{{item.enddate}}</text>
				</view>
				<view v-if="item.bm">
					<text class="colorGray">生产部门：</text>
					<text>{{item.bm}}</text>
				</view>
				<view v-if="item.zd">
					<text class="colorGray">排产人员：</text>
					<text>{{item.zd}}</text>
				</view>
				<view v-if="item.bz">
					<text class="colorGray">备注：</text>
					<text>{{item.bz}}</text>
				</view>

			</view>
			<view class="rowBtn">
				<u-button v-if='(pagetype === "领料详情")&&(checkbill !== true)' type="primary" :plain="true" class="cpBtn"
					size="mini" @click="testrightFun">输入信息
				</u-button>
				<u-button v-if='(pagetype === "领料详情")&&(checkbill !== true)' type="primary" :plain="true" class="cpBtn"
					size="mini" @click="selproductFun">选成品
				</u-button>
				<u-button v-if='(pagetype === "领料详情")&&(checkbill !== true)' type="primary" :plain="true" class="cpBtn"
					size="mini" @click="saveorderFun">保存
				</u-button>
				<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="cpsxjFun(item, index)">
					<!-- {{item.sh == true ? '反审' : '审核'}} -->
					<view v-if="checkbill">
						反审
					</view>
					<view v-else>
						审核
					</view>
				</u-button>
				<u-button v-if='(pagetype === "领料详情")&&(item.F_BillID)' type="warning" :plain="true" class="cpBtn"
					size="mini" @click="selprintfileFun">
					打印
				</u-button>
				<u-button type="error" :plain="true" class="cpBtn" size="mini" @click="deletePrdmrFun(item, index)">
					删除</u-button>
			</view>
			<!--搜索弹窗-->
			<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
				<view class="searchBox">
					<view class="searchTitle">输入领料信息</view>
					<view class="dateBox">
						领料日期
						<picker mode="date" :value="item.actdate" start="1999-02-15" end="2100-02-15"
							@change="bindsDateChange">
							<text class="dateText">{{item.actdate}}</text>
						</picker>
					</view>
					<view class="dateBox">
						完工日期
						<picker mode="date" :value="item.enddate" start="1999-02-15" end="2100-02-15"
							@change="bindeDateChange">
							<text class="dateText">{{item.enddate}}</text>
						</picker>
					</view>
					<view class="infoBox">
						<u-field v-model="item.bm" :label="'生产部门'" :placeholder="'请选择生产部门'" clear-size="40"
							class="clientBox"></u-field>
						<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
							:plain="true" size="medium" @click="selbmFun(item.clientcode)">选择</u-button>
					</view>					
					<u-field v-model="item.bz" :label="'领料备注'" :placeholder="'请输入领料备注'" clear-size="40"></u-field>
					<view class="searchBtnRow">
						<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
							:plain="true" size="medium" @click="searchShow = false">取消</u-button>
						<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399"
							:plain="true" size="medium" @click="updateItemFun">确认</u-button>
					</view>
				</view>
			</u-popup>

		</view>
	</view>
</template>

<script>
	import {
		prdmrApi,
		testrightApi
	} from '../../utils/api.js'

	export default {
		props: {
			itemList: {
				type: Array,
				default: function() {
					return [];
				}

			},
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
				clientcode: this.item.clientcode,
				clientname: this.item.clientname,
				actdate: this.$u.timeFormat(this.item.actdate, 'yyyy-mm-dd'),
				enddate: this.$u.timeFormat(this.item.actdate, 'yyyy-mm-dd'),
				fkfs: this.item.fkfs,
				postcode: this.item.postcode,
				account: this.item.account,
				ddbz: this.item.bz,
				ckmc: this.item.ckmc,
				newBill: false,
				editBill: false,
				printBill: false,
				delBill: false,
				checkBill: false,
				uncheckBill: false,
				checkbill:this.item.sh,
			}
		},
		methods: {

			// 修改单据处理函数
			updateItemFun: function() {
				this.searchShow = false;
				console.log('bbb', this.item.clientname);
			},


			// 选择成品函数
			selbmFun: function(e) {
				console.log('./prdmrselBm')
				uni.navigateTo({
					url: './prdmrselBm'
				})
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
						model: 'frmScll',
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
									url: './prdmrselPrintfile'
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
					model: 'frmScll',
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
								var itemList = this.itemList
								console.log(itemList);
								uni.setStorageSync("itemList", this.itemList)
								uni.navigateTo({
									url: './prdmrselProduct?ckmc=' + this.item.ckmc,

								})
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有新增单据权限',
									showCancel: false
								})

							}
						} else {
							if (this.editBill == true) {
								var itemList = this.itemList
								console.log(itemList);
								uni.setStorageSync("itemList", this.itemList)
								uni.navigateTo({
									url: './prdmrselProduct?ckmc=' + this.item.ckmc,

								})
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
			// 保存领料函数
			saveorderFun: function(e) {

				var that = this;
				//检测权限
				let reqObj = {
					model: 'frmScll',
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
								bm: this.item.bm,
								enddate: this.item.enddate,
								account: this.item.account,
								actdate: this.item.actdate,
								model: this.item.model,
								bz: this.item.bz,
								tzsc_content: this.itemList,
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

							prdmrApi(reqData)
								.then(res => {
									let showTitle = res.data.tag
									uni.showToast({
										title: showTitle,
										icon: 'none',
										duration: 2000
									})

									if (this.item.F_BillID == '') {
										console.log('当前状态：新增单据 单据编号:' + res.data.rows[0].F_BillID)
										uni.$addPrdmr = res.data.rows[0];
										uni.$emit('addItemInListFun')
									} else {

										uni.$emit('updateListByIndex', {
											index: this.cardIndex,
											obj: res.data.rows[0]
										})
										uni.$emit('refreshPrdmrFun', {
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
				uni.$prdmrInfo = this.item;
				uni.navigateTo({
					url: './prdmrDetail?index=' + this.index
				})
			},
			bindsDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.actdate = data;
				this.item.actdate = data;

				//that.item.actdate =data;

			},bindeDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.enddate = data;
				this.item.enddate = data;
			},
			// 选择领料仓库
			testrightFun: function() {
				var that = this;

				let reqObj = {
					model: 'frmScll',
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
									content: '你没有新增生产领料权限',
									showCancel: false
								})

							}
						} else {
							if (this.editBill == true) {
								this.searchShow = true
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有修改生产领料权限',
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
					model: 'frmScll',
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
									action: 'checkPrdmrById',
									params: JSON.stringify(reqObj)
								}
								console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
								prdmrApi(reqData)
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
					action: 'checkPrdmrById',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				prdmrApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						item.sh = res.data.bResult
						that.checkbill=res.data.bResult

						uni.showToast({
							title: showTitle,
							icon: 'none',
							duration: 2000
						})
						that.list.splice(index, 1);
					})
			},


			// 删除领料
			deletePrdmrFun: function(item, index) {
				var that = this;
				let delright = false;
				//确认权限
				let reqObjright = {
					model: 'frmScll',
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
								content: '是否确认删除领料：' + item.F_BillID,
								success(rrr) {
									if (rrr.confirm) {
										uni.showLoading({
											title: '删除中...'
										})

										let params = {
											F_BillID: item.F_BillID
										}
										let reqData = {
											action: 'delPrdmrById',
											params: JSON.stringify(params)
										}
										console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
										prdmrApi(reqData)
											.then(res => {
												uni.showToast({
													title: '删除成功!',
													icon: 'none',
													duration: 1000
												})
												uni.$emit('deletePrdmrFun', {
													index,
												})

												if (that.pagetype == "领料详情") {
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