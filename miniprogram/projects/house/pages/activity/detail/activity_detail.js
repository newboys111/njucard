const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js'); 
const projectSetting = require('../../../public/project_setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const ActivityBiz = require('../../../biz/activity_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false, 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		if (!pageHelper.getOptions(this, options)) return;
		this._loadDetail();

		wx.setNavigationBarColor({
			backgroundColor: projectSetting.PROJECT_COLOR,
			frontColor: '#ffffff',
		})
	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let activity = await cloudHelper.callCloudData('activity/view', params, opt);
		if (!activity) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			activity,
		});  
	}, 

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () { },

	bindJoinTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		wx.navigateTo({
			url: '../join/activity_join?id=' + this.data.activity._id,
		});
	},

	bindCancelJoinTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;
		let cb = () => {
			wx.redirectTo({
				url: 'activity_detail?id=' + this.data.id,
			})
		}
		await ActivityBiz.cancelMyActivityJoin(this.data.activity.myActivityJoinId, cb);
	},

	bindOpenMapTap: function (e) {
		let address = pageHelper.dataset(e, 'address');
		let geo = pageHelper.dataset(e, 'geo');
		ActivityBiz.openMap(address, geo);
	},
	url: function (e) {
		pageHelper.url(e, this);
	}, 

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	onShareAppMessage: function (res) {
		return {
			title: this.data.activity.ACTIVITY_TITLE,
			imageUrl: this.data.activity.ACTIVITY_OBJ.cover[0]
		}
	}
})