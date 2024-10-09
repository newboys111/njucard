const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const TaskBiz = require('../../../biz/task_biz.js');
const PublicBiz = require('../../../../../comm/biz/public_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,
		isEdit: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);  
		
		if (!await PassportBiz.loginMustBackWin(this)) return;

		this.setData(TaskBiz.initFormData('')); // 初始化表单数据   

	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

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
	},



	url: function (e) {
		pageHelper.url(e, this);
	},



	bindCheckTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;
		this.selectComponent("#task-form-show").checkForms();
	},

	bindSubmitCmpt: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let forms = e.detail;

		try {
			let opts = {
				title: '提交中'
			}
			let params = {
				forms,
				cateId: this.data.cateId,
				cateName: this.data.cateName
			}
			// 创建
			let result = await cloudHelper.callCloudSumbit('task/insert', params, opts);
			let taskId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'task/', taskId, 'task/task_update_forms');

			let cb = () => {
				PublicBiz.removeCacheList('my-task-list');
				/*
				wx.reLaunch({
					url: '../list/task_list?cateId=' + this.data.cateId
				});*/
				wx.navigateBack();
			}
			pageHelper.showNoneToast('填报完成，等待处理', 2000, cb);


		} catch (err) {
			console.log(err);
		};
	}

})