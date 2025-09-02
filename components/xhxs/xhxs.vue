<template>
	<view>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">

				<view class="infoBox">
					<view class="name">
						<text>{{item.clientname || '暂无'}}</text>
					</view>
					<view type="warning" class="bill">
						<text>{{item.F_BillID || ''}}</text>
					</view>
				</view>	
			    <view v-if="item.clientcode">
			    	<text class="colorGray">客户编号：</text>
			    	<text>{{item.clientcode}}</text>
			    </view>
				<view v-if="item.actdate">
					<text class="colorGray">订货日期：</text>
					<text>{{actdate}}</text>
				</view>
				<view v-if="item.enddate">
					<text class="colorGray">交货日期：</text>
					<text>{{enddate}}</text>
				</view>
				<view v-if="item.address">
					<text class="colorGray">客户地址：</text>
					<text>{{item.address}}</text>
				</view>
				<view v-if="item.tel">
					<text class="colorGray">客户电话：</text>
					<text>{{item.tel}}</text>
				</view>
				<view v-if="item.fax">
					<text class="colorGray">客户传真：</text>
					<text>{{item.fax}}</text>
				</view>
				<view v-if="item.contactman">
					<text class="colorGray">联系人：</text>
					<text>{{item.contactman}}</text>
				</view>
				<view v-if="item.city">
					<text class="colorGray">出口国家：</text>
					<text>{{item.city}}</text>
				</view>
				<view v-if="item.trade">
					<text class="colorGray">贸易条款：</text>
					<text>{{item.trade}}</text>
				</view>				
				<view v-if="item.fkfs">
					<text class="colorGray">付款方式：</text>
					<text>{{item.fkfs}}</text>
				</view>
				<view v-if="item.satrap">
					<text class="colorGray">业务员：</text>
					<text>{{item.satrap}}</text>
				</view>
				<view v-if="item.account">
					<text class="colorGray">单据金额：</text>
					<text>{{item.account}}</text>
				</view>
				<view v-if="item.currency">
					<text class="colorGray">结算货币：</text>
					<text>{{item.currency}}</text>
				</view>
				<view v-if="item.hl">
					<text class="colorGray">汇率：</text>
					<text>{{item.hl}}</text>
				</view>
				<view v-if="item.rmb">
					<text class="colorGray">折合人民币：</text>
					<text>{{item.rmb}}</text>
				</view>
				<view v-if="item.postcode">
					<text class="colorGray">运输方式：</text>
					<text>{{item.postcode}}</text>
				</view>
				<view v-if="item.standard">
					<text class="colorGray">电器标准：</text>
					<text>{{item.standard}}</text>
				</view>
				<view v-if="item.packing">
					<text class="colorGray">包装唛头：</text>
					<text>{{item.packing}}</text>
				</view>
				<view v-if="item.bz">
					<text class="colorGray">其他说明：</text>
					<text>{{item.bz}}</text>
				</view>
				<view v-if="item.F_PrePay">
					<text class="colorGray">预收款单号：</text>
					<text>{{item.F_PrePay}}</text>
				</view>
				<view v-if="item.account1">
					<text class="colorGray">预收款：</text>
					<text>{{item.account1}}</text>
				</view>
				<view v-if="item.PO">
					<text class="colorGray">客户PO：</text>
					<text>{{item.PO}}</text>
				</view>
				<view v-if="item.QA">
					<text class="colorGray">QA跟进：</text>
					<text>{{item.QA}}</text>
				</view>
				<view v-if="item.VAT">
					<text class="colorGray">VAT%：</text>
					<text>{{item.VAT}}</text>
				</view>
                <view v-if="item.jshj">
					<text class="colorGray">价税合计：</text>
					<text>{{item.jshj}}</text>
				</view>
			</view>
			<view class="rowBtn">
				<u-button v-if='(pagetype === "订单详情")&&(isCheck !== true)' type="primary" :plain="true" class="cpBtn"
					size="mini" @click="testrightFun">选客户
				</u-button>
				<u-button v-if='(pagetype === "订单详情")&&(isCheck !== true)' type="primary" :plain="true" class="cpBtn"
					size="mini" @click="selproductFun">选产品
				</u-button>
				<u-button v-if='(pagetype === "订单详情")&&(isCheck !== true)' type="primary" :plain="true" class="cpBtn"
					size="mini" @click="saveorderFun">保存
				</u-button>
				<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="cpsxjFun(item, index)">
					{{isCheck === true ? '反审' : '审核'}}					
				</u-button>
				<u-button v-if='(pagetype === "订单详情")&&(item.F_BillID)' type="warning" :plain="true" class="cpBtn"
					size="mini" @click="selprintfileFun">
					打印
				</u-button>
				<u-button type="error" :plain="true" class="cpBtn" size="mini"
					@click="deleteXhxsFun(item, index)">
					删除</u-button>
			</view>	
		</view>
	</view>
</template>

