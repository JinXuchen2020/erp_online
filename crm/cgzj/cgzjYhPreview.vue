<template>
	<view class='content'>
		<scroll-view>
			<view class="myCard">
				<view class="cardTopName">产品验货报告</view>
				<view class="table">
					<view class="table-row">
						<view class="table-cell table-header">客户名称</view>
						<view class="table-cell">{{cgzjdetail.dykh}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">生产部门</view>
						<view class="table-cell">{{cpdetail.clientname}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">生产订单</view>
						<view class="table-cell">{{cpdetail.F_BillID}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">销售单号</view>
						<view class="table-cell">{{cpdetail.dyxs}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">客户单号</view>
						<view class="table-cell">{{cpdetail.po}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">产品型号</view>
						<view class="table-cell">{{cpdetail.spec}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">订单数量</view>
						<view class="table-cell">{{cpdetail.cgsl}}</view>
					</view>
					<view class="table-row">
						<view class="table-cell table-header">抽检数量</view>
						<view class="table-cell">{{cpdetail.countt}}</view>
					</view>
				</view>			
			</view>
			<view class="myCard">
				<view class="cardTopName">检查项目</view>
				<view class="table">
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.bzmw">外箱及唛文查看</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.bzfj">包装及附件查看</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.cpbq">产品标签查看</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.tmsm">条形码扫描</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.bzdl">包装跌落测试</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.bllmd">保利龙密度测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.wxjc">整体组装外形检查</u-checkbox>
						</view>					
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.jjcs">灯座扭矩测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.ysjc">表面及颜色检查</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.lgjc">部件牢固性检查</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.zdjc">上落或转动效果检查</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.bhcs">内部接线拉力/闭合测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">					
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.gncs">全装配/功能性测试</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.llcs">移动式出线拉力测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.lhcs">老化测试</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.fzlcs">附着力测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.gycs">高压测试</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.jxcs">极性测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.jdcs">接地测试</u-checkbox>
						</view>
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.wdxcs">稳定性测试</u-checkbox>
						</view>
					</view>
					<view class="table-row">
						<view class="table-cell">
							<u-checkbox :value="cgzjdetail.fzcs">负载测试</u-checkbox>
						</view>
						<view class="table-cell">
							<text class="mr26"></text>
							<!-- <u-checkbox :value="cpdetail.wdxcs"/> -->
						</view>
					</view>				
				</view>
			</view>
			<view class="xiangqing">
				— 检验详情 —
			</view>
			
			<view class="myCard">
				<view class="cardTopName">外箱及唛文</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="wxlist && wxlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in wxlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, wxlist)"></image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.mwbz}}</text>
				</view>
			</view>
			<view class="myCard">
				<view class="cardTopName">包装内附件</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="fjlist && fjlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in fjlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, fjlist)"></u-image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.fjbz}}</text>
				</view>
			</view>
			<view class="myCard">
				<view class="cardTopName">抽检样品总体概况</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="ztlist && ztlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in ztlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, ztlist)"></u-image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.ztbz}}</text>
				</view>
			</view>
			<view class="myCard">
				<view class="cardTopName">产品主功能</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="gnlist && gnlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in gnlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, gnlist)"></u-image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.gnbz}}</text>
				</view>
			</view>
			<view class="myCard">
				<view class="cardTopName">产品细节</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="xjlist && xjlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in xjlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, xjlist)"></u-image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.xjbz}}</text>
				</view>
			</view>
			<view class="myCard">
				<view class="cardTopName">电器部件</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="dqlist && dqlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in dqlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, dqlist)"></u-image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.dqbz}}</text>
				</view>
			</view>
			<view class="myCard">
				<view class="cardTopName">产品标签</view>	
				<view class="cardRow1 flexCenter">
					<view class="flexRow" v-if="bqlist && bqlist.length > 0">
						<image mode="widthFix" class="u-image" v-for="(item, index) in bqlist" :key="index" :src="item.url"
							:lazy-load="true" @click="previewImageFun(item.url, bqlist)"></image>
					</view>
					<dataNull v-else src="/static/img/chahua/dataNullXz.png" title="暂无图片"></dataNull>				
				</view>
				<view class="cardRow1">
					<text class="colorGray">验货批注：</text>
					<text>{{cpdetail.bqbz}}</text>
				</view>
			</view>
		</scroll-view>
		
		<!--提交按钮-->
		<view class="bottomBox">
			<view class="tabbarItem" @click="printReport">
				<u-icon class="tabImg" size="40" height="40" name="fingerprint"></u-icon>
				<view>打印</view>
			</view>
			<view class="tabbarItem">
				<button open-type="share" class="shareBtn">
					<u-icon name="share" color="black" size="40"></u-icon>
					<view>分享</view>
				</button>
			</view>
		</view>
		
		<!-- <button ref="shareButton" open-type="share" class="shareBtn" >
			<u-icon name="share" color="#ffffff" size="40"></u-icon>
		</button> -->
	</view>
