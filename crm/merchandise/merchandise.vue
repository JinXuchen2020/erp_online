<template>
	<view>
		<searchView placeholderStr="请输入查询条件"  @searchViewClickFun="searchEventsFun($event)"></searchView>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品" title1="请添加或者更换查询条件">
		</dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="getChanPinFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="cardClick(item)">
				<view v-if="item.cpFmtList && item.cpFmtList.length > 0" class="myCard2">
					<view class="leftImg">
						<u-image height="160" width="160" border-radius="26" :src="item.cpFmtList[0].url"></u-image>
					</view>
					<view class="rightView">
						<view class="cardTopName1">{{item.pName}}</view>
						<view v-if="item.salesNum || item.stock" class="xlKcClass">
							<text v-if="item.salesNum">销量: {{item.salesNum}}</text>
							<text v-if="item.stock">库存: {{item.stock}}</text>
						</view>
						<view class="cardRow1">
							<text class="redColor">￥{{item.price}}</text>/{{item.unit}}
						</view>
						
					</view>
				</view>				
				<view v-else class="myCard">
					<view class="cardTopName">产品名称：{{item.name}}</view>
					<view class="myCard3">
						<view class="itemPhotoBox">
							<image :src="item.url" mode="widthFix"class="itemPhotoBox"></image>
						</view>
						<view class="infoBox">
							<view class="cardRow">
								<view>产品编码：</view>
								<view>{{item.code}}</view>
							</view>
							<view class="cardRow">
								<view>规格颜色：</view>
								<view>{{item.spec}} {{item.color}}</view>
							</view>
							<view class="cardRow">
								<view>产品功率：</view>
								<view>{{item.gl}}</view>
							</view>
							<view class="cardRow">
								<view>产品包装：</view>
								<view>{{item.jd}}</view>
							</view>
							<view class="cardRow">
								<view>所属仓库：</view>
								<view>{{item.ckmc}}</view>
							</view>
							<view class="cardRow">
								<view>库存数量：</view>
								<view>{{item.kc}}</view>
							</view>
							<!-- <view class="cardRow">
								<view>产品价格：</view>
								<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
							</view>
							<view class="cardRow">
								<view>库存金额：</view>
								<view><text class="redColor">{{item.account}}</text>/元</view>
							</view> -->
							<view class="cardRow">
								<view>产品类型：</view>
								<view>{{item.flName}}</view>
							</view>
							<view class="cardRow" v-if="item.salesNum">
								<view>产品销量：</view>
								<view>{{item.salesNum}}</view>
							</view>
							<view class="cardRow" v-if="item.stock">
								<view>产品库存：</view>
								<view>{{item.stock}}</view>
							</view>
							<view class="cardRow" v-if="item.bz">
								<view>产品简述：</view>
								<view>{{item.bz}}</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<getMore :isMore="isMore" class="h200"></getMore>
		</scroll-view>
		
		<!--底部合计-->
		<view class="submitView">
			<view class="cardTopName disFlexJ">
				<text>共计：{{gs}}个产品 </text>
			</view>
		</view>
	</view>
</template>

<script>
	let that = '';
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	
	import {
		crmChanpinApi,
		crmCpClassifyApi,
		fileApi
	} from '@/utils/api.js'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,			
		},
		data() {
			return {
				gs:0,
				triggered: false,
				pageIndex: 1,
				list: [],
				classify: [],
				dropdown1: '产品分类',
				cpClassify: '',
				cpFlId: '',
				isMore: true,
				scrollHeight: '667px',				
				options1: [],				
				isSxJ: true,
				
			}
		},
		onLoad() {
			that = this;
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			that.getClassifyFun();
		},
		methods: {
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params={
						isShow: true
					}
				let reqData = {
					action: 'get',
					params: JSON.stringify(params)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							that.classify = data;
							that.cpClassify = data[0].flName;
							that.cpFlId = data[0].id;
							
							that.getChanPinFun();
						} else {
							uni.showModal({
								title: '提示',
								content: '当前暂未设置产品分类，请先添加产品分类！',
								success(res) {
									if (res.confirm) {
										uni.redirectTo({
											url: './classify?pageType=add'
										})
									}
								}
							})
						}
					})
			},
			// 查询产品方法
			getChanPinFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let reqObj = {
					
					pageIndex: that.pageIndex,
					searchValue: that.searchValue,
					
				}
				let reqData = {
					action: 'getKcList',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				crmChanpinApi(reqData)
					.then(res => {
						let data = res.data.rows
						if (that.pageIndex == 1) {
							that.list = [];
						}
						if (data.length == 20) {
							that.pageIndex += 1;
							that.isMore = true;
						} else {
							that.isMore = false;
						}
						that.triggered = false;
						that.list = that.list.concat(data);
						that.gs =res.data.total;
					})
			},
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true; 
				that.pageIndex = 1;
				that.getChanPinFun();
			},
			
			
			// 卡片点击方法
			cardClick: function(item) {
				uni.$kcDetail = item;
				uni.navigateTo({
					url: './merchandiseDetail'
				})
			},
			
			
			// 删除产品云函数api
			deleteCpApiFun: function(id, index) {
				let params={
						id:id
					}
				let reqData = {
					action: 'deleteById',
					params: JSON.stringify(params)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				crmChanpinApi(reqData)
					.then(res => {
						uni.showToast({
							title: '删除成功!',
							icon: 'none',
							duration: 1000
						})
						that.list.splice(index, 1);
					})
			},
			// 删除产品图片api
			deleteCpFileFun: function(id, index, arr) {
				let fileList = [];
				for (var i = 0; i < arr.length; i++) {
					fileList.push(arr[i].fileId);
				}
				let params={
						fileList
					}
				let reqData = {
					action: 'delete',
					params: JSON.stringify(params)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				fileApi(reqData)
					.then(res => {
						that.deleteCpApiFun(id, index);
					})
			},
			
			onRefresh: function() {
				if (that.triggered) return
				that.triggered = true;
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
			},
			onRestore: function(e) {
				that.triggered = false; // 需要重置
			}
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
	.itemPhotoBox{
		width:200rpx;
		height: 200rpx;
		/* border:1px solid #000000; */
	}
	
	.myCard3{
		display: flex;
		flex-direction: row;
	}
	.infoBox{
		padding-left:20rpx;
	}
</style>
