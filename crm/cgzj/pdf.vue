<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import{
	   siteURL
	} from '@/config.js'
	import { cgzjApi } from '@/utils/api.js'
	export default {
		data() {
			return {
				url: '',
				reportName: '',
				F_BillID: '',
				usercode: '',
				printer: '',
				isShare: '',
				guid:''
			}
		},
		onLoad(e){
			this.F_BillID = e.F_BillID;
			this.usercode = e.usercode;
			this.printer = e.printer;
			this.reportName = e.reportName;
			this.isShare = e.isShare;
			this.guid = e.f_guid;
			this.selectPrintfile();
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// #endif
		},		
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '您好，这是订单：' + this.F_BillID + '的产品检验报告，请查看！',
				path: '/crm/cgzj/pdf?reportName=' + this.reportName + '&F_BillID=' + this.F_BillID + '&usercode=' + this.usercode + '&printer=' + this.printer+ '&f_guid=' + this.guid
			}
		},
		methods: {
			selectPrintfile() {
				let params = {
					F_BillID: this.F_BillID,
					usercode: this.usercode,
					modelname: 'frmPurQc',
					filename: this.reportName,
					printer: this.printer,
					f_guid: this.guid
				}
				let reqData = {
					action: 'previewreport',
					params: JSON.stringify(params)
				}
				uni.showLoading({
					title: '生成中...',
					mask: true,
					icon:'none'
				})
				console.log('发送指令：'+reqData.action+'传递参数：'+reqData.params)
				cgzjApi(reqData)
					.then(res => {
						let showTitle = res.data.tag
						uni.showModal({
							title: '提示',
							content: showTitle,
							showCancel: false,
						})
						
						// #ifdef MP-WEIXIN
						wx.downloadFile({
						  url: siteURL + '/pdf/' + res.data.filename,
						  success: function (res) {
						    // 拿到临时文件路径
						    const tempFilePath = res.tempFilePath;
						    // 使用 openDocument 打开
						    wx.openDocument({
						      filePath: tempFilePath,
						      fileType: 'pdf',
						      success: function (res) {
						        console.log('文档打开成功');
						      },
						      fail: function (err) {
						        console.error('打开文档失败', err);
						        wx.showToast({ title: '打开失败', icon: 'none' });
						      }
						    });
						  },
						  fail: function (err) {
						    console.error('下载文件失败', err);
						    wx.showToast({ title: '下载失败', icon: 'none' });
						  }
						});
						// #endif
						this.url = siteURL + '/pdf/' + res.data.filename;
					})
			},
		}
	}
</script>

<style>
</style>
