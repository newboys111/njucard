const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ActivityBiz = require('../../../biz/activity_biz.js');
const projectSetting = require('../../../public/project_setting.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isShowCate: projectSetting.ACTIVITY_CATE.length > 1
	},

	/**
		 * 生命周期函数--监听页面加载
		 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		this._getSearchMenu();

		if (options && options.id) {
			this.setData({
				_params: {
					sortType: 'cateId',
					sortVal: options.id,
				}
			});
		} else {
			this.setData({

				_params: {
					sortType: 'cateId',
					sortVal: '',
				}
			});
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {

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

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},


	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {
		ActivityBiz.setCateTitle();

		let sortItem1 = [{
			label: '分类',
			type: 'cateId',
			value: ''
		}];

		sortItem1 = sortItem1.concat(ActivityBiz.getCateList());

		let sortItems = [sortItem1];
		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '今日', type: 'today', value: '' },
			{ label: '明日', type: 'tomorrow', value: '' },
			{ label: '本月', type: 'month', value: '' }
		];
		this.setData({
			search: '',
			sortItems,
			sortMenus,
			isLoad: true
		})

	},

})