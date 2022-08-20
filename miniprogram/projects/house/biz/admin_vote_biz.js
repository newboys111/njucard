/**
 * Notes: 投票模块后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-05 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const VoteBiz = require('./vote_biz.js');
const projectSetting = require('../public/project_setting.js');
const pageHelper = require('../../../helper/page_helper.js');

class AdminVoteBiz extends BaseBiz {
	static itemBlur(e, that) {
		// 多选项目的输入
		let idx = pageHelper.dataset(e, 'idx');
		let val = e.detail.value.trim();
		let formItem = that.data.formItem;
		formItem[idx].label = val;
		that.setData({
			formItem
		});
	}

	static itemDel(e, that) {
		let formItem = that.data.formItem;
		if (formItem.length <= 2) return pageHelper.showModal('至少2个选项');


		let callback = () => {
			let idx = pageHelper.dataset(e, 'idx');
			formItem.splice(idx, 1);
			that.setData({
				formItem
			});
		}

		pageHelper.showConfirm('确定删除该项吗？', callback);
	}

	static itemAdd(that) {
		let formItem = that.data.formItem;
		if (formItem.length >= 20) return pageHelper.showModal('最多可以添加20个选项');

		formItem.push({ label: '', cnt: 0 });
		that.setData({
			formItem
		});
	}

	static initFormData(id = '') {
		let cateIdOptions = VoteBiz.getCateList();

		return {
			id,

			cateIdOptions,
			fields: projectSetting.VOTE_FIELDS,

			formTitle: '',
			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,

			formStart: '',
			formEnd: '',

			formCancelSet: 1,
			formType: 0,
			formItem: [{ label: '', cnt: 0 }, { label: '', cnt: 0 }],

			formForms: [],
		}

	}
}

AdminVoteBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=标题',
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	start: 'formStart|must|string|name=开始时间',
	end: 'formEnd|must|string|name=截止时间',
	cancelSet: 'formCancelSet|must|int|name=允许取消',
	type: 'formType|must|int|name=允许多选',
	item: 'formItem|must|array|name=投票选项',
	forms: 'formForms|array'
};

module.exports = AdminVoteBiz;