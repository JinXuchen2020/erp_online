<template>
	<view>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">
				<view class="name">
					<text>{{item.F_Name || '暂无'}}</text>
					<view class="rowBtn">
						<u-button  type="primary" :plain="true" class="cpBtn" size="mini"
							@click="selPcodeFun(item, index)">选择
						</u-button>
						
					</view>
				</view>	
				<view class="name">
					<text>{{item.F_ID || '暂无'}}</text>
					
				</view>	
			</view>
			
		</view>
	</view>
	<!-- <view v-else class="myCard">
		<view class="cardTopName">产品名称：{{item.F_ID}} {{item.name}}</view>
		
		<view class="myCard3">
			<view class="itemPhotoBox">
				<image :src="item.url" mode="widthFix"class="itemPhotoBox"></image>
			</view>
			<view class="infoBox">
				<view class="cardRow">
					<view>规格颜色：</view>
					<view>{{item.spec}} {{item.color}}</view>
				</view>
				<view class="cardRow">
					<view>产品型号：</view>
					<view><text class="redColor">{{item.model}}</text></view>
				</view>				
				<view class="cardRow">
					<view>特别备注：</view>
					<view>{{item.bz}}</view>
				</view>								
			</view>
			
		</view>
		<view class="rowBtn">
			<u-button type="error" :plain="true" class="cpBtn" size="mini"
				@click="selPcodeFun(item, index)">
				选择</u-button>
		</view>
		</view> -->
</template>

<script>
	import {
		prdplanApi
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
				moreShow: false,
				allotShow: false,
				userList: []
			}
		},
		methods: {
			moreShowFun: function() {
				let status = this.item.status;	
				
				this.moreShow = true;
			},
			
			
			// 选择成品型号
			selPcodeFun: function(item, index) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认选择生产班组：' + that.item.F_ID + that.item.F_Name,
					success(rrr) {
						if (rrr.confirm) {
							
							uni.showLoading({
								title: '赋值中...',
								duration:1000
							})							
							uni.$emit("selectBm1",{"item":item})
			uni.navigateBack()
							
							
							
						}
					}
				})
			},
						
		}
	}
</script>

<style>
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
		display: flex;
		font-size: 16px;
		margin-bottom: 8rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
		justify-content: space-between;
		
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
	.rowBtn{
		width:100%;
		text-align: right;
	}
</style>
