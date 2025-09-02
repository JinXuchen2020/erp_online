<template>
	<view>
		<view @click="pickerSelectFun('产品类型')" class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">产品类型
				<text class="redXingh">*</text>
			</text>
			<view :class="flName ? '' : 'cBlack'">
				{{flName ? flName : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品编码</text>
			<u-input v-model="F_ID" placeholder="请在此输入产品编码" />
			<u-icon @click="scanFun" class="ml26" name="scan" size="44" color="#007aff"></u-icon>
		</view>
		<view class="flex-white-plr26-column ptb10 mt32 bdb_f5">
			<view style="margin-bottom: 8rpx;">
				<text>中文名称</text>
				<text class="redXingh">*</text>
			</view>
			<u-input v-model="name" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">英文名称
			</text>
			<u-input v-model="yw" placeholder="请在此输入英文名称" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品颜色
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="color" placeholder="请在此输入产品颜色" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">工厂型号
			</text>
			<u-input v-model="spec" placeholder="请在此输入工厂型号" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<view>
				<text class="mr26">配件包
				</text>
				<u-checkbox v-model="pjb"/>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<view>
				<text class="mr26">说明书
				</text>
				<u-checkbox v-model="sms"/>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<view>
				<text class="mr26">停用
				</text>
				<u-checkbox v-model="F_Stop"/>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">零售面价
			</text>
			<u-input v-model="total" placeholder="请在此输入零售面价" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">批发售价
			</text>
			<u-input v-model="pfj" placeholder="请在此输入批发售价" />
		</view>
		<view @click="pickerSelectFun('产品单位')" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品单位
				<text class="redXingh">*</text>
			</text>
			<view :class="unit ? '' : 'cBlack'">
				{{unit ? unit : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品尺寸
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="cpcc" placeholder="请在此输入产品尺寸" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品材质
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="cz" placeholder="请在此输入产品材质" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">灯头类型
			</text>
			<u-input v-model="dtlx" placeholder="请在此输入灯头类型" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">内包尺寸
			</text>
			<u-input v-model="nbcc" placeholder="请在此输入内包尺寸" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">外箱尺寸</text>
			<u-input v-model="Long" placeholder="外箱长" /> X <u-input v-model="width" placeholder="外箱宽" /> X <u-input
				v-model="height" placeholder="外箱高" />
		</view>

		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">外箱体积
			</text>
			<u-input v-model="wxtj" disabled placeholder="请在此输入外箱体积" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">灯头数量
			</text>
			<u-input v-model="dtsl" type="number" placeholder="请在此输入灯头数量" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">每箱数量
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="bzjs" type="number" placeholder="请在此输入每箱数量" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">生产周期
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_Sczq" type="number" placeholder="请在此输入生产周期" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">起订量
			</text>
			<u-input v-model="qdl" type="number" placeholder="请在此输入起订量" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">产品净重
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="jz" placeholder="请在此输入产品净重" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">每箱净重
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="mxjz" placeholder="请在此输入每箱净重" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">每箱毛重
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="mz" placeholder="请在此输入每箱毛重" />
		</view>

		<view class="flex-white-plr26-column ptb20  bdb_f5">
			<view style="margin-bottom: 8rpx;">
				<text>产品备注</text>
			</view>
			<u-input v-model="bz" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view @click="pickerSelectFun('供应商')" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">供应商
				<text class="redXingh">*</text>
			</text>
			<view :class="gfmc ? '' : 'cBlack'">
				{{gfmc ? gfmc : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">核定成本价
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="price" placeholder="请在此输入核定成本价" />
		</view>
		<view @click="pickerSelectFun('商品HS编码')" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">商品HS编码
				<text class="redXingh">*</text>
			</text>
			<view :class="hsbm ? '' : 'cBlack'">
				{{hsbm ? hsbm : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view @click="pickerSelectFun('默认仓库')" class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">默认仓库
				<text class="redXingh">*</text>
			</text>
			<view :class="ckmc ? '' : 'cBlack'">
				{{ckmc ? ckmc : '请选择'}}
				<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
			</view>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">采购成本
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="cgcb" placeholder="请在此输入采购成本" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">业务税率
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_Taxrate" placeholder="请在此输入业务税率" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">税价合计
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_Total" placeholder="请在此输入税价合计" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">发票税率
				<text class="redXingh">*</text>
			</text>
			<u-input v-model="F_FPTaxrate" placeholder="请在此输入发票税率" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">财务核算成本
			</text>
			<u-input v-model="cwcb" placeholder="请在此输入财务核算成本" />
		</view>
		<view class="flex-white-plr26-column ptb20  bdb_f5">
			<view style="margin-bottom: 8rpx;">
				<text>变更记录</text>
			</view>
			<u-input v-model="bgjl" type="textarea" :border="true" :height="100" :auto-height="true" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">上市日期
				<text class="redXingh">*</text>
			</text>
			<picker mode="date" :value="ssrq" start="1999-02-15" end="2100-02-15" @change="bindSsrqChange">
				<view v-if="ssrq" class="w420">{{ssrq}}</view>
				<view v-else style="color: #c5c5c5;">请在此输入上市日期</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">市场专卖
			</text>
			<u-input v-model="zmsc" placeholder="请在此输入市场专卖" />
		</view>
		<view class="flex-white-plr26 ptb10 bdb_f5">
			<text class="mr26">专卖开始时间
			</text>
			<picker mode="date" :value="zmsj" start="1999-02-15" end="2100-02-15" @change="bindZmsjChange">
				<view v-if="zmsj" class="w420">{{zmsj}}</view>
				<view v-else style="color: #c5c5c5;">请在此输入专卖开始时间</view>
			</picker>
			<u-icon class="ml26" name="calendar" size="40" color="#888888"></u-icon>
		</view>
		<!-- <view class="flex-white-plr26-column ptb20 mt32 bdb_f5">
			<view style="margin-bottom: 8rpx; display: flex; align-items: center;">
				<text>产品参数</text>
				<u-icon @click="addCsFun" name="plus-circle-fill" color="#007aff" size="50" style="margin-left: 16rpx;">
				</u-icon>
			</view>
			<view class="canshuInputRow" v-for="(item, index) in cpCsList" :key="index">
				<view class="csInput1">
					<u-input v-model="item.F_Name" :border="true" placeholder="参数名称" />
				</view>
				<view class="csInput2">
					<u-input v-model="item.F_Remark" :border="true" placeholder="请在此输入参数介绍" />
				</view>
				<u-icon @click="deleteCpCsFun(index)" name="close-circle-fill" size="50" color="#ff0000"></u-icon>
			</view>
		</view> -->
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">产品封面图（1张）</view>
			<!-- <u-upload :action="action" @on-choose-complete="uploadFmChangeFun" @on-remove="fmtRemoeFun" :size-type="siziType" :show-progress="false"
				:file-list="cpFmtList" :max-size="5 * 1024 * 1024" max-count="1" :auto-upload="true"></u-upload> -->
			<u-upload :action="action" @on-success="fmtUpSus" @on-remove="fmtRemoeFun" :size-type="siziType"
				:show-progress="false" :file-list="cpFmtList" :max-size="5 * 1024 * 1024" max-count="1"
				:auto-upload="true"></u-upload>
		</view>
		<!-- <view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">产品轮播图（最多上传5张）</view>			
			<u-upload :action="action" @on-success="lbtUpSus" @on-list-change="fileChangeFun" @on-remove="lbtRemoeFun"
				:size-type="siziType" :show-progress="false" :file-list="cpLbtList" :max-size="5 * 1024 * 1024"
				max-count="5" :auto-upload="true"></u-upload>
		</view>
		<view class="flex-white-plr26-column ptb20 mt32">
			<view style="margin-bottom: 8rpx;">产品详情图（最多上传9张）</view>
			<u-upload :action="action" @on-success="xqtUpSus" @on-remove="xqtRemoeFun" :size-type="siziType"
					:show-progress="false" :file-list="cpXqtList" :max-size="5 * 1024 * 1024" max-count="9"
					:auto-upload="true"></u-upload>
		</view> -->
		<!--提交按钮-->
		<view class="submitView">
			<u-button v-if="!pageType" type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399"
				@click="addXgFun">提交</u-button>
			<u-button v-if="pageType == 'update'" type="primary" class="submitBtn" :ripple="true"
				ripple-bg-color="#909399" @click="addXgFun">保存</u-button>
		</view>
		<!--组件-->
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
		<!--图片上传方法组件-->
		<uploadImg v-if="ppImgShow" :ppList="ppList" :ppUrls="ppUrls" @confirmPopupFun="confirmPopupFun"></uploadImg>
	</view>
</template>

<script>
	let that = '';
	import {
		siteURL
	} from '@/config.js'
	import {
		getNowDate
	} from '@/utils/date.js'
	import {
		uploadImgFun
	} from '@/utils/upload.js'
	import uploadImg from '@/components/upload/uploadImg'
	import {
		crmChanpinApi,
		crmCpClassifyApi,
		fileApi
	} from '@/utils/api.js'

	export default {
		components: {
			uploadImg
		},
		data() {
			return {
				F_ID: '',
				cpFlId: '',
				flName: '',
				pName: '',
				yw: '',
				color: '',
				spec: '',
				total: '',
				pfj: '',
				unit: '',
				cpcc: '',
				cz: '',
				dtlx: '',
				nbcc: '',
				Long: '',
				width: '',
				height: '',
				wxtj: '',
				dtsl: '',
				bzjs: '1',
				F_Sczq: '',
				qdl: '1',
				jz: '',
				mxjz: '',
				mz: '',
				bz: '',
				gfmc: '',
				price: '',
				hsbm: '',
				ckmc: '',
				cgcb: '',
				F_Taxrate: '',
				F_Total: '',
				F_FPTaxrate: '',
				cwcb: '',
				bgjl: '',
				ssrq: '',
				zmsc: '',
				zmsj: '',
				pjb: false,
				sms: false,
				F_Stop: false,
				

				selectShow: false,
				selectList: [],
				selectType: '',
				action: siteURL + '/fileApi.aspx?action=saveFile',
				fileList: [],
				classify: [],
				dwlist: [],
				gfmclist: [],
				hslist: [],
				ckmclist: [],
				cpLbt: [],
				cpXqt: [],
				cpFmt: [],
				cpLbtList: [],
				cpXqtList: [],
				cpFmtList: [],
				cpCsList: [],
				pageType: '',
				siziType: ['compressed'],
				ppImgShow: false,
				uploadType: '',
				ppList: [],
				ppUrls: [],
				xgCpInfo: {}
			}
		},
		watch: {
			Long(newVal) {
				that.wxtj = (newVal * that.width * that.height) / 1000000;
			},
			width(newVal) {
				that.wxtj = (that.Long * newVal * that.height) / 1000000;
			},
			height(newVal) {
				that.wxtj = (that.Long * that.width * newVal) / 1000000;
			}
		},
		onLoad(e) {
			that = this;
			if (uni.$cpDetail.F_ID) {
				that.getGoodDetailByIdFun(uni.$cpDetail.F_ID)
			}
			that.pageType = e.type;
			that.setDataFun();
			that.getClassifyFun();
			that.getDwlistFun();
			that.getGfmclistFun();
			that.getHslistFun();
			that.getCkmclistFun();
		},
		methods: {
			bindSsrqChange: function(e) {
				that.ssrq = e.detail.value;
				console.log('取得时间为：')
				console.log(e.detail.value)
				// that.bjdDateTime = new Date(e.detail.value + ' 00:00:00').getTime()
			},
			bindZmsjChange: function(e) {
				that.zmsj = e.detail.value;
				console.log('取得时间为：')
				console.log(e.detail.value)
				// that.bjdDateTime = new Date(e.detail.value + ' 00:00:00').getTime()
			},
			fmtUpSus(data) {
				console.log('上传成功的返回值1')
				console.log(data);

				let arr = {
					url: siteURL + '/' + data.fileName,
					id: 0,
					cpid: 0,
					type: '封面图'
				}
				//that.cpFmtList = [];
				that.cpFmt = [];
				//that.cpFmtList.push(arr);
				that.cpFmt.push(arr);
				console.log('封面图地址：');
				console.log(arr)
			},
			lbtUpSus(data) {


				let arr = {
					url: siteURL + '/' + data.fileName,
					id: 0,
					cpid: 0,
					type: '轮播图'
				}
				//that.cpLbtList.push(arr);
				that.cpLbt.push(arr);
				console.log('轮播图：');
				console.log(arr)
			},
			xqtUpSus(data) {


				let arr = {
					url: siteURL + '/' + data.fileName,
					id: 0,
					cpid: 0,
					type: '详情图'
				}
				//that.cpXqtList.push(arr);
				that.cpXqt.push(arr);
				console.log('详情图：');
				console.log(arr)
			},



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
					action: 'getFlList',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.flName = data[0].flName;
								that.cpFlId = data[0].F_ID;
							}
							that.classify = data;
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
			// 查询分类方法
			getDwlistFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {

				}
				let reqData = {
					action: 'getDwList',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.unit = data[0].flName;
							}
							that.dwlist = data;
						} else {
							uni.showModal({
								title: '提示',
								content: '当前暂未设置计量单位，请先添加计量单位！',

							})
						}
					})
			},
			// 查询供应商方法
			getGfmclistFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {

				}
				let reqData = {
					action: 'getGfmcList',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.gfmc = data[0].F_Name;
							}
							that.gfmclist = data;
						} else {
							uni.showModal({
								title: '提示',
								content: '当前暂未设置供应商，请先添加供应商！',

							})
						}
					})
			},
			// 查询HS编码方法
			getHslistFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {

				}
				let reqData = {
					action: 'getHsList',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.hsbm = data[0].F_Name;
							}
							that.hslist = data;
						} else {
							uni.showModal({
								title: '提示',
								content: '当前暂未设置HS编码，请先添加HS编码！',

							})
						}
					})
			},
			// 查询仓库名称方法
			getCkmclistFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {

				}
				let reqData = {
					action: 'getCkmcList',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmCpClassifyApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data && data.length > 0) {
							if (that.pageType != 'update') {
								that.ckmc = data[0].F_Name;
							}
							that.ckmclist = data;
						} else {
							uni.showModal({
								title: '提示',
								content: '当前暂未设置仓库，请先添加仓库！',

							})
						}
					})
			},
			// 选择定位地点
			chooseAddrFun: function() {
				uni.chooseLocation({
					success: function(res) {
						that.gjAddr = res.address;
					}
				});
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
				if (str == '产品单位') {
					let dwlist = that.dwlist;
					let arr = [];
					for (var i = 0; i < dwlist.length; i++) {
						arr.push({
							value: dwlist[i].F_Name,
							id: dwlist[i].F_Name,
							label: dwlist[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '供应商') {
					let gfmclist = that.gfmclist;
					let arr = [];
					for (var i = 0; i < gfmclist.length; i++) {
						arr.push({
							value: gfmclist[i].F_Name,
							id: gfmclist[i].F_Name,
							label: gfmclist[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '商品HS编码') {
					let hslist = that.hslist;
					let arr = [];
					for (var i = 0; i < hslist.length; i++) {
						arr.push({
							value: hslist[i].F_Name,
							id: hslist[i].F_Name,
							label: hslist[i].F_Name
						})
					}
					that.selectList = arr;
				}
				if (str == '默认仓库') {
					let ckmclist = that.ckmclist;
					let arr = [];
					for (var i = 0; i < ckmclist.length; i++) {
						arr.push({
							value: ckmclist[i].F_Name,
							id: ckmclist[i].F_Name,
							label: ckmclist[i].F_Name
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
					that.flName = e[0].label;
					that.cpFlId = e[0].F_ID || e[0].value;
				}
				if (that.selectType == '上下架') {
					that.isSxJ = e[0].label;
				}
				if (that.selectType == '上下架') {
					that.isSxJ = e[0].label;
				}
				if (that.selectType == '产品单位') {
					that.unit = e[0].label;
				}
				if (that.selectType == '供应商') {
					that.gfmc = e[0].label;
				}
				if (that.selectType == '商品HS编码') {
					that.hsbm = e[0].label;
				}
				if (that.selectType == '默认仓库') {
					that.ckmc = e[0].label;
				}
			},
			// 当内部文件列表被加入文件、移除文件，或手动调用clear方法时触发
			uploadFmChangeFun: function(list) {
				that.uploadType = 'fmt';
				that.ppList = list;
				that.ppUrls = that.cpFmt;
				that.ppImgShow = true;
			},
			// 封面图删除
			fmtRemoeFun: function(e) {
				console.log('ddddd');
				let arr = that.cpFmt.splice(e, 1);
				that.deleteFun(arr)
			},
			fileChangeFun: function(e) {},
			// 上传轮播图
			uploadLbtChangeFun: function(list) {
				that.uploadType = 'lbt';
				that.ppList = list;
				that.ppUrls = that.cpLbt;
				that.ppImgShow = true;
			},
			// 轮播图删除
			lbtRemoeFun: function(e) {
				console.log('删除轮播图开始');
				let arr = that.cpLbt.splice(e, 1);
				console.log('删除轮播图' + arr);
				that.deleteFun(arr)
			},
			// 上传详情图
			uploadXqChangeFun: function(list) {
				that.uploadType = 'xqt';
				that.ppList = list;
				that.ppUrls = that.cpXqt;
				that.ppImgShow = true;
			},
			// 详情图删除
			xqtRemoeFun: function(e) {
				let arr = that.cpXqt.splice(e, 1);
				that.deleteFun(arr)
			},
			// popup图片上传完成回调
			confirmPopupFun: function(e) {
				that.ppImgShow = false;
				if (that.uploadType == 'lbt') {
					that.cpLbt = e;
				} else if (that.uploadType == 'xqt') {
					that.cpXqt = e;
				} else {
					that.cpFmt = e;
				}
			},
			// 删除文件云函数
			deleteFun: function(list) {
				let params = {
					id: list[0].id
				}
				let reqData = {
					action: 'deleteFileById',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				fileApi(reqData)
					.then(res => {

					})
			},
			scanFun: function() {
				uni.scanCode({
					success(res) {
						that.F_ID = res.result;
					}
				})
			},
			// 产品添加方法
			addXgFun: function() {
				let reqObj = {
					F_ID: that.F_ID,
					F_Type: that.cpFlId,
					F_TypeName: that.flName,
					name: that.pName,
					yw: that.yw,
					color: that.color,
					spec: that.spec,
					total: that.total,
					pfj: that.pfj,
					unit: that.unit,
					cpcc: that.cpcc,
					cz: that.cz,
					dtlx: that.dtlx,
					nbcc: that.nbcc,
					Long: that.Long,
					width: that.width,
					height: that.height,
					wxtj: that.wxtj,
					dtsl: that.dtsl,
					bzjs: that.bzjs,
					F_Sczq: that.F_Sczq,
					qdl: that.qdl,
					jz: that.jz,
					mxjz: that.mxjz,
					mz: that.mz,
					bz: that.bz,
					gfmc: that.gfmc,
					price: that.price,
					hsbm: that.hsbm,
					ckmc: that.ckmc,
					cgcb: that.cgcb,
					F_Taxrate: that.F_Taxrate,
					F_Total: that.F_Total,
					F_FPTaxrate: that.F_FPTaxrate,
					cwcb: that.cwcb,
					bgjl: that.bgjl,
					ssrq: that.ssrq,
					zmsc: that.zmsc,
					zmsj: that.zmsj,
					usercode: uni.$userInfo.F_ID,
					pjb:  that.pjb,
					sms: that.sms,
					F_Stop: that.F_Stop,

					cpCsList: that.cpCsList,
					cpLbtList: that.cpLbt,
					cpXqtList: that.cpXqt,
					cpFmtList: that.cpFmt,


				}
				if (!that.name) {
					uni.$myModalFun('产品名称不能为空，请输入！')
					return
				}
				if (!that.price) {
					uni.$myModalFun('产品价格不能为空，请输入！')
					return
				}
				if (!that.unit) {
					uni.$myModalFun('产品单位不能为空，请输入！')
					return
				}
				let action = 'update';
				let time = new Date().getTime();

				reqObj.F_ID = that.xgCpInfo.F_ID;
				reqObj.update_date = time;
				reqObj.updateUid = uni.$userInfo.F_ID;
				uni.showLoading({
					title: '修改中...'
				})

				let reqData = {
					action: action,
					params: JSON.stringify(reqObj)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmChanpinApi(reqData)
					.then(res => {

						uni.showToast({
							title: '产品修改成功',
							icon: 'none',
							duration: 1000
						})
						
						uni.$emit('addItemcodeInListFun');
						setTimeout(() => {
							uni.redirectTo({
								url: './cpDetail?F_ID=' + that.xgCpInfo.F_ID
							})
						}, 1000)

					})
			},
			// 新增产品参数
			addCsFun: function() {
				that.cpCsList = that.cpCsList.concat({
					csName: '',
					csJieShao: ''
				})
			},
			// 删除产品参数
			deleteCpCsFun: function(iii) {
				that.cpCsList.splice(iii, 1)
			},
			// 根据商品id查询商品详情
			getGoodDetailByIdFun: function(id) {
				let params = {
					id
				}
				let reqData = {
					action: 'getDetailById',
					params: JSON.stringify(params)
				}
				console.log('发送指令：' + reqData.action + '传递参数：' + reqData.params)
				crmChanpinApi(reqData)
					.then(res => {
						let data = res.data.rows;
						if (data.length > 0) {
							that.cpCsList = res.data.cpcs;
							that.cpFmtList = res.data.fmt;
							that.cpLbtList = res.data.lbt;
							that.cpXqtList = res.data.xqt;
							that.cpFmt = res.data.fmt;
							that.cpLbt = res.data.lbt;
							that.cpXqt = res.data.xqt;
						}
					})
			},
			// 设置信息
			setDataFun: function() {
				let obj = uni.$cpDetail;
				that.xgCpInfo = obj;
				that.F_ID = obj.F_ID;
				that.name = obj.name;
				that.cpFlId = obj.cpFlId;
				that.flName = obj.flName;
				that.pName = obj.pName;
				that.yw = obj.yw;
				that.color = obj.color;
				that.spec = obj.spec;
				that.total = obj.total;
				that.pfj = obj.pfj;
				that.unit = obj.unit;
				that.cpcc = obj.cpcc;
				that.cz = obj.cz;
				that.dtlx = obj.dtlx;
				that.nbcc = obj.nbcc;
				that.Long = obj.Long;
				that.width = obj.width;
				that.height = obj.height;
				that.wxtj = obj.wxtj;
				that.dtsl = obj.dtsl;
				that.bzjs = obj.bzjs;
				that.F_Sczq = obj.F_Sczq;
				that.qdl = obj.qdl;
				that.jz = obj.jz;
				that.mxjz = obj.mxjz;
				that.mz = obj.mz;
				that.bz = obj.bz;
				that.gfmc = obj.gfmc;
				that.price = obj.price;
				that.hsbm = obj.hsbm;
				that.ckmc = obj.ckmc;
				that.cgcb = obj.cgcb;
				that.F_Taxrate = obj.F_Taxrate;
				that.F_Total = obj.F_Total;
				that.F_FPTaxrate = obj.F_FPTaxrate;
				that.cwcb = obj.cwcb;
				that.bgjl = obj.bgjl;
				that.ssrq = obj.ssrq || this.$u.timeFormat(new Date(), 'yyyy-mm-dd');
				that.zmsc = obj.zmsc;
				that.zmsj = obj.zmsj || this.$u.timeFormat(new Date(), 'yyyy-mm-dd');
				that.pjb =  obj.pjb;
				that.sms= obj.sms;
				that.F_Stop= obj.F_Stop;
				/* that.cpCsList = uni.$cpDetail_cs|| [];
				console.log('获得的参数列表为：');
				console.log(that.cpCsList);
				console.log(uni.$cpDetail_cs);
				that.cpLbtList = uni.$cpDetail_lbt || [];
				that.cpXqtList = uni.$cpDetail_xqt || [];
				that.cpFmtList = uni.$cpDetail_fmt || [];
				that.cpLbt = uni.$cpDetail_lbt || [];
				that.cpXqt = uni.$cpDetail_xqt || [];
				that.cpFmt = uni.$cpDetail_fmt || []; */				
			}
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

	.submitView {
		width: 100%;
		padding: 16rpx 0 26rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #f1f1f1;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.submitBtn {
		width: 666rpx;
	}

	.canshuInputRow {
		display: flex;
		justify-content: space-between;
		margin-top: 16rpx;
	}

	.canshuInputRow>.csInput1 {
		width: 36%;
	}

	.canshuInputRow>.csInput2 {
		width: 50%;
	}
</style>