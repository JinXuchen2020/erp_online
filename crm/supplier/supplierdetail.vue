<template>
	<view class="content">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			style="height: calc(100% - 55px);" @scrolltolower="scrollToBottomFun">
			<!--供方基本信息-->
			<supplierCard :item="khInfo" :index="cardIndex" :isSelect="true"></supplierCard>
			
			<!--tab-->
			<view class="uTabsView">
				<u-tabs :list="tabList" :is-scroll="true" duration="0.08" :current="tabIndex" :show-bar="false"
					font-size="32" @change="tabChange"></u-tabs>
			</view>
			<!-- 自定义下拉刷新view -->
			<!-- <custom-refresher slot="refresher" :status="refresherStatus"></custom-refresher> -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="contentView">
				<!--详细信息-->
				<view v-if="tabIndex == 0">
					<supplierDetail :khInfo="khInfo"></supplierDetail>
				</view>
				
				<!--加载更多-->
				<getMore :isMore="tabList[tabIndex].isMore"></getMore>
			</view>
		</z-paging>
		
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import {		
		supplierApi
	} from '@/utils/api.js'
	import supplierCard from '@/components/card/supplier.vue'
	import supplierDetail from '@/components/detail/supplierDetail'
	import getMore from '@/components/getMore/getMore.vue'
	export default {
		components: {
			supplierCard,
			supplierDetail,		
			getMore
		},
		data() {
			return {
				selectList: [],				
				selectShow: false,
				khInfo: {},
				dataList: [],
				tabList: [{
						name: '详细信息',
						arr: [],
						pageIndex: 1,
						isMore: false
					},
					
					
				],
				
				
				
				tabIndex: 0,
				refresherStatus: 0,
				cardIndex: -1,
				isLoadSelectKhById: false
			}
		},
		onLoad(e) {
			that = this;
			if(+e.index >=0)
			{
			that.cardIndex = +e.index;	
			}
			else
			{
				that.cardIndex =-1;
			}
			//that.cardIndex = +e.index || -1;
			console.log('载入页面得到的index：'+that.cardIndex+'  e.index='+e.index);
			that.khInfo = uni.$khInfo || {};			
			uni.setNavigationBarTitle({
				title: that.khInfo.supplierName || '供方详情'
			})
			if (e.fromDetail) {
				that.selectKhByIdFun(e.id)
			}
			uni.$on('refreshSupplierFun', that.refreshSupplierFun)
		},
		onBackPress(e) {
			if (e.from == 'backbutton' && this.cardIndex != -1) {
				uni.$emit('updateListByIndex', {
					index: this.cardIndex,
					obj: this.khInfo
				})
			}
			uni.$off('refreshSupplierFun', that.refreshSupplierFun)
		},
		onShow() {
			if (that.isLoadSelectKhById) {
				that.selectKhByIdFun();
			}
		},
		methods: {
			// 通过下标更新list数据
			refreshSupplierFun: function(e) {
				that = this;
				that.khInfo = e.obj;
				console.log('传递过去的index：'+this.cardIndex)
				uni.$emit('updateListByIndex', {
					index: this.cardIndex,
					obj: e.obj
				})
			},
			tabChange(index) {
				this.tabIndex = index;
				console.log('点击的index为：'+index)
				let item = that.tabList[index];
				console.log(item)
				if (item.arr && item.arr.length > 0) {
					return
				}
				
			},
			scrollToBottomFun: function(e) {
				let index = that.tabIndex;
				let isMore = that.tabList[index].isMore;
				if (!isMore) {
					return
				}
				
			},
			// 给tabList中的arr赋值
			setTabArrFun: function(data, item) {
				if (item.pageIndex == 1) {
					item.arr = [];
				}
				if (data.length >= 10) {
					item.pageIndex += 1;
					item.isMore = true;
				} else {
					item.isMore = false;
				}
				item.arr = item.arr.concat(data);
				that.$set(that.tabList, that.tabIndex, item)
			},
			pickerSelectFun: function(str) {
				
				that.selectShow = true;
				that.selectType = str;
			},
			
			
			
			
			// 根据id查询供方
			selectKhByIdFun1: function(id) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {
					id: ''
				}
				if (id) {
					params.id = id;
				} else {
					params.id = that.khInfo.id;
				}
				let reqData = {
					action: 'selectKhById',
					params: JSON.stringify(params)
				}
				console.log('发出指令：' + reqData.action + ' 传递参数：' + reqData.params)
				supplierApi(reqData)
					.then(res => {
						console.log('获取的供方信息：' + res.data.rows[0].supplierName)
						let data = res.data.rows[0];
						if (data.name.length > 0) {
							that.khInfo = data							
						} else {
							uni.showModal({
								title: '提示',
								content: '相关内容不存在，或者已被删除！',
								showCancel: false,
								success() {
									uni.navigateBack()
								}
							})
						}
					})
			},
			recoverTabListFun: function() {
				that.isLoadSelectKhById = true;
				that.tabIndex = 0;
				that.tabList = [{
						name: '详细信息',
						isMore: false
					}
				]
			},
			
		}
	}
</script>

<style>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */

	/*如果有scoped，page的css设置建议放在App.vue中 */
	page {
		height: 100%;
		background-color: #F8F8F8;
	}

	.content {
		height: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
	}

	.uTabsView {
		border-bottom: 1rpx solid #DDDDDD;
		z-index: 100;
		position: sticky;
		top: 0;
	}

	.contentView {
		/* background-color: #FFFFFF; */
		min-height: calc(100vh - 45px);
	}

	.flexRow {
		display: flex;
		font-size: 30rpx;
		margin-bottom: 8rpx;
	}

	.flexRow>view {
		width: 50%;
		display: flex;
	}

	.flexRow>view>text:first-child {
		width: 166rpx;
	}

	.item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}

	.uTabsView {
		top: -2px !important;
	}

	.width100 {
		width: 100%;
		margin: 26rpx 0;
	}

	.u-steps__item,
	.u-steps__item--row {
		width: 200px !important;
	}
</style>
