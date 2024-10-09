const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const AdminVoteBiz = require('../../../../biz/admin_vote_biz.js');
const VoteBiz = require('../../../../biz/vote_biz.js');
const validate = require('../../../../../../helper/validate.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js'); 
const projectSetting = require('../../../../public/project_setting.js');

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
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.VOTE_NAME + '-修改',
		});

		this._loadDetail();
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
		this.selectComponent("#cmpt-form").reload();
		wx.stopPullDownRefresh();
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

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(AdminVoteBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let vote = await cloudHelper.callCloudData('admin/vote_detail', params, opt);
		if (!vote) {
			this.setData({ isLoad: null });
			return;
		};

		this.setData({
			isLoad: true,

			formTitle: vote.VOTE_TITLE,
			formCateId: vote.VOTE_CATE_ID,
			formOrder: vote.VOTE_ORDER,
 
			formStart: vote.VOTE_START,
			formEnd: vote.VOTE_END,

			formCancelSet: vote.VOTE_CANCEL_SET, 

			formType: vote.VOTE_TYPE,
			formItem: vote.VOTE_ITEM,

			formForms: vote.VOTE_FORMS, 

		});
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
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
		for (let k = 0; k < item.length; k++)  { 
			k = Number(k);
			item[k].label = item[k].label.trim();
			if (item[k].label.length <= 0)
				return pageHelper.showModal('投票选项' + (Number(k + 1)) + '不能为空');
		}

		data.cateName = VoteBiz.getCateName(data.cateId);

		try {
			let voteId = this.data.id;
			data.id = voteId;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('admin/vote_edit', data).then(res => {
				// 更新列表页面数据
				let node = {
					'VOTE_TITLE': data.title,
					'VOTE_CATE_NAME': data.cateName,
					'VOTE_ORDER': data.order,
					'VOTE_START': data.start,
					'VOTE_END': data.end, 
					'VOTE_CANCEL_SET': data.cancelSet,
					statusDesc: res.data.statusDesc
				}
				pageHelper.modifyPrevPageListNodeObject(voteId, node);
			});

			await cloudHelper.transFormsTempPics(forms, 'vote/', voteId, 'admin/vote_update_forms');

			let callback = () => {
				wx.navigateBack();
			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},


	url: function (e) {
		pageHelper.url(e, this);
	},

	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	}, 
 

})