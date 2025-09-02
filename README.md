<h1> CRM客户管理系统-移动端 </h1>

# 产品简介
这是一套基于 webApi + uni-app +SQL SERVER 开发的CRM系统，分为移动端和管理后台两个项目，


# CRM作用
1.提高客户的忠诚度，防止客户流失；

2.拓客到成交，全流程销售数据分析，轻松掌控企业业绩；

3.多维度管理、客户画像、跟进过程一目了然；

.....

# 产品优势
产品后台采用uniCloud admin 框架，是基于 uni-app 和 uniCloud 的应用后台管理的开源框架。开发一云多端的整套业务。

产品前端采用uni-App开发，实现App（iOS，Android）、H5、微信小程序多平台部署运营。

# 项目构成
前端基于uni-app开发，后端基于[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/README)开发

整个CRM系统，有2个项目，复用同一个uniCloud空间。一个项目是移动端，另一个项目是管理端。

功能包括：
线索管理、客户管理、跟进记录、商机、报价单、合同、财务管理、产品管理、BI报表、待办数据等。
后台是另外插件，另见： [https://ext.dcloud.net.cn/plugin?id=6146](https://ext.dcloud.net.cn/plugin?id=6146)


# 目录结构
```
├── cloudfunctions              # 云函数
├── common
│   │── uni.css                 # 公共样式
│   └── uni-icons.css           # icon样式
├── components                  # 自定义组件
├── js_sdk                      # js sdk
├── pages                       # 页面
│   │── index                   # 首页
│   └── login                   # 登录页
├── static
├── store                       # vuex
├── windows
│   │── component               # 项目中使用的组件
│   │── leftWindow.vue          # 左侧窗口（菜单栏）
│   └── topWindow.vue           # 顶部窗口（导航栏）
├── admin.config.js             # 系统配置（配置导航，菜单等）
├── App.vue
├── main.js
├── mainfest.json
├── pages.json
├── postcss.config.js           # postcss 配置（浏览器兼容性）
└── uni.scss
```


