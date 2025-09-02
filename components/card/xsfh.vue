<template>
	<view class="card" @click="gotoDetailFun">
		<view class="khName">发货单号：{{item.F_BillID}}</view>
		<view class="lrView">
			<view>发货日期：</view>
			<view>{{$u.timeFormat(item.actdate, 'yyyy-mm-dd hh:MM:ss')}}</view>
		</view>
		<view class="lrView" >
			<view>发货金额：</view>
			<view>{{item.account}}</view>			
		</view>
		<view class="lrView">
			<view>已收定金：</view>
			<view class="liangHang">{{item.account1}}</view>
		</view>
		<view class="lrView">
			<view>实收金额：</view>
			<view>{{item.ljje}}</view>
		</view>
		<view class="lrView">
			<view>单据余额：</view>
			<view>{{item.ye}}</view>
		</view>
		<view class="lrView">
			<view>送货地址：</view>
			<view>{{item.postcode}}</view>
		</view>
		<view class="lrView">
			<view>付款方式：</view>
			<view>{{item.fkfs}}</view>
		</view>		
		<view class="lrView">
			<view>制单人：</view>
			<view class="liangHang">{{item.zd}}</view>
		</view>
		<view class="lrView">
			<view>单据备注：</view>
			<view class="liangHang">{{item.bz}}</view>
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

