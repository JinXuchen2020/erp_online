<template>
	<view>
		<u-action-sheet v-model="moreShow"></u-action-sheet>
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
				<view v-if="item.contact">
					<text class="colorGray">联系人：</text>
					<text>{{item.contact}}</text>
				</view>
				<view v-if="item.tel">
					<text class="colorGray">供方电话：</text>
					<text>{{item.tel}}</text>
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
				<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="selPcodeFun(item, index)">
					选择
				</u-button>
	
			</view>
		</view>
	</view>
	
</template>

<script>
	import {
		otsrtApi
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
					content: '是否确认选择委外厂家：' + that.item.F_ID + that.item.name,
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