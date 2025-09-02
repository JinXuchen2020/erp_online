<template>
	<view>
		<!--供方信息-->
		<view class="btName">供方信息</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>供方名称</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="name" placeholder="请输入供方名称" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>联系人员</text>				
			</text>
			<u-input v-model="contactman" placeholder="请输入联系人员" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>联系电话</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="tel" placeholder="请输入联系电话" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>图文传真</text>
			</text>
			<u-input v-model="fax" placeholder="请输入图文传真" />
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
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>运输方式</text>
			</text>
			<u-input v-model="postcode" placeholder="请输入运输方式" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>结算货币</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="currency" placeholder="请输入结算货币" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>合作协议</text>
			</text>
			<u-input v-model="city" placeholder="请输入合作协议" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>主要产品</text>
			</text>
			<u-input v-model="product" placeholder="请输入主要产品" />
		</view>
		
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>详细地址</text>				
			</text>
			<u-input v-model="address" placeholder="请输入详细地址" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>备注</text>				
			</text>
			<u-input v-model="bz" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>银行账户一</text>				
			</text>
			<u-input v-model="yhzh" placeholder="请输入银行账户" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>银行账户二</text>				
			</text>
			<u-input v-model="yhzh1" placeholder="请输入银行账户" />
		</view>
		<view @click="pickerSelectFun('厂商级别')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">厂商级别
				<text class="redXingh">*</text>
			</text>
			<view  :class="F_Level ? '' : 'cBlack'">
				{{F_Level ? F_Level : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('采购专员')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">采购专员
				<text class="redXingh">*</text>
			</text>
			<view  :class="cg ? '' : 'cBlack'">
				{{cg ? cg : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('QA跟进')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">QA跟进
				<text class="redXingh">*</text>
			</text>
			<view  :class="QA ? '' : 'cBlack'">
				{{QA ? QA : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('供方类别')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">供方类别
				<text class="redXingh">*</text>
			</text>
			<view  :class="type ? '' : 'cBlack'">
				{{type ? type : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
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
	import { supplierApi} from '@/utils/api.js'
	export default {
		data() {
			return {
				F_ID:'',
				name: '',
				contactman:'',
				tel:'',
				fax:'',
				simple: '',
				postcode: '',
				currency:'',
				city:'',
				product:'',
				address: '',
				bz: '',
				yhzh:'',
				yhzh1:'',
				F_Level:'',
				cg:'',
				QA:'',
				type: '',
				F_Type:'',
					
				selectShow: false,
				classify: [],
				simpleid: [],
				F_Levelid:[],
				cgid:[],
				QAid:[],
				cpClassify: '',					
				xgInfoSupplier: {},	
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
				that.getSimpleFun();
				that.getF_LevelFun();
				that.getCgFun();
				that.getQAFun();
				that.isAdd = e.isAdd;
				console.log('得到isAdd:'+that.isAdd)
				if(+e.isAdd==1)
				{
					that.F_ID= '';
					that.name= '';
					that.contactman= '';
					that.tel= '';
					that.fax= '';
					that.simple= '';
					that.postcode= '';
					that.currency= '';
					that.city= '';
					that.product= '';
					that.address= '';
					that.bz= '';
					that.yhzh= '';
					that.yhzh1= '';
					that.F_Level= '';
					that.cg= '';
					that.QA= '';
					that.type= '';
					
					
				}
				else
				{
					console.log('得到的供方编号：'+uni.$addSupplier.F_ID)
					that.F_ID= uni.$addSupplier.F_ID;
					that.name= uni.$addSupplier.name|| '';
					that.contactman= uni.$addSupplier.contactman|| '';
					that.tel= uni.$addSupplier.tel|| '';
					that.fax= uni.$addSupplier.fax|| '';
					that.simple= uni.$addSupplier.simple|| '';
					that.postcode= uni.$addSupplier.postcode|| '';
					that.currency= uni.$addSupplier.currency|| '';
					that.city= uni.$addSupplier.city|| '';
					that.product= uni.$addSupplier.product|| '';
					that.address= uni.$addSupplier.address|| '';
					that.bz= uni.$addSupplier.bz|| '';
					that.yhzh= uni.$addSupplier.yhzh|| '';
					that.yhzh1= uni.$addSupplier.yhzh1|| '';
					that.F_Level= uni.$addSupplier.F_Level|| '';
					that.cg= uni.$addSupplier.cg|| '';
					that.QA= uni.$addSupplier.QA|| '';
					that.type= uni.$addSupplier.type|| '';						
						
					
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
				supplierApi(reqData)
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
				supplierApi(reqData)
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
			// 查询厂商级别方法
			getF_LevelFun: function() {
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
					action: 'getF_Level',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				supplierApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.F_Level = data[0].F_Name;								
							}
							that.F_Levelid = data;
						} 
					})
			},
			// 查询采购专员方法
			getCgFun: function() {
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
					action: 'getCg',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				supplierApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.cg = data[0].F_Name;								
							}
							that.cgid = data;
						} 
					})
			},
			// 查询采购专员方法
			getQAFun: function() {
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
					action: 'getQA',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				supplierApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.QA = data[0].F_Name;								
							}
							that.QAid = data;
						} 
					})
			},
			// 单选框
			radioGroupChange(e) {
				that.gender = e;
			},
			// 展示相应数据选择框
			pickerSelectFun: function(str) {
				if (str == '供方类别') {
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
				if (str == '厂商级别') {
					let F_Levelid = that.F_Levelid;
					let arr = [];
					for (var i = 0; i < F_Levelid.length; i++) {
						arr.push({
							value: F_Levelid[i].F_ID,
							id: F_Levelid[i].F_ID,
							label: F_Levelid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == '采购专员') {
					let cgid = that.cgid;
					let arr = [];
					for (var i = 0; i < cgid.length; i++) {
						arr.push({
							value: cgid[i].F_ID,
							id: cgid[i].F_ID,
							label: cgid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				if (str == 'QA跟进') {
					let QAid = that.QAid;
					let arr = [];
					for (var i = 0; i < QAid.length; i++) {
						arr.push({
							value: QAid[i].F_ID,
							id: QAid[i].F_ID,
							label: QAid[i].F_Name
						})
					}
					that.selectList = arr;
				} 
				that.selectShow = true;
				that.selectType = str;
			},
			selectConfirmFun: function(e) {
				if (that.selectType == '供方类别') {
					that.type = e[0].label;
					that.F_Type = e[0].F_ID || e[0].value;
				}
				if (that.selectType == '付款方式') {
					that.simple = e[0].label;					
				}
				if (that.selectType == '厂商级别') {
					that.F_Level = e[0].label;					
				}
				if (that.selectType == '采购专员') {
					that.cg = e[0].label;					
				}
				if (that.selectType == 'QA跟进') {
					that.QA = e[0].label;					
				}
			},
			// 提交按钮
			submitBtn: function() {
				if(that.name == '') {
					uni.showModal({
						title: '提示',
						content: '供方名称不能为空，请输入！',
						showCancel: false
					})
					return
				}
				if(that.tel == '' ) {
					uni.showModal({
						title: '提示',
						content: '供方电话不能为空，请输入！',
						showCancel: false
					})
					return
				}				
				
				let reqObj = {
					F_ID:that.F_ID,
					name: that.name,
					contactman:that.contactman,
					tel:that.tel,
					fax:that.fax,
					simple: that.simple,
					postcode: that.postcode,
					currency:that.currency,
					city:that.city,
					product:that.product,
					address: that.address,
					bz: that.bz,
					yhzh:that.yhzh,
					yhzh1:that.yhzh1,
					F_Level:that.F_Level,
					cg:that.cg,
					QA:that.QA,
					type: that.type,
					F_Type:that.F_Type,
					usercode: uni.$userInfo.F_ID,					    						
				}
				let action = 'addSupplier';				
				let reqData = {
					action: action,
					params: JSON.stringify(reqObj)
				}
				console.log('传递action:'+action+' 传递参数'+reqData.params)
				supplierApi(reqData)
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
							console.log('当前状态：'+this.isAdd+' 供方编号:'+res.data.rows[0].F_ID)
							uni.$addSupplier = res.data.rows[0];
							uni.$emit('addItemInListFun')
						}
						else
						{
							
							uni.$emit('updateListByIndex', {
								index: this.cardIndex,
								obj: res.data.rows[0]
							})
							uni.$emit('refreshSupplierFun', {
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
