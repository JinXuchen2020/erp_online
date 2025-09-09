<template>
	<view>
		<view class="xiangqing">
			— 报告详情 —
		</view>
		<!-- <u-swiper v-if="detail_lbt && detail_lbt.length > 0" :list="detail_lbt" name="url" :effect3d="true" height="320" class="swiperClass" @click="swiperClickFun"></u-swiper> -->
		<view class="myCard">
			<view class="cardTopName">产品编号：{{detail.itemcode}}</view>
			<view class="cardRow1" v-if="detail.spec">
				<view>产品描述：</view>
				<view>{{detail.itemname}}</view>
			</view>	
			<view class="cardRow1" v-if="detail.color">
				<view>产品颜色：</view>
				<view>{{detail.color}}</view>
			</view>
			<view class="cardRow1">
				<view>外箱尺寸：</view>
				<view>{{detail.wxc}}cm*{{detail.wxk}}cm*{{detail.wxg}}cm</view>
			</view>
			<view class="cardRow">
				<view>每箱净重：</view>
				<view>{{detail.mxjz}}kg</view>
			</view>							
			<view class="cardRow">
				<view>每箱毛重：</view>
				<view>{{detail.mxmz}}kg</view>
			</view>
			<view class="cardRow1" v-if="detail.bz">
				<view>备注：</view>
				<view>{{detail.bz}}</view>
			</view>
		</view>
		<view class="xiangqing">
			— 检查项目 —
		</view>
		<view class="myCard">
			<view class="cardTopName">检验结果</view>
			<view class="table">
				<view @click="pickerSelectFun()" class="flex-white-plr26 ptb20 bdb_f5">
					<text class="mr26">检验结果</text>
					<view  :class="detail.F_Result ? '' : 'cBlack'">
						{{detail.F_Result ? detail.F_Result : '请选择'}}
						<u-icon class="ml26" name="arrow-right" size="40" color="#888888"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="myCard">
			<view class="cardTopName">包装检查</view>
			<view class="table">
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.bzmw">外箱及唛文查看</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.bzfj">包装及附件查看</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.cpbq">产品标签查看</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.tmsm">条形码扫描</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.bzdl">包装跌落测试</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.bllmd">保利龙密度测试</u-checkbox>
					</view>
				</view>			
			</view>
		</view>
		<view class="myCard">
			<view class="cardTopName">外观结构</view>
			<view class="table">
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.zdjc">上落或转动效果检查</u-checkbox>
					</view>						
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.gncs">全装配/功能性测试</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.ysjc">表面及颜色检查</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.lgjc">部件牢固性检查</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.wxjc">整体组装外形检查</u-checkbox>
					</view>
				</view>			
			</view>
		</view>
		<view class="myCard">
			<view class="cardTopName">安全检查</view>
			<view class="table">
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.bhcs">内部接线拉力/闭合测试</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.llcs">移动式出线拉力测试</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.lhcs">老化测试</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.fzlcs">附着力测试</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.gycs">高压测试</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.jxcs">极性测试</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.jdcs">接地测试</u-checkbox>
					</view>
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.wdxcs">稳定性测试</u-checkbox>
					</view>
				</view>
				<view class="table-row">
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.fzcs">负载测试</u-checkbox>
					</view>					
					<view class="table-cell">
						<u-checkbox v-model="cgzjInfo.jjcs">灯座扭矩测试</u-checkbox>
					</view>
				</view>				
			</view>
		</view>
		<view class="xiangqing">
			— 检验详情 —
		</view>
		
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">外箱及唛头</view>
			<u-upload 
				ref="wxuploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="wxUpSus" 
				@on-remove="wxRemoveFun"
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="wxShowlist" 
				:max-size="5 * 1024 * 1024"
				index="1"
				max-count="4"
				:auto-upload="true" />
			<u-field v-model="detail.mwbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">包装内附件</view>
			<u-upload
				ref="fjuploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="fjUpSus" 
				@on-remove="fjRemoveFun" 
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="fjShowlist" 
				:max-size="5 * 1024 * 1024" 
				max-count="4"
				index="2"
				:auto-upload="true" />
			<u-field v-model="detail.fjbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">抽检样品总体概况</view>
			<u-upload
				ref="ztuploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="ztUpSus" 
				@on-remove="ztRemoveFun" 
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="ztShowlist" 
				:max-size="5 * 1024 * 1024" 
				max-count="4"
				index="3"
				:auto-upload="true" />
			<u-field v-model="detail.ztbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">产品主功能</view>
			<u-upload
				ref="gnuploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="gnUpSus" 
				@on-remove="gnRemoveFun" 
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="gnShowlist" 
				:max-size="5 * 1024 * 1024" 
				max-count="4"
				index="4"
				:auto-upload="true" />
			<u-field v-model="detail.gnbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">产品细节</view>
			<u-upload
				ref="xjuploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="xjUpSus" 
				@on-remove="xjRemoveFun" 
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="xjShowlist" 
				:max-size="5 * 1024 * 1024" 
				max-count="4"
				index="5"
				:auto-upload="true" />
			<u-field v-model="detail.xjbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">电器部件</view>
			<u-upload
				ref="dquploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="dqUpSus" 
				@on-remove="dqRemoveFun" 
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="dqShowlist" 
				:max-size="5 * 1024 * 1024" 
				max-count="4"
				index="6"
				:auto-upload="true" />
			<u-field v-model="detail.dqbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<view class="myCard">
			<view style="margin-bottom: 8rpx;">产品标签</view>
			<u-upload 
				ref="bquploadRef"
				:action="action" 
				:form-data="formData" 
				@on-choose-complete="chooseFileFn" 
				:before-upload="beforeUpload" 
				@on-success="bqUpSus" 
				@on-remove="bqRemoveFun" 
				:size-type="sizeType"
				:show-progress="false" 
				:file-list="bqShowlist" 
				:max-size="5 * 1024 * 1024" 
				max-count="4"
				index="7"
				:auto-upload="true" />
			<u-field v-model="detail.bqbz" :label="'验货批注'" clear-size="40"></u-field>
		</view>
		<!--提交按钮-->
		<view v-if="!pageType" class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="confirmYhFun">确认</u-button>
		</view>
		<u-popup v-model="showCropper" width="100%" height="100%" border-radius="14" :closeable="false">			
			<button @click="crop">确定上传</button>
			<bt-cropper ref="cropper" :quality="0.5" fileType="jpg" :init-position="initPosition" :imageSrc="uploadImg"></bt-cropper>
		</u-popup>
		<u-select v-model="selectShow" :list="selectList" @confirm="selectConfirmFun"></u-select>
	</view>
