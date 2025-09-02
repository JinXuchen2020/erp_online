<template>
	<view>
		<searchView placeholderStr="请输入查询条件" @searchViewClickFun="searchEventsFun($event)"></searchView>
		<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品" title1="请添加或者更换查询条件">
		</dataNull>
		<scroll-view v-else scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="getChanPinFun"
			refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
			@refresherrefresh="onRefresh" @refresherrestore="onRestore">
			<view v-for="(item, index) in list" :key="index" @click="cardClick(item)">
				<view class="myCard">
					<view class="cardTopName">产品名称：{{item.name}}</view>
					<view class="myCard3">
						<view class="itemPhotoBox">
							<image :src="item.url" mode="widthFix" class="itemPhotoBox"></image>
						</view>
						<view class="infoBox">
							<view class="cardRow">
								<view>型号规格：</view>
								<view><text class="redColor">{{item.model}} {{item.spec}}</text> {{item.color}} </view>
							</view>
							<view class="cardRow">
								<view>产品价格：</view>
								<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
							</view>
							<view class="cardRow">
								<view>产品类型：</view>
								<view>{{item.flName}}</view>
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

					<view class="rowBtn">
						<u-button type="primary" :plain="true" class="cpBtn" size="mini" @click="selectItem(index)">选择产品
						</u-button>
						<view class="counttcss" v-if="item.countt">
							订货数量：
							{{item.countt}}
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
				<!-- <view class="searchTitle">输入下单数量</view> -->
				<u-field v-model="countt" :label="'下单数量'" :placeholder="'请输入下单数量'" clear-size="40"></u-field>
				<!-- <view class="searchTitle">输入单价</view> -->
				<u-field v-model="price" :label="'下单单价'" :placeholder="'请输入下单单价'" clear-size="40"></u-field>
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
					合计数量：{{qty}}
				</view>
				<view class="box">
					合计金额：{{total}}
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
		PIApi
	} from '@/utils/api.js'
	export default {
		components: {
			dataNull,
			addBtn,
			getMore,

		},
		data() {
			return {
				itemList: [],
				total: 0,
				qty: 0,
				isshow: true,
				currency: -1,
				countt: "",
				price: "",
				inputShow: false,
				gs: 0,
				triggered: false,
				pageIndex: 1,
				list: [],
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
			that.itemList = uni.getStorageSync("itemList")
			setTimeout(()=>{that.getChanPinFun();},200)
			
			
			
		},
		methods: {
			sumbit() {
				var selectlist = this.itemList
				
				
				uni.$emit("itemBind", {
					"itemList": selectlist,
					"total":this.total
				})
				uni.navigateBack()
			},
			setsum() {
				this.total = 0
				this.qty = 0
				for (var i = 0; i < this.itemList.length; i++) {
					if (this.itemList[i].countt) {
						this.qty += +this.itemList[i].countt
						this.total += +this.itemList[i].countt * +this.itemList[i].price
					}
				}
			},
			delcountt(index) {
				// console.log(index);
				this.list[index].countt = 0
				var num=this.itemList.findIndex(v=>v.itemcode===this.list[index].F_ID)
				
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
				console.log(index);
				this.countt= this.list[index].countt
				this.currency = index
				this.price = this.list[index].price ? this.list[index].price : 0
				this.$refs.popucountt.open()
			},
			// 搜索处理函数
			inputcountFun: function() {
				this.inputShow = false;
				this.list[this.currency].countt = +this.countt
				this.list[this.currency].price = +this.price
				this.list[this.currency].check = true
				var num = this.itemList.findIndex(v=>v.itemcode === this.list[this.currency].F_ID)
				console.log("a",num);
				if(num>=0){
					this.itemList[num].countt=+this.countt
					this.itemList[num].price=+this.price
					this.itemList[num].account=+this.countt* +this.price
				}
				else{
					var item={}
					item.Aid=this.itemList.length
					item.itemcode=this.list[this.currency].F_ID
					item.itemname=this.list[this.currency].name
					item.spec=this.list[this.currency].spec
					item.color=this.list[this.currency].color
					item.unit=this.list[this.currency].unit
					item.countt=this.list[this.currency].countt
					item.price=this.list[this.currency].price
					item.account=+this.list[this.currency].countt* +this.list[this.currency].price
					item.bz=this.list[this.currency].bz
					item.url=this.list[this.currency].url
					this.itemList.push(item)
				}
				
				
				this.$refs.popucountt.close()
				setTimeout(() => {
					console.log(this.itemList);
					this.setsum()					
					this.countt = ""

				}, 23)

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
					matchObj: {
						
						isSxJ: that.isSxJ,
					},
					pageIndex: that.pageIndex,
					searchValue: that.searchValue,
					sortObj: that.sortObj
				}
				let reqData = {
					action: 'getCpList',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				PIApi(reqData)
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
								if (itemList[j].itemcode == data[i].F_ID) {
									data[i].countt = itemList[j].countt
									data[i].price = itemList[j].price

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
			}
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
</style>