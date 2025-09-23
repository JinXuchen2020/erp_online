<template>
	<view>
		<searchView placeholderStr="请输入查询条件"  @searchViewClickFun="searchEventsFun($event)"></searchView>
		<view class="scrollF">
			<view class="leftScrollV">
				<scroll-view scroll-y="true" :style="{height: scrollHeight}">
					<view v-for="(item, index) in classify" :key="index" class="leftCardView">
						<view class="leftCard" :class="{ leftActive: leftA == index }" @click="selectLeftFl(index)">{{item.F_Name}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="rightSv">
				<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关客户"
					title1="请更换查询条件"></dataNull>
				<scroll-view scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectsupplierFun"
					refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
					@refresherrefresh="onRefresh" @refresherrestore="onRestore">
					<view v-if="list.length > 0">
						<view v-for="(item, index) in list" :key="index" @click="khCardClickFun(item)">
							<supplierCard :item="item" :isSelect="isSelect" :index="index" @cxGetDataFun="cxGetDataFun"></supplierCard>
						</view>
						<getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
						<view class="h200"></view>
					</view>
					
				</scroll-view>
				<!--底部合计-->
				<view class="submitView">
					<view class="cardTopName disFlexJ">
						<text>供方：{{gs}}个 </text>
					</view>
				</view>
			</view>
		</view>
		<addBtn url="./addsupplier?isAdd=1&&pageType=''"></addBtn>
		<u-action-sheet :list="sheetList" v-model="moreShow"></u-action-sheet>
		
	</view>
	
</template>

<script>
	let that = this;
	import {
		supplierApi
	} from '@/utils/api.js'
	import { tyDropDown, dropDownByUser, khsxData, datePxData } from '@/utils/dropdown.js'
	import {
		getDayFun, getDayByNumFun
	} from '@/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'
	
	import supplierCard from '@/components/card/supplier.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			
			supplierCard
		},
		data() {
			return {
				triggered: false,
				dropdown1: '全部',
				options1: tyDropDown,
				optionsPx: datePxData,
				classify: [],
				sxList: [],
				list: [],
				moreShow: false,
				sheetList: [{
						text: '添加跟进'
					},
					{
						text: '添加标签'
					}
				],
				isMore: true,
				pageIndex: 1,
				scrollHeight: '667px',
				pageType: '',
				sortObj: {
					update_date: -1
				},
				optionsReq: {}, // 第一个下拉框请求参数
				dateReq: [], // 日期相关请求参数
				sxReq: JSON.stringify({}), // 筛选想请求参数
				matchObj: {},
				searchValue: '',
				isSelect: false,				
				depId: undefined,
				gs:0,
				cpClassify: '',
				cpFlId: '',
				leftA: 0,
			}
		},
		onLoad(e) {
			that = this;
			let khsxList = JSON.stringify(khsxData);
			that.sxList = JSON.parse(khsxList);
			let obj = {};
			if(uni.$userInfo.isDepManager) {
				that.options1 = tyDropDown;
				that.depId = uni.$userInfo.depManager_Id;
			} else {
				that.options1 = dropDownByUser;
				obj.fuZeRenId = uni.$userInfo.id;
			}
			if(e.type) {
				that.isSelect = true;
			}
			that.matchObj = obj;
			that.optionsReq = JSON.stringify(obj);
			that.pageType = e.type ? e.type : '';
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			that.getClassifyFun();
			that.selectsupplierFun();
			uni.$on('deleteSupplierFun', that.deleteSupplierFun)
			uni.$on('updateListByIndex', that.updateListByIndex)
			uni.$on('addItemInListFun', that.addItemInListFun)
			uni.$on('cxGetDataFun', that.cxGetDataFun)
		},
		onBackPress() {
			uni.$off('deleteSupplierFun', that.deleteSupplierFun)
			uni.$off('updateListByIndex', that.updateListByIndex)
			uni.$off('addItemInListFun', that.addItemInListFun)
			uni.$off('cxGetDataFun', that.cxGetDataFun)
		},
		methods: {
			selectLeftFl: function(i) {
				this.leftA = i;
				this.cpClassify = this.classify[i].F_Name;
				this.cpFlId = this.classify[i].F_ID;
				this.pageIndex = 1;
				this.isMore = true;
				this.selectsupplierFun();
			},
			// 查询供方分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params={
						isShow: true
					}
				let reqData = {
					action: 'getClassify',
					params: JSON.stringify(params)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				supplierApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							that.classify = data;
							that.classify.unshift({
								F_ID: -1,
								F_Name: "全部"
							})
						} 
					})
			},
			// 查询供方
			selectsupplierFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let matchObj = {
					status: 1,
				}
				
				let reqObj = {
					
					pageIndex: that.pageIndex,					
					searchValue: that.searchValue
				}
				
				if(that.cpClassify && that.cpFlId != -1){
					reqObj.type = that.cpClassify;
					reqObj.F_Type =that.cpFlId
				}
				let reqData = {
					action: 'selectSupplier',
					params: JSON.stringify(reqObj)
				}
				console.log('action方法：'+reqData.action+' 传递参数：'+reqData.params)
				supplierApi(reqData)
					.then(res => {
						this.triggered = false;
						let data = res.data.rows;
						console.log(data)
						if (that.pageIndex == 1) {
							that.list = [];
						}
						if (data.length == 20) {
							that.pageIndex += 1;
							that.isMore = true;
						} else {
							that.isMore = false;
						}
						that.list = that.list.concat(data);
						that.gs =res.data.total;
					})
			},
			// 供方点击方法
			khCardClickFun: function(item) {
				uni.$khInfo = item;
				if (that.pageType == 'lxr') {
					uni.$emit('supplierBindFun', {
						supplierName: item.name,
						supplierId: item.F_ID
					})
					uni.navigateBack()
				} else if(that.pageType != '') {
					uni.$khInfo = item;
					uni.$emit('supplierBindFun', item)
					uni.navigateBack()
				}
				 // else {
				 // 	uni.$khInfo = item;
				 // 	uni.navigateTo({
				 // 		url: './khDetail'
				 // 	})
				 // }
			},		
			
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true; 
				that.pageIndex = 1;
				that.selectsupplierFun();
			},	
			// 下拉刷新
			onRefresh: function() {
				if(that.triggered) return
				that.triggered = true;
				that.cxGetDataFun();
			},
			onRestore: function(e) {
				that.triggered = false; // 需要重置
			},
			// 重新获取数据
			cxGetDataFun: function() {				
				that.pageIndex = 1;
				that.isMore = true;
				that.selectsupplierFun();
			},
			deleteSupplierFun: function(e) {
				let arr = that.list;
				arr.splice(e.index, 1);
				that.list = arr;
			},
			// 通过下标更新list数据
			updateListByIndex: function(e) {
				console.log('传递过来的index为：'+e.index)
				that.$set(that.list, parseInt(e.index), e.obj)
			},
			// add页面新增数据
			addItemInListFun: function() {
				
				let arr = that.list;
				arr.unshift(uni.$addSupplier);
				that.list = arr;
				uni.pageScrollTo({
					scrollTop: 0
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
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

	.topRow {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.txView {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 26rpx;
	}

	.txViewImg {
		width: 100%;
		height: 100%;
	}

	.info {
		width: 492rpx;
		font-size: 15px;
		color: #000;
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
	.scrollF {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.leftScrollV {
		width: 160rpx;
		height: 100%;
		background-color: #FFFFFF;
	}
	
	.rightSv {
		flex-grow: 1;
		/* padding: 0 16rpx; */
		box-sizing: border-box;
		height: 100%;
		background-color: #FFFFFF;
		display: flex;
		width: 0;
		position: relative;
	}
	
	.leftCard {
		width: 100%;
		/* height: 196rpx; */
		align-items: center;
		/* line-height: 196rpx; */
		font-size: 30rpx;
		text-align: center;
		/* overflow: hidden; */
		margin: 10rpx 0rpx;
		padding: 10rpx;
		/* text-overflow: ellipsis; */
		white-space: wrap;
		background-color: #f8f8f8;
	}
	
	.leftCardView:last-child {
		margin-bottom: 100rpx;
	}
	
	.leftActive {
		background-color: #FFFFFF;
		color: #007AFF;
		font-weight: bold;
	}
	
	.submitView {
		width: 100%;
		padding: 16rpx 0 26rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #f1f1f1;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}
</style>