</template>

<script>
	let that = '';
	import {
		siteURL
	} from '@/config.js'
	import { cgzjApi, fileApi } from '@/utils/api.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	export default {
		components: {
			dataNull
		},
		data() {
			return {
				detail: {},
				cpIndex: 0,
				cgzjInfo: {},
				detail_cs: {},
				detail_fmt: {},
				detail_lbt: {},
				detail_xqt: {},
				background: {
					'background-image': 'linear-gradient(45deg, #007aff, rgb(12, 168, 234))'
				},
				customStyle: {
					backgroundColor: 'rgb(13, 159, 224)',
					color: '#FFFFFF',
					border: '0',
					fontSize: '32',
					outline: 'none'
				},
				lbt: [],
				pageType: '',
				action: siteURL + '/fileApi1.aspx?action=saveFile',
				sizeType: ['compressed'],
				formData:{
					'token': uni.getStorageSync("uni_id_token"),
					'filePath': '',
					'fileName': ''
				},
				uploadImg: '',
				showCropper: false,
				currentFile: null,
				currentIndex: 0,
				wxlist: [],
				xjlist: [],
				fjlist:[],
				bqlist:[],
				gnlist:[],
				dqlist:[],
				ztlist:[],				
				wxShowlist: [],
				xjShowlist: [],
				fjShowlist:[],
				bqShowlist:[],
				gnShowlist:[],
				dqShowlist:[],
				ztShowlist:[],
				initPosition: {
					// left: 0,
					// top: 0,
					// width: 400,
					// height: 400
				},
				uploadIndex: '',
				selectShow: false,
				selectList:[
					{
						value: 'Acceptable',
						id: 'Acceptable',
						label: 'Acceptable'
					},
					{
						value: 'Rejective',
						id: 'Rejective',
						label: 'Rejective'
					},
					{
						value: 'Pending',
						id: 'Pending',
						label: 'Pending'
					}
				]
			}
		},
		onLoad(e) {
			that = this;
			that.cpIndex = e.cpIndex;
			that.detail = uni.$cgzjProduct;
			that.cgzjInfo = uni.$cgzjInfo;
			if (that.detail.f_guid) {
				that.getCptpdetail(that.detail.f_guid);
			}
		},
		methods: {
			selectConfirmFun: function(e) {
				that.detail.F_Result = e[0].label;
			},
			pickerSelectFun: function() {
				that.selectShow = true;
			},
			// 预览图片
			previewImageFun: function(str, list) {
				uni.previewImage({
					urls: list,
					indicator: 'number',
					current: str
				})
			},
			getCptpdetail(id) {
				let params={
					F_Guid: id
				}
				let reqData = {
					action: 'selectCptpdetail',
					params: JSON.stringify(params)
				}
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				cgzjApi(reqData)
					.then(res => {
						that.wxlist = res.data.wxlist;
						that.xjlist = res.data.xjlist;
						that.fjlist = res.data.fjlist;
						that.bqlist = res.data.bqlist;
						that.gnlist = res.data.gnlist;
						that.dqlist = res.data.dqlist;
						that.ztlist = res.data.ztlist;
						that.wxShowlist = JSON.parse(JSON.stringify(res.data.wxlist.filter(c=>!c.delete)));
						that.xjShowlist = JSON.parse(JSON.stringify(res.data.xjlist.filter(c=>!c.delete)));
						that.fjShowlist = JSON.parse(JSON.stringify(res.data.fjlist.filter(c=>!c.delete)));
						that.bqShowlist = JSON.parse(JSON.stringify(res.data.bqlist.filter(c=>!c.delete)));
						that.gnShowlist = JSON.parse(JSON.stringify(res.data.gnlist.filter(c=>!c.delete)));
						that.dqShowlist = JSON.parse(JSON.stringify(res.data.dqlist.filter(c=>!c.delete)));
						that.ztShowlist = JSON.parse(JSON.stringify(res.data.ztlist.filter(c=>!c.delete)));
					})
			},
			wxUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '外箱'
				}
				
				that.wxlist.push(arr);
			},
			fjUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '附件'
				}
				
				that.fjlist.push(arr);
			},
			ztUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '整体'
				}
				
				that.ztlist.push(arr);
			},
			gnUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '功能'
				}
				
				that.gnlist.push(arr);
			},
			xjUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '细节'
				}
				
				that.xjlist.push(arr);
			},
			dqUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '电器'
				}
				
				that.dqlist.push(arr);
			},
			bqUpSus(data) {
				console.log(data);
			
				const fileName = data.fileName.split('/')[data.fileName.split('/').length - 1]
				let arr = {
					url: siteURL + '/' + data.fileName,
					F_Imagename: fileName,
					F_Filename: fileName,
					F_Code: that.detail.f_guid,
					F_Type: '标签'
				}
				
				that.bqlist.push(arr);
			},
			chooseFileFn(data, index){
				let imgType = "product";
				that.uploadIndex = index;
				let date = new Date();
				that.selectedFile = [];
				for(let i = 0; i< data.length;i++){
					let fileObj = data[i];
					if(fileObj.progress == 100){
						continue;
					}
					let xxx = fileObj.file.name || fileObj.file.path;
					let path = fileObj.file.path;
					let typeSrc = '.' + xxx.split('.')[1];
					that.selectedFile.push({
					  'token': uni.getStorageSync("uni_id_token"),
					  'filePath': path,
					  'fileName':'image/' + imgType + '/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
						date
						.getDate() + '/' +
						date.getTime() + Math.ceil(Math.random() * 100) + typeSrc
					});
				}
			},
			beforeUpload(index, list) {
				// that.formData.fileName = that.selectedFile[0].fileName;
				// that.formData.filePath = that.selectedFile[0].filePath;
				// return true;
				if(that.showCropper) {
					return true;
				}
						
				// 读取文件为Base64
				const fileObj = list[index];
				that.uploadImg = fileObj.url;
				that.currentFile = fileObj;
				that.currentIndex = index;
				that.showCropper = true; // 显示裁剪框
				// const reader = new FileReader();
				// reader.readAsDataURL(fileObj.file);
				// reader.onload = () => {
				// 	that.uploadImg = reader.result;
				// 	that.currentFile = fileObj;
				// 	that.currentIndex = index;
				// 	that.showCropper = true; // 显示裁剪框
				// };
				
				// console.log(list);
				return false; // 阻止自动上传
			},
			crop() {
				that.$refs.cropper.crop().then((res)=>{
					// const response = await fetch(res);
					// const blob = await response.blob();
					// const file = new File([blob], that.currentFile.file.name, { type: blob.type });
					// file.path = res;
					that.currentFile.url = res;
					console.log(that.$refs);
					// that.currentFile.file = file;
					// that.selectedFile[0].filePath = res;
					switch(that.uploadIndex) {
						case "1":						
							that.$refs.wxuploadRef.uploadFile(that.currentIndex);
							break;
						case "2":
							that.$refs.fjuploadRef.uploadFile(that.currentIndex);
							break;
						case "3":
							that.$refs.ztuploadRef.uploadFile(that.currentIndex);
							break;
						case "4":
							that.$refs.gnuploadRef.uploadFile(that.currentIndex);
							break;
						case "5":
							that.$refs.xjuploadRef.uploadFile(that.currentIndex);
							break;
						case "6":
							that.$refs.dquploadRef.uploadFile(that.currentIndex);
							break;
						case "7":
							that.$refs.bquploadRef.uploadFile(that.currentIndex);
							break;
					}					
					// that.$refs.cropper.resume();
					that.showCropper = false;
				})
			},
			wxRemoveFun: function(e) {
				that.wxlist[e].delete = true;
				let arr = that.wxlist[e];
				that.deleteFun(arr)
			},
			fjRemoveFun: function(e) {
				that.fjlist[e].delete = true;
				let arr = that.fjlist[e];
				// let arr = that.fjlist.splice(e, 1);
				that.deleteFun(arr)
			},
			ztRemoveFun: function(e) {
				that.ztlist[e].delete = true;
				let arr = that.ztlist[e];
				// let arr = that.ztlist.splice(e, 1);
				that.deleteFun(arr)
			},
			gnRemoveFun: function(e) {
				that.gnlist[e].delete = true;
				let arr = that.gnlist[e];
				// let arr = that.gnlist.splice(e, 1);
				that.deleteFun(arr)
			},
			xjRemoveFun: function(e) {
				that.xjlist[e].delete = true;
				let arr = that.xjlist[e];
				// let arr = that.xjlist.splice(e, 1);
				that.deleteFun(arr)
			},
			dqRemoveFun: function(e) {
				that.dqlist[e].delete = true;
				let arr = that.dqlist[e];
				// let arr = that.dqlist.splice(e, 1);
				that.deleteFun(arr)
			},
			bqRemoveFun: function(e) {
				that.bqlist[e].delete = true;
				let arr = that.bqlist[e];
				// let arr = that.bqlist.splice(e, 1);
				that.deleteFun(arr)
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
			confirmYhFun: function() {
				uni.$cgzjInfo = that.cgzjInfo;
				uni.$cgzjProduct = that.detail;
				uni.$emit('updateYhResult', {
					wxlist: that.wxlist,
					fjlist: that.fjlist,
					ztlist: that.ztlist,
					gnlist: that.gnlist,
					xjlist: that.xjlist,
					dqlist: that.dqlist,
					bqlist: that.bqlist,
					cpIndex: that.cpIndex,
				})
				uni.navigateBack()
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #F8F8F8;
		padding-bottom: 100rpx;
	}

	.swiperClass {
		margin-top: 16rpx;
	}

	.xiangqing {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin: 16rpx 0;
	}

	.spXQBox {
		width: 698rpx;
		margin: 0 26rpx;
		background-color: #FFFFFF;
		padding: 26rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		box-shadow: #d8d8d8 0px 0px 16rpx;
	}

	.table {
		width: 100%;
		border: 1rpx solid #E7E7E7;
		margin: 32rpx 0;
	}

	.row {
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1rpx solid #E7E7E7;
	}

	.row>view:first-child {
		width: 180rpx;
		height: 100%;
		font-size: 28rpx;
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.row>view:last-child {
		width: 506rpx;
		height: 100%;
		font-size: 28rpx;
		padding: 16rpx;
		box-sizing: border-box;
		border-left: 1rpx solid #E7E7E7;
	}

	.imgXQ {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 32rpx;
	}

	.imgXqtp {
		width: 100%;
	}

	.flexRow {
		display: flex;
	}
	.xqTitle {
		font-size: 16px;
		font-weight: bold;
		margin: 26rpx;
	}
	.addBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 80rpx;
		right: 26rpx;
		z-index: 100;
	}
	.addBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
	.shopBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0;
		color: #FFFFFF;
		font-weight: bold;
		justify-content: center;
		position: fixed;
		bottom: 190rpx;
		right: 26rpx;
		z-index: 100;
	}
	.shopBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
	}
	.nameCardBtn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background-image: linear-gradient(45deg, #007aff, #00aaff);
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0;
		color: #FFFFFF;
		font-weight: bold;
		justify-content: center;
		position: fixed;
		bottom: 300rpx;
		right: 26rpx;
		z-index: 100;
	}
	.nameCardBtn:active {
		background-image: linear-gradient(45deg, #00aaff, #007aff);
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
		/* width: 266rpx; */
	}
	
	.container {
		height: 100%;
	}
	
	.table {
		display: table;
		width: 100%;
		border-collapse: collapse;
	}
	
	.table-row {
		display: table-row;
	}
	
	.table-cell {
		display: table-cell;
		padding: 16rpx 10rpx;
		border: 1px solid #e0e0e0;
		vertical-align: middle;
	}
	
	.table-header {
		background-color: #f8f9fa;
		font-weight: bold;
		color: #2c3e50;
		width: 180rpx;
	}
	
	.u-checkbox__label {
		margin-right: 0rpx !important;
	}
	
</style>
