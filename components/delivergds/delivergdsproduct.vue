<template>

	<view v-else class="myCard">
		<view class="cardTopName">产品名称：{{item.itemcode}} {{item.itemname}}</view>
		<view class="myCard3">
			<view class="itemPhotoBox">
				<image :src="item.url" mode="widthFix" class="itemPhotoBox"></image>
			</view>
			<view class="infoBox">
				<view class="cardRow" v-if="item.spec">
					<view>工厂型号：</view>
					<view>{{item.spec}}</view>
				</view>
				<view class="cardRow1" v-if="item.itemname">
					<view>产品名称：</view>
					<view>{{item.itemname}}</view>
				</view>
				<view class="cardRow1" v-if="item.color">
					<view>五金颜色：</view>
					<view>{{item.color}}</view>
				</view>
				<view class="cardRow" v-if="item.countt">
					<view>发货数量：</view>
					<view><text class="redColor">{{item.countt}}</text>{{item.unit}}</view>
				</view>
				<view class="cardRow" v-if="item.price">
					<view>销售单价：</view>
					<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
				</view>
				<view class="cardRow" v-if="item.account">
					<view>总金额：</view>
					<view><text class="redColor">￥{{item.account}}</text>元</view>
				</view>
				<view class="cardRow" v-if="item.hl">
					<view>汇率：</view>
					<view><text class="redColor">{{item.hl}}</text></view>
				</view>
				<view class="cardRow" v-if="item.rmb">
					<view>折合人民币：</view>
					<view><text class="redColor">{{item.rmb}}</text></view>
				</view>
				<view class="cardRow1">
					<view>备注：</view>
					<view>{{item.bz}}</view>
				</view>

			</view>

		</view>

		<view class="rowBtn">
			<u-button type="primary" :plain="true" class="cpBtn" size="mini" @click="searchShow = true">修改数量
			</u-button>

			<u-button type="error" :plain="true" class="cpBtn" size="mini" @click="deleteCpFun(item, index)">
				删除</u-button>
		</view>
		<!--搜索弹窗-->
		<u-popup v-model="searchShow" mode="center" width="666rpx" border-radius="14" :closeable="false">
			<view class="searchBox">
				<view class="searchTitle">输入数量</view>
				<u-field v-model="searchValue1" :label="searchLabel1" :placeholder="searchPh1"
					clear-size="40"></u-field>
				<u-field v-model="searchValue2" :label="searchLabel2" :placeholder="searchPh2"
					clear-size="40"></u-field>
				<view class="searchBtnRow">
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="searchShow = false">取消</u-button>
					<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="updateItemFun">确认</u-button>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import {
		clientApi
	} from '../../utils/api.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			},
			searchLabel1: '',
			searchLabel2: '',
			searchPh1: '',
			searchPh2: '',

		},
		data() {
			return {
				searchShow: false,
				searchValue1: this.item.countt,
				searchValue2: this.item.price,
			}
		},
		methods: {

			// 搜索处理函数
			updateItemFun: function() {
				this.searchShow = false;

				this.item.countt = this.searchValue1;
				this.item.price = this.searchValue2;
				this.item.account = +this.searchValue1 * this.searchValue2
				setTimeout(() => {
					uni.$emit("updateItemFun1")
				}, 23)

			},
			// setCpFun(){
			// 	//this.$refs.popup.open()
			// },
			// gotoDetailFun: function() {
			// 	uni.$gjInfo = this.item;
			// 	uni.navigateTo({
			// 		url: '/pages/crm/genJin/detail?index=' + this.index
			// 	})
			// },
			// 删除产品
			deleteCpFun: function(item, index) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除产品：' + item.itemname,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
							let params = {
								itemcode: item.itemcode,
								F_BillID: item.F_BillID,
							}
							let reqData = {
								action: 'deldelivergdsdetailById',
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
									uni.$emit('deldelivergdsdetailById', {
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
		align-items: center;
		font-size: 16px;
		margin-bottom: 8rpx;
	}

	.cardRow1>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}

	.cardRow1>view:last-child {
		color: #000000;
		width: 266rpx;
	}

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

	.itemPhotoBox {
		width: 200rpx;
		height: 200rpx;
		/* border:1px solid #000000; */
	}

	.myCard3 {
		display: flex;
		flex-direction: row;
	}

	.infoBox {
		padding-left: 20rpx;
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