<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" ></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" 
			@confirm="allotConfirmFun" value-name="id" label-name="nickname"></u-select>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">
				<view class="infoBox">
				  <view class="name">
					  <text>{{item.name || '暂无'}}</text>
				  </view>
				  <view type="warning" class="bill">
				  	  <text>{{item.F_ID || ''}}</text>
				  </view>
				</view>
				<view v-if="item.F_Level">
					<text class="colorGray">厂商评级：</text>
					<text>{{item.F_Level}}</text>
				</view>
				<view v-if="item.city">
					<text class="colorGray">合作协议：</text>
					<text>{{item.city}}</text>
				</view>
				<view v-if="item.F_TypeName">
					<text class="colorGray">类别：</text>
					<text>{{item.F_TypeName}}</text>
				</view>
				<view v-if="item.contactman">
					<text class="colorGray">联系人：</text>
					<text>{{item.contactman}}</text>
				</view>
				<view v-if="item.tel">
					<text class="colorGray">联系电话：</text>
					<text>{{item.tel}}</text>
				</view>
				<view v-if="item.follow">
					<text class="colorGray">录入人员：</text>
					<text>{{item.follow}}</text>
				</view>
				<view v-if="item.product">
					<text class="colorGray">主要产品：</text>
					<text>{{item.product}}</text>
				</view>
				<view v-if="item.bz">
					<text class="colorGray">备注：</text>
					<text>{{item.bz}}</text>
				</view>
				<view v-if="item.simple">
					<text class="colorGray">付款方式：</text>
					<text>{{item.simple}}</text>
				</view>
				<view v-if="item.currency">
					<text class="colorGray">结算货币：</text>
					<text>{{item.currency}}</text>
				</view>
				<view v-if="item.yhzh">
					<text class="colorGray">银行账号一：</text>
					<text>{{item.yhzh}}</text>
				</view>
				<view v-if="item.yhzh1">
					<text class="colorGray">银行账号二：</text>
					<text>{{item.yhzh1}}</text>
				</view>
				<view v-if="item.F_Kind">
					<text class="colorGray">供方类型：</text>
					<text>{{item.F_Kind}}</text>
				</view>
				<view v-if="item.QA">
					<text class="colorGray">QA人员：</text>
					<text>{{item.QA}}</text>
				</view>
				<view v-if="item.fax">
					<text class="colorGray">供方传真：</text>
					<text>{{item.fax}}</text>
				</view>
				<view v-if="item.simple">
					<text class="colorGray">付款方式：</text>
					<text>{{item.simple}}</text>
				</view>
				<view v-if="item.postcode">
					<text class="colorGray">送货地址：</text>
					<text>{{item.postcode}}</text>
				</view>
				<view v-if="item.address">
					<text class="colorGray">供方地址：</text>
					<text>{{item.address}}</text>
				</view>				
			</view>
			<!--标签-->
			<view class="bqRow" @click="gotoDetailFun">
				<view v-if="item.type">{{item.type}}</view>
			</view>
			<view class="rowBtn">				
				<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="editSupplierFun(item, index)">
					编辑
				</u-button>
				<u-button type="error" :plain="true" class="cpBtn" size="mini"
					@click="deleteSupplierFun(item, index)">
					删除</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		supplierApi
	} from '../../utils/api.js'
	import {
		uidUserApi
	} from '../../utils/adminApi.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			isSelect: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				sheetList: [{
						text: '添加跟进'
					},
					{
						text: '编辑'
					},
					{
						text: '删除'
					}
				],
				moreShow: false,
				allotShow: false,
				
			}
		},
		methods: {
			moreShowFun: function() {
				let status = this.item.status;
				
					this.sheetList = [
						{
							text: '编辑'
						},
						 {
						 	text: '删除'
						 }
					];
				
				this.moreShow = true;
			},
			gotoDetailFun: function() {
				if (this.isSelect) {
					return
				}
				uni.$khInfo = this.item;
				uni.navigateTo({
					url: './supplierdetail?index=' + this.index
				})
			},
			
			// 删除供方
			deleteSupplierFun: function(item, index) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除供方：' + item.name,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
			
							let params = {
								id: item.F_ID,
								usercode: uni.$userInfo.F_ID,
							}
							let reqData = {
								action: 'deleteSupplierById',
								params: JSON.stringify(params)
							}
							console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
							supplierApi(reqData)
								.then(res => {
									uni.showToast({
										title: '删除成功!',
										icon: 'none',
										duration: 1000
									})
									
									uni.$emit('deleteSupplierFun', {
										index: that.index
									})
								})
						}
					}
				})
			},
			// 编辑供方
			editSupplierFun: function(item, index) {
				var that = this;
				uni.$addSupplier = this.item;
				console.log('addsupplier:'+uni.$addSupplier);
				console.log('addsupplier:'+this.item.name)
				uni.navigateTo({					
					url: './addsupplier?type=update&&isAdd=0&&index='+this.index
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
		padding: 16rpx 16rpx 10rpx;
		margin: 16rpx 13rpx;
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
	.infoBox {
	
		// padding-left: 26rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		height: 86rpx;
		justify-content: space-between;
	
		.name {
	
			flex: 1;
			width: 0;
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
