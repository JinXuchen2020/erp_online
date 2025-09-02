<template>
	<view>
		<!--账户信息-->
		<view class="btName">账户信息</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>银行名称</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_Bank" placeholder="请输入银行名称" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>银行账户</text>
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_Account" placeholder="请输入银行账户" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>初始金额</text>
				
			</text>
			<u-input v-model="F_IniMoney" placeholder="请输入初始金额" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">
				<text>账户备注</text>
				
			</text>
			<u-input v-model="F_Remark" placeholder="请输入备注" />
		</view>
		
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
				Aid:'',
				F_Bank: '',
				F_Account:'',
				F_IniMoney: '',
				F_Remark: '',
				pageType:'',
				isAdd:0,
				cardIndex: -1,
			}
		},
		onLoad(e) {
			that = this;
			that.pageType=e.pageType||'';	
					that.cardIndex = +e.index;
				
				that.isAdd = e.isAdd;
				console.log('得到isAdd:'+that.isAdd)
				if(+e.isAdd==1)
				{
					that.Aid = '';
					that.F_Bank = '';
					that.F_Account = '';
					that.F_IniMoney = '';
					that.F_Remark = '';
					
				}
				else
				{
					console.log('得到的账户编号：'+uni.$addBank.F_ID)
						that.Aid = uni.$addBank.Aid;
						that.F_Bank = uni.$addBank.F_Bank;
						that.F_Account = uni.$addBank.F_Account;
						that.F_IniMoney = uni.$addBank.F_IniMoney || '';
						that.F_Remark = uni.$addBank.F_Remark || '';
				}
				
			
		},
		methods: {
			
			// 单选框
			radioGroupChange(e) {
				that.gender = e;
			},
			
			// 提交按钮
			submitBtn: function() {
				if(that.F_Bank == '') {
					uni.showModal({
						title: '提示',
						content: '银行名称不能为空，请输入！',
						showCancel: false
					})
					return
				}
				if(that.F_Account == '' ) {
					uni.showModal({
						title: '提示',
						content: '银行账户不能为空，请输入！',
						showCancel: false
					})
					return
				}				
				
				let reqObj = {
					    Aid:that.Aid,
						F_Bank: that.F_Bank,
						F_Account: that.F_Account,
						F_IniMoney: that.F_IniMoney ,
						F_Remark: that.F_Remark,
						usercode: uni.$userInfo.F_ID,
				}
				let action = 'addBank';				
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
							console.log('当前状态：'+this.isAdd+'账户编号:'+res.data.rows[0].Aid)
							uni.$addBank = res.data.rows[0];
							uni.$emit('addItemInListFun')
						}
						else
						{
							
							uni.$emit('updateListByIndex', {
								index: this.cardIndex,
								obj: res.data.rows[0]
							})
							uni.$emit('refreshBankFun', {
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
