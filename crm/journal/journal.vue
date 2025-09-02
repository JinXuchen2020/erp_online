<template>
	<view>
		
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
		<view @click="pickerSelectFun('银行账户')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">银行账户
				<text class="redXingh">*</text>
			</text>
			<view  :class="F_Bank ? '' : 'cBlack'">
				{{F_Bank ? F_Bank : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关日记账单"
			title1="请更换查询条件"></dataNull>
		<scroll-view scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="selectJournalFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index" >
					<journalCard :item="item" :index="index" :isSelect="isSelect"  :pagetype="'日记账列表'"  @cxGetDataFun="cxGetDataFun"></journalCard>
				</view>
				<getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
				<view class="h200"></view>
			</view>
			
		</scroll-view>
		<addBtn url="./addjournal?isAdd=1&&pageType=''"></addBtn>
		
		<!--底部合计-->
		<view class="submitView">
			<view class="cardTopName disFlexJ">
				<text>合计：{{gs}}个单 收入￥: {{djje}}元 支出: {{kjje}}元</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	let that = this;
	import {
		journalApi
	} from '@/utils/api.js'	
	import {
		getDayFun,getMonthFun
	} from '@/utils/date.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	import addBtn from '@/components/addBtn/addBtn.vue'
	import getMore from '@/components/getMore/getMore.vue'		
	import journalCard from '@/components/journal/journal.vue'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,			
			journalCard
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
				kjje:0,
				classify: [],
				Aid:0,
				F_Bank:'',
				selectList: [],
				selectShow: false,
				selectType:''
				
			}
		},
		onShow() {
			this.getClassifyFun();
		},
		onLoad(e) {
			that = this;	
			that.getClassifyFun();
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
			
			that.pageType = e.type ? e.type : '';
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			
			uni.$on('addJournalFun', that.addJournalFun)
			uni.$on('deleteJournalFun', that.deleteJournalFun)
			uni.$on('updateListByIndex', that.updateListByIndex)
			uni.$on('addItemInListFun', that.addItemInListFun)
			uni.$on('cxGetDataFun', that.cxGetDataFun)
			uni.$on('updateformFun1', that.updateformFun)
		},
		onBackPress() {
			uni.$off('addJournalFun', that.addJournalFun)
			uni.$off('deleteJournalFun', that.deleteJournalFun)
			uni.$off('updateListByIndex', that.updateListByIndex)
			uni.$off('addItemInListFun', that.addItemInListFun)
			uni.$off('cxGetDataFun', that.cxGetDataFun)
			uni.$off('updateformFun1', that.updateformFun)
		},
		methods: {
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					matchObj: {
						isShow: true
					}
				}
				let reqData = {
					action: 'getClassify',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				journalApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							that.Aid = data[0].Aid;
							that.F_Bank = data[0].F_Bank;	
							console.log('getClassifyFun里面赋值that.Aid',that.Aid)
							that.classify = data;
							that.selectJournalFun()
						} 
						else {
							uni.showModal({
								title: '提示',
								content: '当前暂未设置银行账号，请先添加银行账号！',
								success(res) {
									if (res.confirm) {
										uni.redirectTo({
											url: '../bnak/bank'
										})
									}
								}
							})
						}
					})
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if (str == '银行账户') {
					let classify = that.classify;
					let arr = [];
					for (var i = 0; i < classify.length; i++) {
						arr.push({
							value: classify[i].Aid,
							id: classify[i].Aid,
							label: classify[i].F_Bank
						})
					}
					that.selectList = arr;
				} 
				that.selectShow = true;
				that.selectType = str;
				
			},
			selectConfirmFun: function(e) {
				if (that.selectType == '银行账户') {
					that.F_Bank = e[0].label;
					that.Aid = e[0].Aid || e[0].value;
					that.selectJournalFun();
				}
			},
			updateformFun: function() {
				var that=this;
				 let hjje=0;
				let arr = that.tabList[0].arr;
				for (var i = 0; i < arr.length; i++) {
					hjje=+hjje+arr[i].F_Money;
				}
				that.djje =hjje;
				that.kjje =kjje;
				console.log('合计：',hjje);
				
			},
			// 查询日记账
			selectJournalFun: function() {
				if (!that.isMore) {
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				
				let reqObj = {					
					
					pageIndex: that.pageIndex,
					usercode: that.usercode,									
					searchValue: that.searchValue,
					startDate: that.startDate,
					endDate: that.endDate,
					Aid:that.Aid,
					F_Bank:that.F_Bank
				}
				let reqData = {
					action: 'selectjournal',
					params: JSON.stringify(reqObj)
				}
				
				journalApi(reqData)
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
						that.kjje =res.data.kjje;
						console.log('获得djje',that.djje)
					})
			},
			
			
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true; 
				that.pageIndex = 1;
				that.selectJournalFun();
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
				that.selectJournalFun();
			},
			deleteJournalFun: function(e) {
				
				let arr = that.list;
				arr.splice(e.index, 1);
				that.list = arr;
			},
			addJournalFun: function(e) {			
				
				let arr = that.list;
				arr.concat(uni.$addJournal);
				that.list = arr;
				
			},
			// 通过下标更新list数据
			updateListByIndex: function(e) {
				console.log('传递过来的index为：'+e.index)
				that.$set(that.list, parseInt(e.index), e.obj)
			},
			// add页面新增数据
			addItemInListFun: function(e) {
				console.log('新增传递过来的数组：',uni.$addJournal)
				let arr = that.list;
				arr.unshift(uni.$addJournal);
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
