<template>
	<view>
		<!--基础信息-->
		<view class="btName">基础信息</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">名称</text>
			<view class="width276 color333 flexC" v-if="khInfo.name">
				<text>{{khInfo.name}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5" v-if="khInfo.contactman">
			<text class="mr26">联系人</text>
			<view v-if="khInfo.contactman" class="width276 color333">
				<text v-if="khInfo.contactman">{{khInfo.contactman}}</text>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">电话</text>
			<view v-if="khInfo.tel" class="width276 color333">
				<text>{{khInfo.tel}}</text>
				<u-icon name="phone" color="#007aff" size="40" class="ml26 p8" @click="makePhoneCallFun(khInfo.tel)">
				</u-icon>
				<u-icon name="chat-fill" color="#ffaa00" size="40" class="ml26 p8" @click="sendMsgFun(khInfo.tel)">
				</u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>		
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">地址</text>
			<view v-if="khInfo.address" class="width276 color333 flexC">
				<view style="width: 500rpx;">{{khInfo.address}}</view>
				<u-icon name="map" color="#007aff" size="40" class="ml26 p8" @click="openLocationFun"></u-icon>
			</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">付款方式</text>
			<view v-if="khInfo.simple" class="width276 color333">{{khInfo.simple}}</view>
			<view v-else class="width276">暂无</view>
		</view> 
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">送货地址</text>
			<view v-if="khInfo.postcode" class="width276 color333">{{khInfo.postcode}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户分类</text>
			<view v-if="khInfo.type" class="width276 color333">{{khInfo.type}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		<view class="flex-white-plr26 ptb20 bdb_f5">
			<text class="mr26">客户备注</text>
			<view v-if="khInfo.bz" class="width276 color333">{{khInfo.bz}}</view>
			<view v-else class="width276">暂无</view>
		</view>
		
	</view>
</template>

<script>
	let that = ''
	export default {
		props: {
			khInfo: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		created() {
			that = this;			
		},
		methods: {
			// 跳往百度
			gotoBaiDuFun: function(type) {
				uni.navigateTo({
					url: '/pages/webview/webview?name=' + that.khInfo.clientName + '&type=' + type
				})
			},
			// 拨打电话
			makePhoneCallFun: function(str) {
				uni.makePhoneCall({
					phoneNumber: str
				})
			},
			sendMsgFun: function(str) {
				if (!str) {
					uni.$myModalFun('该客户暂未设置联系方式！')
					return
				}
				// #ifdef APP-PLUS
				var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				msg.to = [str];
				msg.body = '';
				plus.messaging.sendMessage(msg);
				// #endif
			},
			// 打开定位
			openLocationFun: function() {
				uni.openLocation({
					latitude: that.khInfo.latitude,
					longitude: that.khInfo.longitude,
					name: that.khInfo.clientName,
					address: that.khInfo.address,
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style>
	.color333 {
		color: #666666;
	}

	.btName {
		margin-bottom: 16rpx;
	}

	.flexC {
		display: flex;
		align-items: center;
	}

	.p8Img {
		padding: 8rpx;
		width: 40rpx;
		height: 40rpx;
		margin-left: 16rpx;
	}

	.p8 {
		padding: 8rpx;
	}
</style>
