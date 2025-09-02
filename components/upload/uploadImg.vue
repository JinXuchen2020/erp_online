<template>
	<view class="tishi">
		<u-popup v-model="show" border-radius="26" mode="center" :mask-close-able="false" length="60%">
			<view class="popupClass">
				<view class="popupTitle">上传进度：{{percent}}%</view>
				<u-image class="popupImg" width="100%" height="300rpx" :src="showImg"></u-image>
				<u-line-progress class="progress" height="36" active-color="#2979ff" :percent="percent">
				</u-line-progress>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let _self = ''
	export default {
		props: {
			ppList: {
				type: Array,
				default: () => []
			},
			ppUrls: {
				type: Array,
				default: () => []
			},
			imgType: {
				type: String,
				default: 'product'
			}
		},
		data() {
			return {
				show: true,
				percent: 0,
				urls: [],
				index: 0,
				showImg: ''
			}
		},
		async created() {
			_self = this;
			let ppUrls = _self.ppUrls;
			let ppList = _self.ppList;
			let arr = ppUrls;
			for (var i = ppUrls.length; i < ppList.length; i++) {
				_self.index = i;
				_self.showImg = ppList[i].url;
				let obj = await _self.uploadImgFun(ppList[i].url)
				arr.push(obj);
			}
			_self.$emit('confirmPopupFun', arr);
		},
		methods: {
			uploadImgFun: function(path) {
				return new Promise(reslove => {
					let date = new Date();
					let typeSrc = '.png';
					let xxx = path.lastIndexOf(".");
					typeSrc = path.substring(xxx, path.length);
					/* const result = uniCloud.uploadFile({
							filePath: path,
							cloudPath: 'image/' + _self.imgType + '/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
								date
								.getDate() + '/' +
								date.getTime() + Math.ceil(Math.random() * 100) + typeSrc,
							onUploadProgress: (progressEvent) => {
								_self.percent = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							}
						}) */
						const result = uni.uploadFile({
							    url: siteURL+'/webapi/fileApi.aspx?action=saveFile', 
							    // filePath:  event.file.thumb,
								fileType:'image',
							    name: 'file',
							    formData: {
							      'token': '',
								  'filePath': path,
								  'fileName':'image/' + _self.imgType + '/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +
									date
									.getDate() + '/' +
									date.getTime() + Math.ceil(Math.random() * 100) + typeSrc
							    },
							    success: (res) => {
									console.log(res);
									
							      //this.imgUrl = JSON.parse(uploadFileRes.data).data
							    }
							  })
						.then(res => {
									let obj = {
										url: res.fileList[0]
									}
									reslove(obj)
								
								.catch(err => {
									uni.showModal({
										title: '错误提示',
										content: err.toString(),
										showCancel: false
									})
								})
						})
						.catch(err => {
							uni.hideLoading();
							uni.showModal({
								title: '错误提示',
								content: err.toString(),
								showCancel: false
							})
						})
				})
			}
		}
	}
</script>

<style>
	.popupClass {
		position: relative;
	}

	.popupTitle {
		width: 100%;
		text-align: center;
		margin-top: 16rpx;
		font-weight: bold;
		font-size: 30rpx;
	}

	.popupImg {
		width: 80% !important;
		margin-left: 10%;
		margin: 26rpx 10%;
	}

	.progress {
		width: 80%;
		margin: 0 10% 26rpx;
	}
</style>
