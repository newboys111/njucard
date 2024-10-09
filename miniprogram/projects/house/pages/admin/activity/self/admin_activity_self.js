const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		qrUrl: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return; 
		if (!pageHelper.getOptions(this, options, 'activityId'));

		if (options && options.title) {
			let title = decodeURIComponent(options.title);
			this.setData({
				title
			});
		}

		await this._loadDetail();
	},

	_loadDetail: async function () { 
		let activityId = this.data.activityId;

		let page = pageHelper.fmtURLByPID("/pages/activity/my_join_self/activity_my_join_self");

		let params = { 
			activityId,
			page
		};
		let opt = {
			title: 'bar'
		};
		try {
			await cloudHelper.callCloudSumbit('admin/activity_self_checkin_qr', params, opt).then(res => {
				this.setData({
					qrUrl: res.data,
					isLoad: true
				})
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

	url: function (e) {
		pageHelper.url(e, this);
	}

})