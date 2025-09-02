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
				<view >
					<text class="colorGray">单据金额(原币种)：</text>
					<text>{{item.F_TotalMoney}}</text>
				</view>
				<view >
					<text class="colorGray">国家：</text>
					<text>{{item.city}}</text>
				</view>
				<view >
					<text class="colorGray">折合人民币：</text>
					<text>{{item.RMB}}</text>
				</view>
				<view >
					<text class="colorGray">业务员：</text>
					<text>{{item.satrap}}</text>
				</view>
				<view >
					<text class="colorGray">业务部门：</text>
					<text>{{item.F_TypeName}}</text>
				</view>
			</view>		
			
		</view>
	</view>
</template>

<script>
	import {
		baobiaoApi
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
					url: './clientsreportdetail?index=' + this.index
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
