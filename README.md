# miniwork 新技术栈云开发


## 项目更新月度计划安排（希望有更多大佬加入我们，一起开发项目，人多力量大）

### 7-8月上线计划：（拟定）
- 1.项目整体进行符合最新程序规范的重构（css，组件，云函数，命名等）
-- PS:因为项目一开始是出于没事情干做的，所以做的比较随心所欲
- 2.上线更多内容管理类型后端功能（向知乎，掘金看齐）。
- 3.ui的持续优化，做特立独行的ui体系，给用户更多的视觉冲击
- 4.上线更加详细的部署，使用，迭代文档和视频（b站
- 5.增加问答模块下，抢答，分享，等功能



## 项目介绍

小贝校招 项目是一套国内首个成熟的创新个人博客小程序，基于微信原生+微信云开发+vant+colorui+码云以及相关技术栈开发。

## 项目模块
- 基于腾讯云服务开发，微信云开发，原生微信，使用vant，colorui为UI的开发的小程序，后台基于微信云开项目。
- [文章模块]包含（点赞，收藏，笔记，列表，图文，代码块，分享，分享朋友圈，热点监控）。
- [题库模块]包含（倒计时，答案浮现，懒加载，选择题模块）。
- [签到模块]包含（微信订阅推送，每日签到，签到排行榜）。
- [首页模块]包含（热文，公告，字典，看书（支持pdf），问答社区（个人认证不开放））。

## 项目预览地址
### 小程序
**预览地址**  



### 后台cms系统



关注小程序：**小贝校招**，


**代码不易，您如果觉得项目不错的话可以给项目一个 Star 嘛，也是对我一直更新代码的一种鼓励啦，谢谢各位的支持。**



## 开发及部署文档
### 后端云部署
- 前置条件下载 **微信开发工具**  开通微信云开发. 点击云开发，点击设置，然后创建环境，复制环境id

在开发工具里面全局替换test-4gn9gu0ucc6657ba（现项目的环境），变成你自己的环境id
```
  wx.cloud.init({
        env: "test-4gn9gu0ucc6657ba",
  })
```
然后在此环境中以下数据库集合,每行代表一个数据库名字：
```
 - Book（权限设置，所有用户可读写，仅参加者可写）
 - Book_file （权限设置，仅参加者可读写）
 - answer （权限设置，所有用户可读写，仅参加者可写）
 - collect （权限设置，仅参加者可读写）
 - dictionaries （权限设置，所有用户可读写，仅参加者可写）
 - encourage （权限设置，所有用户可读写，仅参加者可写）
 - history （权限设置，所有用户可读写，仅参加者可写）
 - interview （权限设置，所有用户可读写，仅参加者可写）
 - interview_collect （权限设置，仅参加者可读写）
 - interview_statr （权限设置，仅参加者可读写）
 - note （权限设置，仅参加者可读写）
 - press （权限设置，所有用户可读写，仅参加者可写）
 - statr （权限设置，仅参加者可读写）
 - user （权限设置，仅参加者可读写）
 ```
 导入cloudfunctions文件里除了wx开头的云函数（wx开头的为在下面步骤自动生成）,右键点击， 部署即可

- 1.打开微信开发工具-云开发更新到最新的 Nightly 版本工具，在工具顶部 Tab 栏中，点击「更多」-「内容管理」  
<img width="600"    align="middle" src="https://res.wx.qq.com/wxdoc/dist/assets/img/cms-intro-1.40b341ef.png">

- 2.开通，勾选同意协议后，点击确定内容管理能力需要使用云函数、数据库、静态网站等服务，开通时云开发将会在该环境下创建内容管理云函数  
 内容管理数据集合、内容管理静态网站文件等云资源，具体云资源参见云资源详情。  
 内容管理当前仅支持支付方式为按量付费的环境开通，点击开通后在当前弹窗开通按量付费即可；    
<img width="600"    align="middle" src="https://res.wx.qq.com/wxdoc/dist/assets/img/cms-intro-1.40b341ef.png">

    
- 3.开通完成后，内容管理当前页面可看到内容管理的入口链接和相关信息。  
   点击访问地址，即可在弹出的浏览器窗口中进行内容管理的相关配置。
   登录内容管理CMS云开发控制台-更多-内容管理页面中，点击「访问地址」即可进入内容管理界面。  
   内容管理平台独立于云控制台进行内容和权限管理的，访问地址也可在浏览器中收藏后续直接访问即可，不需再从云开发控制台进入（保存网址）。


- 4.进入后台管理页面点击内容模型导，点击导入模型入schema-export-5hibvabs.json文件。
     


因项目部分图片储存在云库里请在项目替换全局替换（cloud://test-4gn9gu0ucc6657ba.7472-test-4gn9gu0ucc6657ba-1259429368/263b1249013bbd23267d8beacf256d19.jpeg）这样的图片

## 联系作者

> 大家有任何问题或者建议都可以在 [issues](https://gitee.com/KyotoKing_tree/treeworld_Applets/issues) 中反馈给我，我逐渐慢慢完善项目。

- QQ：
- QQ交流群：
- 我的微信：

2021.6.4更新



## 页面展示

以下为小贝校招小程序的部分页面预览图：



## 感谢

## 2021年7月25日更新：

- 1、代码部署，环境配置，初步测试模板；
- 2、确定主题，确定个功能模块，画思维导图

## 2021年7月26日更新：

- 1、首页轮播图，链接跳转；
- 2、跳转加载中动画，详情页面UI调整；

## 2021年7月27日更新：

- 1、宣讲会数据库、页面设计；
- 2、题库、内推页面设计；
- 3、字体规范：小-14px，中-16px，大-18px，超大-20px

## 2021年7月28日更新：

- 1、校招和资讯点赞收藏，[我的]校招和资讯点赞收藏同时显示，可分别跳转；
- 2、咨询页顶部swiper功能，链接跳转
- 3、面试题收藏与推荐功能，收藏的题目对应在[我的]中的[我的题库]

