const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const qrcodeLib = require('../../../../../lib/tools/qrcode_lib.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const ActivityBiz = require('../../../biz/activity_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		isShowHome: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		ProjectBiz.initPage(this);
		if (!pageHelper.getOptions(this, options)) return;
		this._loadDetail();

		if (options && options.flag == 'home') {
			this.setData({
				isShowHome: true
			});
		}
	},

	_loadDetail: async function (e) {
		let id = this.data.id;
		if (!id) return;

		let params = {
			activityJoinId: id
		}
		let opts = {
			title: 'bar'
		}
		try {
			let activityJoin = await cloudHelper.callCloudData('activity/my_join_detail', params, opts);
			if (!activityJoin) {
				this.setData({
					isLoad: null
				})
				return;
			}

			let qrImageData = qrcodeLib.drawImg('activity=' + activityJoin.ACTIVITY_JOIN_CODE, {
				typeNumber: 1,
				errorCorrectLevel: 'L',
				size: 100
			});

			this.setData({
				isLoad: true,
				activityJoin,
				qrImageData
			});
		} catch (err) {
			console.error(err);
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	bindCancelTap: async function (e) {
		let activityJoinId = this.data.activityJoin._id;
		let callback = () => {
			let activityJoin = this.data.activityJoin;
			activityJoin.ACTIVITY_JOIN_STATUS = 10;
			this.setData({
				activityJoin
			});
		}
		await ActivityBiz.cancelMyActivityJoin(activityJoinId, callback);
	},

	url: function (e) {
		pageHelper.url(e, this);
	},


	bindCalendarTap: function (e) {
		let activityJoin = this.data.activityJoin;
		let title = activityJoin.activity.ACTIVITY_TITLE;

		let startTime = activityJoin.activity.ACTIVITY_START / 1000;
		let endTime = activityJoin.activity.ACTIVITY_END / 1000;

		pageHelper.addPhoneCalendar(title, startTime, endTime);
	}
})