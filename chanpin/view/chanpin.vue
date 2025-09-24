<template>
	<view>
		<searchView placeholderStr="请输入查询条件" @searchViewClickFun="searchEventsFun($event)"></searchView>
		<!-- <view @click="pickerSelectFun('产品类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">产品类型
			</text>
			<view :class="cpClassify ? '' : 'cBlack'">
				{{cpClassify ? cpClassify : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view> -->
		<view class="scrollF">
			<view class="leftScrollV">
				<scroll-view scroll-y="true" :style="{height: scrollHeight}">
					<view v-for="(item, index) in classify" :key="index" class="leftCardView">
						<view class="leftCard" :class="{ leftActive: leftA == index }" @click="selectLeftFl(index)">{{item.flName}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="rightSv">
				<dataNull v-if="list.length == 0" src="/static/img/chahua/dataNullXz.png" title="暂无相关产品" title1="请添加或者更换查询条件">
				</dataNull>
				<scroll-view v-else scroll-y="true" class="scrollF" :style="{height: scrollHeight}" @scrolltolower="getChanPinFun"
					refresher-enabled :refresher-threshold="200" :refresher-triggered="triggered" refresher-background="gray"
					@refresherrefresh="onRefresh" @refresherrestore="onRestore">
					<view v-for="(item, index) in list" :key="index" @click="cardClick(item)">
						<view v-if="item.cpFmtList && item.cpFmtList.length > 0" class="myCard2">
							<view class="leftImg">
								<u-image height="100" width="100" border-radius="26" :src="item.cpFmtList[0].url"></u-image>
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
								<view class="rowBtn">
									<u-button type="primary" :plain="true" class="cpBtn" size="mini" @tap.stop="setCpFun(item)">
										编辑产品
									</u-button>
									<u-button type="warning" :plain="true" class="cpBtn" size="mini"
										@click="cpsxjFun(item, index)">{{item.isSxJ == true ? '下架' : '上架'}}</u-button>
									<u-button type="error" :plain="true" class="cpBtn" size="mini"
										@click="deleteCpFun(item, index)">
										删除</u-button>
								</view>
							</view>
						</view>
						<view v-else class="myCard">
							<view class="cardTopName">产品编号：{{item.F_ID}}</view>
							<view class="myCard3">
								<view class="itemPhotoBox">
									<image :src="item.url" mode="widthFix" class="itemPhotoBox"></image>
								</view>
								<view class="infoBox">
									<view class="cardRow1" v-if="item.spec">
										<view class='t'>工厂型号：</view>
										<view class='v'>{{item.spec}}</view>
									</view>
									<view class="cardRow1" v-if="item.name">
										<view class='t'>产品名称：</view>
										<view class='v'>{{item.name}}</view>
									</view>							
									<!-- <view class="cardRow" v-if="item.color">
										<view>产品颜色：</view>
										<view>{{item.color}}</view>
									</view> -->
									<!-- <view class="cardRow" v-if="item.total">
										<view>零售面价：</view>
										<view><text class="redColor">￥{{item.total}}</text>/{{item.unit}}</view>
									</view>
									<view class="cardRow" v-if="item.pfj">
										<view>批发售价：</view>
										<view><text class="redColor">￥{{item.pfj}}</text>/{{item.unit}}</view>
									</view>							
									<view class="cardRow" v-if="item.price">
										<view>核定成本：</view>
										<view><text class="redColor">￥{{item.price}}</text>/{{item.unit}}</view>
									</view>
									<view class="cardRow" v-if="item.cgcb">
										<view>采购成本：</view>
										<view><text class="redColor">￥{{item.cgcb}}</text>/{{item.unit}}</view>
									</view>
									<view class="cardRow1" v-if="item.bz">
										<view>备注：</view>
										<view>{{item.bz}}</view>
									</view>
									<view class="cardRow" v-if="item.ssrq">
										<view>上市日期：</view>
										<view>{{item.ssrq}}</view>
									</view>
									<view class="cardRow" v-if="item.zmsc">
										<view>市场保护：</view>
										<view>{{item.zmsc}}</view>
									</view>
									<view class="cardRow" v-if="item.zmsj">
										<view>保护时间：</view>
										<view>{{item.zmsj}}</view>
									</view>
									<view class="cardRow" v-if="item.F_Sczq">
										<view>生产周期：</view>
										<view>{{item.F_Sczq}}</view>
									</view>
									<view class="cardRow" v-if="item.flName">
										<view>产品类别：</view>
										<view>{{item.flName}}</view>
									</view>
									<view class="cardRow1" v-if="item.gfmc">
										<view>供方名称：</view>
										<view>{{item.gfmc}}</view>
									</view>
									<view class="cardRow1" v-if="item.F_Taxrate">
										<view>业务税率：</view>
										<view>{{item.F_Taxrate}}</view>
									</view>
									<view class="cardRow1" v-if="item.F_Total">
										<view>价税合计：</view>
										<view>{{item.F_Total}}</view>
									</view>
									<view class="cardRow1" v-if="item.F_FPTaxrate">
										<view>发票税率：</view>
										<view>{{item.F_FPTaxrate}}</view>
									</view>
									<view class="cardRow1" v-if="item.cwcb">
										<view>税票成本：</view>
										<view>{{item.cwcb}}</view>
									</view>
									<view class="cardRow1" v-if="item.Long">
										<view>外箱尺寸：</view>
										<view>{{item.Long}}*{{item.width}}*{{item.height}}={{item.wxtj}}</view>
									</view>
									<view class="cardRow" v-if="item.mxjz">
										<view>每箱净重：</view>
										<view>{{item.mxjz}}</view>
									</view>							
									<view class="cardRow" v-if="item.mz">
										<view>每箱毛重：</view>
										<view>{{item.mz}}</view>
									</view>
									<view class="cardRow" v-if="item.bzjs">
										<view>包装基数：</view>
										<view>{{item.bzjs}}</view>
									</view> -->
								</view>
				
							</view>
				
							<view class="rowBtn">
								<u-button type="primary" :plain="true" class="cpBtn" size="mini" @tap.stop="setCpFun(item)">编辑产品
								</u-button>
								<u-button type="warning" :plain="true" class="cpBtn" size="mini" @click="cpsxjFun(item, index)">
									{{item.isSxJ == true ? '下架' : '上架'}}
								</u-button>
								<u-button type="error" :plain="true" class="cpBtn" size="mini"
									@click="deleteCpFun(item, index)">
									删除</u-button>
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
		</view>		
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<addBtn url="./addCp"></addBtn>
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
				selectShow: false,
				selectList: [],
				selectType: '',
				flName: '',
				gs: 0,
				triggered: false,
				pageIndex: 1,
				list: [],
				classify: [],
				classifysearch: [],
				dropdown1: '产品分类',
				cpClassify: '',
				cpClassifysearch: '',
				cpFlId: '',
				isMore: true,
				scrollHeight: '667px',
				sjType: '上架中',
				options1: [],
				isSjList: [{
						value: 0,
						label: '上架中'
					},
					{
						value: 1,
						label: '下架'
					},
				],
				isSxJ: true,
				leftA: 0,
				
			}
		},
		onLoad() {
			that = this;
			uni.getSystemInfo({
				success(res) {
					that.scrollHeight = res.windowHeight - 50 + 'px';
				}
			})
			that.getClassifyFun();
			uni.$on('addItemcodeInListFun', that.onRefresh)
		},
		onBackPress() {			
			uni.$off('addItemcodeInListFun', that.onRefresh)
			
		},
		methods: {
			selectLeftFl: function(i) {
				this.leftA = i;
				this.cpClassify = this.classify[i].flName;
				this.cpFlId = this.classify[i].F_ID;
				this.pageIndex = 1;
				this.isMore = true;
				this.getChanPinFun();
			},
			// add页面新增数据
			addItemInListFun: function() {
				
				let arr = that.list;
				arr.unshift(uni.$addItemcode);
				that.list = arr;
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.gs=(this.gs+1);
			},
			// 查询分类方法
			getClassifyFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					isShow: true
				}
				let reqData = {
					action: 'getFlList',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							that.classify = data;
							that.classify.unshift({
								F_ID: -1,
								flName: "全部"
							})
							that.classifysearch =data;
							// that.cpClassify = data[0].flName;
							// that.cpClassifysearch = data[0].flName;
							// that.cpFlId = data[0].F_ID;							
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
				
				if(that.cpClassify && that.cpFlId != -1){
					reqObj.F_TypeName = that.cpClassify;
					reqObj.F_Type =that.cpFlId
				}
				let reqData = {
					action: 'getCpList',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
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
						that.gs = res.data.total;
					})
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if (str == '产品类型') {
					let classify = that.classify;
					let arr = [];
					for (var i = 0; i < classify.length; i++) {
						arr.push({
							value: classify[i].F_ID,
							id: classify[i].F_ID,
							label: classify[i].flName
						})
					}
					that.selectList = arr;
				} 
				that.selectShow = true;
				that.selectType = str;
			},
			// 选择框选中事件
			selectConfirmFun: function(e) {
				if (that.selectType == '产品类型') {
					that.cpClassify = e[0].label;
					that.cpFlId = e[0].F_ID || e[0].value;
				}
			},
			// 搜索框回调函数
			searchEventsFun: function(e) {
				that.searchValue = e;
				that.isMore = true;
				that.pageIndex = 1;
				that.getChanPinFun();
			},
			
			// 下拉菜单回调1
			dropDownFun1: function(e) {
				that.cpClassify = e.label;
				that.cpFlId = e.id;
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
			},
			// 下拉菜单回调2
			dropDownFun2: function(e) {
				if (e.label == '上架中') {
					that.isSxJ = true
				} else {
					that.isSxJ = false
				}
				that.pageIndex = 1;
				that.isMore = true;
				that.getChanPinFun();
			},
			
			// 卡片点击方法
			cardClick: function(item) {
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './cpDetail'
				})
			},
			// 编辑产品
			setCpFun: function(item) {
				uni.$cpDetail = item;
				uni.navigateTo({
					url: './editCp'
				})
			},
			// 删除产品
			deleteCpFun: function(item, index) {
				uni.showModal({
					title: '提示',
					content: '是否确认删除产品：' + item.name,
					success(rrr) {
						if (rrr.confirm) {
							uni.showLoading({
								title: '删除中...'
							})
							
							let params = {
								F_ID: item.F_ID
							}
							let reqData = {
								action: 'deleteById',
								params: JSON.stringify(params)
							}
							console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
							crmChanpinApi(reqData)
								.then(res => {
									uni.showToast({
										title: '删除成功!',
										icon: 'none',
										duration: 1000
									})
									that.list.splice(index, 1);
								})
						}
					}
				})
			},
			// 删除产品云函数api
			deleteCpApiFun: function(id, index) {
				let params = {
					id: id
				}
				let reqData = {
					action: 'deleteById',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
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
				let params = {
					fileList
				}
				let reqData = {
					action: 'delete',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				fileApi(reqData)
					.then(res => {
						that.deleteCpApiFun(id, index);
					})
			},
			// 产品上下架
			cpsxjFun: function(item, index) {
				let str = '上架中...';
				let sxj = true
				if (item.isSxJ) {
					sxj = false;
					str = '下架中...'
				}
				uni.showLoading({
					title: str,
					mask: true
				})
				let reqObj = {
					id: item.id,

					isSxJ: sxj

				}
				let reqData = {
					action: 'update',
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmChanpinApi(reqData)
					.then(res => {
						let showTitle = '上架成功'
						if (sxj == false) {
							showTitle = '下架成功！'
						}
						uni.showToast({
							title: showTitle,
							icon: 'none',
							duration: 2000
						})
						that.list.splice(index, 1);
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
		width: 100%;
		/* width: 698rpx; */
		padding: 26rpx;
		margin: 32rpx 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
		position: relative;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
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
		/* align-items: center; */
		font-size: 14px;
		margin-bottom: 8rpx;
	}

	.cardRow1 .t {
		white-space: nowrap;
		color: #ADADAD;
	}

	.cardRow1 .v {
		color: #000000;
		flex: 1;
		width: 0;
	}

	.leftImg {
		width: 100rpx;
		height: 100rpx;
		margin-right: 26rpx;
		border-radius: 26rpx;
		overflow: hidden;
		border: 1rpx solid #DDDDDD;
	}

	.rightView {
		/* width: 460rpx; */
		flex: 1;
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
		width: 100rpx;
		height: 100rpx;
		/* border:1px solid #000000; */
	}

	.myCard3 {
		display: flex;
		flex-direction: row;
	}

	.infoBox {
		padding-left: 20rpx;
		flex: 1;
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