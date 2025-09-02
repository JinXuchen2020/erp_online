import{
	siteURL
} from '@/config.js'


function failToastFun(e) {
	uni.hideLoading()
	if(e.errDetail) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errDetail + '，请检查网络是否可用！'
		})
	} else if(e.errMsg) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errMsg + '，请检查网络是否可用！'
		})
	} else {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.message + '，请联系相关工作人员解决！'
		})
	}
}
function successFun(res, resolve, reject) {
	uni.hideLoading()		
	if (res.data.code>0) {
		
		if(res.data.code == 403 || res.data.code == 30203 || res.data.code == 30204 || res.data.code == 30202 || res.data.code == 30201) {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: '登录token已失效，请重新登录！',
				success() {					
					// #ifdef H5
					uni.reLaunch({
						url: '/pages/regLogin/login'
					})
					// #endif
				}
			})
		} else {
			uni.showModal({
				title: '提示',
				showCancel: false,
				//content: res.data.tag+' 原因：'+res.data.msg
				content: res.data.tag
			})
		}
		//reject(res)
	} else {
		resolve(res)
	}
}
// 产品api
function crmChanpinApi(data) {
	return new Promise( (resolve, reject) => {		
		uni.request({
						url:siteURL+"/crmchanpinApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 产品分类api
function crmCpClassifyApi(data) {
	return new Promise( (resolve, reject) => {		
		uni.request({
						url:siteURL+"/crmcpClassifyApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// uni-id-cf
function uniIdCfApi(data) {
	return new Promise( (resolve, reject) => {		
		uni.request({
						url:siteURL+"/uniidcf.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// CRM用户Api
function crmMyAppUserApi(data) {
	return new Promise( (resolve, reject) => {	
		console.log('api获得发送指令'+data.action+siteURL+"/myAppuser.aspx?")
		uni.request({
						url:siteURL+"/myAppuser.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							successFun(res, resolve);
						}
						
					})
	})
}
// 客户Api
function clientApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/clientApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 职员Api
function employeeApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/employeeApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 供方Api
function supplierApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/supplierApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 销售订单Api
function salesorderApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/salesorderApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 现货销售Api
function xhxsApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/xhxsApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 销售PIApi
function PIApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/PIApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 打印Api
function printApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/printApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 获取权限Api
function testrightApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/testrightApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 销售发货Api
function delivergdsApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/delivergdsApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 销售退货Api
function salesreturnApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/salesreturnApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 现货销售Api
function spotsalesApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/spotsalesApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 质检报告Api
function qcorderApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/qcorderApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 采购订单Api
function purorderApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/purorderApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 采购质检Api
function cgzjApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令cgzjApi')
		console.log(data)
		uni.request({
						url:siteURL+"/cgzjApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						},
						fail(res) {
							console.log(res);
							failToastFun(res);
						}
					})
	})
}
// 采购收货Api
function cgshApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令cgzjApi')
		console.log(data)
		uni.request({
						url:siteURL+"/cgshApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 现货采购Api
function xhcgApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令cgzjApi')
		console.log(data)
		uni.request({
						url:siteURL+"/xhcgApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 采购退货Api
function cgthApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令cgzjApi')
		console.log(data)
		uni.request({
						url:siteURL+"/cgthApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 采购收货Api
function purinApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/purinApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 采购退货Api
function purreturnApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/purreturnApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 现货采购Api
function cashpurApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/cashpurApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 仓库盘点Api
function inventoryApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/inventoryApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 物资入库Api
function warehsApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/warehsApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 物资出库Api
function outboundApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/outboundApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 仓库调拨Api
function allocationApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/allocationApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 销售收款Api
function acceptApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/acceptApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 采购付款Api
function payApi(data) {
	return new Promise( (resolve, reject) => {		
		
		console.log(data)
		uni.request({
						url:siteURL+"/payApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 费用报销Api
function fybxApi(data) {
	return new Promise( (resolve, reject) => {		
		
		console.log(data)
		uni.request({
						url:siteURL+"/fybxApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}

// 文件api
function fileApi(data) {
	return new Promise( (resolve, reject) => {		
		uni.request({
						url:siteURL+"/fileApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 物料清单Api
function bomApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/bomApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 生产计划Api

function prdplanApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/prdplanApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 生产任务Api

function prdtaskApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/prdtaskApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 完工登记Api

function prdfinApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/prdfinApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 生产领料Api

function prdmrApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/prdmrApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 生产入库Api

function prdwhApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/prdwhApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 委外订单Api

function subcontractApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/subcontractApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 委外收货Api

function otswhApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/otswhApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 委外退货Api

function otsrtApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/otsrtApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 委外退料Api

function otsrmApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/otsrmApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}
// 报表管理
function baobiaoApi(data) {
	return new Promise( (resolve, reject) => {		
		uni.request({
						url:siteURL+"/baobiao.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {							
							successFun(res, resolve);
						}
					})
	})
}
// 银行日记账Api
function journalApi(data) {
	return new Promise( (resolve, reject) => {		
		console.log('api获得发送指令')
		console.log(data)
		uni.request({
						url:siteURL+"/journalApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve);
						}
					})
	})
}



module.exports = {
	crmChanpinApi,
	crmCpClassifyApi,
	crmMyAppUserApi,
	clientApi,
	employeeApi,
	supplierApi,
	PIApi,
	xhxsApi,
	salesorderApi,	
	delivergdsApi,
	salesreturnApi,
	spotsalesApi,
	qcorderApi,
	purorderApi,
	cgzjApi,
	cgshApi,
	cgthApi,
	xhcgApi,
	purreturnApi,
	purinApi,
	cashpurApi,
	inventoryApi,
	warehsApi,
	outboundApi,
	allocationApi,
	acceptApi,
	payApi,
	fybxApi,
	testrightApi,
	printApi,	
	fileApi,
	bomApi,	
	prdplanApi,
	prdtaskApi,
	prdfinApi,
	prdmrApi,
	prdwhApi,
	subcontractApi,
	otswhApi,
	otsrtApi,
	otsrmApi,
	journalApi,
	baobiaoApi,
	uniIdCfApi,
	
}