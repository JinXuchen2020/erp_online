<template>
	<view>
		<u-navbar back-icon-color="#FFFFFF" title="产品详情" title-color="#FFFFFF" :title-bold="true"
			:background="background">
		</u-navbar>
		<u-swiper v-if="detail_lbt && detail_lbt.length > 0" :list="detail_lbt" name="url" :effect3d="true" height="320" class="swiperClass" @click="swiperClickFun"></u-swiper>
		<view class="myCard">
			<view class="cardTopName">产品名称：{{detail.name}}</view>
			<view class="cardRow" v-if="detail.F_ID">
				<view>产品编码：</view>
				<view>{{detail.F_ID}}</view>
			</view>
			<view class="cardRow">
				<view>产品状态：</view>
				<view>{{detail.isSxJ ? '上架中' : '下架'}}</view>
			</view>
			<view class="cardRow">
				<view>产品价格：</view>
				<view>{{detail.price}}元/{{detail.unit}}</view>
			</view>
			<view class="cardRow">
				<view>产品类型：</view>
				<view>{{detail.flName}}</view>
			</view>
			<view class="cardRow" v-if="detail.bz">
				<view>产品简述：</view>
				<view>{{detail.bz}}</view>
			</view>
			
		</view>
		<view class="xiangqing">
			— 详情 —
		</view>
		<view class="xqTitle">产品参数介绍</view>
		<view class="spXQBox" v-if="detail_cs && detail_cs.length > 0">
			<view style="font-size: 30rpx;">产品参数说明</view>
			<view class="table">
				<view class="row" v-for="(item, index) in detail_cs" :key="index">
					<view>{{item.F_Name}}</view>
					<view>{{item.F_Remark}}</view>
				</view>
			</view>
		</view>
		<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无产品参数说明"></dataNull>
		<view class="xqTitle">产品详情图</view>
		<view class="imgXQ" v-if="detail_xqt && detail_xqt.length > 0">
			<u-image width="100%" mode="widthFix" v-for="(item, index) in detail_xqt" :key="index" :src="item.url"
				:lazy-load="true" @click="xqtClickFun(item.url, detail_xqt)"></u-image>
		</view>
		<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无产品详情图"></dataNull>
		
		
		<!--商城按钮-->
		<button v-if="pageType" @click="gotoShopFun" class="shopBtn">商城</button>
		<!--分享按钮-->
		<button v-if="pageType" open-type="share" class="addBtn">
			<u-icon name="zhuanfa" color="#ffffff" size="40"></u-icon>
		</button>
	</view>
</template>

<script>
	let that = '';
	import { crmChanpinApi } from '@/utils/api.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	export default {
		components: {
			dataNull
		},
		data() {
			return {
				detail: {},
				detail_cs: {},
				detail_fmt: {},
				detail_lbt: {},
				detail_xqt: {},
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, rgb(12, 168, 234))'
				},
				customStyle: {
					backgroundColor: 'rgb(13, 159, 224)',
					color: '#FFFFFF',
					border: '0',
					fontSize: '32',
					outline: 'none'
				},
				lbt: [],
				pageType: ''
			}
		},
		onLoad(e) {
			that = this;
			that.pageType = e.type || ''
			if(e.code) {
				that.getGoodDetailByIdFun(e.code)
			} else {
				that.detail = uni.$kcDetail;
				
				that.getGoodDetailByIdFun(that.detail.code)
				uni.setNavigationBarTitle({
					title: that.detail.pName
				})
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '您好，这是产品：' + that.detail.pName + '的详情，快来查看吧！',
				path: '/chanpin/view/cpDetail?id=' + that.detail.F_ID + '&type=client'
			}
		},
		methods: {
			// 轮播点击方法
			swiperClickFun: function(e) {
				let list = that.detail.cpLbtList;
				let str = list[e].url;
				let arr = [];
				for (var i = 0; i < list.length; i++) {
					arr.push(list[i].url);
				}
				that.previewImageFun(str, arr);
			},
			// 详情图点击方法
			xqtClickFun: function(str, list) {
				let arr = [];
				for (var i = 0; i < list.length; i++) {
					arr.push(list[i].url);
				}
				that.previewImageFun(str, arr);
			},
			// 预览图片
			previewImageFun: function(str, list) {
				uni.previewImage({
					urls: list,
					indicator: 'number',
					current: str
				})
			},
			
			// 根据商品id查询商品详情
			getGoodDetailByIdFun: function(id) {
				let params={
						id
					}
				let reqData = {
					action: 'getDetailById',
					params: JSON.stringify(params)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				crmChanpinApi(reqData)
				.then(res => {
					let data = res.data.rows;
					if(data.length > 0) {
						that.detail = data[0];
						that.detail_cs = res.data.cpcs;
						uni.$cpDetail_cs= res.data.cpcs;
						that.detail_fmt = res.data.fmt;
						uni.$cpDetail_fmt= res.data.fmt;
						that.detail_lbt = res.data.lbt;
						uni.$cpDetail_lbt= res.data.lbt;
						that.detail_xqt = res.data.xqt;
						uni.$cpDetail_xqt= res.data.xqt;
						uni.setNavigationBarTitle({
							title: that.detail.pName
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '当前商品不存在或已被删除，点击确定跳往首页！',
							showCancel: false,
							success() {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}
						})
					}
				})
			},
			// 跳往商城页面
			gotoShopFun: function() {
				uni.redirectTo({
					url: 'shop?id=' + that.detail.cjRenId
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #F8F8F8;
		padding-bottom: 100rpx;
	}

	.swiperClass {
		margin-top: 16rpx;
	}

	.xiangqing {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin: 16rpx 0;
	}

	.spXQBox {
		width: 698rpx;
		margin: 0 26rpx;
		background-color: #FFFFFF;
		padding: 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
	}

	.table {
		width: 100%;
		border: 1rpx solid #E7E7E7;
		margin: 32rpx 0;
	}

	.row {
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1rpx solid #E7E7E7;
	}

	.row>view:first-child {
		width: 180rpx;
		height: 100%;
		font-size: 28rpx;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.row>view:last-child {
		width: 506rpx;
		height: 100%;
		font-size: 28rpx;
		padding: 16rpx;
		box-sizing: border-box;
		border-left: 1rpx solid #E7E7E7;
	}

	.imgXQ {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 32rpx;
	}

	.imgXqtp {
		width: 100%;
	}

	.flexRow {
		display: flex;
	}
	.xqTitle {
		font-size: 16px;
		font-weight: bold;
		margin: 26rpx;
	}
	.addBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 80rpx;
		right: 26rpx;
		z-index: 100;
	}
	.addBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
	.shopBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0;
		color: #FFFFFF;
		font-weight: bold;
		justify-content: center;
		position: fixed;
		bottom: 190rpx;
		right: 26rpx;
		z-index: 100;
	}
	.shopBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
	.nameCardBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0;
		color: #FFFFFF;
		font-weight: bold;
		justify-content: center;
		position: fixed;
		bottom: 300rpx;
		right: 26rpx;
		z-index: 100;
	}
	.nameCardBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
	
</style>