<script>
	let that =''
	import {
		xhxsApi,
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
				actdate: this.$u.timeFormat(this.item.actdate, 'yyyy-mm-dd hh:MM:ss'),
				enddate: this.$u.timeFormat(this.item.enddate, 'yyyy-mm-dd hh:MM:ss'),
				fkfs: this.item.fkfs,
				postcode: this.item.postcode,
				account: this.item.account,
				ddbz: this.item.bz,
				newBill: false,
				editBill: false,
				printBill: false,
				delBill: false,
				checkBill: false,
				uncheckBill: false,
				printer: '',
				isCheck:this.item.sh,
				rmb: this.item.rmb
				
				
			}
		},
		watch:{
			item(newValue, oldValue){
				this.actdate= this.$u.timeFormat(newValue.actdate, 'yyyy-mm-dd hh:MM:ss');
				this.enddate= this.$u.timeFormat(newValue.enddate, 'yyyy-mm-dd hh:MM:ss');
			},
		},
		mounted(){
			this.isCheck=this.item.sh
			that = this;
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
				console.log('默认打印机',uni.$userInfo.F_Printer)
				that.printer = uni.$userInfo.F_Printer||'';
				if(that.printer.length==0)
				{
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
					
				}
				else
				{
					let reqObj = {
						model: 'frmSellXh',
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
									url: './xhxsselPrintfile'
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
					model: 'frmSellXh',
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
									url: './xhxsselProduct',

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
									url: './xhxsselProduct',

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
			// 保存订单函数
			saveorderFun: function(e) {

				var that = this;
				//检测权限
				let reqObj = {
					model: 'frmSellXh',
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
							let temp = new Date().getTimezoneOffset();
							let reqObj = {
								...this.item,
								usercode: uni.$userInfo.F_Name,
								xsxd_content: this.itemList,
								djlx:'正常订单',
								actdate: new Date(this.item.actdate).setHours(new Date(this.item.actdate).getHours() + 8),
								enddate: new Date(this.item.enddate).setHours(new Date(this.item.enddate).getHours() + 8),
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

							xhxsApi(reqData)
								.then(res => {
									let showTitle = res.data.tag
									uni.showToast({
										title: showTitle,
										icon: 'none',
										duration: 2000
									})
									
									if (this.item.F_BillID == '') {
										console.log('当前状态：新增单据 单据编号:' + res.data.rows[0].F_BillID)
										uni.$addXhxs = res.data.rows[0];
									} 
																	
									
									uni.$emit('addItemInListFun')

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
				uni.$xhxsInfo = this.item;
				uni.navigateTo({
					url: './xhxsDetail?index=' + this.index
				})
			},
			bindsDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.actdate = data;
				this.item.actdate = data;

			},
			bindeDateChange: function(e) {
				var that = this
				let data = e.detail.value;
				that.enddate = data;
				that.item.enddate = data;

			},
			// 单据审核
			testrightFun: function() {
				var that = this;

				let reqObj = {
					model: 'frmSellXh',
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
								uni.$emit("showSelect")
							} else {
								uni.showModal({
									title: '提示',
									content: '你没有新增单据权限',
									showCancel: false
								})

							}
						} else {
							if (this.editBill == true) {
								uni.$emit("showSelect")
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
					model: 'frmSellXh',
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
									action: 'checkXhxsById',
									params: JSON.stringify(reqObj)
								}
								console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
								xhxsApi(reqData)
									.then(res => {
										let showTitle = res.data.tag
										that.item.sh = res.data.bResult
										that.isCheck=res.data.bResult
										console.log('单据审核开始触发','index:'+this.index)
										console.log('单据审核开始触发',res.data.rows[0])
										console.log('isCheck',res.data.bResult)
										uni.$emit('updateListCheckByIndex', {
											index: this.index,
											obj: res.data.rows[0]
										})
										uni.$emit('refreshXhxsFun', {
											index: this.index,
											obj: res.data.rows[0]
											})
										uni.showToast({
											title: showTitle,
											icon: 'none',
											duration: 2000
										})
										//that.list.splice(index, 1);
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
					action: 'checkXhxsById',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				xhxsApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						item.sh = res.data.bResult
						that.isCheck=res.data.bResult

						uni.showToast({
							title: showTitle,
							icon: 'none',
							duration: 2000
						})
						that.list.splice(index, 1);
					})
			},
			

			// 删除订单
			deleteXhxsFun: function(item, index) {
				var that = this;
				let delright = false;
				//确认权限
				let reqObjright = {
					model: 'frmSellXh',
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
								content: '是否确认删除订单：' + item.F_BillID,
								success(rrr) {
									if (rrr.confirm) {
										uni.showLoading({
											title: '删除中...'
										})

										let params = {
											F_BillID: item.F_BillID
										}
										let reqData = {
											action: 'delXhxsById',
											params: JSON.stringify(params)
										}
										console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
										xhxsApi(reqData)
											.then(res => {
												uni.showToast({
													title: '删除成功!',
													icon: 'none',
													duration: 1000
												})
												uni.$emit('deleteXhxsFun', {
													index,
												})

												if (that.pagetype == "订单详情") {
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