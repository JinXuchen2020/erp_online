<template>
	<view>
		<view class="card">
			<view class="topRow1" @click="gotoDetailFun">
				<view class="name">
					<text>{{item.name || '暂无'}}</text>
					<view class="rowBtn">
						<u-button type="primary" :plain="true" class="cpBtn" size="mini"
							@click="selClientFun(item, index)">选择供应商
						</u-button>

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
				userList: []
			}
		},
		methods: {
			moreShowFun: function() {
				let status = this.item.status;

				this.sheetList = [{
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
					url: './khDetail?index=' + this.index
				})
			},

			// 选择供应商
			selClientFun: function(item, index) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认选择供应商：' + that.item.name,
					success(rrr) {
						if (rrr.confirm) {

							uni.showLoading({
								title: '赋值中...',
								duration: 1000
							})
							uni.$emit("selectClient1", {
								"item": item
							})
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

	.rowBtn {
		width: 100%;
		text-align: right;
	}
</style>