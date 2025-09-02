<template>
	<view>
		<searchView placeholderStr="请输入查询条件"  @searchViewClickFun="searchEventsFun($event)"></searchView>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关付款方式"
			title1="请更换查询条件"></dataNull>
		<scroll-view scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectclientFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index" >
					<selPrintfile :item="item" :isSelect="isSelect" :index="index" @cxGetDataFun="cxGetDataFun"></selPrintfile>
				</view>
				<getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
				<view class="h200"></view>
			</view>
			
		</scroll-view>
		
		
		<!--底部合计-->
		<view class="submitView">
			<view class="cardTopName disFlexJ">
				<text>打印样式：{{gs}}种 </text>
			</view>
		</view>
	</view>
	
</template>

<script>
	let that = this;
	import {
		prdplanApi
	} from '@/utils/api.js'	
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'	
	import selPrintfile from '@/components/prdplan/selPrintfile.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,
			selPrintfile
		},
		data() {
			return {
				triggered: false,
				sxList: [],
				list: [],
				moreShow: false,				
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
				tabNoEqualArr: [], //标签页不等于数据
				depId: undefined,
				gs:0
			}
		},
		onLoad(e) {
			that = this;
			
			let obj = {};			
			if(e.type) {
				that.isSelect = true;
			}
			
			that.pageType = e.type ? e.type : '';
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			
			that.selectPrintfileFun();
			
			uni.$on('updateListByIndex', that.updateListByIndex)
			uni.$on('addItemInListFun', that.addItemInListFun)
			uni.$on('cxGetDataFun', that.cxGetDataFun)
		},
		onBackPress() {			
			uni.$off('updateListByIndex', that.updateListByIndex)
			uni.$off('addItemInListFun', that.addItemInListFun)
			uni.$off('cxGetDataFun', that.cxGetDataFun)
		},
		methods: {
			
			// 查询打印文件
			selectPrintfileFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				
				let reqObj = {
					pageIndex: that.pageIndex,
					tabNoEqualArr: that.tabNoEqualArr,
					searchValue: that.searchValue
				}
				let reqData = {
					action: 'selectPrintfile',
					params: JSON.stringify(reqObj)
				}
				console.log('action方法：'+reqData.action+' 传递参数：'+reqData.params)
				prdplanApi(reqData)
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
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true; 
				that.pageIndex = 1;
				that.selectclientFun();
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
				that.selectclientFun();
			},			
			// 通过下标更新list数据
			updateListByIndex: function(e) {
				that.$set(that.list, parseInt(e.index), e.obj)
			},
			// add页面新增数据
			addItemInListFun: function(e) {
				let arr = that.list;
				arr.unshift(e);
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

	.card {
		width: 698rpx;
		padding: 26rpx 26rpx 10rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
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
</style>
