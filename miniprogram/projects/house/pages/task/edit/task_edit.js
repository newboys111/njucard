const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const TaskBiz = require('../../../biz/task_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js'); 
const dataHelper = require('../../../../../helper/data_helper.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		if (!await PassportBiz.loginMustBackWin(this)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		this.setData(TaskBiz.initFormData(id)); // 初始化表单数据   

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let task = await cloudHelper.callCloudData('task/detail', params, opt);
		if (!task) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			task,
		});

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
		this.setData({
			isLoad: false
		}, async () => {
			await this._loadDetail();
		});
		wx.stopPullDownRefresh();
	},



	url: function (e) {
		pageHelper.url(e, this);
	},


	bindCheckTap: async function (e) {
		this.selectComponent("#task-form-show").checkForms();
	},

	bindSubmitCmpt: async function (e) {
		let forms = e.detail;

		try {
			let id = this.data.id;
			let params = {
				id,
				forms
			}
			await cloudHelper.callCloudSumbit('task/edit', params);
			await cloudHelper.transFormsTempPics(forms, 'task/', id, 'task/task_update_forms');

			let cb = () => {
				let node = {
					'TASK_OBJ': {
						'title': dataHelper.getDataByKey(forms, 'mark', 'title').val,
						'level': dataHelper.getDataByKey(forms, 'mark', 'level').val,
						'type': dataHelper.getDataByKey(forms, 'mark', 'type').val,
					}
				}
				pageHelper.modifyPrevPageListNodeObject(id, node);

				wx.navigateBack();
			};
			pageHelper.showNoneToast('修改完成，等待处理', 2000, cb);
		} catch (err) {
			console.log(err);
		}
	}

})