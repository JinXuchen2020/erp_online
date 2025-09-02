<template>
	<view>
		<u-action-sheet :list="sheetList" v-model="moreShow" ></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" 
			@confirm="allotConfirmFun" value-name="id" label-name="nickname"></u-select>
		<view class="card">
			<view class="topRow1" >
				<view class="infoBox">
				  <view class="name">
					  <text>{{item.F_Bank || '暂无'}}</text>
				  </view>
				  <view type="warning" class="bill">
				  	  <text>{{item.F_Account || ''}}</text>
				  </view>
				</view>
				<view v-if="item.F_IniMoney">
					<text class="colorGray">初始金额：</text>
					<text>{{item.F_IniMoney}}</text>
				</view>
				<view v-if="item.F_Remark">
					<text class="colorGray">特殊备注：</text>
					<text>{{item.F_Remark}}</text>
				</view>						
			</view>			
			<view class="rowBtn">				
				<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="editBankFun(item, index)">
					编辑
				</u-button>
				<u-button type="error" :plain="true" class="cpBtn" size="mini"
					@click="deleteBankFun(item, index)">
					删除</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		clientApi
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
			
			
			// 删除账户
			deleteBankFun: function(item, index) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除账户：' + item.F_Bank,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
			
							let params = {
								Aid: item.Aid,
								usercode: uni.$userInfo.F_ID,
							}
							let reqData = {
								action: 'deleteBankById',
								params: JSON.stringify(params)
							}
							console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
							clientApi(reqData)
								.then(res => {
									uni.showToast({
										title: '删除成功!',
										icon: 'none',
										duration: 1000
									})
									
									uni.$emit('deleteBankFun', {
										index: that.index
									})
								})
						}
					}
				})
			},
			// 编辑账户
			editBankFun: function(item, index) {
				var that = this;
				uni.$addBank = this.item;
				
				uni.navigateTo({					
					url: './addbank?type=update&&isAdd=0&&index='+this.index
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
