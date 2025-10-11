<template>
	<view v-else class="myCard">
		<view class="cardTopName">产品编号：{{item.itemcode}} </view>
		<view class="myCard3">
			<view class="itemPhotoBox">
				<image :src="item.url" class="itemPhotoBox" mode="widthFix"></image>
			</view>
			<view class="itemInfoBox">
				<view class="cardRow1" v-if="item.spec">
					<view class='t'>工厂型号：</view>
					<view class='v'>{{item.spec}}</view>
				</view>
				<view class="cardRow1" v-if="item.itemname">
					<view class='t'>产品名称：</view>
					<view class='v'>{{item.itemname}}</view>
				</view>
				<view class="cardRow1" v-if="item.color">
					<view class='t'>五金颜色：</view>
					<view class='v'>{{item.color}}</view>
				</view>
				<view class="cardRow1">
					<view class='t'>采购数量：</view>
					<view class='v'>{{item.wjsl}}</view>
				</view>
				<view class="cardRow1">
					<view class='t'>未检数量：</view>
					<view class='v'>{{item.cgsl}}</view>
				</view>
				<view class="cardRow1" v-if="item.countt">
					<view class='t'>检验数量：</view>
					<view class='v'><text class="redColor">{{item.countt}}</text></view>
				</view>
				<!-- <view class="cardRow" v-if="item.price">
					<view>采购单价：</view>
					<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
				</view>
				<view class="cardRow" v-if="item.account">
					<view>总金额：</view>
					<view><text class="redColor">￥{{item.account}}</text>元</view>
				</view>	 -->						
				
				<view class="cardRow1" v-if="item.count1">
					<view class='t'>可出数量：</view>
					<view class='v'><text class="redColor">{{item.count1}}</text></view>
				</view>
				<view class="cardRow1" v-if="item.count2">
					<view class='t'>不良数量：</view>
					<view class='v'><text class="redColor">{{item.count2}}</text></view>
				</view>
				<view class="cardRow1">
					<view class='t'>不良原因：</view>
					<view class='v'>{{item.Remark || ''}}</view>
				</view>
			</view>
			
		</view>
		
		<view class="rowBtn">
			<u-button type="primary" :disabled='cgzjInfo.sh === true' class="cpBtn" size="mini" @click="handleInputCount">输入数量
			</u-button>
			
			<u-button type="error" :disabled='cgzjInfo.sh === true'  class="cpBtn" size="mini"
				@click="deleteCpFun(item, index)">
				删除</u-button>
		</view>
		<view class="rowBtn">							
			<u-button type="primary" :disabled='cgzjInfo.sh === true' class="cpBtn" size="mini" @click="gotoYanHuoFun">{{item.F_BillID ?'修改图片' : '上传图片'}}
			</u-button>
			
			<u-button v-if='item.F_BillID' type="primary" :plain="true" class="cpBtn"
				size="mini" @click="previewYhReportFun">
				查看报告
			</u-button>
		</view>
	</view>
</template>

<script>
	let that = ''
	import {
		testrightApi,cgzjApi
	} from '../../utils/api.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			cgzjInfo: {
				type: Object,
				default: () => {}
			},
			priceRight:  {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			},
			searchLabel1: '',
			searchLabel2: '',
			searchPh1:'',
			searchPh2:'',
			
		},
		data() {
			return {
				searchShow: false,
				searchValue1:this.item.countt,
				searchValue2:this.item.price,
				reportName: '质检报告(带图)',
				newBill: false,
				editBill: false,
				printBill: false,
				delBill: false,
				checkBill: false,
				uncheckBill: false,
			}
		},
		methods: {			
			gotoYanHuoFun: function() {
				uni.$cgzjProduct = this.item;
				uni.$cgzjInfo = this.cgzjInfo;
				uni.navigateTo({
					url: '/crm/cgzj/cgzjProductImage?cpIndex=' + this.index
				})
			},
			handleInputCount() {
				this.$emit("handleInputCount", {
					item: this.item,
					index: this.index
				});
			},
			previewYhReportFun: function() {
				that = this
				let reqObj = {
					model: 'frmPurQc',
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
						console.log('获得打印权限：' + this.printBill)
						if (this.printBill == true) {
							uni.$cgzjProduct = this.item;
							uni.$cgzjInfo = this.cgzjInfo;
							uni.navigateTo({
								url: './cgzjYhPreview?reportName=' + this.reportName
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '你没有打印权限',
								showCancel: false
							})				
						}				
					})
			},
			// 删除产品
			deleteCpFun: function(item, index) {
				var that=this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除产品：' + item.itemcode,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})							
							let params={
									f_guid:item.f_guid,
								}
							let reqData = {
								action: 'delcgzjdetailById',
								params: JSON.stringify(params)
							}
							console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
							cgzjApi(reqData)
								.then(res => {
									uni.showToast({
										title: '删除成功!',
										icon: 'none',
										duration: 1000
									})
									uni.$emit('delcgzjdetailById', {
										index: that.index
									})
									
								})
						}
					}
				})
			},
		}
	}
</script>

<style>
	
	page {
		background-color: #F8F8F8;
	}
	
	.rowBtn {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 26rpx 16rpx 16rpx 0;
		justify-content: space-between;
	}
	
	.cpBtn {
		margin: 0 0 0 26rpx;
		font-size: 15px !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
	}
	
	.gdCz {
		width: 60rpx;
		height: 60rpx;
		padding: 6rpx 12rpx;
	}
	
	.myCard2 {
		width: 698rpx;
		padding: 26rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
		display: flex;
	}
	
	.cardTopName1 {
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: bold;
		padding-bottom: 8rpx;
	}
	
	.cardRow1 {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		font-size: 16px;
		margin-bottom: 8rpx;
	}
	
	.cardRow1 .t {
		width: 176rpx;
		color: #ADADAD;
	}
	
	.cardRow1 .v {
		color: #000000;
		width: calc(100% - 176rpx);
	}
	
	/* .cardRow1>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}
	
	.cardRow1>view:last-child {
		color: #000000;
		width: calc(100% - 176rpx);
	} */
	
	.leftImg {
		width: 160rpx;
		height: 160rpx;
		margin-right: 26rpx;
		border-radius: 26rpx;
		overflow: hidden;
		border: 1rpx solid #DDDDDD;
	}
	
	.rightView {
		width: 460rpx;
	}
	
	.xlKcClass {
		font-size: 14px;
		color: #888888;
		margin-bottom: 8rpx;
	}
	
	.xlKcClass>text {
		margin-right: 26rpx;
	}
	.itemPhotoBox{
		width:200rpx;
		height: 200rpx;
		/* border:1px solid #000000; */
	}
	
	.myCard3{
		display: flex;
		flex-direction: row;
	}
	.itemInfoBox{
		padding-left:20rpx;
		display: flex;
		flex-direction: column;
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
	
</style>

