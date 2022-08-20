const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

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
		if (!AdminBiz.isAdmin(this)) return;

		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

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

	url: async function (e) {
		pageHelper.url(e, this);
	},


	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/task_del', params, opts).then(res => {

					pageHelper.delListNode(id, this.data.dataList.list);
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},

	bindStatusTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');
		let status = Number(pageHelper.dataset(e, 'status'));
		let params = {
			id,
			status
		}

		let cb = async () => {
			try {
				await cloudHelper.callCloudSumbit('admin/task_status', params).then(res => {
					pageHelper.modifyListNode(id, this.data.dataList.list, 'TASK_STATUS', status, '_id');
					pageHelper.modifyListNode(id, this.data.dataList.list, 'TASK_LAST_TIME', timeHelper.time('Y-M-D h:m:s'), '_id');
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('设置成功');
				});
			} catch (e) {
				console.log(e);
			}
		}

		pageHelper.showConfirm('确认执行此操作?', cb);

	},

	_getSearchMenu: async function () {

		let sortItems1 = [
			{ label: '排序', type: '', value: '' },
			{ label: '时间正序', type: 'sort', value: 'TASK_ADD_TIME|asc' },
			{ label: '时间倒序', type: 'sort', value: 'TASK_ADD_TIME|desc' }
		];

		let sortItems2 = [
			{ label: '分类', type: '', value: '' },
		];
		for (let k = 0; k < projectSetting.TASK_TYPE.length; k++) {
			sortItems2.push({ label: projectSetting.TASK_TYPE[k], type: 'type', value: projectSetting.TASK_TYPE[k] });
		}

		let sortItems3 = [
			{ label: '类型', type: '', value: '' },
		];
		for (let k = 0; k < projectSetting.TASK_LEVEL.length; k++) {
			sortItems3.push({ label: projectSetting.TASK_LEVEL[k], type: 'level', value: projectSetting.TASK_LEVEL[k] });
		}

		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '待处理', type: 'status', value: '0' },
			{ label: '处理中', type: 'status', value: '1' },
			{ label: '已办结', type: 'status', value: '2' },
		];


		this.setData({
			search: '',
			sortItems: [sortItems1, sortItems2, sortItems3],
			sortMenus,
			isLoad: true
		})


	}

})