<template>
	<view>
		<view>
			<view v-if="isGhc" class="bottomBox">
				<view class="tabbarItem" @click="lingquFun">
					<u-icon class="tabImg" size="40" height="40" name="bag"></u-icon>
					<view>领取</view>
				</view>
				<view class="tabbarItem" @click="allotFun">
					<u-icon class="tabImg" size="40" height="40" name="setting"></u-icon>
					<view>分配</view>
				</view>
				<view class="tabbarItem" @click="bianjiFun">
					<u-icon class="tabImg" size="40" height="40" name="edit-pen-fill"></u-icon>
					<view>编辑</view>
				</view>
				<view class="tabbarItem" @click="deleteDataFun">
					<u-icon class="tabImg" size="40" height="40" name="trash"></u-icon>
					<view>删除</view>
				</view>
			</view>
			<view v-else class="bottomBox">
				
				
				
				<view class="tabbarItem" @click="bianjiFun">
					<u-icon class="tabImg" size="40" height="40" name="edit-pen-fill"></u-icon>
					<view>编辑</view>
				</view>
				 <view class="tabbarItem"  @click="deleteDataFun">
					<u-icon class="tabImg" size="40" height="40" name="trash"></u-icon>
					<view>删除</view>
				</view> 
			</view>
		</view>
		<u-action-sheet :list="sList" v-model="moreIsShow" @click="sheetClickFun"></u-action-sheet>
		<u-select v-model="allotShow" mode="single-column" confirm-text="确认分配" cancel-text="取消分配" :list="userList"
			@confirm="allotConfirmFun" value-name="id" label-name="nickname"></u-select>
	</view>
</template>

<script>
	import {
		clientApi
	} from '../../utils/api.js'
	import {
		uidUserApi
	} from '../../utils/adminApi.js'
	export default {
		name: "bottomBox",
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			sheetList: {
				type: Array,
				default: () => []
			},
			addSheetList: {
				type: Array,
				default: () => []
			},
			isGhc: {
				type: Boolean,
				default: false
			},
			isKh: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				moreIsShow: false,
				sList: [],
				sheetType: '',
				allotShow: false,
				userList: []
			};
		},
		methods: {
			genjinFun: function() {
				this.$emit('pageGenjinFun')
			},
			sheetClickFun: function(e) {
				if (this.sheetType == 'more') {
					this.$emit('pageMoreIsShowFun', e)
				} else {
					this.$emit('pageAddSheetFun', e)
				}
			},
			bianjiFun: function() {
				this.$emit('pageBianjiFun')
			},
			sheetShowFun: function(str) {
				console.log(str)
				if (str == 'add') {
					this.sList = this.addSheetList;
				} else {
					this.sList = this.sheetList;
				}
				this.sheetType = str;
				this.moreIsShow = true;
			},
			deleteDataFun: function() {
				this.$emit('pageDeleteShowFun')
			},
			
		}
	}
</script>

<style>
	.bottomBox {
		width: 100%;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFFFFF;
		border-top: 1rpx solid #DDDDDD;
		font-size: 14px;
	}

	.tabbarItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 36rpx;
	}

	.tabbarItem:active {
		background-color: #EEEEEE;
	}

	.tabbarItem>.tabImg {
		margin-bottom: 8rpx;
	}
</style>
