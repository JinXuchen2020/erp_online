<template>
	<view class="card" @click="gotoDetailFun">
		<view class="khName">收款单号：{{item.F_BillID}}</view>
		<view class="lrView">
			<view>收款日期：</view>
			<view>{{$u.timeFormat(item.F_Date, 'yyyy-mm-dd hh:MM:ss')}}</view>
		</view>
		<view class="lrView" >
			<view>收款方式：</view>
			<view>{{item.F_AcceptType}}</view>			
		</view>
		<view class="lrView">
			<view>收款类型：</view>
			<view class="liangHang">{{item.F_Kind}}</view>
		</view>
		<view  class="lrView">
			<view>收款金额：</view>
			<view>{{item.F_Money}}</view>
		</view>
		<view  class="lrView">
			<view>扣减金额：</view>
			<view>{{item.F_DisMoney}}</view>
		</view>
		<view  class="lrView">
			<view>收款账户：</view>
			<view>{{item.F_Bank}}</view>
		</view>
		<view  class="lrView">
			<view>收款人：</view>
			<view>{{item.F_BillMan}}</view>
		</view>
		<view class="lrView">
			<view>收款备注：</view>
			<view class="liangHang">{{item.F_Remark}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			gotoDetailFun: function() {
				uni.$gjInfo = this.item;
				uni.navigateTo({
					url: '/pages/crm/genJin/detail?index=' + this.index
				})
			}
		}
	}
</script>

<style>
	.card {
		width: 686rpx;
		margin: 32rpx;
		background-color: #FFFFFF;
		padding: 16rpx;
		border-radius: 26rpx;
		box-sizing: border-box;
		box-shadow: #dddddd 0px 0px 32rpx;
	}
	.bottomRow {
		display: flex;
		justify-content: space-between;
		border-top: 1rpx solid #dddddd;
		padding-top: 16rpx;
		margin-top: 16rpx;
	}
	.khName {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 16rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #e8e8e8;
	}
	.lrView {
		display: flex;
		font-size: 16px;
	}
	.lrView>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}
	.lrView>view:last-child {
		width: 466rpx;
		color: #000000;
	}
</style>

