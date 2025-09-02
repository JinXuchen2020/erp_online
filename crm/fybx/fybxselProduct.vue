<template>
	<view>
		<searchView placeholderStr="请输入查询条件" @searchViewClickFun="searchEventsFun($event)"></searchView>
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
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品" title1="请添加或者更换查询条件">
		</dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="getChanPinFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="cardClick(item)">
				<view class="myCard">
					<view class="cardTopName">收货单号：{{item.F_Billid}}</view>
					<view class="myCard3">
						
						<view class="infoBox">
							<view class="cardRow">
								<view>收货日期：</view>
								<view><text class="redColor">{{item.actdate}} </text> {{item.color}} </view>
							</view>
							<view class="cardRow">
								<view>税前金额：</view>
								<view><text class="redColor">￥{{item.F_TotalMoney}}</text></view>
							</view>
							<view class="cardRow">
								<view>税额：</view>
								<view><text class="redColor">￥{{item.F_Tax}}</text></view>
							</view>
							<view class="cardRow">
								<view>税价合计：</view>
								<view><text class="redColor">￥{{item.F_Total}}</text></view>
							</view>
							<view class="cardRow">
								<view>已收金额：</view>
								<view>{{item.F_AcceptMoney}}</view>
							</view>
							<view class="cardRow">
								<view>未收金额：</view>
								<view>{{item.F_NoAccept}}</view>
							</view>
							<view class="cardRow">
								<view>本次付款：</view>
								<view>{{item.F_Money}}</view>
							</view>
							<view class="cardRow">
								<view>本次扣减：</view>
								<view>{{item.F_DisMoney}}</view>
							</view>							
							<view class="cardRow" v-if="item.bz">
								<view>单据备注：</view>
								<view>{{item.bz}}</view>
							</view>
						</view>

					</view>

					<view class="rowBtn">
						<u-button type="primary" :plain="true" class="cpBtn" size="mini" @click="selectItem(index)">选择单据
						</u-button>
						<view class="counttcss" v-if="item.F_Money">
							款：{{item.F_Money}}税：{{item.F_Tax}}
						</view>
						<view class="counttcss" v-if="item.F_DisMoney">
							扣减：{{item.F_DisMoney}}
						</view>
						
						<u-button type="error" :plain="true" class="cpBtn" size="mini" @click="delcountt(index)">
							删除</u-button>
					</view>
					<!--搜索弹窗-->


				</view>
			</view>
			<getMore :isMore="isMore" class="h200"></getMore>
		</scroll-view>
		<uni-popup ref="popucountt" mode="center" width="666rpx" border-radius="14" :closeable="false">
			<view class="searchBox">
				<u-field v-model="F_Tax" :label="'税额'" :placeholder="'请输入税额'" clear-size="40"></u-field>
				<u-field v-model="F_Money" :label="'付款金额'" :placeholder="'请输入付款金额'" clear-size="40"></u-field>
				<u-field v-model="F_DisMoney" :label="'扣减金额'" :placeholder="'请输入扣减金额'" clear-size="40"></u-field>
				
				<view class="searchBtnRow">
					<u-button type="warning" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="popuclose">取消</u-button>
					<u-button type="primary" class="searchBtn" :ripple="true" ripple-bg-color="#909399" :plain="true"
						size="medium" @click="inputcountFun">确认</u-button>
				</view>
			</view>
		</uni-popup>
		<!--底部合计-->
		<view class="submitView">
			<view class="cardTopName disFlexJ">
				<view class="box">
					税：{{F_Tax}}合计：{{F_Total}}
				</view>
				<view class="box">
					扣：{{total}}
				</view>
				<button type="primary" @click="sumbit">提交</button>
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
		fybxApi
	} from '@/utils/api.js'
	import {
		getMonthFun
	} from '@/utils/date.js'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,

		},
		data() {
			return {
				startDate: '',
				endDate: '',
				itemList: [],
				total: 0,
				qty: 0,
				F_Tax:0,
				F_Total:0,
				isshow: true,
				currency: -1,
				F_Money: "",
				F_DisMoney: "",
				inputShow: false,
				gs: 0,
				triggered: false,
				pageIndex: 1,
				list: [],
				isMore: true,
				scrollHeight: '667px',				
				options1: [],				
				isSxJ: true,
				F_SupplierID:'',
			}
		},
		onLoad(e) {
			that = this;
			let dArr = getMonthFun()
			dArr[1] -= 1;
			that.F_SupplierID=e.F_SupplierID;
			console.log('传递过来的供应编号：'+e.F_SupplierID);
			that.startDate = this.$u.timeFormat(dArr[0], 'yyyy-mm-dd');
			that.endDate = this.$u.timeFormat(dArr[1], 'yyyy-mm-dd');
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 40 + 'px';
				}
			})
			that.itemList = uni.getStorageSync("fybxdetail")
			setTimeout(()=>{that.getChanPinFun();},200)
			
			
			
		},
		methods: {
			sumbit() {
				var selectlist = this.itemList
				
				
				uni.$emit("itemBind", {
					"itemList": selectlist,
					"qty":this.qty,
					"total":this.total,
					"F_Tax":this.F_Tax,
					"F_Total":this.F_Total
				})
				uni.navigateBack()
			},
			setsum() {
				this.total = 0
				this.qty = 0
				this.F_Tax = 0
				this.F_Total = 0
				for (var i = 0; i < this.itemList.length; i++) {					
					if (this.itemList[i].F_ThisMoney) {
						this.qty += +this.itemList[i].F_ThisMoney
						this.total += +this.itemList[i].F_DisMoney 
						this.F_Tax += +this.itemList[i].F_Tax
						this.F_Total += (+this.itemList[i].F_Tax)+(+this.itemList[i].F_ThisMoney)
					}
				}
				
				console.log('得到税价合计：'+this.F_Total+',税：'+this.F_Tax+' money:'+this.qty+'记录数：'+this.itemList.length+'thismoney:'+this.itemList[0].F_ThisMoney)
			},
			delcountt(index) {
				// console.log(index);
				this.list[index].F_Money = 0
				this.list[index].F_Tax = 0
				this.list[index].F_Total = 0
				var num=this.itemList.findIndex(v=>v.F_LinkBill===this.list[index].F_BillID)
				
				console.log(num);
				if(num>=0){
					this.itemList.splice(num,1)
					console.log(this.itemList);
				}
				
				this.setsum()
				

			},
			popuclose() {
				this.$refs.popucountt.close()
			},
			selectItem(index) {
				
				if(this.F_Money=='')
				{
					this.F_Money= this.list[index].F_Money
				}
				else
				{
					this.F_Money= this.list[index].F_Money
				}
				this.F_Tax =this.list[index].F_Tax
				this.F_Total= +this.list[index].F_Tax + (+this.F_Money)
				this.currency = index
				this.F_DisMoney = this.list[index].F_DisMoney ? this.list[index].F_DisMoney : 0
				this.$refs.popucountt.open()
			},
			// 搜索处理函数
			inputcountFun: function() {
				this.inputShow = false;
				this.list[this.currency].F_Money = +this.F_Money
				this.list[this.currency].F_DisMoney = +this.F_DisMoney
				this.list[this.currency].F_Tax = +this.F_Tax
				this.list[this.currency].F_Total = +this.F_Tax +(+this.F_Money)
				this.list[this.currency].check = true
				var num = this.itemList.findIndex(v=>v.F_LinkBill === this.list[this.currency].F_Billid)
				console.log('当前单号：'+this.list[this.currency].F_Billid)
				if(num>=0){
					this.itemList[num].F_Money=+this.F_Money
					this.itemList[num].F_DisMoney=+this.F_DisMoney
					this.itemList[num].F_Tax=+this.F_Tax
					this.itemList[num].F_Total=+this.F_Tax +(+this.F_Money)
					console.log('修改老条目，金额：'+this.F_money+'单号：'+this.list[this.currency].F_Billid)
				}
				else{
					var item={}
					item.Aid=this.itemList.length
					item.F_BillID=''
					item.F_Tag=this.list[this.currency].F_Tag
					item.F_LinkBill=this.list[this.currency].F_Billid
					item.F_Date=this.list[this.currency].actdate
					item.F_BillMoney=this.list[this.currency].F_TotalMoney
					item.F_HasMoney=this.list[this.currency].F_AcceptMoney
					item.F_NoMoney=this.list[this.currency].F_NoAccept
					item.F_ThisMoney=this.list[this.currency].F_Money
					item.F_DisMoney=this.list[this.currency].F_DisMoney
					item.F_Tax=this.list[this.currency].F_Tax
					item.F_Total=(+this.list[this.currency].F_Tax)+(+this.list[this.currency].F_Money)
					item.F_Remark=''
					this.itemList.push(item)
					console.log('新增itemlist'+num+'合计金额：'+item.F_Total)
				}
				this.$refs.popucountt.close()
				if(this.itemList.length)
				{
					
					this.setsum()
					// /* this.F_Money = ""
					// this.F_DisMoney = ""
					// this.F_Tax = ""
					// this.F_Total = "" */
				}
				else
				{
					
					// this.setsum()					
					this.F_Money = ""
					this.F_DisMoney = ""
					this.F_Tax = ""
					this.F_Total = ""
				}
				
				
				

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
					F_SupplierID: that.F_SupplierID,					
					pageIndex: that.pageIndex,
					searchValue: that.searchValue,
					startDate: that.startDate,
					endDate: that.endDate,
					
				}
				let reqData = {
					action: 'getCpList',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				fybxApi(reqData)
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
						var itemList = that.itemList
						if(itemList.length==0){itemList=[]}
						console.log("item",itemList);
						for (var i = 0; i < data.length; i++) {
							for (var j = 0; j < itemList.length; j++) {
								if (itemList[j].F_LinkBillID == data[i].F_BillID) {
									data[i].F_Money = itemList[j].F_Money
									data[i].F_DisMoney = itemList[j].F_DisMoney
									data[i].F_Tax = itemList[j].F_Tax
									data[i].F_Total = (+itemList[j].F_Tax)+(+itemList[j].F_Money)

								}
							}
						}
						that.list = that.list.concat(data);
						that.setsum()						
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
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './cpDetail'
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

<style lang="scss" scoped>
	page {
		background-color: #F8F8F8;
	}

	.rowBtn {
		display: flex;
		align-items: center;
		flex-direction: row;
		/* flex-wrap: wrap; */
		margin: 26rpx 16rpx 16rpx 0;
		justify-content: space-between;

		.counttcss {
			display: flex;
			color:red;
			font-weight: 800;
		}
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

	.submitView {
		display: flex;
		width: 100vw;
		justify-content: center;
		align-items: center;

		.box {
			width: 300rpx;
		}
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
		background: #fff;
		border-radius: 20rpx;
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