</template>

<script>
	let that = '';
	import{
		siteURL
	} from '@/config.js'
	import { crmChanpinApi, cgzjApi,testrightApi } from '@/utils/api.js'
	import dataNull from '@/components/dataNull/dataNull.vue'
	export default {
		components: {
			dataNull
		},
		data() {
			return {
				cgzjdetail: {},
				cpdetail: [],
				cptp_content: [],
				wxlist: [],
				xjlist: [],
				fjlist:[],
				bqlist:[],
				gnlist:[],
				dqlist:[],
				ztlist:[],
				isShare: false,
				reportName: ''
			}
		},
		onLoad(e) {
			that = this;
			that.cgzjdetail = uni.$cgzjInfo;
			that.reportName = e.reportName;
			console.log(that.cgzjdetail);
			that.getCgzjdetailFun();
			
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// #endif
		},
		onShareAppMessage(res) {			
			return {
				title: '您好，这是订单：' + that.cgzjdetail.F_BillID + '的产品检验报告，请查看！',
				path: '/crm/cgzj/pdf?reportName=' + this.reportName + '&F_BillID=' + that.cgzjdetail.F_BillID + '&usercode=' + uni.$userInfo.F_ID + '&printer=' + uni.$userInfo.F_Printer
			}
		},
		methods: {
			// 获取订单详情记录
			getCgzjdetailFun: function() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let params = {			
					F_BillID: that.cgzjdetail.F_BillID,
					pageIndex: 1,
					pageSize: 20
				}
				let reqData = {
					action: 'selectCgzjdetail',
					params: JSON.stringify(params)
				}
				console.log('传递action' + reqData.action + ' 传递参数：' + reqData.params)
				cgzjApi(reqData)
					.then(res => {
						that.cpdetail = res.data.rows[0]
						that.cptp_content = res.data.cptp_content						
						that.getCptpdetail(that.cpdetail.f_guid);
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
					})
			},
			// 预览图片
			previewImageFun: function(str, list) {
				uni.previewImage({
					urls: list.map(c=>c.url),
					indicator: 'number',
					current: str
				})
			},
			printReport() {
				// #ifdef MP-WEIXIN
				that.selectPrintfile();
				// #endif
				
				// #ifndef MP-WEIXIN
				let url = '/crm/cgzj/pdf?reportName=' + this.reportName + '&isShare=' + that.isShare + '&F_BillID=' + that.cpdetail.F_BillID + '&usercode=' + uni.$userInfo.F_ID + '&printer=' + uni.$userInfo.F_Printer
				uni.navigateTo({
					url: url
				})
				// #endif
			},
			selectPrintfile() {
				let params = {
					F_BillID: that.cpdetail.F_BillID,
					usercode: uni.$userInfo.F_ID,
					modelname: 'frmPurQc',
					filename: this.reportName,
					printer: uni.$userInfo.F_Printer,
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
					})
			},
		}
	}
</script>

<style lang='scss'>
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
		flex-wrap: wrap;
		justify-content: flex-start;
		flex-direction: row;
		flex: 1;
	}
	.flexRow .u-image {
		padding: 5rpx;
		flex: 1;
		min-width: calc((50% - 10rpx)) !important;
		/* width: auto !important; */
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
	
	.flexCenter {
		justify-content: center;
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
	
	.submitView {
		flex: 1;
	}
	
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
		height: 50px;
		align-items: center;
	}
	
	.shareBtn {
		border: 0px;
		background-color: transparent;
		line-height: 1.3;
		font-size: 28rpx;
	}
	.shareBtn:after {
		border: 0px;
	}
	
</style>
