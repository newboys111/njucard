const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (options && options.scene) {
			let params = {
				activityId: options.scene
			};
			let opts = {
				title: 'bar'
			}
			try {
				await cloudHelper.callCloudSumbit('activity/my_join_self', params, opts).then(res => {
					let cb = () => {
						wx.reLaunch({
							url: '../../my/index/my_index',
						});
					}
					pageHelper.showModal(res.data.ret, '温馨提示', cb);
				});
			} catch (err) {
				console.error(err);
			}
		} else {
			pageHelper.showModal('签到码扫描错误，请关闭本小程序，使用「微信›扫一扫」重新扫码');
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
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})