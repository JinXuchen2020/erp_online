<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(e) {
			if(e.type == '百度') {
				this.url = 'https://www.baidu.com/s?wd=' + e.name
			} else if(e.type == '天眼查') {
				this.url = 'https://m.tianyancha.com/search?key=' + e.name
			} else if(e.type == '商务合作') {
				this.url = 'https://m.youquyq.com/'
				uni.setNavigationBarTitle({
					title: '商务合作'
				})
			} else if(e.type == '帮助中心') {
				this.url = 'https://www.rhtec.com.cn'
				// this.url = 'https://tcb-ogazce3ksg4d5mid566b4-35780f-1304778312.tcloudbaseapp.com/pdf/XYK-CRM-10150904.pdf'
				uni.setNavigationBarTitle({
					title: '帮助中心'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
