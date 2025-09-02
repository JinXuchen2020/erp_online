<template>
	<view class="boxContent">
		<view class="title">销售简报</view>
		<view v-if="!isLoading" class="xskhtj">
			<view v-for="(item, index) in salesJbList" :key="index" class="xskhCard">
				<text>{{item.value}}</text>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view v-else class="xskhtj flexColumn">
			<u-loading size="66" color="#ffaa00"></u-loading>
			<view style="font-size: 30rpx; font-weight: bold; margin-top: 10rpx;">加载中...</view>
		</view>
	</view>
</template>

<script>
	let that = '';
	import {
		baobiaoApi
	} from '@/utils/api.js'
	export default {
		props: {
			startDateTime: {
				type: Number,
				default: 0
			},
			endDateTime: {
				type: Number,
				default: 0
			},
			depId: {
				type: String,
				default: ''
			},
			fuZeRenId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isLoading: false,
				salesJbList: []
			};
		},
		watch: {
			depId: function() {
				that.getSalesJianBaoFun();
			},
			fuZeRenId: function() {
				that.getSalesJianBaoFun();
			},
			startDateTime: function() {
				that.getSalesJianBaoFun();
			},
			endDateTime: function() {
				that.getSalesJianBaoFun();
			}
		},
		created() {
			that = this;
			that.setJianBaoParamsFun();
			that.getSalesJianBaoFun();
		},
		methods: {
			// 设置销售简报基础数据
			setJianBaoParamsFun: function() {
				that.salesJbList = [{
						name: '销售单数',
						value: 0,
						icon: '../../static/image/whiteIcon/thread.png',
						bgColor: 'linear-gradient(45deg, #007aff, #00aaff)'
					},
					{
						name: '销售金额',
						value: 0,
						icon: '../../static/image/whiteIcon/client.png',
						bgColor: 'linear-gradient(45deg, #55aaff, #62dbff)'
					},
					{
						name: '发货单数',
						value: 0,
						icon: '../../static/image/whiteIcon/contacts.png',
						bgColor: 'linear-gradient(45deg, #00d6d6, #a0efef)'
					},
					{
						name: '发货金额',
						value: 0,
						icon: '../../static/image/whiteIcon/business.png',
						bgColor: 'linear-gradient(45deg, #ffaa00, #ffaa7f)'
					},
					{
						name: '收款单数',
						value: 0,
						icon: '../../static/image/whiteIcon/quotation.png',
						bgColor: 'linear-gradient(45deg, #007aff, #00aaff)'
					},
					{
						name: '收款金额',
						value: 0,
						icon: '../../static/image/whiteIcon/contract.png',
						bgColor: 'linear-gradient(45deg, #55aaff, #62dbff)'
					},
					{
						name: '延期单数',
						value: 0,
						icon: '../../static/image/whiteIcon/hkjh.png',
						bgColor: 'linear-gradient(45deg, #00d6d6, #a0efef)'
					},
					{
						name: '延期金额',
						value: 0,
						icon: '../../static/image/whiteIcon/hkd.png',
						bgColor: 'linear-gradient(45deg, #ffaa00, #ffaa7f)'
					}
				]
			},
			getSalesJianBaoFun: function() {
				that.isLoading = true;
				let params= {
					
					sTime: that.startDateTime,
					eTime: that.endDateTime
				            }
				let reqData = {
					action: 'getSalesJianBaoApi',
					params: JSON.stringify(params)
				}	
				baobiaoApi(reqData)
				.then(res => {
					that.isLoading = false;
					//let obj = res.data;
					let list = that.salesJbList;
					list[0].value = res.data.xsds;
					list[1].value = res.data.xsje;
					list[2].value = res.data.fhds;
					list[3].value = res.data.fhje;
					list[4].value = res.data.thds;
					list[5].value = res.data.thje;
					list[6].value = res.data.skds;
					list[7].value = res.data.skje;
					that.salesJbList = list;
					
				})
			}
		}
	}
</script>

<style>
	.boxContent {
		width: 700rpx;
		margin-left: 25rpx;
		margin-top: 32rpx;
		padding-bottom: 16rpx;
		border: 2rpx solid #dcdcdc;
		box-shadow: #adadad 0px 0px 16rpx;
		border-radius: 6rpx;
		border-radius: 16rpx;
	}
	
	.title {
		font-size: 32rpx;
		margin: 16rpx 0 16rpx 16rpx;
		font-weight: bold;
	}
	.box {
		position: relative;
		width: 100%;
		height: 160rpx;
		box-sizing: border-box;
		padding: 0 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 16rpx;
		margin-bottom: 16rpx;
	}
	.charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.xskhtj{
		width: 100%;
		min-height: 272rpx;
		padding: 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.flexColumn {
		flex-direction: column;
		justify-content: center;
	}
	.xskhCard{
		width: 25%;
		font-size: 30rpx;
		margin-bottom: 6rpx;
		padding-bottom: 12rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.xskhCard>text:first-child{
		font-weight: bold;
		color: #007AFF;
		margin-bottom: 16rpx;
	}
	.xskhCard>text:last-child{
		font-weight: bold;
	}
</style>
