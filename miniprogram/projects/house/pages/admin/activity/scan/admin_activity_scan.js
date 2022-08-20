const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,
		title: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (!pageHelper.getOptions(this, options, 'activityId')) return;

		if (options && options.title) {
			let title = decodeURIComponent(options.title);
			this.setData({
				title
			});
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

	bindScanTap: function (e) {
		let activityId = this.data.activityId;
		wx.scanCode({
			async success(res) {
				console.log(res)
				if (!res ||
					!res.result ||
					!res.result.includes('activity=') ||
					res.result.length != 24) {
					pageHelper.showModal('错误的报名码，请重新扫码');
					return;
				}

				let code = res.result.replace('activity=', '');
				let params = {
					activityId,
					code
				};
				let options = {
					title: '报名码核销中'
				}
				await cloudHelper.callCloudSumbit('admin/activity_join_scan', params, options).then(res => {
					pageHelper.showModal('核销成功');

				}).catch(err => {
					console.log(err);
				});
			},
			fail(err) {
				if (err && err.errMsg == 'scanCode:fail')
					pageHelper.showModal('报名码核销错误，请重新扫码');
			}
		});
	}
})