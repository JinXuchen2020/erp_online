import{
	siteURL
} from '@/config.js'

function failToastFun(e) {
	console.log(e)
	uni.hideLoading()
	if(e.errDetail && e.errDetail.indexOf("undefined") == -1) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errDetail
		})
	} else if(e.errMsg) {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.errMsg
		})
	} else {
		uni.showModal({
			title: '提示',
			showCancel: false,
			content: '报错信息：' + e.message
		})
	}
}

function successFun(res, resolve, reject) {	
	uni.hideLoading()
	if (res.data.code>0) {
		console.log('返回代码'+res.data.code)
		if(res.data.code == 403 ||res.data.code == 30203 || res.data.code == 30204 || res.data.code == 30202 || res.data.code == 30201) {
			uni.showModal({
				title: '提示',
				showCancel: false,
				content: '当前暂未登录或者登录授权过期，无法查看详细数据，请重新登录！',
				complete(res) {
					uni.reLaunch({
						url: '/pages/regLogin/login'
					})
				}
			})
			reject(res.result.msg);
		} else {
			if(res.data.tag && (res.data.tag).indexOf("undefined") == -1) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: res.data.tag
				})
			} else {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: res.data.tag
				})
			}
			reject(res.data.tag);
		}
	} else {
		resolve(res)
	}
}

// 角色api
function rolesApi(data) {
	return new Promise( (resolve, reject) => {
		/* //开始
		uniCloud.callFunction({
			name: 'roleApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
		//结束 */
		console.log(data);
		uni.request({
			
						url:siteURL+"/roleApi.aspx",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve, reject);
						}
					})
	})
}

// uni-id-users 用户api
function uidUserApi(data) {
	return new Promise( (resolve, reject) => {
		/* //开始
		uniCloud.callFunction({
			name: 'uni-id-users',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
		//结束 */
		uni.request({
						url:siteURL+"/uniidusers.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve, reject);
						}
					})
	})
}

// uni-id-permissions 用户api
function permissionsApi(data) {
	return new Promise( (resolve, reject) => {
		/* //开始
		uniCloud.callFunction({
			name: 'permissionsApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
		//结束 */
		uni.request({
						url:siteURL+"/permissionsApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve, reject);
						}
					})
	})
}

// uni-id-department 部门api
function departmentApi(data) {
	return new Promise( (resolve, reject) => {
		/* //开始
		uniCloud.callFunction({
			name: 'departmentApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})
		//结束 */
		uni.request({
						url:siteURL+"/departmentApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve, reject);
						}
					})
	})
}

// 业绩目标
function performanceApi(data) {
	return new Promise( (resolve, reject) => {
		/* //开始
		uniCloud.callFunction({
			name: 'performanceApi',
			data: data,
			success(res) {
				successFun(res, resolve, reject);
			},
			fail(e) {
				failToastFun(e)
				reject(e);
			}
		})		
		//结束 */
		uni.request({
						url:siteURL+"/performanceApi.aspx?",
						method:"POST",
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:data,
						success(res) {
							console.log(res);
							successFun(res, resolve, reject);
						}
					})
	})
}

module.exports = {
	rolesApi,
	uidUserApi,
	permissionsApi,
	departmentApi,
	performanceApi
}