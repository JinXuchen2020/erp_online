<template>
	<view>
		<searchView placeholderStr="请输入查询条件"  @searchViewClickFun="searchEventsFun($event)"></searchView>
		<view class="dateSelectRow">
			<view>
				<text>开始日期: </text>
				<picker mode="date" :value="startDate" start="1999-02-15" end="2100-02-15" @change="bindsDateChange">
					<text class="dateText">{{startDate}}</text>
				</picker>
			</view>
			<view>
				<text>结束日期: </text>
				<picker mode="date" :value="endDate" start="1999-02-15" end="2100-02-15" @change="bindeDateChange">
					<text class="dateText">{{endDate}}</text>
				</picker>
			</view>
		</view>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关销售订单"
			title1="请更换查询条件"></dataNull>
		<scroll-view scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectPIFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="item.F_BillID" >
					<PICard :item="item" :index="index" :isSelect="isSelect"  :pagetype="'订单列表'" :isCheck="item.sh"  @cxGetDataFun="cxGetDataFun"></PICard>
				</view>
				<getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
				<view class="h200"></view>
			</view>
			
		</scroll-view>
		<addBtn url="./PIDetail?index=-1"></addBtn>
		
		<!--底部合计-->
		<view class="submitView">
			<view class="cardTopName disFlexJ">
				<text>合计：{{gs}}个单 ￥: {{djje}}元</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	let that = this;
	import {
		PIApi
	} from '@/utils/api.js'	
	import {
		getDayFun,getMonthFun
	} from '@/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'		
	import PICard from '@/components/PI/PI.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,			
			PICard
		},
		data() {
			return {
				startDate: '',
				endDate: '',
				triggered: false,
				list: [],
				moreShow: false,				
				isMore: true,
				pageIndex: 1,
				scrollHeight: '667px',
				pageType: '',							
				dateReq: [], // 日期相关请求参数							
				searchValue: '',
				isSelect: false,				
				usercode: '',
				gs:0,
				djje:0,
				wsdd:false,
				jrdf:false,
				yqwf:false,
			}
		},
		onLoad(e) {
			that = this;						
			let dArr = getMonthFun()
			dArr[1] -= 1;
			that.startDateTime = dArr[0];
			that.endDateTime = dArr[1];
			that.startDate = this.$u.timeFormat(dArr[0], 'yyyy-mm-dd');
			that.endDate = this.$u.timeFormat(dArr[1], 'yyyy-mm-dd');			
			that.usercode = uni.$userInfo.F_ID;
			
			if(e.type) {
				that.isSelect = true;
			}
			if(e.sh==0)
			{
				that.wsdd=true;
			}
			if(e.jrdf==1)
			{
				that.jrdf=true;
			}
			if(e.yqwf==1)
			{
				that.yqwf=true;
			}
			that.pageType = e.type ? e.type : '';
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})			
			
			that.cxGetDataFun();
			uni.$on('addPIFun', that.addPIFun)
			uni.$on('deletePIFun', that.deletePIFun)
			uni.$on('updateListByIndex', that.updateListByIndex)
			uni.$on('updateListCheckByIndex', that.updateListCheckByIndex)
			uni.$on('addItemInListFun', that.cxGetDataFun)
			uni.$on('cxGetDataFun', that.cxGetDataFun)
			uni.$on('updateformFun1', that.updateformFun)
		},
		onBackPress() {
			uni.$off('addPIFun', that.addPIFun)
			uni.$off('deletePIFun', that.deletePIFun)
			uni.$off('updateListByIndex', that.updateListByIndex)
			uni.$off('updateListCheckByIndex', that.updateListCheckByIndex)
			uni.$off('addItemInListFun', that.cxGetDataFun)
			uni.$off('cxGetDataFun', that.cxGetDataFun)
			uni.$off('updateformFun1', that.updateformFun)
		},
		methods: {
			updateformFun: function() {
				var that=this;
				 let hjje=0;
				let arr = that.tabList[0].arr;
				for (var i = 0; i < arr.length; i++) {
					hjje=+hjje+arr[i].account;
				}
				that.djje =hjje;
				console.log('合计：',hjje);
				
			},
			// 查询订单
			selectPIFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				
				let reqObj = {					
					wsdd:that.wsdd,
					jrdf:that.jrdf,
					yqwf:that.yqwf,
					pageIndex: that.pageIndex,
					usercode: that.usercode,									
					searchValue: that.searchValue,
					startDate: that.startDate,
					endDate: that.endDate,					
				}
				let reqData = {
					action: 'selectPI',
					params: JSON.stringify(reqObj)
				}
				
				PIApi(reqData)
					.then(res => {
						this.triggered = false;
						let data = res.data.rows;						
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
						that.djje =res.data.djje;
					})
			},
			
			
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true; 
				that.pageIndex = 1;
				that.selectPIFun();
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
				that.selectPIFun();
			},
			deletePIFun: function(e) {
				
				let arr = that.list;
				arr.splice(e.index, 1);
				that.list = arr;
			},
			addPIFun: function(e) {			
				
				let arr = that.list;
				arr.concat(uni.$addPI);
				that.list = arr;
				
			},
			// 通过下标更新list数据
			updateListByIndex: function(e) {
				
				that.$set(that.list, parseInt(e.index), e.obj)
			},
			// 通过下标更新list数据
			updateListCheckByIndex: function(e) {
				console.log('传递过来的index：',e.index)
				console.log('传递过来的审核标记：',e.obj.sh)
				that.list.splice(parseInt(e.index),1,e.obj)
				
			},
			
			// add页面新增数据
			addItemInListFun: function(e) {
				console.log('新增传递过来的数组：',uni.$addPI)
				let arr = that.list;
				arr.unshift(uni.$addPI);
				that.list = arr;
				uni.pageScrollTo({
					scrollTop: 0
				})
			},
			bindsDateChange: function(e) {
				let data = e.detail.value;
				that.startDate = data;
				that.startDateTime = new Date(data + ' 00:00:00').getTime()
			},
			bindeDateChange: function(e) {
				let data = e.detail.value;
				that.endDate = data;
				that.endDateTime = new Date(data + ' 23:59:59').getTime()
			},
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
	.dateSelectRow {
		margin: 0 32rpx;
		font-size: 15px;
		display: flex;
		justify-content: space-between;
	}
	
	.dateSelectRow>view {
		display: flex;
		align-items: center;
		padding: 26rpx 0 16rpx;
	}
	
	.dateText {
		font-weight: bold;
		padding-left: 10rpx;
	}
</style>
