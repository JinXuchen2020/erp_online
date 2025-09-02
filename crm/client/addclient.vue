<template>
	<view>
		<!--客户信息-->
		<view class="btName">客户信息</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>客户名称</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="name" placeholder="请输入客户名称" />
		</view>
		<view @click="pickerSelectFun('客户类别')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户类别
				<text class="redXingh">*</text>
			</text>
			<view  :class="type ? '' : 'cBlack'">
				{{type ? type : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>英文名称</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="Ename" placeholder="请输入英文名称" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>联系人</text>				
			</text>
			<u-input v-model="contactman" placeholder="请输入联系人" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>联系电话</text>				
			</text>
			<u-input v-model="tel" placeholder="请输入联系电话" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>所属国家</text>				
			</text>
			<u-input v-model="city" placeholder="请输入所属国家" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>图文传真</text>				
			</text>
			<u-input v-model="fax" placeholder="请输入传真" />
		</view>
		<view @click="pickerSelectFun('结算货币')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">结算货币
			    <text class="redXingh">*</text>
			    </text>
			<view  :class="currency ? '' : 'cBlack'">
				{{currency ? currency : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('付款方式')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">付款方式
				<text class="redXingh">*</text>
				</text>
			<view  :class="simple ? '' : 'cBlack'">
				{{simple ? simple : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('贸易条款')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">贸易条款
				<text class="redXingh">*</text>
				</text>
			<view  :class="trade ? '' : 'cBlack'">
				{{trade ? trade : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('运输方式')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">运输方式
				<text class="redXingh">*</text>
				</text>
			<view  :class="postcode ? '' : 'cBlack'">
				{{postcode ? postcode : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>联系地址</text>				
			</text>
			<u-input v-model="address" placeholder="请输入联系地址" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>包装要求</text>				
			</text>
			<u-input v-model="packing" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>包装要求(英文)</text>				
			</text>
			<u-input v-model="packingE" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>外箱唛文</text>				
			</text>
			<u-input v-model="wxmw" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>外箱唛文(英文)</text>				
			</text>
			<u-input v-model="wxmwE" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>电器标准</text>				
			</text>
			<u-input v-model="standard" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>电器标准(英文)</text>				
			</text>
			<u-input v-model="standardE" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>合作优先</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="yxsx" placeholder="请输入合作优先" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>优先说明</text>				
			</text>
			<u-input v-model="yxsm" placeholder="请输入优先说明" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>收款账期(天)</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="PayDay" placeholder="请输入收款账期" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>信用额度</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="ed" placeholder="请输入信用额度" />
		</view>
		<view @click="pickerSelectFun('业务员')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">业务员
				<text class="redXingh">*</text>
				</text>
			<view  :class="fzr ? '' : 'cBlack'">
				{{fzr ? fzr : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>客户备注</text>				
			</text>
			<u-input v-model="bz" type="textarea" :border="true" :height="100" :auto-height="true" />
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
	import { clientApi} from '@/utils/api.js'
	export default {
		data() {
			return {
				F_ID:'',
				name: '',
				type: '',
				Ename:'',
				contactman:'',
				tel:'',
				city:'',
				fax:'',
				currency:'',
				simple: '',
				trade:'',
				postcode: '',
				address: '',
				packing:'',
				packingE:'',
				wxmw:'',
				wxmwE:'',
				standard:'',
				standardE:'',
				yxsx:'',
				yxsm:'',
				PayDay:'',
				ed:'',
				fzr:'',
				bz: '',
				F_Type:'',
					
				selectShow: false,
				classify: [],
				currencyid: [],
				simpleid: [],
				tradeid: [],
				postcodeid: [],
				fzrid: [],
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
				that.getCurrencyFun();
				that.getSimpleFun();
				that.getTradeFun();
				that.getPostcodeFun();
				that.getFzrFun();
				that.isAdd = e.isAdd;
				console.log('得到isAdd:'+that.isAdd)
				if(+e.isAdd==1)
				{
					that.F_ID= '';
					that.name= '';
					that.type= '';
					that.Ename= '';
					that.contactman= '';
					that.tel= '';
					that.city= '';
					that.fax= '';
					that.currency= '';
					that.simple= '';
					that.trade= '';
					that.postcode= '';
					that.address= '';
					that.packing= '';
					that.packingE= '';
					that.wxmw= '';
					that.wxmwE= '';
					that.standard= '';
					that.standardE= '';
					that.yxsx= '';
					that.yxsm= '';
					that.PayDay= '0';
					that.ed= '0';
					that.fzr= '';
					that.bz= '';
					that.F_Type= '';
					
				}
				else
				{
					console.log('得到的客户编号：'+uni.$addClient.F_ID)
					that.F_ID= uni.$addClient.F_ID;
					that.name= uni.$addClient.name|| '';
					that.type=uni.$addClient.type|| '';
					that.Ename= uni.$addClient.Ename|| '';
					that.contactman= uni.$addClient.contactman|| '';
					that.tel= uni.$addClient.tel|| '';
					that.city= uni.$addClient.city|| '';
					that.fax= uni.$addClient.fax|| '';
					that.currency= uni.$addClient.currency|| '';
					that.simple= uni.$addClient.simple|| '';
					that.trade= uni.$addClient.trade|| '';
					that.postcode= uni.$addClient.postcode|| '';
					that.address= uni.$addClient.address|| '';
					that.packing= uni.$addClient.packing|| '';
					that.packingE= uni.$addClient.packingE|| '';
					that.wxmw= uni.$addClient.wxmw|| '';
					that.wxmwE= uni.$addClient.wxmwE|| '';
					that.standard= uni.$addClient.standard|| '';
					that.standardE= uni.$addClient.standardE|| '';
					that.yxsx= uni.$addClient.yxsx|| '';
					that.yxsm= uni.$addClient.yxsm|| '';
					that.PayDay= uni.$addClient.PayDay|| '';
					that.ed= uni.$addClient.ed|| '';
					that.fzr= uni.$addClient.fzr|| '';
					that.bz= uni.$addClient.bz|| '';
					that.F_Type= uni.$addClient.F_Type|| '';						
					
				}
				
			
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
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.type = data[0].F_Name;
								that.F_Type = data[0].F_ID;
							}
							that.classify = data;
						} 
					})
			},
			// 查询结算货币方法
			getCurrencyFun: function() {
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
					action: 'getCurrency',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.currency = data[0].F_Name;								
							}
							that.currencyid = data;
						} 
					})
			},
			// 查询付款方式方法
			getSimpleFun: function() {
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
					action: 'getSimple',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.simple = data[0].F_Name;								
							}
							that.simpleid = data;
						} 
					})
			},
			// 查询贸易条款方法
			getTradeFun: function() {
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
					action: 'getTrade',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.trade = data[0].F_Name;								
							}
							that.tradeid = data;
						} 
					})
			},
			// 查询运输方式方法
			getPostcodeFun: function() {
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
					action: 'getPostcode',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.postcode = data[0].F_Name;								
							}
							that.postcodeid = data;
						} 
					})
			},
			// 查询业务员方法
			getFzrFun: function() {
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
					action: 'getFzr',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				clientApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.fzr = data[0].F_Name;								
							}
							that.fzrid = data;
						} 
					})
			},
			// 单选框
			radioGroupChange(e) {
				that.gender = e;
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if (str == '客户类别') {
					let classify = that.classify;
					let arr = [];
					for (var i = 0; i < classify.length; i++) {
						arr.push({
							value: classify[i].F_ID,
							id: classify[i].F_ID,
							label: classify[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '结算货币') {
					let currencyid = that.currencyid;
					let arr = [];
					for (var i = 0; i < currencyid.length; i++) {
						arr.push({
							value: currencyid[i].F_ID,
							id: currencyid[i].F_ID,
							label: currencyid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '付款方式') {
					let simpleid = that.simpleid;
					let arr = [];
					for (var i = 0; i < simpleid.length; i++) {
						arr.push({
							value: simpleid[i].F_ID,
							id: simpleid[i].F_ID,
							label: simpleid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '贸易条款') {
					let tradeid = that.tradeid;
					let arr = [];
					for (var i = 0; i < tradeid.length; i++) {
						arr.push({
							value: tradeid[i].F_ID,
							id: tradeid[i].F_ID,
							label: tradeid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '运输方式') {
					let postcodeid = that.postcodeid;
					let arr = [];
					for (var i = 0; i < postcodeid.length; i++) {
						arr.push({
							value: postcodeid[i].F_ID,
							id: postcodeid[i].F_ID,
							label: postcodeid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '业务员') {
					let fzrid = that.fzrid;
					let arr = [];
					for (var i = 0; i < fzrid.length; i++) {
						arr.push({
							value: fzrid[i].F_ID,
							id: fzrid[i].F_ID,
							label: fzrid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				if (that.selectType == '客户类别') {
					that.type = e[0].label;
					that.F_Type = e[0].F_ID || e[0].value;
				}
				if (that.selectType == '结算货币') {
					that.currency = e[0].label;					
				}
				if (that.selectType == '付款方式') {
					that.simple = e[0].label;					
				}
				if (that.selectType == '运输方式') {
					that.postcode = e[0].label;					
				}
				if (that.selectType == '业务员') {
					that.fzr = e[0].label;					
				}
			},
			// 提交按钮
			submitBtn: function() {
				if(that.name == '') {
					uni.showModal({
						title: '提示',
						content: '客户名称不能为空，请输入！',
						showCancel: false
					})
					return
				}
				if(that.tel == '' ) {
					uni.showModal({
						title: '提示',
						content: '客户电话不能为空，请输入！',
						showCancel: false
					})
					return
				}				
				
				let reqObj = {
					F_ID:that.F_ID,
					name: that.name,
					type: that.type,
					Ename:that.Ename,
					contactman:that.contactman,
					tel:that.tel,
					city:that.city,
					fax:that.fax,
					currency:that.currency,
					simple:that.simple,
					trade:that.trade,
					postcode:that.postcode,
					address:that.address,
					packing:that.packing,
					packingE:that.packingE,
					wxmw:that.wxmw,
					wxmwE:that.wxmwE,
					standard:that.standard,
					standardE:that.standardE,
					yxsx:that.yxsx,
					yxsm:that.yxsm,
					PayDay:that.PayDay,
					ed:that.ed,
					fzr:that.fzr,
					bz:that.bz,
					F_Type:that.F_Type,
					usercode: uni.$userInfo.F_ID,				
						
				}
				let action = 'addClient';				
				let reqData = {
					action: action,
					params: JSON.stringify(reqObj)
				}
				console.log('传递action:'+action+' 传递参数'+reqData.params)
				clientApi(reqData)
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
							console.log('当前状态：'+this.isAdd+' 客户编号:'+res.data.rows[0].F_ID)
							uni.$addClient = res.data.rows[0];
							// uni.$emit('addItemInListFun')
						}
						// else
						// {
							
						// 	uni.$emit('updateListByIndex', {
						// 		index: this.cardIndex,
						// 		obj: res.data.rows[0]
						// 	})
						// 	uni.$emit('refreshClientFun')
						// }
						
						uni.$emit('refreshClientFun')
						
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
