<template>
	<view>
		<!--日记账信息-->
		<view class="btName">日记账信息</view>
		
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>发生日期</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_Date" placeholder="请输入发生日期" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>收入金额</text>				
			</text>
			<u-input v-model="F_Debit" placeholder="请输入收入金额" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>支出金额</text>				
			</text>
			<u-input v-model="F_Credit" placeholder="请输入支出金额" />
		</view>
		<view @click="pickerSelectFun('结算方式')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">结算方式
				<text class="redXingh">*</text>
			</text>
			<view  :class="F_BalanceType ? '' : 'cBlack'">
				{{F_BalanceType ? F_BalanceType : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('费用类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">费用类型
				<text class="redXingh">*</text>
			</text>
			<view  :class="F_fylx ? '' : 'cBlack'">
				{{F_fylx ? F_fylx : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
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
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>摘要</text>				
			</text>
			<u-input v-model="F_Remark" placeholder="请输入摘要" />
		</view>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		
		<!--提交按钮-->
		<view class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="submitBtn">{{pageType?'提交':'保存'}}</u-button>
		</view>
	</view>
</template>

<script>
	let that = '';
	import { journalApi} from '@/utils/api.js'
	import {
		getDayFun,getMonthFun
	} from '@/utils/date.js'
	export default {
		data() {
			return {
				Aid:0,
				F_Date:'',
				F_DayOrder:0,
				F_Month:'',
				F_Debit:'',
				F_Credit: '',
				F_BalanceType:'',
				F_Opertor:'',
				F_BankAid:0,
				fszh:'',
				F_Bank:'',
				F_RestMoney:0,
				F_fylx: '',
				F_Remark: '',				
				selectShow: false,
				classify: [],
				jsfs: [],
				fylx: [],
				cpClassify: '',					
				xgInfoClient: {},	
				selectList: [],
				selectType: '',
				pageType:'',
				isAdd:0,
				cardIndex: -1,
			}
		},
		onLoad(e) {
			that = this;
			that.pageType=e.pageType||'';	
					that.cardIndex = +e.index;
				that.getClassifyFun();
				that.getJsfsFun();
				that.getFylxFun();
				that.isAdd = e.isAdd;
				console.log('得到isAdd:'+that.isAdd)
				if(+e.isAdd==1)
				{
					let dArr = getDayFun()
					dArr[1] -= 1;
					that.Aid=0;
					that.F_Date= this.$u.timeFormat(dArr[0], 'yyyy-mm-dd');
					that.F_DayOrder=0;
					that.F_Month='';
					that.F_Debit='';
					that.F_Credit='';
					that.F_BalanceType='';
					that.F_Opertor=uni.$userInfo.name;
					that.F_BankAid='';
					that.fszh='';
					that.F_Bank='';
					that.F_RestMoney=0;
					that.F_fylx='';
					that.F_Remark='';					
				}
				else
				{
					console.log('得到的客户编号：'+uni.$addJournal.Aid)
					that.Aid=uni.$addJournal.Aid;
					that.F_Date=uni.$addJournal.F_Date;
					that.F_DayOrder=uni.$addJournal.F_DayOrder;
					that.F_Month=uni.$addJournal.F_Month;
					that.F_Debit=uni.$addJournal.F_Debit;
					that.F_Credit=uni.$addJournal.F_Credit;
					that.F_BalanceType=uni.$addJournal.F_BalanceType;
					that.F_Opertor=uni.$addJournal.F_Opertor;
					that.F_BankAid=uni.$addJournal.F_BankAid;
					that.fszh=uni.$addJournal.fszh;
					that.F_Bank=uni.$addJournal.F_Bank;
					that.F_RestMoney=uni.$addJournal.F_RestMoney;
					that.F_fylx=uni.$addJournal.F_fylx;
					that.F_Remark=uni.$addJournal.F_Remark;
						
					
				}
				
			
		},
		methods: {
			// 查询银行账户方法
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
							if (that.pageType != 'update') {
								that.F_Bank = data[0].F_Bank;
								that.F_BankAid = data[0].Aid;
							}
							that.classify = data;
						} 
					})
			},
			// 查询结算方式方法
			getJsfsFun: function() {
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
					action: 'getJsfs',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				journalApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.F_BalanceType = data[0].F_Name;
							}
							that.jsfs = data;
						} 
					})
			},
			// 查询结算方式方法
			getFylxFun: function() {
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
					action: 'getFylx',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				journalApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.F_fylx = data[0].F_Name;
							}
							that.fylx = data;
						} 
					})
			},
			// 单选框
			radioGroupChange(e) {
				that.gender = e;
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if (str == '结算方式') {
					let jsfs = that.jsfs;
					let arr = [];
					for (var i = 0; i < jsfs.length; i++) {
						arr.push({
							value: jsfs[i].F_Name,
							id: jsfs[i].F_ID,
							label: jsfs[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				else
				{
					if (str == '费用类型') {
						let fylx = that.fylx;
						let arr = [];
						for (var i = 0; i < fylx.length; i++) {
							arr.push({
								value: fylx[i].F_Name,
								id: fylx[i].F_ID,
								label: fylx[i].F_Name
							})
						}
						that.selectList = arr;
					}
					 else
					 {
						if (str == '银行账户') {
							let classify = that.classify;
							let arr = [];
							for (var i = 0; i < classify.length; i++) {
								arr.push({
									value: classify[i].F_Bank,
									id: classify[i].Aid,
									label: classify[i].F_Bank
								})
							}
							that.selectList = arr;
						} 
					 }
				}
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				if (that.selectType == '结算方式') {
					that.F_BalanceType = e[0].label;					
				}
				else
				{
					if (that.selectType == '费用类型') {
						that.F_fylx = e[0].label;					
					}
					else
					{
						if (that.selectType == '银行账户') {
							that.F_BankAid = e[0].id;
							that.F_Bank = e[0].label;
						}
					}
				}
			},
			// 提交按钮
			submitBtn: function() {
				if(that.F_Bank == '') {
					uni.showModal({
						title: '提示',
						content: '发生账户不能为空，请输入！',
						showCancel: false
					})
					return
				}
							
				
				let reqObj = {
					
					    Aid:that.Aid,
					    F_Date:that.F_Date,
					    F_DayOrder:that.F_DayOrder,
					    F_Month:that.F_Month,
					    F_Debit:that.F_Debit,
					    F_Credit:that.F_Credit,
					    F_BalanceType:that.F_BalanceType,
					    F_Opertor:that.F_Opertor,
					    F_BankAid:that.F_BankAid,
					    fszh:that.fszh,
					    F_Bank:that.F_Bank,
					    F_RestMoney:that.F_RestMoney,
					    F_fylx:that.F_fylx,
					    F_Remark:that.F_Remark,
						usercode:uni.$userInfo.F_ID,
						
				}
				let action = 'addJournal';				
				let reqData = {
					action: action,
					params: JSON.stringify(reqObj)
				}
				console.log('传递action:'+action+' 传递参数'+reqData.params)
				journalApi(reqData)
				.then(res => {
					console.log('查看结果'+res.data.msg)
					let code=res.data.code;
					let that=this;
					if(code=='0'){
						let showTitle = res.data.tag
						uni.showModal({
							title: '提示',
							content: showTitle,
							showCancel: false
						})
						if(this.isAdd==1)
						{
							console.log('当前状态：'+this.isAdd+' 日记账编号:'+res.data.rows[0].Aid)
							uni.$addJournal = res.data.rows[0];
							uni.$emit('addItemInListFun')
						}
						else
						{
							
							uni.$emit('updateListByIndex', {
								index: this.cardIndex,
								obj: res.data.rows[0]
							})
							uni.$emit('refreshClientFun', {
								index: this.cardIndex,
								obj: res.data.rows[0]
							})
						}
						
						setTimeout(() => {
							uni.navigateBack()
							}, 666)
						
					}
				})
			},			
			
			
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		padding-bottom: 260rpx;
	}
	.u-radio {
		width: 200rpx !important;
	}
</style>
