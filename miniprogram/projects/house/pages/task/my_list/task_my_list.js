const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const TaskBiz = require('../../../biz/task_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const helper = require('../../../../../helper/helper.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLogin: true,
		search: '',

		sortMenusDefaultIndex: -1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this); 

		if (options && helper.isDefined(options.status)) {
			this.setData({
				_params: {
					sortType: 'status',
					sortVal: options.status,
				}
			});
		}
		else {
			this.setData({
				sortMenusDefaultIndex: 0
			});
		}

		this._getSearchMenu();
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


	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	/** 搜索菜单设置 */
	_getSearchMenu: function () {
		let sortItem1 = [{ label: '优先级', type: 'level', value: '' }];
		let level = projectSetting.TASK_LEVEL;
		for (let k = 0; k < level.length; k++) {
			sortItem1.push({
				label: level[k],
				type: 'level',
				value: level[k]
			})
		}
		let sortItem3 = [{ label: '分类', type: 'type', value: '' }];
		let type = projectSetting.TASK_TYPE;
		for (let k = 0; k < type.length; k++) {
			sortItem3.push({
				label: type[k],
				type: 'type',
				value: type[k]
			})
		}

		let sortItems = [sortItem1, sortItem3];

		let sortMenus = [
			{ label: '全部', type: 'status', value: '' },
			{ label: '待处理', type: 'status', value: '0' },
			{ label: '处理中', type: 'status', value: '1' },
			{ label: '已办结', type: 'status', value: '2' }
		];


		this.setData({
			search: '',
			sortItems,
			sortMenus,
			isLoad: true
		});

	},
	bindDelTap: async function (e) {
		if (!await PassportBiz.loginMustBackWin(this)) return;

		let id = pageHelper.dataset(e, 'id');

		let callback = () => {
			pageHelper.delListNode(id, this.data.dataList.list, '_id');
			this.data.dataList.total--;
			this.setData({
				dataList: this.data.dataList
			});
		}
		await TaskBiz.delTask(id, callback);
	}
})