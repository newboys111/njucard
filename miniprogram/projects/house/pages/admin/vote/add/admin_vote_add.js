const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const AdminVoteBiz = require('../../../../biz/admin_vote_biz.js');
const VoteBiz = require('../../../../biz/vote_biz.js');
const validate = require('../../../../../../helper/validate.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
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

		wx.setNavigationBarTitle({
			title: projectSetting.VOTE_NAME + '-添加',
		});

		this.setData(AdminVoteBiz.initFormData());
		this.setData({
			isLoad: true
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

	url: function (e) {
		pageHelper.url(e, this);
	},
	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	},
	model: function (e) {
		pageHelper.model(this, e);
	},

	bindItemBlur: function (e) {
		AdminVoteBiz.itemBlur(e, this);
	},

	bindDelItemTap: function (e) {
		AdminVoteBiz.itemDel(e, this);
	},

	bindAddItemTap: function (e) {
		AdminVoteBiz.itemAdd(this);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		data = validate.check(data, AdminVoteBiz.CHECK_FORM, this);
		if (!data) return;

		if (data.end < data.start) {
			return pageHelper.showModal('截止时间不能早于开始时间');
		}

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		let item = data.item;
		for (let k = 0; k < item.length; k++) {
			k = Number(k);
			item[k].label = item[k].label.trim();
			if (item[k].label.length <= 0)
				return pageHelper.showModal('投票选项' + (Number(k + 1)) + '不能为空');
		}

		data.cateName = VoteBiz.getCateName(data.cateId);

		try {

			// 创建
			let result = await cloudHelper.callCloudSumbit('admin/vote_insert', data);
			let voteId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'vote/', voteId, 'admin/vote_update_forms');

			let callback = async function () {
				PublicBiz.removeCacheList('admin-vote-list');
				PublicBiz.removeCacheList('vote-list');
				wx.navigateBack();

			}
			pageHelper.showSuccToast('添加成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},


})