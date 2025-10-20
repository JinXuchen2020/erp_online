<template>
	<view style="background-color: #F8F8F8;">
		<!-- <view class="xiangqing">
			— 报告详情 —
		</view> -->
		<!-- <u-swiper v-if="detail_lbt && detail_lbt.length > 0" :list="detail_lbt" name="url" :effect3d="true" height="320" class="swiperClass" @click="swiperClickFun"></u-swiper> -->
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<view class="back-btn" @click="handleBack">
				<uni-icons type="back" size="27" color="white"></uni-icons>
			</view>
			<view class="title">产品检验</view>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true">
			<view class="myCard">
				<view class="cardTopName">产品编号：{{detail.itemcode}}</view>
				<view class="cardRow1">
					<view class='t'>产品描述：</view>
					<view class='v'>{{detail.itemname}}</view>
				</view>	
				<view class="cardRow1">
					<view class='t'>产品颜色：</view>
					<view class='v'>{{detail.color}}</view>
				</view>
				<view class="cardRow1">
					<view class='t'>外箱尺寸：</view>
					<view class='v'>{{detail.wxc || 0}}cm*{{detail.wxk|| 0}}cm*{{detail.wxg || 0}}cm</view>
				</view>
				<view class="cardRow1">
					<view class='t'>每箱净重：</view>
					<view class='v'>{{detail.mxjz || 0}}kg</view>
				</view>							
				<view class="cardRow1">
					<view class='t'>每箱毛重：</view>
					<view class='v'>{{detail.mxmz || 0}}kg</view>
				</view>
				<view class="cardRow1">
					<view class='t'>备注：</view>
					<view class='v'>{{detail.bz}}</view>
				</view>
			</view>
			<view class="xiangqing">
				— 检查项目 —
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
					max-count="10"
					:auto-upload="true" />
				<u-field v-model="detail.mwbz" :label="'验货批注:'" clear-size="40"></u-field>
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
					max-count="10"
					index="2"
					:auto-upload="true" />
				<u-field v-model="detail.fjbz" :label="'验货批注:'" clear-size="40"></u-field>
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
					max-count="10"
					index="3"
					:auto-upload="true" />
				<u-field v-model="detail.ztbz" :label="'验货批注:'" clear-size="40"></u-field>
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
					max-count="10"
					index="4"
					:auto-upload="true" />
				<u-field v-model="detail.gnbz" :label="'验货批注:'" clear-size="40"></u-field>
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
					max-count="10"
					index="5"
					:auto-upload="true" />
				<u-field v-model="detail.xjbz" :label="'验货批注:'" clear-size="40"></u-field>
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
					max-count="10"
					index="6"
					:auto-upload="true" />
				<u-field v-model="detail.dqbz" :label="'验货批注:'" clear-size="40"></u-field>
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
					max-count="10"
					index="7"
					:auto-upload="true" />
				<u-field v-model="detail.bqbz" :label="'验货批注:'" clear-size="40"></u-field>
			</view>
			
			<view class="myCard" style="padding-bottom: 100rpx;">
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
		</scroll-view>
		
		<!--提交按钮-->
		<view v-if="!pageType" class="submitView">
			<u-button type="primary" class="submitBtn" :ripple="true" ripple-bg-color="#909399" @click="confirmYhFun">确认</u-button>
		</view>
		<u-popup v-model="showCropper" width="100%" height="100%" border-radius="14" :closeable="false">
			<view class="cropper-operation">
				<view class="flexRow">
					<u-button type="primary" class="rotate-btn" :ripple="true" ripple-bg-color="#909399" @click="changeRotateFun(90)">90°</u-button>
					<u-button type="primary" class="rotate-btn" :ripple="true" ripple-bg-color="#909399" @click="changeRotateFun(180)">180°</u-button>
					<u-button type="primary" class="rotate-btn" :ripple="true" ripple-bg-color="#909399" @click="changeRotateFun(270)">270°</u-button>
					<u-button type="primary" class="rotate-btn" :ripple="true" ripple-bg-color="#909399" @click="changeRotateFun(0)">0°</u-button>
				</view>				
			</view>
			<bt-cropper ref="cropper" :quality="0.5" :rotate="rotate" fileType="jpg" :init-position="initPosition" :imageSrc="uploadImg"></bt-cropper>
			<view class="cropper-operation-bottom">
				<view class="flexRow">
					<u-button type="primary" class="rotate-btn" :ripple="true" ripple-bg-color="#909399" @click="crop">确定上传</u-button>
				</view>			
			</view>
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
				],
				rotate: 0,
				isUpdating: false,
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
			
			this.isUpdating = false;
		},
		// onBackPress(e) {
		// 	if(this.isUpdating) {
		// 		uni.showModal({
		// 			title: '提示',
		// 			content: '图片文件已更新, 请先保存更新！',
		// 			confirmText: "确认",
		// 			cancelText: "取消",
		// 			showCancel: false,
		// 			success() {
		// 			}
		// 		})
				
		// 		return true
		// 	}
		// },
		methods: {
			changeRotateFun: function(value) {
				this.rotate = value;
				that.$refs.cropper.init();
			},
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
				that.isUpdating = true;
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
				that.isUpdating = true;
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
				that.isUpdating = true;
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
				that.isUpdating = true;
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
				that.isUpdating = true;
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
				that.isUpdating = true;
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
				that.isUpdating = true;
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
				if(that.wxlist[e].id) {					
					that.wxlist[e].delete = true;
					let arr = that.wxlist[e];
					that.deleteFun(arr)
				}
				else {
					that.wxlist.splice(e, 1);
				}
				that.isUpdating = true;
			},
			fjRemoveFun: function(e) {
				if(that.fjlist[e].id) {
					that.fjlist[e].delete = true;
					let arr = that.fjlist[e];
					that.deleteFun(arr)
				}
				else {
					that.fjlist.splice(e, 1);
				}
				that.isUpdating = true;
			},
			ztRemoveFun: function(e) {
				if(that.ztlist[e].id) {
					that.ztlist[e].delete = true;
					let arr = that.ztlist[e];
					that.deleteFun(arr)
				}
				else {
					that.ztlist.splice(e, 1);
				}
				that.isUpdating = true;
			},
			gnRemoveFun: function(e) {
				if(that.gnlist[e].id) {
					that.gnlist[e].delete = true;
					let arr = that.gnlist[e];
					that.deleteFun(arr)
				}
				else {
					that.gnlist.splice(e, 1);
				}
				that.isUpdating = true;
			},
			xjRemoveFun: function(e) {
				if(that.xjlist[e].id) {
					that.xjlist[e].delete = true;
					let arr = that.xjlist[e];
					that.deleteFun(arr)
				}
				else {
					that.xjlist.splice(e, 1);
				}
				that.isUpdating = true;
			},
			dqRemoveFun: function(e) {
				if(that.dqlist[e].id) {
					that.dqlist[e].delete = true;
					let arr = that.dqlist[e];
					that.deleteFun(arr)
				}
				else {
					that.dqlist.splice(e, 1);
				}
				that.isUpdating = true;
			},
			bqRemoveFun: function(e) {
				if(that.bqlist[e].id) {
					that.bqlist[e].delete = true;
					let arr = that.bqlist[e];
					that.deleteFun(arr)
				}
				else {
					that.bqlist.splice(e, 1);
				}
				that.isUpdating = true;
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
				
				that.isUpdating = false;
				uni.navigateBack()
			},
			handleBack() {
				if(this.isUpdating) {
					uni.showModal({
						title: '提示',
						content: '图片文件已更新, 是否确认返回？返回后更新将丢失！',
						confirmText: "确认",
						cancelText: "取消",
						showCancel: true,
						success(t) {
							if(t.confirm) {								
								uni.navigateBack()
							}
						}
					})
				}
				else {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #007AFF;
		padding-bottom: 100rpx;
		padding-top: 85rpx;
		overflow: hidden;
		height: 100vh;
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
		/* align-items: center; */
		font-size: 16px;
		margin-bottom: 8rpx;
		flex-direction: row;
	}
	
	.cardRow1 .t {
		width: 176rpx;
		color: #ADADAD;
	}
	
	.cardRow1 .v {
		color: #000000;
		width: calc(100% - 176rpx);
	}
	
	/* .cardRow1>view:first-child {
		width: 176rpx;
		color: #ADADAD;
	}
	
	.cardRow1>view:last-child {
		color: #000000;
	} */
	
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
	
	.cropper-operation {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10000;
		width: 100%;
		padding-top: 173rpx;
	}
	
	.cropper-operation-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10000;
		width: 100%;
		padding-bottom: 50rpx;
	}
	
	.rotate-btn {
		margin: 10rpx;
		flex: 1;
	}
	
	.custom-navbar {
		position: fixed;
		left: var(--window-left);
		right: var(--window-right);
		width: 100%;
	  display: flex;
	  align-items: center;
	  padding: 10rpx;
	  color: white;
	  background-color: #007AFF;
	  height: 44px;
	  padding: 7px 3px;
	  overflow: hidden;
	  justify-content: space-between;
	  box-sizing: border-box;
	  z-index: 22998;
	  transition-property: all;
	}
	
	.scroll-view {
		height: calc(100vh - 170rpx);
		padding-top: 88rpx;
	}
	
	.custom-navbar .title {
		font-weight: bold;
		font-size: 35rpx;
		flex: 1;
		text-align: center;
	}
	
	.back-btn {
	  font-size: 20px;
	  color: white;
	}
	
</style>
